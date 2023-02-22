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
const mainScene = (() => {
    // 初始化场景
    const scene = new BABYLON.Scene(engine)
    scene.clearColor = BABYLON.Color4.FromHexString('#00000000')
    // 场景相机
    const camera = new BABYLON.ArcRotateCamera('MAIN', 1.7, 1.1, 4.5, BABYLON.Vector3.Zero(), scene)
    camera.lockedTarget = BABYLON.Vector3.Zero()
    camera.attachControl(true)
    camera.minZ = .1
    // 横竖屏分别使用不同的相机参数
    if (window.innerWidth > window.innerHeight) {
        camera.radius = 2.8
        camera.lowerRadiusLimit = 2.5
        camera.upperRadiusLimit = 3.5
    } else {
        camera.radius = 5.5
        camera.lowerRadiusLimit = 4
        camera.upperRadiusLimit = 6
    }
    // 场景开始渲染后
    scene.onAfterRenderObservable.addOnce(() => {
        $('[data-loader]').addClass('hide')
        $(`[data-ui='hello']`).fadeIn(550)
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
    // 场景漫反射
    scene.environmentTexture = new BABYLON.CubeTexture('assets/scene.env')
    scene.environmentIntensity = 1.1
    scene.environmentTexture.level = 1
    // 信息弹窗触发Mesh
    const pointerMat = new BABYLON.StandardMaterial('pointer', scene)
    pointerMat.diffuseTexture = new BABYLON.Texture('assets/ui/pointer.png', scene)
    pointerMat.diffuseTexture.hasAlpha = true
    pointerMat.useAlphaFromDiffuseTexture = true
    pointerMat.disableLighting = true
    pointerMat.emissiveColor = BABYLON.Color3.White()
    pointerMat.alpha = 0
    const posPointer = [
        new BABYLON.Vector3(.44, -.454, .929),
        new BABYLON.Vector3(.564, .91, -.092),
        new BABYLON.Vector3(-.357, .59, .036),
    ];
    [1, 2, 3].forEach(who => {
        const pointer = BABYLON.MeshBuilder.CreatePlane(`pointer${who}`, {
            size: .1,
        }, scene)
        pointer.position = posPointer[who - 1]
        pointer.scaling = new BABYLON.Vector3(1.1, 1.1, 1)
        pointer.material = pointerMat
        pointer.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL
    })
    scene.onPointerPick = (evt, pickInfo) => {
        if (pickInfo.hit && pickInfo.pickedMesh) {
            const 
                meshName = pickInfo.pickedMesh.name,
                exp = /^pointer\d$/
            if (exp.test(meshName) && !locked) {
                locked = true
                eff.play() // 音效
                const num = meshName[7]
                $(`[data-info=${num}]`).removeClass('hide')
                $(`[data-modal='info']`).fadeIn(200, () => {
                    locked = false
                })
            }
        }
    }
    // 动画处理
    scene.onBeforeRenderObservable.addOnce(() => {
        gsap.fromTo(pointerMat, {
            alpha: 0
        }, {
            alpha: 1,
            delay: 1.4,
            duration: .65,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
        })
    })
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
        .addMeshTask(null, null, 'assets/', 'scene.glb')
        .onSuccess = task => {
            // 通用处理
            task.loadedMeshes.forEach((mesh, i) => {
                if (0 == i) {
                    mesh.name = 'Home'
                    const cot = new BABYLON.TransformNode('scene_cot')
                    cot.position.set(0, -1, 0)
                    mesh.parent = cot
                }
                mesh.isPickable = false
            })
        }
    // 加载资源
    assetsManager.load()
    // Done.
    return scene
})()

window.addEventListener('resize', () => {
    engine.resize(true)
    // 横竖屏调整时对相机做微调
    if (mainScene.isReady()) {
        const camera = mainScene.cameras[0]
        if (window.innerWidth > window.innerHeight) { // 横屏
            camera.radius = 2.8
            camera.lowerRadiusLimit = 2.5
            camera.upperRadiusLimit = 3.5
        } else {
            camera.radius = 5.5
            camera.lowerRadiusLimit = 4
            camera.upperRadiusLimit = 6
        }
    }
})