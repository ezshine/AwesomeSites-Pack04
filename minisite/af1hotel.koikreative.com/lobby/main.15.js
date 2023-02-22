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
// 动画锁
let jumpAniLock = false
// 镜头转移动画
const gotoNextCam = (cam, config) => {
    const animGroup = new BABYLON.AnimationGroup('aniCamGrp')
    const easingFunc = new BABYLON.PowerEase(3)
    easingFunc.setEasingMode(config.fast ? BABYLON.EasingFunction.EASINGMODE_EASEINOUT : BABYLON.EasingFunction.EASINGMODE_EASEOUT)
    const animTemp01 = new BABYLON.Animation('camAniTar', 'target', (config.fast ? 60 : 30), BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    animTemp01.setEasingFunction(easingFunc)
    animTemp01.setKeys([
        {
            frame: 0,
            value: cam.target,
        },
        {
            frame: 100,
            value: config.target,
        }
    ])
    const animTemp02 = new BABYLON.Animation('camAniPos', 'position', (config.fast ? 60 : 30), BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)
    animTemp02.setEasingFunction(easingFunc)
    animTemp02.setKeys([
        {
            frame: 0,
            value: cam.position,
        },
        {
            frame: 100,
            value: config.position,
        }
    ])
    animGroup.addTargetedAnimation(animTemp01, cam)
    animGroup.addTargetedAnimation(animTemp02, cam)
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
const posLib = [
    {
        target: new BABYLON.Vector3(-.043, .0767, .113),
        position: new BABYLON.Vector3(-.558, .255, -.816),
    }, // 0:场景起始点
    {
        target: new BABYLON.Vector3(.049, .029, 1.049),
        position: new BABYLON.Vector3(-.033, .008, -.025),
        speedRatio: .7,
    }, // 1:相机交互起始点
    {
        target: new BABYLON.Vector3(1.08, .156, -.393),
        position: new BABYLON.Vector3(.097, .001, -.493),
        fast: true,
    }, // 2:1️⃣Intro
    {
        target: new BABYLON.Vector3(-1.32, 1.174, -1.462),
        position: new BABYLON.Vector3(-.694, .831, -.766),
        speedRatio: .6,
        fast: true,
    }, // 3:2️⃣Drake
    {
        target: new BABYLON.Vector3(-1.745, 1.344, .617),
        position: new BABYLON.Vector3(-.334, .48, -.354),
        speedRatio: .7,
        fast: true,
    }, // 4:3️⃣Billie Eilish
    {
        target: new BABYLON.Vector3(.823, .099, 2.117),
        position: new BABYLON.Vector3(.182, .207, .313),
    }, // 5:4️⃣Yoon
    {
        target: new BABYLON.Vector3(-.519, .248, -1.891),
        position: new BABYLON.Vector3(-.013, .201, -.042),
        fast: true,
    }, // 6:5️⃣Yu Jiayun
    {
        target: new BABYLON.Vector3(-1.053, .372, -2.455),
        position: new BABYLON.Vector3(-.769, .248, -.562),
        fast: true,
    }, // 7:6️⃣Howie Lee
    {
        target: new BABYLON.Vector3(.869, 1.233, -1.699),
        position: new BABYLON.Vector3(-.59, .49, -.7),
        speedRatio: .7,
        fast: true,
    }, // 8:7️⃣THOME
    {
        target: new BABYLON.Vector3(-2.172, .534, -.267),
        position: new BABYLON.Vector3(-.284, .196, -.226),
    }, // 9:8️⃣SCRY
    {
        target: new BABYLON.Vector3(-1.492, 1.136, .003),
        position: new BABYLON.Vector3(.117, .102, .148),
        fast: true,
    }, // 10:9️⃣Pronounce
    {
        target: new BABYLON.Vector3(.136, .496, 2.242),
        position: new BABYLON.Vector3(-.008, -.003, .396),
        fast: true,
    }, // 11:🔟Female
]
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
    const camera = new BABYLON.FreeCamera('Main', BABYLON.Vector3.Zero(), scene)
    camera.attachControl(true)
    camera.fov = 1.1
    camera.minZ = .001
    if (window.innerWidth > window.innerHeight) {
        camera.fov = 1
    } else if (window.innerWidth < window.innerHeight) {
        camera.fov = 1.3
    }
    // 进入后置于场景起始点
    camera.position = posLib[0].position
    camera.target = posLib[0].target
    // 点击按钮后出现的 Glitch Shader
    const stoneTimer = { t: 0.0, i: .01 }
    const glitcher = `
        #define AMT 1.35
        uniform float time;
        uniform vec2 resolution;
        uniform sampler2D textureSampler;
        float random2d(vec2 n) {
            return fract(sin(dot(n,vec2(12.9898,4.1414)))*43758.5453);
        }
        float randomRange (in vec2 seed,in float min,in float max) {
            return min+random2d(seed)*(max-min);
        }
        float insideRange(float v,float bottom,float top) {
            return step(bottom,v)-step(top,v);
        }
        void main(void) {
            float speed=.5;//.018*(sin(time)+cos(time));
            float iTime=floor(time*speed*60.);
            vec2 uv=gl_FragCoord.xy/resolution.xy;
            vec3 outCol=texture2D(textureSampler,uv).rgb;
            float maxOffset=AMT/1.8;
            for (float i=0.0;i<10.0*AMT;i+=1.0) {
                float sliceY=random2d(vec2(iTime,1000.+float(i)));
                float sliceH=random2d(vec2(iTime,2345.+float(i)))*.023;
                float hOffset=randomRange(vec2(iTime,4000.+float(i)),-maxOffset,maxOffset);
                vec2 uvOff = uv;
                uvOff.x += hOffset * .25;
                if (insideRange(uv.y,sliceY,fract(sliceY+sliceH))==1.0){
                    outCol=texture2D(textureSampler,uvOff).rgb;
                }
            }
            float maxColOffset=AMT/100.;
            vec2 colOffset=vec2(randomRange(vec2(iTime,800.),-maxColOffset,maxColOffset),
                randomRange(vec2(iTime,800.),-maxColOffset,maxColOffset));
            gl_FragColor=vec4(outCol,1.);
        }
    `
    BABYLON.Effect.ShadersStore['glitcherEffectFragmentShader'] = glitcher
    const glitcherEffect = new BABYLON.PostProcess(
        'glitcherEffect',
        'glitcherEffect',
        ['time', 'resolution'],
        ['textureSampler'],
        1.0,
        camera
    )
    glitcherEffect.onApplyObservable.add(effect => {
        stoneTimer.t += stoneTimer.i
        effect.setVector2('resolution', new BABYLON.Vector2(glitcherEffect.width, glitcherEffect.height))
        effect.setFloat('time', stoneTimer.t)
    })
    camera.detachPostProcess(glitcherEffect)
    // 场景开始渲染后
    scene.onAfterRenderObservable.addOnce(() => {
        // 隐藏掉Loading界面
        $('[data-loader]').addClass('hide')
        if ($From == '') {
            // 推镜头入场
            gotoNextCam(camera, {
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
                ...posLib[1]
            })
        } else {
            switch ($From) {
                case 'drake':
                    camera.position = posLib[3].position
                    camera.target = posLib[3].target
                    break
                case 'billieeilish':
                    camera.position = posLib[4].position
                    camera.target = posLib[4].target
                    break
                case 'ambush':
                    camera.position = posLib[5].position
                    camera.target = posLib[5].target
                    break
                case 'yujiayun':
                    camera.position = posLib[6].position
                    camera.target = posLib[6].target
                    break
                case 'howielee':
                    camera.position = posLib[7].position
                    camera.target = posLib[7].target
                    break
                case 'thome':
                    camera.position = posLib[8].position
                    camera.target = posLib[8].target
                    break
                case 'scry':
                    camera.position = posLib[9].position
                    camera.target = posLib[9].target
                    break
                case 'pronounce':
                    camera.position = posLib[10].position
                    camera.target = posLib[10].target
                    break
                case 'herroom':
                    camera.position = posLib[11].position
                    camera.target = posLib[11].target
                    break
            }
        }
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
    camera.speed = .035
    camera.inertia = .75
    const ctrlState = {
        dir: '零位',
        pointerX: 0,
        pointerY: 0,
    }
    // 触控板
    scene.onBeforeRenderObservable.add(() => {
        const speed = camera._computeLocalCameraSpeed() * .215
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
    // 切换相机
    let currRoom = 1
    switch ($From) {
        case 'drake':
            currRoom = 2
            break
        case 'billieeilish':
            currRoom = 3
            break
        case 'ambush':
            currRoom = 4
            break
        case 'yujiayun':
            currRoom = 5
            break
        case 'howielee':
            currRoom = 6
            break
        case 'thome':
            currRoom = 7
            break
        case 'scry':
            currRoom = 8
            break
        case 'pronounce':
            currRoom = 9
            break
        case 'herroom':
            currRoom = 10
            break
    }
    const
        $btnCam = $(`[data-ui='btnCam']`),
        switchCam = new Hammer($btnCam[0])
    switchCam.on('tap', () => {
        if (!jumpAniLock) {
            jumpAniLock = true
            btn.play() // 音效
            gotoNextCam(camera, posLib[currRoom + 1])
            if (currRoom == 10) {
                currRoom = 1
            } else {
                currRoom += 1
            }
        }
    })
    // 点击屏幕聚焦相机或跳转
    scene.onPointerPick = (evt, pickInfo) => {
        if (pickInfo.hit && pickInfo.pickedMesh && !jumpAniLock) {
            const
                meshName = pickInfo.pickedMesh.name,
                r1 = /^Screen\s(\d{1,2})$/,
                r2 = /^Enter(\d{1,2})$/,
                isScreen = r1.exec(meshName),
                isEnter = r2.exec(meshName)
            if (isScreen) {
                const who = isScreen[1]
                gotoNextCam(camera, posLib[Number(who) + 1])
            } else if (isEnter) {
                door.play() // 音效
                // 跳转动效
                const tl = gsap.timeline({
                    defaults: {
                        duration: 1.3,
                        ease: 'power2.in', // 加了一点点曲线调剂
                    },
                    onStart() {
                        $('canvas').add('main').css('pointerEvents', 'none') // 解除交互事件
                        // camera.attachPostProcess(glitcherEffect) // 全屏 Glitch 效果
                    },
                    onComplete() { // 完成后跳转
                        const who = Number(isEnter[1])
                        switch (who) {
                            case 2:
                                location.replace('/drake/')
                                break
                            case 3:
                                location.replace('/billieeilish/')
                                break
                            case 4:
                                location.replace('/ambush/')
                                break
                            case 5:
                                location.replace('/yujiayun/')
                                break
                            case 6:
                                location.replace('/howielee/')
                                break
                            case 7:
                                location.replace('/thome/')
                                break
                            case 8:
                                location.replace('/scry/')
                                break
                            case 9:
                                location.replace('/pronounce/')
                                break
                            case 10:
                                location.replace('/herroom/')
                                break
                        }
                    }
                })
                tl.to(camera, { fov: 0 }) // 先推镜头
                tl.to('main', { backgroundColor: 'black' }, '<') // 同时眼前一黑
            }
        }
    }
    // 相机碰撞
    camera.ellipsoid = new BABYLON.Vector3(.001, .001, .001)
    camera.checkCollisions = true
    // 场景漫反射
    scene.environmentTexture = new BABYLON.CubeTexture('assets/scene.1.env')
    scene.environmentIntensity = 1.0
    scene.environmentTexture.level = 1.0
    scene.environmentTexture.rotationY = 4.6
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
        .addMeshTask(null, null, 'assets/', 'scene.6.glb')
        .onSuccess = task => {
            // 基本处理
            const mainScene = task.loadedMeshes[0]
            mainScene.name = 'Main'
            // 通用处理
            task.loadedMeshes.forEach(mesh => {
                if (!/^Screen\s\d{1,2}$/.test(mesh.name) && !/^Enter\d{1,2}$/.test(mesh.name)) {
                    mesh.isPickable = false
                }
                switch (mesh.name) {
                    case 'Enter2':
                        mesh.position.set(1.657, .924, -.011)
                        break
                    case 'Enter3':
                        mesh.position.set(.385, .698, .562)
                        break
                    case 'Enter4':
                        mesh.position.set(-.882, .057, .113)
                        break
                    case 'Enter7':
                        mesh.position.set(.681, .661, -.758)
                        break
                }
            })
            task.loadedTransformNodes.forEach(tf => {
                if (tf.name == 'Collisions') {
                    const meshes = tf.getChildren()
                    meshes.forEach(mesh => {
                        // 加碰撞
                        mesh.checkCollisions = true
                    })
                } else if (tf.name == 'Screen.enter') {
                    const meshes = tf.getChildren()
                    meshes.forEach(mesh => {
                        // 按钮消隐
                        mesh.addLODLevel(.685, null)
                    })
                }
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
        engine.scenes[0].cameras[0].fov = 1
    } else if (window.innerWidth < window.innerHeight) {
        engine.scenes[0].cameras[0].fov = 1.3
    }
})
