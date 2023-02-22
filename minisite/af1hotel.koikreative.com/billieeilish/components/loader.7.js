const loader = new Phaser.Scene('loader')

loader.create = function () {
    // Loading基础动画
    gsap.fromTo(`[data-loader='rect']`, {
        scaleX: 0,
    }, {
        scaleX: 1,
        duration: 1.8,
        ease: 'none',
    })
    // 加载完成回调
    this.load.once('complete', () => {
        // Loading表针动画
        gsap.to(`[data-loader='pointer']`, {
            duration: 1.8,
            ease: 'elastic',
            rotation: '+=55',
            onComplete: () => {
                loader.scene.start('home')
                $(`[data-loader='con']`).addClass('hide')
                // 游戏规则弹框动画
                gsap.fromTo(`[data-modal='tips']`, {
                    opacity: 0,
                    scale: 0,
                }, {
                    opacity: 1,
                    scale: 1,
                    ease: 'power2.in',
                    delay: .1,
                    duration: .5,
                    onStart() {
                        $(`[data-modal='tips']`).show()
                    },
                })
            },
        })
    })
    // 页面元素
    this.load.image('off', 'assets/off.wh.1.png')
    this.load.image('btnBack', 'assets/btnBack.png')
    this.load.image('btnClose', 'assets/btnClose.png')
    this.load.image('btnInfo', 'assets/btnInfo.png')
    this.load.image('btnJump', 'assets/btnJump.png')
    this.load.audio('card', 'assets/card.mp3')
    this.load.audio('card1', 'assets/card1.mp3')
    this.load.audio('card2', 'assets/card2.mp3')
    this.load.audio('card3', 'assets/card3.mp3')
    this.load.image('headh', 'assets/headh.png')
    this.load.image('headv', 'assets/headv.png')
    this.load.image('logo', 'assets/logo.png')
    // 卡牌和鞋图
    for (let num = 1; num <= 6; num++) {
        this.load.image(`card${num}back`, `assets/card${num}back.png`)
        this.load.image(`card${num}face`, `assets/card${num}face.png`)
        if (num < 4) {
            this.load.image(`faceShoes${num}`, `assets/faceShoes${num}.png`)
        }
    }
    // 音量动态图标
    for (let i = 1; i <= 12; i++) {
        this.load.image(`mu${i}`, `assets/mu/${i}.png`)
    }
    // 插件
    this.load.plugin('rexperspectiveimageplugin', `${document.baseURI}libs/rexperspectiveimageplugin.min.js`, true)
    // 启动加载
    this.load.start()
}
