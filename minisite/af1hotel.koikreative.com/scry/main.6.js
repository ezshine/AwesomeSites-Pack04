// 解码配置
BABYLON.DracoCompression.Configuration = {
    decoder: {
        wasmUrl: '3d/draco_decoder_gltf.js',
        wasmBinaryUrl: '3d/draco_decoder_gltf.wasm',
        fallbackUrl: '3d/draco_wasm_wrapper_gltf.js',
    }
}
BABYLON.KhronosTextureContainer2.URLConfig = {
    jsDecoderModule: document.baseURI + '3d/babylon.ktx2Decoder.js',
    jsMSCTranscoder: document.baseURI + '3d/msc_basis_transcoder.js',
    wasmMSCTranscoder: document.baseURI + '3d/msc_basis_transcoder.wasm',
}
// 镜头转移动画
const gotoNextCam = (cam, config) => {
    const animGroup = new BABYLON.AnimationGroup('aniCamGrp')
    const easingFunc = new BABYLON.PowerEase(3)
    easingFunc.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT)
    const animTemp = new BABYLON.Animation('camAniPos', 'position', 50, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    animTemp.setEasingFunction(easingFunc)
    animTemp.setKeys([
        {
            frame: 0,
            value: config.position,
        },
        {
            frame: 100,
            value: cam.position,
        }
    ])
    animGroup.addTargetedAnimation(animTemp, cam)
    animGroup.speedRatio = config.speedRatio || 1
    animGroup.onAnimationGroupPlayObservable.add(() => {
        jumpAniLock = true
        cam.detachControl()
    })
    animGroup.onAnimationGroupEndObservable.add(() => {
        animGroup.dispose()
        jumpAniLock = false
        cam.attachControl(true)
    })
    if (config.onStart) {
        animGroup.onAnimationGroupPlayObservable.add(config.onStart)
    }
    if (config.onEnd) {
        animGroup.onAnimationGroupEndObservable.add(config.onEnd)
    }
    animGroup.play()
}
// 初始化引擎
const
    canvas = document.getElementsByTagName('canvas')[0],
    engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        doNotHandleContextLost: true,
        stencil: true,
        audioEngine: false,
    }, true)
