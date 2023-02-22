// 页面浮层
$(`[data-ui='btnStart']`).on('pointerdown', () => {
    $(`[data-ui='hello']`).fadeOut(600, () => {
        $(`[data-ui='hello']`).remove()
    })
})
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
// 动画锁及镜头号
let
    jumpAniLock = false,
    camNum = 0
// 镜头转移动画
const gotoNextCam = (cam, config) => {
    const animGroup = new BABYLON.AnimationGroup('aniCamGrp')
    const easingFunc = new BABYLON.PowerEase(3)
    easingFunc.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT)
    const animTemp = new BABYLON.Animation('camAniPos', 'position', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    animTemp.setEasingFunction(easingFunc)
    animTemp.setKeys([
        {
            frame: 0,
            value: cam.position,
        },
        {
            frame: 100,
            value: config.position,
        }
    ])
    animGroup.addTargetedAnimation(animTemp, cam)
    if (config.target) {
        const animTemp2 = new BABYLON.Animation('camAniTar', 'target', 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
        animTemp2.setEasingFunction(easingFunc)
        animTemp2.setKeys([
            {
                frame: 0,
                value: cam.target,
            },
            {
                frame: 100,
                value: config.target,
            }
        ])
        animGroup.addTargetedAnimation(animTemp2, cam)
    }
    animGroup.normalize(0, 100)
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
// 固定的观看位
const posLib = [
    {
        position: new BABYLON.Vector3(2.4, 1.08, .82),
        target: new BABYLON.Vector3(3.322, 1.13, .44),
        speedRatio: .5,
    },
    {
        position: new BABYLON.Vector3(-1.138, .286, -.938),
        target: new BABYLON.Vector3(-.707, .094, -1.819),
        speedRatio: .5,
    },
    {
        position: new BABYLON.Vector3(.679, .69, -2.744),
        target: new BABYLON.Vector3(-.17, .446, -2.277),
        speedRatio: .5,
    },
    {
        position: new BABYLON.Vector3(1.334, 1.341, -2.474),
        target: new BABYLON.Vector3(2.268, 1.287, -2.122),
        speedRatio: .5,
    },
]
// 更换屏幕材质
const changeScreenMat = scene => {
    const time = gsap.utils.random(.4, .8, .1)
    gsap.delayedCall(time, () => {
        const
            whichMat = gsap.utils.random(['1', '11', '2', '22', '3', '33', '4', '44'], true),
            whichMesh = gsap.utils.random(['Screen1', 'Screen2', 'Screen3', 'Screen4', 'S.Screen1', 'S.Screen2', 'S.Screen3', 'S.Screen4'])
        if (/^Screen[1-4]$/.test(whichMesh)) {
            scene.getMeshById(whichMesh).material = scene.getMaterialById(whichMat())
        } else if (/^S\.Screen[1-4]$/.test(whichMesh)) {
            const meshes = scene.getTransformNodeById(whichMesh).getChildMeshes()
            meshes.forEach(mesh => {
                mesh.material = scene.getMaterialById(whichMat())
            })
        }
        // 继续
        changeScreenMat(scene)
    })
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
// 主场景
const mainScene = (() => {
    // 初始化场景
    const scene = new BABYLON.Scene(engine)
    // 场景相机
    const camera = new BABYLON.FreeCamera('main', new BABYLON.Vector3(-7.29, 1.743, 7.923), scene)
    camera.setTarget(new BABYLON.Vector3(-1.37, .806, 1.547))
    camera.attachControl(true)
    camera.minZ = .01
    if (window.innerWidth > window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .8
    } else {
        engine.scenes[0].cameras[0].fov = 1.4
    }
    // 相机切换按钮
    $(`[data-ui='btnPlay']`).on('tap', () => {
        if (!jumpAniLock) {
            btn.play() // 音效
            switch (camNum) {
                case 0:
                case 1:
                case 2:
                    gotoNextCam(camera, posLib[camNum++])
                    break
                case 3:
                    gotoNextCam(camera, posLib[camNum])
                    camNum = 0
                    break
            }
        }
    })
    // 场景开始渲染后
    scene.onAfterRenderObservable.addOnce(() => {
        // 隐藏掉Loading界面
        $('[data-loader]').addClass('hide')
        // 推镜头入场
        gotoNextCam(camera, {
            speedRatio: .6,
            position: new BABYLON.Vector3(-2.046, .913, 2.275),
            onStart: function () {
                // 模态框需要一个放大的效果
                gsap.fromTo(`[data-ui='hello']`, {
                    opacity: 0,
                    scale: 0,
                }, {
                    opacity: 1,
                    scale: 1,
                    delay: .3,
                    duration: .7,
                    ease: 'power1.out',
                    onStart() {
                        $(`[data-ui='hello']`).show()
                    },
                })
            },
        })
        // 控制台打扫
        console.clear()
        // 启动无穷换
        changeScreenMat(scene)
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
    camera.inertia = .75
    const ctrlState = {
        dir: '零位',
        pointerX: 0,
        pointerY: 0,
    }
    // 触控板
    scene.onBeforeRenderObservable.add(() => {
        const speed = camera._computeLocalCameraSpeed()
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
            ease: 'elastic.out(1, 0.2)',
        })
    })
    // 相机碰撞
    camera.ellipsoid = new BABYLON.Vector3(.01, .01, .01)
    camera.checkCollisions = true
    // 场景漫反射
    scene.environmentTexture = new BABYLON.CubeTexture('assets/scene.env')
    scene.environmentIntensity = 1.25
    scene.environmentTexture.level = 1.32
    scene.environmentTexture.rotationY = 4.9
    // ToneMapping & Bloom
    const pipeline = new BABYLON.DefaultRenderingPipeline('rendering', true, scene)
    pipeline.fxaaEnabled = true
    pipeline.imageProcessing.toneMappingEnabled = true
    pipeline.imageProcessing.contrast = 1.0
    pipeline.imageProcessing.exposure = 1.0
    pipeline.bloomEnabled = true
    pipeline.bloomThreshold = 1.8
    pipeline.bloomWeight = .15
    pipeline.bloomKernel = 64
    pipeline.bloomScale = .5
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
        .addMeshTask(null, null, 'assets/', 'scene.2.glb')
        .onSuccess = task => {
            // 基本处理
            const mainScene = task.loadedMeshes[0]
            mainScene.name = 'Main'
            task.loadedMeshes.forEach(mesh => {
                mesh.isPickable = false
            })
            // 处理碰撞
            task.loadedTransformNodes.forEach(tf => {
                if (tf.name == 'Col.Meshes') {
                    const meshes = tf.getChildren()
                    meshes.forEach(mesh => {
                        mesh.checkCollisions = true
                    })
                }
            })
            const outMesh = scene.getMeshById('Col.OutSphere')
            outMesh.checkCollisions = true
            outMesh.visibility = 0
            // 绿屏小动画
            const matGrn = scene.getMaterialByName('Emissive Green ')
            gsap.to(matGrn, {
                alpha: .2,
                duration: 2,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true,
            })
        }
    // 加载资源
    assetsManager.load()
    // Done.
    return scene
})()
window.addEventListener('resize', () => {
    engine.resize(true)
    if (window.innerWidth > window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .8
    } else if (window.innerWidth < window.innerHeight) {
        engine.scenes[0].cameras[0].fov = 1.4
    }
})
