;(function () {
    let $hash = ''
    if (location.host.search('192.168.') === -1) {
        const tester = window.location.href.match(/\/([a-zA-Z]{4,12})\//)
        if (tester !== null) {
            const who = tester[1]
            switch (who) {
                case 'home':
                    $hash = '756faf36c0788c13a90a24879d2fb761'
                    break
                case 'lobby':
                    $hash = 'cae5f390dc249074e177de2fa3a23a3c'
                    break
                case 'thome':
                    $hash = '5d49f948fa6a11c6e02e644d6fed236b'
                    break
                case 'howielee':
                    $hash = 'c297036a544bd03938d4b4aeb0f309ff'
                    break
                case 'yujiayun':
                    $hash = 'af42b7dd3ade4b567d940a99fe1f459b'
                    break
                case 'herroom':
                    $hash = 'f0f88061af7a384cab91c8a701b42664'
                    break
                case 'scry':
                    $hash = '625a616e04d8e3f740d601cc05edf992'
                    break
                case 'pronounce':
                    $hash = '8d2889e03ab09db6dccfea2b0f47e833'
                    break
                case 'drake':
                    $hash = '50b94c8c2e4aae50609c7b5cb1055753'
                    break
                case 'billieeilish':
                    $hash = '15f5a40f7436516ac16dfb7c26b38c1e'
                    break
                case 'ambush':
                    $hash = '9b1d8c21f73c43a2a43856a984b73680'
                    break
            }
            if ('' != $hash) {
                var hm = document.createElement('script')
                hm.src = `https://hm.baidu.com/hm.js?${$hash}`
                var s = document.getElementsByTagName('script')[0]
                s.parentNode.insertBefore(hm, s)
            } else {
                console.error('非统计站点')
            }
        }
    }
})();
