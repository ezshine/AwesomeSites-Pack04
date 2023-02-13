;
window.IGC = window.IGC || {};
window.IGC.Peerius = (function() {
    "use strict";
    var peeriusNotificationUrl = null,
        peeriusClientName = null,
        baseUrl = '';
    function init(data) {
        peeriusNotificationUrl = data.peeriusNotificationUrl;
        peeriusClientName = data.peeriusClientName;
        console.log('Peerius: ', data.peeriusRecommendations);
    }
    function initBaseUrl(url) {
        baseUrl = url;
    }
    function smartRecsSendClick(recommendationId) {
        if(window.Peerius) {
            console.log('Peerius: Send Click, staying on the same page',recommendationId);
            Peerius.smartRecsSendClick(recommendationId);
        }
    }
    function smartRecsClick(recommendationId) {
        if(window.Peerius){
            console.log('Peerius: Clicked, going to another page', recommendationId);
            Peerius.smartRecsClick(recommendationId);
        }
    }
    function sendAjax(recommendationIds) {
        if (recommendationIds.length > 0) {
            console.log('Peerius: Shown recommendations', recommendationIds);
            Peerius.sendAjax(peeriusNotificationUrl + "?ids=" + recommendationIds.join());
        }
    }
    function sendBasketUpdate(basket) {
        var encodedBasket = window.encodeURIComponent(JSON.stringify(basket));
        if(window.Peerius && peeriusClientName){
            console.log('Peerius: Updated basket has been sent', basket);
            Peerius.sendAjax(peeriusClientName + "/basket/add.pagex?basket=" + encodedBasket);
        }
    }

    function getAjaxUrl(cmsApiUrl) {
        return baseUrl + cmsApiUrl;
    }

    return {
        init: init,
        initBaseUrl: initBaseUrl,
        smartRecsSendClick: smartRecsSendClick,
        smartRecsClick: smartRecsClick,
        sendAjax: sendAjax,
        sendBasketUpdate: sendBasketUpdate,
        getAjaxUrl: getAjaxUrl
    };
}());