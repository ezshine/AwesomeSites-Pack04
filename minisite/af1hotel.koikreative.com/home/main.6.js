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
// 初始化引擎
const
    canvas = document.querySelector('canvas'),
    engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        doNotHandleContextLost: true,
        stencil: true,
        audioEngine: false,
    }, true)
// 滑动组件
const
    $tips = document.querySelector(`[data-ui='dragTips']`),
    $wrapper = document.querySelector(`[data-ui='dragBg']`)
const mainScene = (() => {
    // 初始化场景
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color4.FromHexString('#00000000')
    // 场景相机
    const camera = new BABYLON.ArcRotateCamera('MAIN', 0, 1.2, 9, BABYLON.Vector3.Zero(), scene)
    camera.lockedTarget = BABYLON.Vector3.Zero()
    camera.attachControl(true)
    camera.minZ = .1
    camera.lowerRadiusLimit = 5
    camera.upperRadiusLimit = 10
    if (window.innerWidth > window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .6
    } else if (window.innerWidth < window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .8
    }
    // 场景漫反射
    scene.environmentTexture = new BABYLON.CubeTexture('assets/scene.1.env')
    scene.environmentIntensity = 1.45
    scene.environmentTexture.level = 1.0
    scene.environmentTexture.rotationY = 3.48
    // 预加载
    const loader = document.querySelector('[data-loader]')
    const assetsManager = new BABYLON.AssetsManager(scene)
    assetsManager.useDefaultLoadingScreen = false
    {
        gsap.fromTo(`[data-loader='rect']`, {
            scaleX: 0,
        }, {
            scaleX: 1,
            duration: 1.8,
            ease: 'none',
        })
    }
    assetsManager.onFinish = () => {
        // 拉起主循环
        engine.runRenderLoop(function () {
            scene.render()
        })
        if (!loader.classList.contains('hide')) {
            gsap.to(`[data-loader='pointer']`, {
                duration: 1.8,
                ease: 'elastic',
                rotation: '+=55',
                onComplete: () => {
                    loader.classList.add('hide')
                    gsap.getById('开场').play()
                },
            })
        }
    }
    // 场景模型
    assetsManager
        .addMeshTask(null, null, 'assets/', 'scene.3.glb')
        .onSuccess = task => {
            // 通用处理
            task.loadedMeshes.forEach((mesh, i) => {
                if (0 == i) {
                    mesh.name = 'Home'
                    const cot = new BABYLON.TransformNode('scene_cot')
                    cot.position.set(-1.1, -3, .7)
                    if (window.innerWidth > window.innerHeight) {
                        cot.position.y = -2.5
                    } else if (window.innerWidth < window.innerHeight) {
                        cot.position.y = -3
                    }
                    mesh.parent = cot
                }
                mesh.isPickable = false
            })
            // 动画处理
            const ani = task.loadedAnimationGroups[0]
            ani.name = 'SceneAni'
            ani.pause()
            ani.goToFrame(0)
            // 绑定UI
            const draggable = Draggable.create($tips, {
                type: 'x',
                bounds: $wrapper,
                inertia: true,
                cursor: 'grab',
                activeCursor: 'grabbing',
                onMove: () => {
                    const
                        dragValue = ~~(draggable[0].x / draggable[0].maxX * 100),
                        ctrlValue = gsap.utils.mapRange(0, 100, 0, ani.to, dragValue) // 把原有数值映射到0-100区间
                    ani.goToFrame(ctrlValue)
                },
            })
            gsap.to($tips, {
                id: '开场',
                x: draggable[0].maxX,
                ease: 'none',
                duration: 2,
                delay: .4,
                paused: true,
                repeat: 1,
                yoyo: true,
                onUpdate() {
                    const
                        cur = ~~(this.progress() * 100),
                        val = gsap.utils.mapRange(0, 100, 0, ani.to, cur)
                    ani.goToFrame(val)
                },
                onStart() {
                    gsap.to(camera, {
                        alpha: BABYLON.Tools.ToRadians(150),
                        duration: 4,
                        ease: 'none',
                    })
                },
                onComplete() {
                    $('[data-mask]').remove()
                }
            })
        }
    // 加载资源
    assetsManager.load()
    // 调试阶段
    let debugShow = false
    scene.onKeyboardObservable.add(kbInfo => {
        if ((kbInfo.type == BABYLON.KeyboardEventTypes.KEYDOWN)
            && (kbInfo.event.key == '`')) {
            if (debugShow) {
                scene.debugLayer.hide()
            } else {
                scene.debugLayer.show()
            }
            debugShow = !debugShow
        }
    })
    // Done.
    return scene
})()

window.addEventListener('resize', () => {
    engine.resize(true)
    Draggable.get(`[data-ui='dragTips']`).update(true, true)
    if (window.innerWidth > window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .6
        engine.scenes[0].getTransformNodeById('scene_cot').position.y = -2.5
    } else if (window.innerWidth < window.innerHeight) {
        engine.scenes[0].cameras[0].fov = .8
        engine.scenes[0].getTransformNodeById('scene_cot').position.y = -3
    }
})