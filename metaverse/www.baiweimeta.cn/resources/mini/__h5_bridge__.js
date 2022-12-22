const bindHistoryEvent = function (type) {
    const historyEvent = history[type];
    return function () {
        const newEvent = historyEvent.apply(this, arguments);
        const e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return newEvent;
    };
};
history.pushState = bindHistoryEvent('pushState');

const injectScript = function () {
    let fragment = document.createDocumentFragment();
    let scriptUrlList = [
        '__start__.js',
        '__loading_h5__.js',
    ];
    scriptUrlList.forEach(url => {
        let script = document.createElement('script');
        script.src = url;
        script.async = false
        if (script.readyState) {   //IE
            script.onreadystatechange = function () {
                console.log('[bridge script onreadystatechange]', script.readyState, url)
            }
        } else {  //非IE
            script.onload = function () {
                console.log('[bridge script onload]', url)
            }
        }
        fragment.appendChild(script);
    })
    document.body.appendChild(fragment);
}

window.addEventListener('pushState', function (e) {
    const { target: window = {} } = e || {};
    console.log('[bridge change pushState]', window.location);
    if (window.location && window.location.hash && window.location.hash === '#/loading') {
        injectScript();
    }
});

if (window.location && window.location.hash && window.location.hash !== '#/loading') {
    injectScript();
}