const game = new Phaser.Scene('home')

game.init = function () {
    this.locked = false // 动画锁
    this.posCache = [[449, 365], [297, 516], [449, 668], [297, 820], [450, 971], [297, 1124]]
    this.cardCache = Phaser.Utils.Array.Shuffle([1, 1, 2, 2, 3, 3]) // 洗牌
    this.cardFaceCache = [] // 合成的卡牌正面(底图+产品图)
    this.flipCache = [] // 缓存上一个翻过的牌
}
game.create = function () {
    // 音效
    let cardEff = []
    cardEff.push(this.sound.add('card1'))
    cardEff.push(this.sound.add('card2'))
    cardEff.push(this.sound.add('card3'))
    const card0 = this.sound.add('card')
    // 音量动效
    let frames = []
    for (let i = 1; i <= 12; i++) {
        frames.push({ key: `mu${i}` })
    }
    this.anims.create({
        key: 'go',
        frames,
        frameRate: 14,
        repeat: -1,
    })
    // 构建卡牌
    const createCard = (x, y, cardFace, cardBack) => {
        return this.add.rexPerspectiveCard(x, y, {
            front: { key: cardFace },
            back: { key: cardBack },
            face: 'back',
            flip: {
                frontToBack: 'right',
                backToFront: 'left',
                duration: 550,
                ease: 'Cubic'
            }
        })
            .setInteractive(new Phaser.Geom.Polygon([136.5, 0, 273, 136.5, 136.5, 273, 0, 136.5]), Phaser.Geom.Polygon.Contains)
            .on('pointerup', function () {
                const localX = arguments[1]
                if (game.input.enabled) {
                    // 先检测是否需要挂锁
                    if (game.flipCache.length == 1) {
                        game.input.enabled = false
                    }
                    // 直接翻牌不做判断
                    if (localX <= (this.width / 2)) {
                        this.flip.flipLeft()
                    } else {
                        this.flip.flipRight()
                    }
                    // 放一下音效
                    card0.play()
                    // 判断上一张牌的缓存
                    const
                        curName = this.name,
                        curWhich = this.data.values['which']
                    if (game.flipCache.length != 0) {
                        const
                            cacheName = game.flipCache[0].name,
                            cacheWhich = game.flipCache[0].data.values['which']
                        // 如果是同一张牌
                        if (cacheName == curName) {
                            game.flipCache.pop()
                            game.input.enabled = true
                        // 如果是同型卡牌
                        } else if (cacheWhich == curWhich) {
                            const cacheFlip = game.flipCache.pop()
                            // 解掉事件
                            cacheFlip.removeInteractive()
                            this.removeInteractive()
                            // 闪动提示
                            game.tweens.add({
                                targets: [cacheFlip, this],
                                alpha: .4,
                                ease: 'Circ.easeInOut',
                                duration: 180,
                                yoyo: true,
                                repeat: 2,
                                completeDelay: 200,
                                onStartScope: this,
                                onCompleteScope: this,
                                onStart: () => {
                                    cardEff[Number(curWhich) - 1].play()
                                },
                                onComplete: () => {
                                    // 弹框
                                    gsap.fromTo(`[data-modal='info']`, {
                                        opacity: 0,
                                        scale: 0,
                                    }, {
                                        opacity: 1,
                                        scale: 1,
                                        ease: 'power2.in',
                                        delay: .1,
                                        duration: .3,
                                        onStart() {
                                            $(`[data-info='${cacheWhich}']`).removeClass('hide')
                                            $(`[data-modal='info']`).show()
                                        }
                                    })
                                    // 解锁
                                    game.input.enabled = true
                                },
                            })
                        // 如果都不是
                        } else {
                            game.time.delayedCall(650, () => {
                                const cacheFlip = game.flipCache.pop()
                                this.flip.flipLeft()
                                cacheFlip.flip.flipLeft()
                                game.input.enabled = true
                            })
                        }
                    } else {
                        game.flipCache.push(this)
                    }
                }
            })
    }
    // 根据洗牌信息构建牌面
    this.cardCache.forEach((num, idx) => {
        const cardFace = this.make.rexPerspectiveRenderTexture({
            x: 0,
            y: 0,
            width: 273,
            height: 273,
            add: false,
        })
        cardFace.rt
            .draw(`card${idx + 1}face`, 0, 0)
            .draw(`faceShoes${num}`, 60, 54)
        this.cardFaceCache.push(cardFace)
    })
    // 页面元素
    const baseLayer = this.add.container(0, 0).setName('base')
    baseLayer.add(this.add.image(628, 205, 'logo').setName('logo'))
    baseLayer.add(this.add.image(642, 463, 'headv').setName('headv'))
    baseLayer.add(this.add.image(1291, 343, 'headh').setName('headh').setVisible(false))
    baseLayer.add(this.add.image(93, 192, 'btnBack').setName('btnBack'))
    baseLayer.add(this.add.image(162, 1309, 'btnInfo').setName('btnInfo'))
    baseLayer.add(this.add.image(240, 192, 'off').setName('off').setVisible(false))
    baseLayer.add(this.add.sprite(240, 192, 'mu1').play('go').setName('on'))
    // 根据卡面信息构建卡牌加入页面
    this.cardFaceCache.forEach((card, idx) => {
        const
            faceKey = card.texture.key,
            x = this.posCache[idx][0],
            y = this.posCache[idx][1],
            who = idx + 1,
            realcard = createCard(x, y, faceKey, `card${who}back`).setName(`card${who}`).setData('which', this.cardCache[idx])
        baseLayer.add(realcard)
        // this.input.enableDebug(realcard)
    })
    // 点击事件
    this.rexGestures.add.tap(baseLayer.getByName('on')).on('tap', () => {
        baseLayer.getByName('on').setVisible(false)
        baseLayer.getByName('off').setVisible(true)
        bgm.mute(true)
    }, this)
    this.rexGestures.add.tap(baseLayer.getByName('off')).on('tap', () => {
        baseLayer.getByName('off').setVisible(false)
        baseLayer.getByName('on').setVisible(true)
        bgm.mute(false)
    }, this)
    this.rexGestures.add.tap(baseLayer.getByName('btnInfo')).on('tap', () => {
        if (!locked) {
            locked = true
            eff.play()
            $(`[data-modal='story']`).fadeIn(200, () => {
                locked = false
                shoesAni.play()
            })
        }
    }, this)
    this.rexGestures.add.tap(baseLayer.getByName('btnBack')).on('tap', () => {
        if (!locked) {
            location.replace('/lobby/?from=billieeilish')
        }
    }, this)
    // 处理横竖屏切换
    if (window.innerWidth > window.innerHeight) {
        game.scale.scaleMode = Phaser.Scale.HEIGHT_CONTROLS_WIDTH
        this.scale.setGameSize(1500, 750).updateScale()
        baseLayer.getByName('logo').setPosition(1284, 107)
        baseLayer.getByName('headv').setVisible(false)
        baseLayer.getByName('headh').setVisible(true)
        baseLayer.getByName('btnBack').setPosition(186, 96)
        baseLayer.getByName('btnInfo').setPosition(257, 651)
        baseLayer.getByName('card1').setPosition(1086, 298)
        baseLayer.getByName('card2').setPosition(935, 450)
        baseLayer.getByName('card3').setPosition(783, 298)
        baseLayer.getByName('card4').setPosition(632, 450)
        baseLayer.getByName('card5').setPosition(480, 298)
        baseLayer.getByName('card6').setPosition(328, 450)
        baseLayer.getByName('on').setPosition(353, 96)
        baseLayer.getByName('off').setPosition(353, 96)
    }
    if (this.sys.game.device.os.iOS) {
        window.addEventListener('orientationchange', () => {
            switch (window.orientation) {
                case 90:
                case -90:
                    game.scale.setGameSize(1500, 750).updateScale()
                    baseLayer.getByName('logo').setPosition(1284, 107)
                    baseLayer.getByName('headv').setVisible(false)
                    baseLayer.getByName('headh').setVisible(true)
                    baseLayer.getByName('btnBack').setPosition(186, 96)
                    baseLayer.getByName('btnInfo').setPosition(257, 651)
                    baseLayer.getByName('card1').setPosition(1086, 298)
                    baseLayer.getByName('card2').setPosition(935, 450)
                    baseLayer.getByName('card3').setPosition(783, 298)
                    baseLayer.getByName('card4').setPosition(632, 450)
                    baseLayer.getByName('card5').setPosition(480, 298)
                    baseLayer.getByName('card6').setPosition(328, 450)
                    baseLayer.getByName('on').setPosition(353, 96)
                    baseLayer.getByName('off').setPosition(353, 96)
                    game.scale.refresh()
                    break
                default:
                    game.scale.setGameSize(750, 1500).updateScale()
                    baseLayer.getByName('logo').setPosition(628, 205)
                    baseLayer.getByName('headv').setVisible(true)
                    baseLayer.getByName('headh').setVisible(false)
                    baseLayer.getByName('btnBack').setPosition(93, 192)
                    baseLayer.getByName('btnInfo').setPosition(162, 1309)
                    baseLayer.getByName('card1').setPosition(449, 365)
                    baseLayer.getByName('card2').setPosition(297, 516)
                    baseLayer.getByName('card3').setPosition(449, 668)
                    baseLayer.getByName('card4').setPosition(297, 820)
                    baseLayer.getByName('card5').setPosition(450, 971)
                    baseLayer.getByName('card6').setPosition(297, 1124)
                    baseLayer.getByName('on').setPosition(240, 192)
                    baseLayer.getByName('off').setPosition(240, 192)
                    game.scale.refresh()
                    break
            }
        }, false)
    } else {
        window.addEventListener('resize', () => {
            if (window.innerWidth > window.innerHeight) {
                game.scale.setGameSize(1500, 750).updateScale()
                baseLayer.getByName('logo').setPosition(1284, 107)
                baseLayer.getByName('headv').setVisible(false)
                baseLayer.getByName('headh').setVisible(true)
                baseLayer.getByName('btnBack').setPosition(186, 96)
                baseLayer.getByName('btnInfo').setPosition(257, 651)
                baseLayer.getByName('card1').setPosition(1086, 298)
                baseLayer.getByName('card2').setPosition(935, 450)
                baseLayer.getByName('card3').setPosition(783, 298)
                baseLayer.getByName('card4').setPosition(632, 450)
                baseLayer.getByName('card5').setPosition(480, 298)
                baseLayer.getByName('card6').setPosition(328, 450)
                baseLayer.getByName('on').setPosition(353, 96)
                baseLayer.getByName('off').setPosition(353, 96)
                game.scale.refresh()
            } else {
                game.scale.setGameSize(750, 1500).updateScale()
                baseLayer.getByName('logo').setPosition(628, 205)
                baseLayer.getByName('headv').setVisible(true)
                baseLayer.getByName('headh').setVisible(false)
                baseLayer.getByName('btnBack').setPosition(93, 192)
                baseLayer.getByName('btnInfo').setPosition(162, 1309)
                baseLayer.getByName('card1').setPosition(449, 365)
                baseLayer.getByName('card2').setPosition(297, 516)
                baseLayer.getByName('card3').setPosition(449, 668)
                baseLayer.getByName('card4').setPosition(297, 820)
                baseLayer.getByName('card5').setPosition(450, 971)
                baseLayer.getByName('card6').setPosition(297, 1124)
                baseLayer.getByName('on').setPosition(240, 192)
                baseLayer.getByName('off').setPosition(240, 192)
                game.scale.refresh()
            }
        }, false)
    }
}
game.fromToAni = function (from, to) {
    return this.tweens.timeline({
        tweens: [
            {
                targets: from,
                alpha: 0,
                ease: 'Power2',
                duration: 280,
            },
            {
                targets: to,
                alpha: 1,
                ease: 'Power2',
                duration: 280,
            },
        ]
    })
}
