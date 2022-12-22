pc.script.createLoadingScreen(function (app) {
    app.on('preload:end', function () {
        app.off('preload:progress');
    });

    app.on('preload:progress', function (value) {
        value = Math.min(1, Math.max(0, value));
        window.sendDataToH5({ type: 'progress', value: Math.floor(value * 10) });
    });

    app.on('startGame', function () {
        console.log("startGame")
        window.sendDataToH5({ type: 'startGame' });
    });

    app.on('initFinish', function () {
        //判断人物角色
        console.log("initFinish");
        window.sendDataToH5({ type: 'initFinish' });
    });
});