let timer = null
// 主场景
const mainScene = (() => {
    // 初始化场景
    const scene = new BABYLON.Scene(engine)
    // 场景相机
    const camera = new BABYLON.FreeCamera('Main', new BABYLON.Vector3(-2.655, .185, .451), scene)
    camera.setTarget(new BABYLON.Vector3(-3.648, .261, .547))
    camera.attachControl(true)
    camera.minZ = .01
    camera.fov = .9
    // 场景开始渲染后
    scene.onAfterRenderObservable.addOnce(() => {
        // 隐藏掉Loading界面
        $('[data-loader]').addClass('hide')
        // 推镜头入场
        gotoNextCam(camera, {
            speedRatio: .4,
            position: new BABYLON.Vector3(1.934, -.032, -.193),
            onStart: function () {
                // 模态框需要一个放大的效果
                gsap.fromTo(`[data-modal='hello']`, {
                    opacity: 0,
                    scale: 0,
                }, {
                    opacity: 1,
                    scale: 1,
                    delay: .2,
                    duration: .65,
                    ease: 'power1.out',
                    onStart() {
                        $(`[data-modal='hello']`).show()
                    },
                })
            },
        })
        // 控制台打扫
        console.clear()
    })
    // Loading基础动画
    gsap.fromTo(`[data-loader='rect']`, {
        scaleX: 0,
    }, {
        scaleX: 1,
        duration: 1.8,
        ease: 'none',
    })
    // 相机交互
    camera.speed = .05
    const ctrlState = {
        dir: '零位',
        pointerX: 0,
        pointerY: 0,
    }
    // 相机碰撞
    camera.ellipsoid = new BABYLON.Vector3(.05, .1, .05)
    camera.checkCollisions = true
    // 触控板
    scene.onBeforeRenderObservable.add(() => {
        const speed = camera._computeLocalCameraSpeed() * .44
        switch (ctrlState.dir) {
            case '正上':
                camera._localDirection.copyFromFloats(0, 0, speed)
                break
            case '正下':
                camera._localDirection.copyFromFloats(0, 0, -speed)
                break
            case '正左':
                camera._localDirection.copyFromFloats(-speed, 0, 0)
                break
            case '正右':
                camera._localDirection.copyFromFloats(speed, 0, 0)
                break
            case '左上':
                camera._localDirection.copyFromFloats(-speed, 0, speed)
                break
            case '右上':
                camera._localDirection.copyFromFloats(speed, 0, speed)
                break
            case '右下':
                camera._localDirection.copyFromFloats(speed, 0, -speed)
                break
            case '左下':
                camera._localDirection.copyFromFloats(-speed, 0, -speed)
                break
        }
        if (ctrlState.dir != '零位') {
            camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix)
            BABYLON.Vector3.TransformNormalToRef(camera._localDirection, camera._cameraTransformMatrix, camera._transformedDirection)
            camera.cameraDirection.addInPlace(camera._transformedDirection)
        }
    })
    // 八向摇杆
    const
        $pointer = $(`[data-ui='pointer']`),
        $pointerWidth = $pointer.width() + 15, // 最后是手动K值, 也要加板面移动的值
        $pad = $(`[data-ui='pad']`),
        joystick = new Hammer($pad[0]),
        calcCoords = (angle, distance, width) => {
            const
                dis = Math.min(distance, width),
                rads = (angle * Math.PI) / 180.0,
                x = dis * Math.cos(rads),
                y = dis * Math.sin(rads)
            return { x, y }
        },
        getDir8 = angle => {
            if ((typeof (angle) != 'number') || (angle > 180) || (angle < -180)) {
                return '错误'
            }
            let dir = ''
            if ((angle >= -22) && (angle < 22)) {
                dir = '正右'
            } else if ((angle >= 23) && (angle < 68)) {
                dir = '右下'
            } else if ((angle >= 69) && (angle < 112)) {
                dir = '正下'
            } else if ((angle >= 113) && (angle < 158)) {
                dir = '左下'
            } else if ((angle >= 158) || (angle < -158)) {
                dir = '正左'
            } else if ((angle >= -158) && (angle < -113)) {
                dir = '左上'
            } else if ((angle >= -112) && (angle < -69)) {
                dir = '正上'
            } else if ((angle >= -68) && (angle < 22)) {
                dir = '右上'
            }
            return dir
        },
        getDir2 = angle => {
            if ((typeof (angle) != 'number') || (angle > 180) || (angle < -180)) {
                return '错误'
            }
            let dir = ''
            if ((angle <= 0) && (angle > -180)) {
                dir = '上'
            } else if ((angle > 0) && (angle <= 180)) {
                dir = '下'
            }
            return dir
        }
    joystick.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    joystick.on('panmove', ev => {
        const { x, y } = calcCoords(ev.angle, ev.distance, $pointerWidth)
        gsap.set($pointer[0], { x, y })
        ctrlState.dir = getDir8(ev.angle)
        // 移动方向控制板面
        switch (ctrlState.dir) {
            case '正右':
                gsap.set($pad[0], { x: 5, y: 0 })
                break
            case '右下':
                gsap.set($pad[0], { x: 4, y: 4 })
                break
            case '正下':
                gsap.set($pad[0], { x: 0, y: 5 })
                break
            case '左下':
                gsap.set($pad[0], { x: -4, y: 4 })
                break
            case '正左':
                gsap.set($pad[0], { x: -5, y: 0 })
                break
            case '左上':
                gsap.set($pad[0], { x: -4, y: -4 })
                break
            case '正上':
                gsap.set($pad[0], { x: 0, y: -5 })
                break
            case '右上':
                gsap.set($pad[0], { x: 4, y: -4 })
                break
        }
    })
    joystick.on('panend', () => {
        // 回弹
        gsap.to($pointer[0], {
            x: 0,
            y: 0,
            duration: .4,
            ease: 'elastic.out',
        })
        // 回复基础状态
        gsap.set($pad[0], { rotationX: 0, rotationY: 0, x: 0, y: 0 })
        ctrlState.dir = '零位'
    })
    // 上下摇杆
    const
        $pointer2 = $(`[data-ui='pointer2']`),
        $pointer2Width = $pointer2.width() + 6,
        $pad2 = $(`[data-ui='slideBg']`),
        joystick2 = new Hammer($pad2[0])
    joystick2.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    joystick2.on('panmove', ev => {
        const { y } = calcCoords(ev.angle, ev.distance, $pointer2Width)
        gsap.set($pointer2[0], { y })
        // 移动方向控制板面
        const dir = getDir2(ev.angle)
        switch (dir) {
            case '上':
                {
                    const speed = camera._computeLocalCameraSpeed() * .2
                    camera._localDirection.copyFromFloats(0, speed, 0)
                }
                break
            case '下':
                {
                    const speed = camera._computeLocalCameraSpeed() * -.2
                    camera._localDirection.copyFromFloats(0, speed, 0)
                }
                break
        }
        camera.getViewMatrix().invertToRef(camera._cameraTransformMatrix)
        BABYLON.Vector3.TransformNormalToRef(camera._localDirection, camera._cameraTransformMatrix, camera._transformedDirection)
        camera.cameraDirection.addInPlace(camera._transformedDirection)
    })
    joystick2.on('panend', () => {
        // 回弹
        gsap.to($pointer2[0], {
            y: 0,
            duration: .3,
            ease: 'elastic.out',
        })
    })
    // UI换材质
    $('[data-con]').on('tap', '[data-mat]', function () {
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
        }
        const
            mat = Number($(this).attr('data-mat')),
            sel = $(`[data-ui='selector']`).children(),
            idx = $(this).index();
        [1, 2, 3, 4, 5, 6, 7].filter(num => {
            return mat != num
        }).forEach((num, i) => {
            sel.eq(i).attr('data-mat', num)
        })
        $(`[data-ui='sl']`)
            .add(`[data-ui='selector']`)
            .attr('data-pos', idx + 1)
            .removeClass('hide')
    })
    $(`[data-ui='selector']`).on('tap', '[data-mat]', function () {
        if (timer !== null) {
            clearTimeout(timer)
            timer = null
        }
        btn.play() // 音效
        const
            mat = $(this).attr('data-mat'),
            who = $(`[data-ui='selector']`).attr('data-pos'),
            idx = Number(who) - 1
        $('[data-con]').children(`:eq(${idx})`).attr('data-mat', mat)
        $(`[data-ui='selector']`).add(`[data-ui='sl']`).addClass('hide')
        scene.getMeshById(`z${who}`).material = scene.getMaterialById(`Mat${mat}`)
        // 展开后5秒收起
        timer = setTimeout(() => {
            const
                ll = $(`[data-ui='ll']`),
                sl = $(`[data-ui='sl']`),
                con = $(`[data-con]`),
                sel = $(`[data-ui='selector']`),
                mat = $(`[data-ui='btnMat']`),
                info = $(`[data-ui='btnInfo']`)
            if (!ll.hasClass('hide')) {
                ll.add(sl).add(con).add(sel).addClass('hide')
                mat.add(info).removeClass('hide')
                timer = null
            }
        }, 5000)
    })
    $(`[data-ui='btnMat']`).on('tap', () => {
        $(`[data-ui='ll']`).add('[data-con]').removeClass('hide')
        $(`[data-ui='btnMat']`).add(`[data-ui='btnInfo']`).addClass('hide')
        btn.play() // 音效
        // 展开后5秒收起
        timer = setTimeout(() => {
            const
                ll = $(`[data-ui='ll']`),
                sl = $(`[data-ui='sl']`),
                con = $(`[data-con]`),
                sel = $(`[data-ui='selector']`),
                mat = $(`[data-ui='btnMat']`),
                info = $(`[data-ui='btnInfo']`)
            if (!ll.hasClass('hide')) {
                ll.add(sl).add(con).add(sel).addClass('hide')
                mat.add(info).removeClass('hide')
                timer = null
            }
        }, 5000)
    })
    // 换材质UI直接收起
    $pad.add($pad2).on('pointerdown', () => {
        const
            ll = $(`[data-ui='ll']`),
            sl = $(`[data-ui='sl']`),
            con = $(`[data-con]`),
            sel = $(`[data-ui='selector']`),
            mat = $(`[data-ui='btnMat']`),
            info = $(`[data-ui='btnInfo']`)
        if (!ll.hasClass('hide')) {
            ll.add(sl).add(con).add(sel).addClass('hide')
            mat.add(info).removeClass('hide')
            timer = null
        }
    })
    // 场景漫反射
    scene.environmentTexture = new BABYLON.CubeTexture('assets/scene.env')
    scene.environmentIntensity = 1.5
    scene.environmentTexture.level = 1.0
    scene.environmentTexture.rotationY = 4.2
    // 预加载
    const assetsManager = new BABYLON.AssetsManager(scene)
    assetsManager.useDefaultLoadingScreen = false
    assetsManager.onFinish = () => {
        // Loading表针动画
        gsap.to(`[data-loader='pointer']`, {
            duration: 1.8,
            ease: 'elastic',
            rotation: '+=55',
            onComplete: () => {
                // 直接拉起主循环
                engine.runRenderLoop(() => {
                    scene.render()
                })
            },
        })
    }
    // 场景模型
    assetsManager
        .addMeshTask(null, null, 'assets/', 'scene.3.glb')
        .onSuccess = task => {
            // 基本处理
            const mainScene = task.loadedMeshes[0]
            mainScene.name = 'Main'
            // 通用处理
            task.loadedMeshes.forEach(mesh => {
                mesh.isPickable = false
                if (mesh.name == 'Col.Out') {
                    mesh.visibility = 0
                }
            })
            // 加碰撞
            task.loadedTransformNodes.forEach(tf => {
                if (tf.name == 'Collision') {
                    tf.getChildren().forEach(mesh => {
                        mesh.checkCollisions = true
                    })
                }
            })
            // 材质微调
            const mat1 = scene.getMaterialByName('Green').subSurface
            mat1.isRefractionEnabled = true
            mat1.indexOfRefraction = 1.2
            const mat2 = scene.getMaterialByName('Silver').sheen
            mat2.isEnabled = true
            mat2.color = BABYLON.Color3.FromHexString('#00FA00')
            mat2.albedoScaling = false
        }
    // 加载资源
    assetsManager.load()
    // Done.
    return scene
})()

window.addEventListener('resize', () => {
    engine.resize(true)
})
