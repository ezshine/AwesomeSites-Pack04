new Phaser.Game({
    type: Phaser.WEBGL,
    canvas: $('canvas')[0],
    canvasStyle: 'overflow:hidden;',
    banner: false,
    scale: {
        width: 750,
        height: 1500,
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: {
        keyboard: false,
        mouse: false,
        windowEvents: false,
    },
    plugins: {
        scene: [
            {
                key: 'rexGestures',
                plugin: rexgesturesplugin,
                mapping: 'rexGestures',
            },
        ],
    },
    loader: {
        crossOrigin: 'anonymous',
        maxParallelDownloads: 5,
    },
    render: {
        transparent: true,
    },
    scene: [ loader, game ],
})
