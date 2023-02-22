; (function () {
    if (location.host.search('192.168.') === -1) {
        const $Share = {
            title: 'AF1 HOTEL ｜ 创想集结',
            desc: '耐克线上创意空间，邀您即刻探游',
            link: `https://af1hotel.koikreative.com/home/`,
            imgUrl: 'https://af1hotel.koikreative.com/home/share.1.png'
        }
        const checkParams = new URLSearchParams({
            module: 'wxConfig',
            url: window.location.href.split('#')[0],
            dataType: 'script'
        })
        const script = document.createElement('script')
        script.async = 'async'
        script.src = `https://af1hotel.koikreative.com/weixin/api.php?${checkParams.toString()}`
        script.onload = function () {
            const data = {
                debug: false,
                appId: ticket['appId'],
                timestamp: ticket['timestamp'],
                nonceStr: ticket['nonceStr'],
                signature: ticket['signature'],
                jsApiList: [
                    'updateAppMessageShareData',
                    'updateTimelineShareData'
                ],
            }
            wx.config(data)
            wx.ready(function () {
                wx.updateAppMessageShareData({ ...$Share })
                wx.updateTimelineShareData({ ...$Share })
            })
            wx.error(function (res) {
                console.error(JSON.stringify(res))
            })
        }
        document.getElementsByTagName('head')[0].appendChild(script)
    }
})();
