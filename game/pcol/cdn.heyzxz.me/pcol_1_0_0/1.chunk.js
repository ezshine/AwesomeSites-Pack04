(window.webpackJsonp = window.webpackJsonp || []).push([[1], [, , , , , , , , , , function(t, e, i) {
    "use strict";
    i.r(e);
    var s = i(11)
      , n = i(14)
      , r = i.n(n)
      , a = i(19)
      , o = i.n(a);
    class l {
        constructor(t) {
            this.userInfo = o.a.makeUserInfo(t.userId, t.displayName, t.level, t.stickName),
            this.money = t.money || 0
        }
    }
    var h = i(96)
      , c = i.n(h)
      , d = i(24)
      , u = i.n(d);
    const _ = {
        camera: {
            fov: .88,
            minZ: .01
        },
        personController: {
            eyeStandHeight: 1.7,
            eyeSquatHeight: 1,
            innerTrackRadius: .38
        }
    };
    var p = new class {
        constructor() {
            this._localUser = null,
            this._gameSettings = null,
            this._gameDefineId = null
        }
        getGameDefineData(t) {
            return u.a.deepClone(c.a[this._gameDefineId][t])
        }
        getGameSettings(t) {
            return this._gameSettings[t]
        }
        getLocalUserInfoData(t) {
            return this._localUser.userInfo[t]
        }
        getLocalUserInfo() {
            return this._localUser.userInfo
        }
        restore(t) {
            if (this._localUser = new l(t),
            this._gameDefineId = t.gameDefineId,
            this._gameSettings = u.a.deepClone(_),
            t.settings)
                for (let e in t.settings)
                    u.a.politeMerge(this._gameSettings, e, t.settings[e]);
            return this._validate()
        }
        _validate() {
            return !0
        }
    }
    ;
    class f extends r.a {
        constructor() {
            super()
        }
        asyncLaunch(t) {
            t()
        }
        getControllerSetting() {
            return p.getGameSettings("personController")
        }
        getUserInfoData(t, e) {
            if (void 0 === e)
                return p.getLocalUserInfoData(t);
            throw new Error("TODO: get userInfoData for someone else")
        }
    }
    class g extends f {
        constructor() {
            super()
        }
        get cameraSettings() {
            return p.getGameSettings("camera")
        }
        asyncLaunch(t, e) {
            let i = this._gameLaunchResponseWithFBLoginData(t);
            setTimeout(()=>{
                p.restore(i) ? e(null, "home") : e(new Error("DataCenter restore failed"))
            }
            , 1)
        }
        _gameLaunchResponseWithFBLoginData(t) {
            let e = Object.create(null);
            return e.userId = t.id,
            e.displayName = t.first_name,
            e.stickName = "stickAlpha",
            e.level = 1,
            e.money = 1e3,
            e.gameDefineId = "default",
            e.settings = void 0,
            e
        }
    }
    const m = {
        READY: "ready",
        ENTERED: "entered",
        EXITED: "exited"
    }
      , y = Object.create(null);
    y.CHANGE_CONTROLLER = "change_ctlr";
    var v = {
        IDLE: 0,
        PENDING: 1,
        ENTERING: 2,
        ACTING: 3,
        EXITING: 4
    };
    class b {
        constructor() {
            this._controllers = Object.create(null),
            this._pendingNextControllerName = "",
            this._currentController = null,
            this._controllerLaunchOptions = Object.create(null),
            this._onCurrentControllerReady = (()=>{
                let t = this._currentController;
                t.removeAllListeners(m.READY),
                this._pendingNextControllerName && this._pendingNextControllerName.length ? (t.on(m.EXITED, this._onCurrentControllerExited).exit(),
                this.onCurrentControllerStateChanged()) : (t.on(m.ENTERED, this._onCurrentControllerEntered).enter(),
                this.onCurrentControllerStateChanged())
            }
            ),
            this._onCurrentControllerEntered = (()=>{
                let t = this._currentController;
                t.removeAllListeners(m.ENTERED),
                this._pendingNextControllerName && this._pendingNextControllerName.length ? (t.on(m.EXITED, this._onCurrentControllerExited).exit(),
                this.onCurrentControllerStateChanged()) : (t.action(),
                this.onCurrentControllerStateChanged())
            }
            ),
            this._onCurrentControllerExited = (()=>{
                this._currentController.free(),
                this._currentController = null,
                this._launchPendingController()
            }
            )
        }
        changeController(t) {
            let e = this._currentController;
            if (!e)
                return this._pendingNextControllerName = t,
                this._launchPendingController();
            switch (e.state) {
            case v.PENDING:
            case v.ENTERING:
                return e.name === t ? (this._pendingNextControllerName = "",
                !1) : (this._pendingNextControllerName = t,
                !0);
            case v.ACTING:
                return this._pendingNextControllerName = t,
                e.on(m.EXITED, this._onCurrentControllerExited).exit(),
                this.onCurrentControllerStateChanged(),
                !0;
            case v.EXITING:
                return this._pendingNextControllerName = t,
                !0;
            default:
                return !1
            }
        }
        onCurrentControllerStateChanged() {}
        _launchPendingController() {
            let t = this._pendingNextControllerName
              , e = this._controllers[t];
            return this._pendingNextControllerName = "",
            !!e && (this._currentController = e,
            e.on(m.READY, this._onCurrentControllerReady).launch(this._controllerLaunchOptions),
            this.onCurrentControllerStateChanged(),
            !0)
        }
    }
    let x = 0;
    class S extends r.a {
        get id() {
            return this._id
        }
        get name() {
            return this._name
        }
        get state() {
            return this._state
        }
        constructor(t) {
            super(),
            this._name = t,
            this._id = ++x,
            this._state = v.IDLE
        }
        launch() {
            this._state = v.PENDING
        }
        enter() {
            this._state = v.ENTERING
        }
        action() {
            this._state = v.ACTING
        }
        exit() {
            this._state = v.EXITING
        }
        free() {
            this._state = v.IDLE,
            this.removeAllListeners()
        }
    }
    var C = i(18)
      , I = i.n(C)
      , T = i(13)
      , A = i.n(T);
    const E = function(t, e) {
        this.id = t,
        this.boundsY = e.y,
        this.createCushionData(e.bounds),
        this.crtCushion = null,
        this.actives = []
    };
    E.prototype = {
        constructor: E,
        createCushionData: function(t) {
            let e = 0;
            this.head = this.createCushionWithPts(e++, t[0], t[1], t[2], t[3]),
            this.tail = this.head,
            this.totalCushions = 1;
            for (let i = 1, s = t.length / 2; i !== s; ++i) {
                let n = (i + 1) % s;
                this.tail = this.createCushionWithPts(e++, t[2 * i], t[2 * i + 1], t[2 * n], t[2 * n + 1], this.tail),
                this.totalCushions++
            }
        },
        createCushionWithPts: function() {
            let t = new A.a.Vec3(0,1,0);
            return function(e, i, s, n, r, a) {
                let o = new A.a.Vec3(i,0,s)
                  , l = new A.a.Vec3(n,0,r)
                  , h = new A.a.Vec3(0,0,0).subVectors(l, o)
                  , c = {
                    index: e,
                    prev: a,
                    next: null,
                    plane: (new I.a).setWithPointAnd2Dirs(o, h, t),
                    a: o,
                    b: l,
                    ab: h,
                    tp: new A.a.Vec3,
                    toi: 0
                };
                return a && (a.next = c),
                c
            }
        }(),
        filter: function(t, e) {
            let i, s, n = this.head, r = e * e, a = this.actives;
            for (a.length = 0,
            this.crtCushion = null; n; ) {
                if (Math.abs(n.plane.signedDistance(t)) < e) {
                    let e = this.pointOnside(t, n);
                    if (0 === e)
                        a.push(n);
                    else if (-1 === e) {
                        (i = t.x - n.a.x) * i + (s = t.z - n.a.z) * s < r && a.push(n)
                    } else {
                        (i = t.x - n.b.x) * i + (s = t.z - n.b.z) * s < r && a.push(n)
                    }
                }
                n = n.next
            }
        },
        pointOnside: function() {
            let t = new A.a.Vec3(0,0,0);
            return function(e, i) {
                return t.subVectors(e, i.a),
                t.dot(i.ab) < 0 ? -1 : (t.subVectors(e, i.b),
                t.dot(i.ab) >= 0 ? 1 : 0)
            }
        }(),
        detect: function(t, e, i, s) {
            let n = this.crtCushion;
            if (n && this.__detectCushion(t, e, n) || (n = this.__crtCushionFromScratch(t, e)),
            !n)
                return;
            let r = n.tp
              , a = this.boundsY + i;
            if (r.y < a) {
                let t = s.next();
                t.reset(r.x, a, r.z, 0),
                t.escape = a - r.y
            }
        },
        __crtCushionFromScratch: function(t, e) {
            let i = this.actives
              , s = this.crtCushion;
            this.crtCushion = null;
            for (let n = 0, r = i.length; n !== r; ++n) {
                let r = i[n];
                r != s && this.__detectCushion(t, e, r) && (!this.crtCushion || r.toi < this.crtCushion.toi) && (this.crtCushion = r)
            }
            return this.crtCushion
        },
        __detectCushion: function(t, e, i) {
            let s = i.plane
              , n = i.tp
              , r = s.signedDistance(t);
            if (Math.abs(r) < 1e-5)
                return i.toi = 0,
                n.copyFrom(t),
                0 === this.pointOnside(n, i);
            let a = e.dot(s.normal);
            return !(Math.abs(a) < 1e-5) && (i.toi = -r / a,
            !(i.toi < 0) && (n.scaleVector(i.toi, e).add(t),
            0 === this.pointOnside(n, i)))
        }
    };
    var w = E;
    i(79),
    i(33);
    const R = s.Texture
      , k = s.Color3
      , P = s.HDRCubeTexture
      , D = s.PBRMetallicRoughnessMaterial
      , L = s.PcolCarpetMaterial
      , O = s.PcolLightProbeManager
      , M = s.PcolDyIBLMaterial
      , U = s.PcolHdrCubeTexture;
    var B = {
        manifest: {
            "ball-ao-new": i(78),
            "ball-ref-g8.rad": i(77),
            "carpet-light": i(76),
            "carpet-normal": i(75),
            "carpet-overlay": i(74),
            "carpet-tiled": i(73),
            "com-irrd0": i(72),
            "com-irrd1": i(71),
            "frame-diffuse": i(70),
            "frame-light": i(69),
            "frame-normal-1024": i(68),
            "frame-ref": i(67),
            "frame-roughness": i(66),
            "ground-tiled": i(65),
            "mask-table": i(64),
            model: i(63),
            "pocket-glossy": i(62)
        },
        camInitialPosition: {
            x: -4.5,
            y: 1.7,
            z: 5
        },
        playArea: {
            x: 0,
            y: .88,
            z: 0,
            w: 3.66,
            h: 1.859
        },
        trackInfo: {
            radius: 2.05,
            scaleX: 1.55
        },
        cushionData: {
            y: .92,
            bounds: [1.713, .897, .074, .897, .028, 1.005, -.028, 1.005, -.074, .897, -1.713, .897, -1.824, .978, -1.876, .925, -1.797, .808, -1.797, -.808, -1.876, -.925, -1.824, -.978, -1.713, -.897, -.074, -.897, -.028, -1.005, .028, -1.005, .074, -.897, 1.713, -.897, 1.824, -.978, 1.876, -.925, 1.797, -.808, 1.797, .808, 1.876, .925, 1.824, .978]
        },
        ballColors: {
            0: [.8, .6, .4],
            1: [.2, 0, .001],
            2: [.5, .2, 0],
            3: [0, .058546, .015527],
            4: [.1, .017188, 0],
            5: [.005218, .048421, .23805],
            6: [.535055, .077231, .102762],
            7: [0, 0, 0]
        },
        addSharedTextures: function(t, e) {
            t.ballAO = new U(e,"ballAO",this.manifest["ball-ao-new"]),
            t.tableUI = new R(this.commons["table-ui"],e),
            t.tableMask = new R(this.manifest["mask-table"],e)
        },
        beautify: function(t) {
            for (var e = t.materials, i = 0, s = e.length; i !== s; ++i)
                e[i].disableLighting = !0;
            var n = t.getNodeByName("Ground").material
              , r = new R(this.manifest["ground-tiled"],t);
            r.uScale = r.vScale = 30,
            n.lightmapTexture = r,
            n.useLightmapAsShadowmap = !0;
            var a = t.getNodeByName("PocketLight")
              , o = t.getNodeByName("Pocket");
            a.includedOnlyMeshes = [o];
            var l = o.material;
            l.invertNormalMapX = !0,
            l.invertNormalMapY = !0,
            l.specularTexture = new R(this.manifest["pocket-glossy"],t),
            l.diffuseColor = new k(.002,.002,.002).toGammaSpace(),
            l.ambientColor = l.diffuseColor,
            l.disableLighting = !1;
            var h = t.getNodeByName("TableInner")
              , c = new R(this.manifest["carpet-normal"],t);
            c.uScale = c.vScale = 30,
            c.level = .6;
            var d = new R(this.manifest["carpet-tiled"],t);
            d.uScale = d.vScale = 30,
            d.level = .8;
            var u = new L("TableInnerMat",t);
            u.diffuseColor = new k(.008,.07,.015),
            u.reflectivityColor = new k(.012,.012,.012),
            u.chaoticTexture = c,
            u.diffuseBaseTexture = d,
            u.toneMappingMode = 3,
            u.diffuseOverlayTexture = new R(this.manifest["carpet-overlay"],t),
            u.lightmapTexture = new R(this.manifest["carpet-light"],t);
            var _ = t.getNodeByName("GameLight");
            _.includedOnlyMeshes = [h],
            _.diffuse = new k(1,1,1),
            _.intensity = 60,
            _.angle = 175 / 180 * Math.PI,
            h.material = u,
            _.position.y = 3.6;
            var p = new D("FrameMat",t);
            p.baseTexture = new R(this.manifest["frame-diffuse"],t),
            p.metallic = 1,
            p.roughness = .8,
            p.metallicRoughnessTexture = new R(this.manifest["frame-roughness"],t),
            p.baseTexture.uScale = p.baseTexture.vScale = 4,
            p.metallicRoughnessTexture.uScale = p.metallicRoughnessTexture.vScale = 4,
            p.disableLighting = !0,
            p.environmentTexture = new P(this.manifest["frame-ref"],t,256,!1,!1,!1),
            p.occlusionTexture = new R(this.manifest["frame-light"],t),
            p.normalTexture = new R(this.manifest["frame-normal-1024"],t),
            p.invertNormalMapX = !0,
            p.invertNormalMapY = !0,
            t.getNodeByName("Frame").material = p
        },
        createLightProbeManager: function(t) {
            return new O(t,this.manifest["ball-ref-g8.rad"],[this.manifest["com-irrd0"], this.manifest["com-irrd1"]],{
                id: "tcs",
                lpx: [-1.6, -1.04, 0, 1.04, 1.6],
                lpz: [-.7, 0, .7],
                lpy: [.90625, 1.65],
                aabbPosition: [0, .90625, 0],
                aabbSizeMin: [-2.2, 0, -1.3],
                aabbSizeMax: [2.2, 1.74, 1.3],
                aabbAO: [.4, 1.1, .1]
            })
        },
        createBallMaterial: function(t, e, i, s) {
            let n = new M("ballMat" + t,e,s);
            n.reflectivityColor = new k(.04,.04,.04),
            n.roughness = .1,
            n.aoTexture = i.ballAO,
            n.toneMappingMode = 2,
            n.setLodFallOff(1.5, 3, 5, 2);
            var r = this.ballColors[t];
            return n.diffuseColor = new k(r[0],r[1],r[2]),
            n.freeze(),
            n
        },
        customizeShadow: function(t) {
            t.alpha = t.displayAlpha = .8
        }
    };
    const N = Object.create(null);
    N.tigerClubSno = B;
    const V = {
        "table-ui": i(61)
    }
      , F = {
        getCushionBody: function() {
            return !this.__cushionBody && this.cushionData && (this.__cushionBody = new w(this.id,this.cushionData)),
            this.__cushionBody
        }
    };
    for (let t in N) {
        let e = N[t];
        e.id = t,
        e.commons = V;
        for (let t in F)
            e[t] = F[t]
    }
    var z = N;
    const H = Object.create(null);
    H.RED = [1, 80 / 255, 15 / 255],
    H.BLUE = [32 / 255, 179 / 255, 1],
    H.YELLOW = [237 / 255, 181 / 255, 30 / 255],
    H.GREEN = [25 / 255, 205 / 255, 84 / 255],
    H.WHITE = [218 / 255, 218 / 255, 218 / 255];
    const G = 1e-6
      , q = {
        defaultEase: function(t) {
            return t
        },
        Power1: {
            easeIn: function(t) {
                return t * t
            },
            easeOut: function(t) {
                return 2 * t - t * t
            },
            easeInOut: function(t) {
                return t < .5 ? 2 * t * t : 4 * t - 2 * t * t - 1
            }
        },
        Power2: {
            easeIn: function(t) {
                return t * t * t
            },
            easeOut: function(t) {
                return 1 - (t = 1 - t) * t * t
            },
            easeInOut: function(t) {
                return t < .5 ? 4 * t * t * t : 1 - (t = 1 - t) * t * t * 4
            }
        },
        Power3: {
            easeIn: function(t) {
                return t * t * t * t
            },
            easeOut: function(t) {
                return 1 - (t = 1 - t) * t * t * t
            },
            easeInOut: function(t) {
                return t < .5 ? 8 * t * t * t * t : 1 - (t = 1 - t) * t * t * t * 8
            }
        },
        Power4: {
            easeIn: function(t) {
                return t * t * t * t * t
            },
            easeOut: function(t) {
                return 1 - (t = 1 - t) * t * t * t * t
            },
            easeInOut: function(t) {
                return t < .5 ? 16 * t * t * t * t * t : 1 - (t = 1 - t) * t * t * t * t * 16
            }
        },
        Back: {
            _p1: 1.70158,
            _p2: 2.5949095,
            easeIn: function(t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            },
            easeOut: function(t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            },
            easeInOut: function(t) {
                return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            }
        }
    };
    class W extends r.a {
        constructor() {
            super(),
            this.needsUpdate = !1,
            this.timeScale = 1,
            this.time = -1,
            this.state = 0,
            this.ease = q.defaultEase,
            this.duration = 0,
            this.delay = 0,
            this.totalLifeTime = 0,
            this.renderedTime = -1,
            this.renderedRatio = 0,
            this.uneaseRenderedRatio = 0,
            this.onComplete = null,
            this.onReverseComplete = null,
            this.callCbWhenComplete = 0,
            this.render = this.render,
            this.update = this.update,
            this.tickTime = this.tickTime,
            this.requireUpdate = this.requireUpdate
        }
        resetBase(t, e, i) {
            return void 0 !== t && (this.ease = t),
            this.duration = e < 0 ? 0 : e,
            this.delay = void 0 === i || i < 0 ? 0 : i,
            this.totalLifeTime = this.duration + this.delay,
            this.renderedTime = -1,
            this.pause(0, !0)
        }
        clear() {
            return this.time = 0,
            this.state = 0,
            this.duration = 0,
            this.delay = 0,
            this.totalLifeTime = 0,
            this.callCbWhenComplete = 0,
            this
        }
        dispose() {
            this.clear(),
            this.ease = q.defaultEase,
            this.onComplete = null,
            this.onReverseComplete = null,
            this.render = null,
            this.update = null,
            this.tickTime = null,
            this.requireUpdate = null,
            this.removeAllListeners()
        }
        requireUpdate() {
            return this.needsUpdate || (this.needsUpdate = !0,
            this.emit(W.updEvtType)),
            this
        }
        onUpdateRequired(t) {
            return this.on(W.updEvtType, t),
            this
        }
        isComplete(t) {
            return t ? 0 === this.state && 0 === this.time : 0 === this.state && this.time === this.totalLifeTime
        }
        cancelCallbacks() {
            this.callCbWhenComplete = 0
        }
        play(t) {
            let e = !1;
            return void 0 !== t && (t = Math.max(Math.min(t, this.totalLifeTime), 0),
            this.time !== t && (this.time = t,
            e = !0)),
            e || this.time < this.totalLifeTime ? (this.state = 1,
            this.callCbWhenComplete = 1,
            this.requireUpdate()) : this.state = 0,
            this
        }
        reverse() {
            return this.time > 0 ? (this.state = -1,
            this.callCbWhenComplete = -1,
            this.requireUpdate()) : this.state = 0,
            this
        }
        end() {
            return this.pause(this.totalLifeTime)
        }
        pause(t, e) {
            return this.callCbWhenComplete = 0,
            0 === this.state ? void 0 !== t && t !== this.time && (this.time = t,
            this.requireUpdate()) : (this.state = 0,
            void 0 !== t && (this.time = t)),
            e && (this.requireUpdate(),
            this.update(0)),
            this
        }
        tickTime(t) {
            let e = this.state * this.timeScale
              , i = this.time + t * e
              , s = G;
            if (e > 0) {
                if (i >= this.totalLifeTime - s)
                    return this.time = this.totalLifeTime,
                    this.state = 0,
                    this.duration;
                this.needsUpdate = !0
            } else if (e < 0) {
                if (i <= s)
                    return this.time = 0,
                    this.state = 0,
                    0;
                this.needsUpdate = !0
            }
            return this.time = i,
            (i -= this.delay) < s ? 0 : i
        }
        update(t) {
            this.needsUpdate = !1;
            let e = this.tickTime(t);
            return this.renderedTime !== e && (this.renderedTime = e,
            this.uneaseRenderedRatio = e / this.duration,
            this.render(this.ease(this.uneaseRenderedRatio)),
            this.needsUpdate || (1 === this.callCbWhenComplete && this.onComplete && this.onComplete(),
            -1 === this.callCbWhenComplete && this.onReverseComplete && this.onReverseComplete(),
            this.callCbWhenComplete = 0)),
            this.needsUpdate
        }
        render(t) {
            this.renderedRatio = t
        }
    }
    W.updEvtType = "require_update";
    class Y extends W {
        constructor(t) {
            super(),
            this.target = t,
            this.from = null,
            this.change = null
        }
        reset(t, e, i, s, n=0) {
            if (t && this.target) {
                for (var r in this.from = t,
                this.change = {},
                t)
                    this.change[r] = r in e ? e[r] - t[r] : 0;
                return this.resetBase(i, s, n)
            }
            return this.clear()
        }
        clear() {
            return this.from = null,
            this.change = null,
            super.clear()
        }
        dispose() {
            this.target = null,
            super.dispose()
        }
        render(t) {
            this.renderedRatio = t;
            let e = this.from
              , i = this.change
              , s = this.target;
            for (let n in e)
                s[n] = e[n] + i[n] * t
        }
    }
    class j extends Y {
        constructor(t, e={}) {
            super(e),
            this.callback = t
        }
        dispose() {
            this.callback = null,
            super.dispose()
        }
        render(t) {
            super.render(t),
            this.callback(this.target)
        }
    }
    class X extends W {
        constructor() {
            super(),
            this.tweens = null,
            this.onChildRequireUpdate = (()=>{
                this.requireUpdate()
            }
            )
        }
        reset(t, e, i=0) {
            if (t) {
                this._removeAllTweens(),
                this.tweens = t;
                for (var s = 0, n = 0, r = t.length; n !== r; ++n)
                    t[n].totalLifeTime > s && (s = t[n].totalLifeTime),
                    t[n].on(W.updEvtType, this.onChildRequireUpdate);
                return this.resetBase(e, s, i)
            }
            return this.clear()
        }
        clear() {
            return this._removeAllTweens(),
            super.clear()
        }
        _removeAllTweens() {
            if (this.tweens) {
                let t = this.tweens;
                for (let e = t.length - 1; e > -1; --e)
                    t[e].dispose();
                this.tweens = null
            }
        }
        dispose() {
            this.onChildRequireUpdate = null,
            super.dispose()
        }
        render(t) {
            this.renderedRatio = t;
            let e, i, s = t * this.duration, n = this.tweens;
            for (let t = 0, r = n.length; t !== r; ++t)
                (e = n[t]).time = s,
                (i = s - e.delay) < 0 ? i = 0 : i > e.duration && (i = e.duration),
                e.renderedTime !== i && (e.renderedTime = i,
                e.render(e.ease(i / e.duration)))
        }
    }
    class K extends s.ShaderMaterial {
        constructor(t, e, i, s) {
            super(t, e, i, s),
            this._usedUniformTypes = Object.create(null)
        }
        isReady(t, e) {
            return !(!this.checkReadyOnlyOnce || !this._wasPreviouslyReady) || !!super.isReady(t, e) && (this._wasPreviouslyReady = !0,
            !0)
        }
    }
    const Z = {
        DF_TRANSFORM: 1,
        DF_RGB: 2,
        DF_ALPHA: 4,
        DF_ALL: 7
    };
    class J {
        get x() {
            return this._x
        }
        get y() {
            return this._y
        }
        get z() {
            return this._z
        }
        get scaling() {
            return this._scaling
        }
        set scaling(t) {
            this._scaling !== t && (this._scaling = t,
            this.needsUpdate |= Z.DF_TRANSFORM,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        get r() {
            return this._r
        }
        get g() {
            return this._g
        }
        get b() {
            return this._b
        }
        get alpha() {
            return this._a
        }
        set alpha(t) {
            this._a !== t && (this._a = t,
            this.needsUpdate |= Z.DF_ALPHA,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        constructor(t, e, i=1, n=1, r=1) {
            this._transform = s.Matrix.Identity(),
            this._x = 0,
            this._y = 0,
            this._z = 0,
            this._scaling = 1,
            this._r = i,
            this._g = n,
            this._b = r,
            this._a = 1,
            this.v32 = t,
            this.i16 = e,
            this.nVertices = t.length / 6,
            this._weakParent = null,
            this._vOffset = -1,
            this.needsUpdate = 0,
            this.zIndex = 0
        }
        dispose() {
            this._transform = null,
            this.v32 = null,
            this.i16 = null,
            this._weakParent && this._weakParent.removeChildb(this)
        }
        copyPosition(t) {
            this._x === t.x && this._y === t.y && this._z === t.z || (this._x = t.x,
            this._y = t.y,
            this._z = t.z,
            this.needsUpdate |= Z.DF_TRANSFORM,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        copyPositionXYZ(t, e, i) {
            this._x === t && this._y === e && this._z === i || (this._x = t,
            this._y = e,
            this._z = i,
            this.needsUpdate |= Z.DF_TRANSFORM,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        copyRGB(t, e, i) {
            this._r === t && this._g === e && this._b === i || (this._r = t,
            this._g = e,
            this._b = i,
            this.needsUpdate |= Z.DF_RGB,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        markTransformDirty() {
            this.needsUpdate |= Z.DF_TRANSFORM,
            this._weakParent && (this._weakParent.needsUpdate |= 1)
        }
        setVertexAlpha(t, e) {
            const i = this.v32;
            i[t = 6 * t + 5] !== e && (i[t] = e,
            this.needsUpdate |= Z.DF_ALPHA,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        setVerticesAlphas(t, e) {
            const i = this.v32
              , s = i.length;
            let n = -1
              , r = !1;
            for (let a = 0, o = t.length; a !== o; ++a)
                (n = 6 * t[a] + 5) < s && i[n] !== e && (i[n] = e,
                r = !0);
            r && (this.needsUpdate |= Z.DF_ALPHA,
            this._weakParent && (this._weakParent.needsUpdate |= 1))
        }
        setUI(t, e, i) {
            const s = this.v32
              , n = this.i16
              , r = this._vOffset;
            let a, o, l;
            for (o = 0,
            l = this.nVertices; o !== l; ++o)
                t[2 * (a = o + r)] = s[6 * o + 3],
                t[2 * a + 1] = s[6 * o + 4];
            for (o = 0,
            l = n.length; o !== l; ++o)
                e[i + o] = n[o] + r;
            return i + n.length
        }
        updateAlpha(t) {
            this.needsUpdate &= ~Z.DF_ALPHA;
            const e = this._a
              , i = this.v32
              , s = this._vOffset;
            for (let n = 0, r = this.nVertices; n !== r; ++n)
                t[s + n] = e * i[6 * n + 5]
        }
        updateRGB(t) {
            this.needsUpdate &= ~Z.DF_RGB;
            const e = this._r
              , i = this._g
              , s = this._b
              , n = this._vOffset;
            let r;
            for (let a = 0, o = this.nVertices; a !== o; ++a)
                t[r = 3 * (n + a)] = e,
                t[r + 1] = i,
                t[r + 2] = s
        }
        updateTransform(t) {
            this.needsUpdate &= ~Z.DF_TRANSFORM;
            const e = this.v32
              , i = this._vOffset;
            let s, n, r, a, o, l, h = this._transform.m;
            h[0] = h[5] = h[10] = this._scaling,
            h[12] = this._x,
            h[13] = this._y,
            h[14] = this._z;
            for (let c = 0, d = this.nVertices; c !== d; ++c)
                l = 3 * (i + c),
                s = e[o = 6 * c],
                n = e[o + 1],
                r = e[o + 2],
                a = s * h[3] + n * h[7] + r * h[11] + h[15],
                t[l] = (s * h[0] + n * h[4] + r * h[8] + h[12]) / a,
                t[l + 1] = (s * h[1] + n * h[5] + r * h[9] + h[13]) / a,
                t[l + 2] = (s * h[2] + n * h[6] + r * h[10] + h[14]) / a
        }
    }
    var Q = {
        w: 512,
        h: 512,
        cache: {},
        frames: {
            shadow: {
                x: 43,
                y: 307,
                w: 162,
                h: 162
            },
            gs1: {
                x: 286,
                y: 14,
                w: 208,
                h: 208
            },
            gs2: {
                x: 148,
                y: 12,
                w: 125,
                h: 176,
                headH: 30
            },
            gs3: {
                x: 12,
                y: 12,
                w: 125,
                h: 176,
                headH: 30
            },
            powerTrack: {
                x: 12,
                y: 200,
                w: 16,
                h: 40
            },
            respot0: {
                x: 221,
                y: 244,
                w: 166,
                h: 166
            },
            respot1: {
                x: 383,
                y: 383,
                w: 120,
                h: 120
            }
        },
        getFrame: function(t) {
            return this.frames[t]
        },
        getUVs: function(t) {
            let e = this.cache[t];
            if (!e) {
                const i = this.frames[t];
                if (!i)
                    throw new Error("Frame [" + t + "] not found...");
                const s = this.w
                  , n = this.h
                  , r = i.x
                  , a = i.y
                  , o = i.w
                  , l = i.h;
                e = [r / s, (n - (a + l)) / n, (r + o) / s, (n - (a + l)) / n, (r + o) / s, (n - a) / n, r / s, (n - a) / n],
                this.cache[t] = e
            }
            return e
        }
    };
    class $ extends J {
        constructor(t, e, i, n, r) {
            super(t, e, i, n, r),
            this._orientationDirty = !1,
            this._orientation2D = new s.Vector2(0,0),
            this._rotationMat = s.Matrix.Identity(),
            this._mOutput = new Float32Array(16)
        }
        dispose() {
            this._orientation2D = null,
            this._rotationMat = null,
            this._mOutput = null,
            super.dispose()
        }
        setOrientation2D(t, e, i) {
            if (this._orientation2D.copyFromFloats(t, e),
            i) {
                let i = this._rotationMat.m;
                i[0] = e,
                i[2] = -t,
                i[8] = t,
                i[10] = e,
                this._orientationDirty = !1
            } else
                this._orientationDirty = !0;
            this.needsUpdate |= Z.DF_TRANSFORM,
            this._weakParent && (this._weakParent.needsUpdate |= 1)
        }
        getOrientation2D() {
            return this._orientationDirty && this._updateOrientation(),
            this._orientation2D
        }
        _updateOrientation() {
            this._orientationDirty = !1;
            let t = this._orientation2D.normalize()
              , e = t.x
              , i = t.y
              , s = this._rotationMat.m;
            s[0] = i,
            s[2] = -e,
            s[8] = e,
            s[10] = i
        }
        updateTransform(t) {
            this.needsUpdate &= ~Z.DF_TRANSFORM;
            const e = this.v32
              , i = this._vOffset
              , s = this._transform;
            let n, r, a, o, l, h, c = s.m, d = this._mOutput, u = this._rotationMat;
            this._orientationDirty && this._updateOrientation(),
            c[0] = c[5] = c[10] = this._scaling,
            c[12] = this._x,
            c[13] = this._y,
            c[14] = this._z,
            u.multiplyToArray(s, d, 0);
            for (let s = 0, c = this.nVertices; s !== c; ++s)
                h = 3 * (i + s),
                n = e[l = 6 * s],
                r = e[l + 1],
                a = e[l + 2],
                o = n * d[3] + r * d[7] + a * d[11] + d[15],
                t[h] = (n * d[0] + r * d[4] + a * d[8] + d[12]) / o,
                t[h + 1] = (n * d[1] + r * d[5] + a * d[9] + d[13]) / o,
                t[h + 2] = (n * d[2] + r * d[6] + a * d[10] + d[14]) / o
        }
    }
    const tt = {
        UPDATE_CHILD_UPDATE: 1,
        UPDATE_CHILD_ADD_REMOVE: 2
    }
      , et = (t,e)=>t.zIndex - e.zIndex;
    class it extends s.Mesh {
        get needsRearrange() {
            return this.needsUpdate & tt.UPDATE_CHILD_ADD_REMOVE
        }
        constructor(t, e, i, n, r) {
            super(t, e),
            this._batchChildren = [],
            this.needsUpdate = 0,
            this.position.copyFromFloats(r.position.x, r.position.y + .001, r.position.z);
            let a = new K("MeshBatchMat",e,"planebatch",{
                attributes: ["position", "uv", "alpha", "color"],
                uniforms: ["world", "viewProjection", "border", "textureSampler", "maskSampler"],
                needAlphaBlending: !0
            });
            n.wrapU = s.Texture.CLAMP_ADDRESSMODE,
            n.wrapV = s.Texture.CLAMP_ADDRESSMODE,
            a.setTexture("sourceSampler", i),
            a.setTexture("maskSampler", n),
            a.setVector4("border", new s.Vector4(r.position.x,r.position.z,r.size.w,r.size.h)),
            a.freeze(),
            this.material = a,
            this.freezeWorldMatrix(),
            this.alwaysSelectAsActiveMesh = !0
        }
        dispose(t, e) {
            let i = this._batchChildren;
            for (let t = 0, e = i.length; t !== e; ++t)
                i[t]._weakParent = null;
            i.length = 0,
            super.dispose(t, e)
        }
        addChildb(t, e=!1) {
            e ? this._batchChildren.unshift(t) : this._batchChildren.push(t),
            t._weakParent = this,
            this.needsUpdate |= tt.UPDATE_CHILD_ADD_REMOVE
        }
        removeChildb(t) {
            let e = this._batchChildren.indexOf(t);
            -1 !== e && (this._batchChildren.splice(e, 1),
            t._weakParent = null,
            this.needsUpdate |= tt.UPDATE_CHILD_ADD_REMOVE)
        }
        empty() {
            let t, e = this._batchChildren;
            for (let i = 0, s = e.length; i !== s; ++i)
                (t = e[i])._weakParent = null;
            e.length = 0,
            this.needsUpdate |= tt.UPDATE_CHILD_ADD_REMOVE
        }
        arrange() {
            const t = this._batchChildren;
            let e, i, n, r, a, o, l, h = 0, c = 0, d = 0, u = 0;
            for (this.needsUpdate = 0,
            t.sort(et),
            o = 0,
            l = t.length; o !== l; ++o)
                h += t[o].nVertices,
                c += t[o].i16.length;
            for (e = new Float32Array(3 * h),
            r = new Float32Array(3 * h),
            i = new Float32Array(2 * h),
            n = new Float32Array(h),
            a = new Uint16Array(c),
            o = 0,
            l = t.length; o !== l; ++o)
                t[o]._vOffset = d,
                d += t[o].nVertices,
                u = t[o].setUI(i, a, u),
                t[o].updateAlpha(n),
                t[o].updateRGB(r),
                t[o].updateTransform(e);
            this.setVerticesData(s.VertexBuffer.PositionKind, e, !0, 3),
            this.setVerticesData(s.VertexBuffer.ColorKind, r, !0, 3),
            this.setVerticesData("alpha", n, !0, 1),
            this.setVerticesData(s.VertexBuffer.UVKind, i, !1, 2),
            this.setIndices(a),
            e = null,
            i = null,
            n = null,
            r = null,
            a = null
        }
        updateChildren() {
            if (this.needsUpdate & tt.UPDATE_CHILD_ADD_REMOVE)
                return this.arrange();
            const t = this._batchChildren
              , e = s.VertexBuffer.PositionKind
              , i = s.VertexBuffer.ColorKind;
            let n, r = !1, a = !1, o = !1, l = this.getVerticesData(e, !1), h = this.getVerticesData(i, !1), c = this.getVerticesData("alpha", !1);
            this.needsUpdate = 0;
            for (let e = 0, i = t.length; e !== i; ++e) {
                let i = (n = t[e]).needsUpdate;
                if (i) {
                    if (i & Z.DF_ALPHA && (n.updateAlpha(c),
                    a = !0),
                    n.alpha <= 0)
                        continue;
                    i & Z.DF_TRANSFORM && (n.updateTransform(l),
                    r = !0),
                    i & Z.DF_RGB && (n.updateRGB(h),
                    o = !0)
                }
            }
            r && this.updateVerticesData(e, l),
            o && this.updateVerticesData(i, h),
            a && this.updateVerticesData("alpha", c)
        }
        static createPlane(t, e, i, s, n, r, a, o=0, l=0, h=0) {
            const c = i / 2
              , d = s / 2
              , u = Q.getUVs(t)
              , _ = new Float32Array([-c + o, l, -d + h, u[0], u[1], 1, c + o, l, -d + h, u[2], u[3], 1, c + o, l, d + h, u[4], u[5], 1, -c + o, l, d + h, u[6], u[7], 1])
              , p = new Uint16Array([0, 1, 2, 0, 2, 3]);
            return e ? new $(_,p,n,r,a) : new J(_,p,n,r,a)
        }
    }
    i(33);
    const st = s.PcolDyIBLMaterial
      , nt = s.Texture;
    const rt = {
        stickAlpha: {
            meshName: "StickAlpha",
            specs: {
                len: 1.45,
                tipRadius: .005,
                buttRadius: .015
            },
            manifest: {
                model: i(60),
                glossy: i(59),
                color: i(58)
            },
            createMaterial: function(t, e, i) {
                const s = new st(t,e,i);
                return s.radianceLevel = .12,
                s.irradianceLevel = 1,
                s.roughness = 1,
                s.useRadianceLodRoughness = !0,
                s.reflectivityRoughnessTexture = new nt(this.manifest.glossy,e),
                s.toneMappingMode = 2,
                s.diffuseTexture = new nt(this.manifest.color,e),
                s.setLodFallOff(1.5, 10, 2, 1.5),
                s.freeze(),
                s
            }
        }
    }
      , at = {
        isPending: !0
    }
      , ot = (t,e,i,n=0)=>{
        let r = t._cachedFiles;
        r[e] = at,
        s.Tools.LoadFile(e, s=>{
            let n = ((t,e,i)=>{
                let s, n = Object.create(null);
                try {
                    let r = JSON.parse(i);
                    for (let t = 0, i = r.meshes.length; t !== i; ++t)
                        n[(s = r.meshes[t]).name] = s,
                        s.name = e + "/" + s.name,
                        s.id = e + "/" + s.id
                } catch (t) {
                    n.isError = !0,
                    n.message = t.message
                } finally {
                    t[e] = n
                }
                return n
            }
            )(r, e, s);
            t.__nCachedFiles++,
            void 0 !== i && i(n)
        }
        , null, null, !1, ()=>{
            n >= 3 ? (r[e] = {
                isError: !0,
                message: "bbl file load error..."
            },
            void 0 !== i && i(r[e])) : ot(t, e, i, ++n)
        }
        )
    }
    ;
    var lt = new class {
        get nCachedFiles() {
            return this._nCachedFiles
        }
        get defaultStickName() {
            return this._defaultStickName
        }
        get stickRootFolder() {
            throw new Error("no more stickRootFolder...")
        }
        constructor() {
            this._cachedFiles = Object.create(null),
            this._nCachedFiles = 0,
            this._defaultStickName = "stickAlpha",
            this._defs = rt
        }
        getStickSpecs(t) {
            return this._defs[t].specs
        }
        getStickMaterialName(t) {
            return t + "Mat"
        }
        getStickSourceMeshName(t) {
            const e = this._defs[t];
            return e.bbl + "/" + e.meshName
        }
        getStickMeshName(t) {
            return this._defs[t].meshName
        }
        createSourceMaterial(t, e, i, s) {
            return this._defs[t].createMaterial(e, i, s)
        }
        getParsedMesh(t, e=!1) {
            const i = this._defs[t];
            if (!i)
                return {
                    isError: !0,
                    message: 'stick def not found: "' + t + '"'
                };
            const s = i.manifest.model;
            let n, r, a = this._cachedFiles[s];
            return a ? a.isPending ? null : a.isError ? a : (r = a[n = this.getStickMeshName(t)]) || {
                isError: !0,
                message: 'Data error "' + t + '": ParsedMesh "' + n + '" not found in the file "' + s + '"'
            } : (e || ot(this, s),
            null)
        }
        cacheDefaultFile() {
            return this.getParsedMesh(this._defaultStickName)
        }
    }
    ;
    const ht = Object.create(null);
    ht.READY = "ready";
    let ct = 0
      , dt = !1;
    class ut extends r.a {
        get pendingCount() {
            return this._pendingList.length
        }
        constructor() {
            super(),
            this._meshInstances = [],
            this._materials = Object.create(null),
            this._pendingList = [],
            this._scene = null,
            this._lightProbeManager = null,
            this._pendingCheckTimerId = -1,
            this._onPendingCheckTimeout = (()=>{
                this._pendingCheckTimerId = -1;
                let t = [];
                for (let e = 0, i = this._pendingList.length; e !== i; ++e)
                    t[e] = this._pendingList[e];
                this._pendingList.length = 0;
                for (let e = 0, i = t.length; e !== i; ++e)
                    this.requireStick(t[e]);
                0 === this._pendingList.length && this.emit(ht.READY)
            }
            )
        }
        resetScene(t, e) {
            this._scene = t,
            this._lightProbeManager = e
        }
        unload() {
            this.cancelPendingCheck(),
            this._scene = null,
            this._lightProbeManager = null,
            this._meshInstances.length = 0,
            this._materials = Object.create(null)
        }
        cancelPendingCheck() {
            -1 !== this._pendingCheckTimerId && (window.clearTimeout(this._pendingCheckTimerId),
            this._pendingCheckTimerId = -1),
            this._pendingList.length = 0
        }
        _pushPending(t) {
            -1 === this._pendingList.indexOf(t) && this._pendingList.push(t),
            -1 === this._pendingCheckTimerId && (this._pendingCheckTimerId = window.setTimeout(this._onPendingCheckTimeout, 120))
        }
        _searchUnusedInstance(t, e) {
            const i = this._meshInstances;
            let s;
            for (let n = 0, r = i.length; n !== r; ++n)
                if (!(s = i[n]).inUse && s[t] === e)
                    return s;
            return null
        }
        _searchInstance(t, e) {
            const i = this._meshInstances;
            let s;
            for (let n = 0, r = i.length; n !== r; ++n)
                if ((s = i[n])[t] === e)
                    return s;
            return null
        }
        getStickMaterial(t, e=!1) {
            const i = lt.getStickMaterialName(t);
            let s = this._materials[i];
            return s || e || ((s = lt.createSourceMaterial(t, i, this._scene, this._lightProbeManager)).freeze(),
            this._materials[i] = s),
            s
        }
        markAllStickAsUnused() {
            const t = this._meshInstances;
            for (let e = 0, i = t.length; e !== i; ++e)
                this.markStickMeshAsUnused(t[e])
        }
        markStickMeshAsUnused(t) {
            t.isVisible = !1,
            t.inUse = !1
        }
        requireStick(t) {
            dt || (dt = !0,
            lt.cacheDefaultFile());
            let e = this._searchUnusedInstance("stickName", t);
            if (e)
                return e;
            let i = lt.getStickSourceMeshName(t);
            if (e = this._searchUnusedInstance("sourceMeshName", i)) {
                let i = this.getStickMaterial(t);
                return i !== e.material && (e.material = i),
                e.stickName = t,
                e.specs = lt.getStickSpecs(t),
                e
            }
            let n = this._searchInstance("sourceMeshName", i);
            if (n)
                return (e = n.clone(n.name + ++ct, null, !0, !1)).sourceMeshName = i,
                this.markStickMeshAsUnused(e),
                this._meshInstances.push(e),
                e.material = this.getStickMaterial(t),
                e.stickName = t,
                e.specs = lt.getStickSpecs(t),
                e;
            let r = lt.getParsedMesh(t);
            if (r) {
                if (r.isError)
                    throw new Error("ParsedMesh error(4.2): " + r.message);
                return (e = s.Mesh.Parse(r, this._scene, "")).sourceMeshName = i,
                this.markStickMeshAsUnused(e),
                this._meshInstances.push(e),
                e.material = this.getStickMaterial(t),
                e.stickName = t,
                e.specs = lt.getStickSpecs(t),
                e
            }
            return this._pushPending(t),
            null
        }
    }
    const _t = Object.create(null);
    _t.DF_ALPHA = 1,
    _t.DF_LEN = 2;
    class pt extends s.Mesh {
        constructor(t, e, i) {
            super(t, e);
            let n = [-.19, .01, -.01475, -.19, .01, -.01525, -.1895, .01, -.01475, -.1895, .01, -.01525, -.0405, .01, -.01475, -.0405, .01, -.01525, -.04, .01, -.01475, -.04, .01, -.01525]
              , r = Q.getUVs("powerTrack")
              , a = (r[7] - r[1]) / 3
              , o = [r[0], r[1], r[2], r[3], r[0], r[1] + a, r[2], r[3] + a, r[0], r[1] + 2 * a, r[2], r[3] + 2 * a, r[6], r[7], r[4], r[5]];
            this.offsetX = -.04;
            let l = s.VertexBuffer;
            this.setVerticesData(l.PositionKind, n, !0, 3),
            this.setVerticesData(l.UVKind, o, !1, 2),
            this.setVerticesData(l.NormalKind, [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], !1),
            this.setIndices([0, 1, 3, 0, 3, 2, 2, 3, 5, 2, 5, 4, 4, 5, 7, 4, 7, 6]);
            let h = new K(t + "Mat",e,"powerview",{
                attributes: ["position", "uv"],
                uniforms: ["world", "viewProjection", "textureSampler", "highlightColor", "alpha", "bgAlpha", "highlightLen"],
                needAlphaBlending: !0
            });
            h.setTexture("textureSampler", i),
            h.setColor3("highlightColor", new s.Color3(H.BLUE[0],H.BLUE[1],H.BLUE[2])),
            h.setFloat("bgAlpha", .25),
            this.material = h,
            this._trackLen = NaN,
            this._autoAlpha = NaN,
            this._percent = NaN,
            this.needsUpdate = 0,
            this.trackLen = .15,
            this.autoAlpha = 0,
            this.percent = 0,
            this.renderingGroupId = 1
        }
        get trackLen() {
            return this._trackLen
        }
        set trackLen(t) {
            this._trackLen !== t && (this._trackLen = t,
            this.needsUpdate |= _t.DF_LEN)
        }
        get autoAlpha() {
            return this._autoAlpha
        }
        set autoAlpha(t) {
            this._autoAlpha !== t && (this._autoAlpha = t,
            this.needsUpdate |= _t.DF_ALPHA)
        }
        get percent() {
            return this._percent
        }
        set percent(t) {
            this._percent !== t && (this._percent = t,
            this.needsUpdate |= _t.DF_LEN)
        }
        updateUI() {
            let t = this.needsUpdate;
            this.needsUpdate = 0,
            this.isVisible = !!this._autoAlpha,
            t & _t.DF_LEN && this.material.setFloat("highlightLen", this._trackLen * this._percent - this.offsetX),
            this.isVisible && t & _t.DF_ALPHA && this.material.setFloat("alpha", this._autoAlpha)
        }
    }
    class ft extends $ {
        constructor(t, e, i, s, n, r) {
            super(t, e, i, s, n),
            this.distance = r,
            this.ow = 0,
            this.spacing = 0
        }
    }
    const gt = Object.create(null);
    gt.SOLID = 0,
    gt.GRADIENT = 1;
    const mt = [1, 0]
      , yt = [4, 5, 6, 7];
    class vt {
        get alpha() {
            return this._globalAlpha
        }
        set alpha(t) {
            this._globalAlpha !== t && (this._globalAlpha = t,
            this.needsUpdate = !0)
        }
        constructor(t, e=1e-4) {
            this.radius = 0;
            const i = H.WHITE
              , s = H.YELLOW;
            let n = this.createLineSeg(e, "gs2", !0)
              , r = it.createPlane("gs1", !1, 1, 1, i[0], i[1], i[2], 0, e, 0)
              , a = this.createLineSeg(e, "gs2", !1)
              , o = it.createPlane("gs1", !1, 1, 1, i[0], i[1], i[2], 0, e, 0)
              , l = this.createLineSeg(e, "gs3", !1);
            n.zIndex = -10,
            a.zIndex = -10,
            l.zIndex = -10,
            r.zIndex = -10,
            o.zIndex = 10,
            vt.setAlphaMode(n, gt.GRADIENT),
            vt.setAlphaMode(a, gt.GRADIENT),
            vt.setAlphaMode(l, gt.GRADIENT),
            l.copyRGB(s[0], s[1], s[2]),
            this.segments = [n, r, a, o, l],
            this.needsUpdate = !1,
            this._globalAlpha = 1,
            this.segAlphas = [1, 0, 0, 0, 0];
            for (let e = 0, i = this.segments.length; e !== i; ++e)
                t.addChildb(this.segments[e]);
            this.needsSync = !1,
            this._isValidColor = !0
        }
        static setAlphaMode(t, e) {
            t.alphaMode !== e && (t.alphaMode = e,
            t.setVerticesAlphas(yt, mt[e]))
        }
        static setPlaneSize(t, e) {
            let i = t.v32
              , s = e / 2;
            i[0] = -s,
            i[2] = -s,
            i[6] = s,
            i[8] = -s,
            i[12] = s,
            i[14] = s,
            i[18] = -s,
            i[20] = s,
            t.markTransformDirty()
        }
        static setSegmentSize(t, e, i) {
            let s = Q.getFrame("gs2")
              , n = e / 2
              , r = s.headH * e / s.w
              , a = t.v32;
            t.spacing = i,
            t.ow = e,
            a[2] = t.spacing,
            a[8] = t.spacing,
            a[14] = t.spacing + r,
            a[20] = t.spacing + r;
            for (let t = 0, e = a.length / 6; t !== e; t += 2)
                a[6 * t] = -n,
                a[6 * (t + 1)] = n
        }
        static setSegmentDistance(t, e) {
            if (t.distance !== e) {
                t.distance = e;
                let i, s = t.v32, n = s[14] - s[2];
                switch (s.length / 6) {
                case 8:
                    (i = e - 2 * n) < 0 && (i = 0),
                    s[26] = s[14] + i,
                    s[32] = s[26],
                    s[38] = s[26] + n,
                    s[44] = s[38];
                    break;
                case 6:
                    (i = e - n) < 0 && (i = 0),
                    s[26] = s[14] + i,
                    s[32] = s[26];
                    break;
                default:
                    throw new Error("Unknown batchData")
                }
                t.markTransformDirty()
            }
        }
        static setSegmentOpen(t, e) {
            let i = t.distance
              , s = t.ow
              , n = .5 * s
              , r = (i - s) * e * 2.8
              , a = t.v32
              , o = a[2]
              , l = 0;
            r < 0 && (r = 0);
            for (let t = 1, e = a.length / 12; t < e; ++t)
                l = (a[12 * t + 2] - o) / i * r,
                a[12 * t] = -n - l,
                a[12 * t + 6] = n + l;
            t.markTransformDirty()
        }
        dispose() {
            const t = this.segments;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].dispose();
            t.length = 0
        }
        setSegAlpha(t, e) {
            this.segAlphas[t] !== e && (this.segAlphas[t] = e,
            this.needsUpdate = !0)
        }
        setColorValid(t) {
            if (t !== this._isValidColor) {
                this._isValidColor = t;
                let e = t ? H.WHITE : H.RED;
                this.segments[3].copyRGB(e[0], e[1], e[2])
            }
        }
        createLineSeg(t, e, i) {
            void 0 === e && (e = "gs2");
            const s = Q.getFrame(e);
            let n = s.h
              , r = Q.getUVs(e)
              , a = r[0]
              , o = r[1]
              , l = r[2]
              , h = r[3]
              , c = r[6]
              , d = r[7]
              , u = r[4]
              , _ = r[5]
              , p = s.headH / n
              , f = 1 - p
              , g = [0, t, 0, a, o, 1, 0, t, 0, l, h, 1, 0, t, 0, a + (c - a) * p, o + (d - o) * p, 1, 0, t, 0, l + (u - l) * p, h + (_ - h) * p, 1, 0, t, 0, a + (c - a) * f, o + (d - o) * f, 1, 0, t, 0, l + (u - l) * f, h + (_ - h) * f, 1]
              , m = [0, 1, 3, 0, 3, 2, 2, 3, 5, 2, 5, 4];
            return i && (g.push(0, t, 0, c, d, 1, 0, t, 0, u, _, 1),
            m.push(4, 5, 7, 4, 7, 6)),
            new ft(new Float32Array(g),new Uint16Array(m),1,1,1,n)
        }
        setRadius(t) {
            this.radius !== t && (this.radius = t,
            vt.setPlaneSize(this.segments[1], 2 * t),
            vt.setPlaneSize(this.segments[3], 2 * t),
            vt.setSegmentSize(this.segments[0], t, t),
            vt.setSegmentSize(this.segments[2], t, t),
            vt.setSegmentSize(this.segments[4], .5 * t, t))
        }
        update() {
            this.needsUpdate = !1;
            let t = this.segments
              , e = this.segAlphas
              , i = this._globalAlpha;
            for (var s = 0, n = t.length; s !== n; ++s)
                t[s].alpha = i * e[s]
        }
        syncPrediction(t, e, i) {
            let n, r, a, o, l = this.segments[0], h = this.segments[1], c = this.segments[2], d = this.segments[3], u = this.segments[4], _ = t.p0;
            if (this.needsSync = !1,
            l.copyPositionXYZ(_.x, 0, _.z),
            !t.impactOccured)
                return this.setSegAlpha(1, 0),
                this.setSegAlpha(2, 0),
                this.setSegAlpha(3, 0),
                this.setSegAlpha(4, 0),
                n = t.cue.x - _.x,
                r = t.cue.z - _.z,
                (a = Math.sqrt(n * n + r * r)) <= (o = l.spacing) ? this.setSegAlpha(0, 0) : (this.setSegAlpha(0, 1),
                l.setOrientation2D(n / a, r / a, !0),
                vt.setSegmentDistance(l, a - o)),
                void this.setColorValid(!0);
            n = t.p1.x - _.x,
            r = t.p1.z - _.z,
            (a = Math.sqrt(n * n + r * r)) <= (o = 2 * l.spacing) ? (this.setSegAlpha(0, 0),
            l.setOrientation2D(t.impactV1.x, t.impactV1.z)) : (this.setSegAlpha(0, 1),
            l.setOrientation2D(n / a, r / a, !0),
            vt.setSegmentDistance(l, a - o)),
            this.setSegAlpha(1, 1),
            h.copyPositionXYZ(t.p1.x, 0, t.p1.z);
            var p = .5 * ((n = t.cue.x - t.p1.x) * n + (r = t.cue.z - t.p1.z) * r)
              , f = .5 * t.cueVSq;
            if ((a = Math.min(p + f, i - a)) <= (o = c.spacing) ? this.setSegAlpha(2, 0) : (c.copyPositionXYZ(t.p1.x, 0, t.p1.z),
            this.setSegAlpha(2, 1),
            c.setOrientation2D(n, r),
            vt.setSegmentDistance(c, a - o)),
            !t.hasImpactTarget)
                return this.setSegAlpha(3, 0),
                this.setSegAlpha(4, 0),
                void this.setColorValid(!0);
            this.setSegAlpha(3, 1),
            d.copyPositionXYZ(t.p2.x, 0, t.p2.z),
            this.setColorValid(Math.pow(2, t.targetNumber) & e),
            (a = Math.min(.5 * t.targetVSq, .4)) <= (o = u.spacing) ? this.setSegAlpha(4, 0) : (u.copyPositionXYZ(t.p2.x, 0, t.p2.z),
            this.setSegAlpha(4, 1),
            u.setOrientation2D(t.target.x - t.p2.x, t.target.z - t.p2.z),
            vt.setSegmentDistance(u, a - o),
            vt.setSegmentOpen(u, 1 - s.Vector2.Dot(l.getOrientation2D(), u.getOrientation2D())))
        }
    }
    const bt = A.a.Vec3;
    class xt {
        get diagonal() {
            return this._diagonal
        }
        constructor() {
            this.position = new bt,
            this.size = Object.create(null),
            this.size.w = 0,
            this.size.h = 0,
            this._diagonal = 0,
            this.pockets = [xt.makePocket(), xt.makePocket(), xt.makePocket(), xt.makePocket(), xt.makePocket(), xt.makePocket()]
        }
        reset(t, e, i, s, n) {
            this.position.set(t, e, i),
            this.size.w = s,
            this.size.h = n;
            let r = this.pockets
              , a = .5 * s - .05
              , o = .5 * n - .05
              , l = .5 * n - .05 * .4
              , h = -Math.cos(65 * Math.PI / 180);
            xt.setPocket(r[0], t - a, e, i - o, 1, 0, 1, .05, 0),
            xt.setPocket(r[1], t - a, e, i + o, 1, 0, -1, .05, 0),
            xt.setPocket(r[2], t, e, i - l, 0, 0, 1, .05, h),
            xt.setPocket(r[3], t, e, i + l, 0, 0, -1, .05, h),
            xt.setPocket(r[4], t + a, e, i - o, -1, 0, 1, .05, 0),
            xt.setPocket(r[5], t + a, e, i + o, -1, 0, -1, .05, 0),
            this._diagonal = Math.sqrt(s * s + n * n)
        }
        static makePocket() {
            let t = Object.create(null);
            return t.position = new bt,
            t.normal = new bt,
            t.radius = 0,
            t.maxHalfOpen = 0,
            t
        }
        static setPocket(t, e, i, s, n, r, a, o, l) {
            t.position.set(e, i, s),
            t.normal.set(n, r, a).normalize(),
            t.radius = o,
            t.maxHalfOpen = l
        }
    }
    const St = {
        LOADED: "loaded",
        READY: "ready"
    }
      , Ct = {
        ERROR: -1,
        NO_SCENE: 0,
        LOADING: 1,
        READY_TO_BUILD: 2,
        SYNCHRONIZED: 3,
        READY: 4
    }
      , It = {
        high: 32,
        low: 20
    };
    class Tt extends r.a {
        get camera() {
            return this._defCamera
        }
        get playArea() {
            return this._playArea
        }
        get state() {
            return this._state
        }
        get canvas() {
            return this._canvas
        }
        get trackInfo() {
            return this._trackInfo
        }
        get respotIcon() {
            return this._respotIcon1
        }
        get ballMeshes() {
            return this._ballMeshes
        }
        get ballRadius() {
            return this._syncList.ballRadius
        }
        get cushionBody() {
            return this._cushionBody
        }
        get powerUI() {
            return this._powerUI
        }
        get gunsight() {
            return this._gunsight
        }
        get sceneId() {
            return this._sceneId
        }
        constructor(t, e) {
            super(),
            this._engine = t,
            this._canvas = e,
            this._syncList = Object.create(null),
            this._syncList.sceneId = "",
            this._syncList.ballSet = [],
            this._syncList.ballRadius = 0,
            this._state = Ct.NO_SCENE,
            this._nRenderRequired = 0,
            this._isHidding = !0,
            this._showHideTween = new Y(e.style).reset({
                opacity: 0
            }, {
                opacity: 1
            }, q.Power1.easeIn, .45).requireUpdate(),
            this._sceneId = "",
            this._scene = null,
            this._defCamera = null,
            this._playArea = new xt,
            this._trackInfo = Object.create(null),
            this._sharedTextures = Object.create(null),
            this._lightProbeManager = null,
            this._cushionBody = null,
            this._tableView = null,
            this._powerUI = null,
            this._gunsight = null,
            this._respotIcon0 = it.createPlane("respot0", !0, .11, .11, H.WHITE[0], H.WHITE[1], H.WHITE[2]),
            this._respotIcon1 = it.createPlane("respot1", !1, .08, .08),
            this._respotIcon0.alpha = 0,
            this._respotIcon1.alpha = 0,
            this._respotIcon0.zIndex = -10,
            this._respotIcon1.zIndex = -10,
            this._icon0Angle = 0,
            this._ballMeshes = [],
            this._ballMaterials = Object.create(null),
            this.ballSyncEvolution = -1,
            this._stickManager = new ut,
            this._mouseCameraRay = s.Ray.Zero()
        }
        sync(t) {
            let e = !1;
            if (void 0 !== t.sceneId && (this._syncList.sceneId = t.sceneId,
            e = !0),
            void 0 !== t.ballSet) {
                for (let e = 0, i = t.ballSet.length; e !== i; ++e)
                    this._syncList.ballSet[e] = t.ballSet[e];
                this._syncList.ballSet.length = t.ballSet.length,
                e = !0
            }
            void 0 !== t.ballRadius && (this._syncList.ballRadius = t.ballRadius,
            e = !0),
            this._syncList.stickName = t.stickName,
            void 0 !== this._syncList.stickName && (e = !0),
            e ? this._state !== Ct.LOADING && this._checkSyncList() : this._state === Ct.READY && this.emit(St.READY)
        }
        requireRender(t=1) {
            this._nRenderRequired < t && (this._nRenderRequired = t)
        }
        syncBalls(t, e) {
            this.ballSyncEvolution = e;
            const i = this._playArea.position.y
              , s = this._ballMeshes;
            let n, r;
            for (let e = 0, a = t.length; e !== a; ++e)
                n = s[e],
                (r = t[e]).active ? (n.isVisible = !0,
                n.position.copyFrom(r.states.position),
                n.rotationQuaternion.copyFrom(r.states.orientation),
                r.position.y < i ? n.shadow.alpha = 0 : (n.shadow.alpha = n.shadow.displayAlpha,
                n.shadow.copyPositionXYZ(n.position.x, 0, n.position.z))) : n.isVisible && (n.isVisible = !1,
                n.shadow.alpha = 0);
            this.requireRender()
        }
        requireStick(t) {
            return this._stickManager.requireStick(t)
        }
        markStickAsUnused(t) {
            return this._stickManager.markStickMeshAsUnused(t)
        }
        cancelStickPendingCheck() {
            return this._stickManager.cancelPendingCheck()
        }
        update(t) {
            const e = this._showHideTween
              , i = this._tableView;
            if (this._nRenderRequired > 0 && (t = !0,
            this._nRenderRequired--),
            this._state >= Ct.SYNCHRONIZED) {
                const e = this._gunsight;
                this._respotIcon0.alpha > 0 && (this._icon0Angle += .06,
                this._respotIcon0.setOrientation2D(Math.sin(this._icon0Angle), Math.cos(this._icon0Angle), !0)),
                e.needsUpdate && e.update(),
                i.needsUpdate && (i.updateChildren(),
                t = !0),
                this._powerUI.needsUpdate && (this._powerUI.updateUI(),
                t = !0),
                t && this._scene.render()
            }
            if (e.needsUpdate) {
                e.update(.016);
                let t = e.target;
                t.visibility = t.opacity > 0 ? "inherit" : "hidden"
            }
        }
        freezeMaterials() {
            let t, e, i, s = this._scene.materials;
            for (t = 0,
            e = s.length; t !== e; ++t)
                (i = s[t]).doNotFreeze || i.freeze()
        }
        showRespotIcons(t) {
            this._respotIcon0.copyPositionXYZ(t.x, 0, t.z),
            this._respotIcon0.alpha = .75
        }
        hideRespotIcons() {
            this._respotIcon0.alpha = 0,
            this._respotIcon1.alpha = 0
        }
        mouseCameraRay(t, e) {
            return this._scene.createPickingRayToRef(t, e, null, this._mouseCameraRay, null),
            this._mouseCameraRay
        }
        show(t) {
            this._isHidding && (this._isHidding = !1,
            t ? this._showHideTween.end() : this._showHideTween.play())
        }
        hide(t) {
            this._isHidding || (this._isHidding = !0,
            t ? this._showHideTween.pause(0) : this._showHideTween.reverse())
        }
        _checkSyncList() {
            const t = this._syncList;
            if (t.sceneId !== this._sceneId) {
                this._unload(),
                this.hide();
                const e = z[t.sceneId];
                if (!e)
                    return void (this._state = Ct.ERROR);
                this._sceneId = t.sceneId,
                this._state = Ct.LOADING;
                let i = e.manifest.model.split("/")
                  , n = i.pop();
                return void s.SceneLoader.Load(i.join("/") + "/", n, this._engine, t=>{
                    this._scene = t,
                    this._state = Ct.READY_TO_BUILD,
                    this._checkSyncList()
                }
                , void 0, (t,e,i)=>{
                    if (this._state = Ct.ERROR,
                    e && console.error(e),
                    i)
                        throw i
                }
                )
            }
            this._state === Ct.READY_TO_BUILD && (this._buildScene(),
            this.emit(St.LOADED)),
            this._state = Ct.ERROR;
            let e, i, n = this._ballMeshes, r = t.ballSet, a = !1, o = 0;
            n.length > 0 && t.ballRadius !== n[0].radius && this._unloadAllBallMeshes();
            for (let t = 0, s = r.length / 3; t !== s; ++t) {
                if (e = r[3 * t],
                !(i = n[t])) {
                    if (!(i = this._smartCreateBallMesh("b_" + t, e)))
                        return;
                    n[t] = i,
                    a = !0
                }
                i.number !== e && (i.number = e,
                i.material = this._getBallMaterial(e),
                a = !0),
                o++
            }
            for (let t = n.length - 1; t >= o; --t)
                this._disposeBallMesh(n[t]),
                n.splice(t, 1),
                a = !0,
                console.error("\t\t- remove balls: YES index[" + t + "]");
            if (a) {
                this._gunsight.setRadius(t.ballRadius);
                for (let t = 0, e = n.length; t !== e; ++t)
                    n[t].position.copyFromFloats(r[3 * t + 1], this._playArea.position.y + n[t].radius, r[3 * t + 2]),
                    n[t].shadow.copyPositionXYZ(r[3 * t + 1], 0, r[3 * t + 2]),
                    n[t].shadow.alpha = n[t].shadow.displayAlpha
            }
            for (let t = 0, e = n.length; t !== e; ++t)
                if (!n[t]._fp_)
                    throw console.error("logic error: no fingerprint found in ball [" + t + "]:", n),
                    new Error("logic error: no fingerprint found in ball");
            if (this._state = Ct.SYNCHRONIZED,
            this._syncList.stickName) {
                if (Array.isArray(this._syncList.stickName)) {
                    let t = this._syncList.stickName;
                    for (let e = 0, i = t.length; e !== i; ++e)
                        this._stickManager.requireStick(t[e])
                } else
                    this._stickManager.requireStick(this._syncList.stickName);
                if (this._stickManager.pendingCount > 0)
                    return void this._stickManager.on(ht.READY, ()=>{
                        this._stickManager.removeAllListeners(ht.READY),
                        this._scene.executeWhenReady(()=>{
                            this._state = Ct.READY,
                            this.emit(St.READY)
                        }
                        )
                    }
                    )
            }
            this._scene.executeWhenReady(()=>{
                this._state = Ct.READY,
                this.emit(St.READY)
            }
            )
        }
        _smartCreateBallMesh(t, e) {
            const i = this._scene.meshes
              , n = 0 === e ? "high" : "low";
            let r, a, o;
            for (let e = 0, s = i.length; e !== s; ++e)
                if ((r = i[e])._fp_ === n) {
                    o = r.clone(t, void 0, !0);
                    break
                }
            if (!o) {
                if ((a = 2 * this._syncList.ballRadius) <= 1e-6)
                    throw console.error('failed to create ball, error ballRadius: "' + this._syncList.ballRadius + '"'),
                    new Error('failed to create ball, error ballRadius: "' + this._syncList.ballRadius + '"');
                o = s.MeshBuilder.CreateSphere(t, {
                    segments: It[n],
                    diameter: a
                }, this._scene)
            }
            if (o.radius = this._syncList.ballRadius,
            o._fp_ = n,
            o.rotationQuaternion || (o.rotationQuaternion = new s.Quaternion(0,0,0,1)),
            !o.shadow) {
                const t = z[this._sceneId];
                let e = it.createPlane("shadow", !1, 2.6 * o.radius, 2.6 * o.radius, 0, 0, 0);
                t.customizeShadow(e),
                this._tableView.addChildb(e, !1),
                o.shadow = e
            }
            return o
        }
        _getBallMaterial(t) {
            let e = t + ""
              , i = this._ballMaterials[e];
            if (!i) {
                (i = z[this._sceneId].createBallMaterial(t, this._scene, this._sharedTextures, this._lightProbeManager)) && (this._ballMaterials[e] = i)
            }
            return i
        }
        _buildScene() {
            const t = this._scene
              , e = this._sceneId
              , i = z[e]
              , n = i.playArea
              , r = i.camInitialPosition;
            let a;
            for (; t.cameras.length; )
                (a = t.cameras[0]).dispose();
            t.detachControl(),
            i.trackInfo ? (this._trackInfo.radius = i.trackInfo.radius,
            this._trackInfo.scaleX = i.trackInfo.scaleX) : (this._trackInfo.radius = 2,
            this._trackInfo.scaleX = 1.5),
            this._playArea.reset(n.x, n.y, n.z, n.w, n.h),
            i.addSharedTextures(this._sharedTextures, t),
            i.beautify(t),
            this._defCamera = new s.TargetCamera("defCam",new s.Vector3(r.x,r.y,r.z),t),
            this._defCamera.lockedTarget = new s.Vector3(n.x,n.y,n.z),
            this._lightProbeManager = i.createLightProbeManager(t),
            this._cushionBody = i.getCushionBody(),
            this._tableView = new it("table2d",t,this._sharedTextures.tableUI,this._sharedTextures.tableMask,this._playArea),
            this._tableView.addChildb(this._respotIcon0),
            this._tableView.addChildb(this._respotIcon1),
            this._stickManager.resetScene(this._scene, this._lightProbeManager),
            this._powerUI = new pt("powerui",t,this._sharedTextures.tableUI),
            this._gunsight = new vt(this._tableView),
            this._gunsight.alpha = 0
        }
        _unload() {
            let t;
            for (t in this._state = Ct.NO_SCENE,
            this._sceneId = "",
            this._stickManager.unload(),
            this._tableView && (this._tableView.dispose(),
            this._tableView = null),
            this._gunsight && (this._gunsight.dispose(),
            this._gunsight = null),
            this._powerUI = null,
            this._unloadAllBallMeshes(),
            this._ballMaterials)
                delete this._ballMaterials[t];
            for (t in this._sharedTextures)
                delete this._sharedTextures[t];
            this._defCamera = null,
            this._lightProbeManager && (this._lightProbeManager.dispose(),
            this._lightProbeManager = null),
            this._cushionBody = null,
            this._scene && (this._scene.dispose(),
            this._scene = null)
        }
        _unloadAllBallMeshes() {
            let t = this._ballMeshes;
            for (let e = 0, i = t.length; e !== i; ++e)
                this._disposeBallMesh(t[e]);
            t.length = 0
        }
        _disposeBallMesh(t) {
            t.shadow && (t.shadow.dispose(),
            t.shadow = null),
            t.dispose()
        }
    }
    class At extends S {
        _logSelfAPI(t, e, i="") {
            throw new Error("debug function called: logSelfAPI")
        }
        _logMV(t, e, i) {
            throw new Error("debug function called: logMV")
        }
        constructor(t) {
            super(t),
            this._gView = null,
            this._uiLayer = null,
            this._uiRegistered = !1,
            this._model = null
        }
        launch(t) {
            super.launch(),
            this._gView = t.gView,
            this._uiLayer = t.uiLayer,
            this._uiRegistered || (this._registerUI(),
            this._uiRegistered = !0),
            this._bindUI(),
            this._model.asyncLaunch(t=>{
                this._onModelLaunched(t)
            }
            )
        }
        _registerUI() {
            0
        }
        _bindUI() {}
        _unbindUI() {}
        _onModelLaunched(t) {
            this._gView.on(St.READY, ()=>{
                this._onItemsReady()
            }
            ).sync(t)
        }
        _onItemsReady() {
            this._gView.removeAllListeners(St.READY),
            this.emit(m.READY)
        }
        enter() {
            this._gView.requireRender(),
            super.enter()
        }
        updateEntering(t) {
            t.duration > 0 && this.emit(m.ENTERED)
        }
        action() {
            super.action(),
            this._bindEvents(),
            this._gView.freezeMaterials()
        }
        updateActing() {}
        _bindEvents() {
            0
        }
        _unbindEvents() {
            0
        }
        block() {}
        unblock() {}
        exit() {
            super.exit(),
            this._unbindEvents()
        }
        updateExiting(t) {
            t.duration > 0 && this.emit(m.EXITED)
        }
        free() {
            this._unbindUI(),
            this._gView = null,
            this._uiLayer = null,
            super.free()
        }
    }
    var Et = i(32)
      , wt = i.n(Et);
    const Rt = 1e-6;
    class kt {
        constructor(t=0, e=0) {
            this.x = t,
            this.y = e
        }
        set(t, e) {
            return this.x = t,
            this.y = e,
            this
        }
        copy(t) {
            return this.x = t.x,
            this.y = t.y,
            this
        }
        clone() {
            return new kt(this.x,this.y)
        }
        toString() {
            return "{" + this.x + ", " + this.y + "}"
        }
        lengthSq() {
            return this.x * this.x + this.y * this.y
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        }
        normalize() {
            const t = this.length();
            if (t > 0) {
                const e = 1 / t;
                this.x *= e,
                this.y *= e
            } else
                this.x = 0,
                this.y = 0;
            return this
        }
        normalizeVector(t) {
            const e = t.length();
            if (e > 0) {
                const i = 1 / e;
                this.x = t.x * i,
                this.y = t.y * i
            } else
                this.x = 0,
                this.y = 0;
            return this
        }
        add(t) {
            return this.x += t.x,
            this.y += t.y,
            this
        }
        addVectors(t, e) {
            return this.x = t.x + e.x,
            this.y = t.y + e.y,
            this
        }
        addScaled(t, e) {
            this.x += t.x * e,
            this.y += t.y * e
        }
        interpolate(t, e, i) {
            return this.x = t.x + e.x * i,
            this.y = t.y + e.y * i,
            this
        }
        sub(t) {
            return this.x -= t.x,
            this.y -= t.y,
            this
        }
        subVectors(t, e) {
            return this.x = t.x - e.x,
            this.y = t.y - e.y,
            this
        }
        dot(t) {
            return this.x * t.x + this.y * t.y
        }
        distanceToSq(t) {
            let e = this.x - t.x
              , i = this.y - t.y;
            return e * e + i * i
        }
        distanceTo(t) {
            let e = this.x - t.x
              , i = this.y - t.y;
            return Math.sqrt(e * e + i * i)
        }
        scale(t) {
            return this.x *= t,
            this.y *= t,
            this
        }
        scaleVector(t, e) {
            return this.x = t * e.x,
            this.y = t * e.y,
            this
        }
        isZero() {
            return 0 === this.x && 0 === this.y
        }
        almostZero() {
            const t = Rt;
            return !(Math.abs(this.x) > t || Math.abs(this.y) > t)
        }
        almostEquals(t) {
            const e = Rt;
            return !(Math.abs(this.x - t.x) > e || Math.abs(this.y - t.y) > e)
        }
        lerp(t, e) {
            return this.x += (t.x - this.x) * e,
            this.y += (t.y - this.y) * e,
            this
        }
    }
    class Pt {
        constructor(t=0, e=0) {
            this.k = t,
            this.b = e
        }
        static createWithXYXY(t, e, i, s) {
            return (new Pt).resetWithXYXY(t, e, i, s)
        }
        static createWithKXY(t, e, i) {
            return t === 1 / 0 || t === -1 / 0 ? new Pt(1 / 0,e) : new Pt(t,i - t * e)
        }
        static createWithX(t) {
            return new Pt(1 / 0,t)
        }
        static createWithY(t) {
            return new Pt(0,t)
        }
        resetWithXYXY(t, e, i, s) {
            if (t === i) {
                if (e === s)
                    throw new Error("GEO2D.Line.resetWithXYXY: same points");
                this.k = 1 / 0,
                this.b = t
            } else
                this.k = (e - s) / (t - i),
                this.b = e - this.k * t;
            return this
        }
        toString() {
            return isFinite(this.k) ? 0 == this.k ? "y = " + this.b : "y = " + this.k + " * x + (" + this.b + ")" : "x = " + this.b
        }
        hasXY(t, e, i) {
            return void 0 === i && (i = Rt),
            isFinite(this.k) ? Math.abs(e - (this.k * t + this.b)) <= i : Math.abs(t - this.b) <= i
        }
        getX(t) {
            return isFinite(this.k) ? 0 === this.k ? NaN : (t - this.b) / this.k : this.b
        }
        getY(t) {
            return isFinite(this.k) ? this.k * t + this.b : NaN
        }
        intersectWithLine(t, e) {
            if (e.clear(),
            isFinite(this.k) || isFinite(t.k)) {
                if (isFinite(this.k)) {
                    if (isFinite(t.k)) {
                        let i = (t.b - this.b) / (this.k - t.k);
                        return isNaN(i) ? e.setInfinity() : isFinite(i) ? e.add(i, this.getY(i)) : e
                    }
                    return e.add(t.b, this.getY(t.b))
                }
                return e.add(this.b, t.getY(this.b))
            }
            return this.b === t.b ? e.setInfinity() : e
        }
    }
    const Dt = [];
    class Lt {
        constructor(t=1, e=1, i=0, s=0) {
            this.cx = i,
            this.cy = s,
            this.a = t,
            this.b = e,
            this.aa = t * t,
            this.bb = e * e,
            this.aabb = this.aa * this.bb
        }
        static createWithScaledCircle(t, e, i, s, n) {
            return new Lt(t * i,e * i,s,n)
        }
        resetWithScaledCircle(t, e, i, s=0, n=0) {
            this.cx = s,
            this.cy = n,
            this.a = t * i,
            this.b = e * i,
            this.aa = this.a * this.a,
            this.bb = this.b * this.b,
            this.aabb = this.aa * this.bb
        }
        hasXY(t, e, i) {
            void 0 === i && (i = Rt);
            let s = t - this.cx
              , n = e - this.cy;
            return Math.abs(s * s / this.aa + n * n / this.bb - 1) <= i
        }
        angleToCenter(t, e) {
            return Math.atan2((e - this.cy) * this.a, (t - this.cx) * this.b)
        }
        intersectWithLine(t, e) {
            e.clear();
            const i = Rt;
            let s, n, r, a, o, l;
            if (Math.abs(t.k) < i) {
                if (n = t.b,
                (r = Dt).length = 0,
                this.getXs(n, r),
                0 === r.length)
                    return e;
                for (o = 0,
                l = r.length; o < l; ++o)
                    e.add(r[o], n);
                return e
            }
            if (isFinite(t.k)) {
                let n = this.aa * t.b
                  , r = this.cx * this.bb
                  , a = this.cy * this.aa
                  , o = this.bb + this.aa * t.k * t.k
                  , l = t.k * n - r - t.k * a
                  , h = l * l - o * (this.cx * r + this.aa * t.b * t.b + this.cy * a - this.aabb - 2 * this.cy * n);
                return h > i ? (h = Math.sqrt(h),
                s = (-l + h) / o,
                e.add(s, t.getY(s)),
                s = (-l - h) / o,
                e.add(s, t.getY(s))) : h > -i && (s = -l / o,
                e.add(s, t.getY(s))),
                e
            }
            if (s = t.b,
            (a = Dt).length = 0,
            this.getYs(s, a),
            0 === a.length)
                return e;
            for (o = 0,
            l = a.length; o < l; ++o)
                e.add(s, a[o]);
            return e
        }
        getXs(t, e) {
            const i = Rt;
            let s, n = (t - this.cy) * (t - this.cy);
            n > this.bb + i || (n > this.bb - i ? e.push(this.cx) : (s = Math.sqrt(1 - n / this.bb),
            e.push(this.a * s + this.cx, -this.a * s + this.cx)))
        }
        getYs(t, e) {
            const i = Rt;
            let s, n = (t - this.cx) * (t - this.cx);
            n > this.aa + i || (n >= this.aa - i ? e.push(this.cy) : (s = Math.sqrt(1 - n / this.aa),
            e.push(this.b * s + this.cy, -this.b * s + this.cy)))
        }
        toString() {
            return "(x - " + this.cx + ")^2 / " + this.a + "^2 + (y-" + this.cy + ")^2 / " + this.b + "^2 = 1"
        }
    }
    const Ot = A.a.Vec3
      , Mt = Ot.EPSILON
      , Ut = new Ot
      , Bt = new Ot
      , Nt = new Ot
      , Vt = new Ot
      , Ft = new Ot
      , zt = new Ot
      , Ht = new Ot
      , Gt = new Ot
      , qt = new kt
      , Wt = new kt
      , Yt = new kt
      , jt = new kt
      , Xt = new kt
      , Kt = new kt
      , Zt = new kt;
    class Jt {
        get length() {
            return this._length
        }
        constructor() {
            this.routes = [];
            for (let t = 0, e = 20; t !== e; ++t)
                this.routes[t] = Jt.makeRoute();
            this._length = 0
        }
        getAtIndex(t) {
            return this.routes[t]
        }
        next(t, e, i, s, n, r) {
            let a = this.routes[this._length++];
            return a || (a = Jt.makeRoute(),
            this.routes.push(a)),
            a.pkIndex = -1,
            a.ballBIndex = -1,
            a.dx = t,
            a.dy = e,
            a.dz = i,
            a.fbSpin = s,
            a.powerFactor = n,
            a.priority = r,
            a
        }
        clear() {
            this._length = 0
        }
        static makeRoute() {
            return Object.create(null)
        }
    }
    const Qt = new Jt;
    class $t {
        get taskRunning() {
            return -1 !== this._currentTaskIndex
        }
        constructor() {
            this._simEvolution = -1,
            this._ballOnindices = [],
            this._ballCheckIndex = 0,
            this._pkIndex = 0,
            this._routeCache = Qt,
            this._isBreakDirty = !1,
            this._isBreak = !1,
            this._props = Object.create(null),
            this._props.range = 0,
            this._props.abf = 0,
            this._props.bcf = 0,
            this._props.chaoticSeed = 1,
            this._props.bpm = 1,
            this._props.mpm = 1,
            this._currentTaskIndex = -1,
            this._tasks = [(t,e,i)=>{
                let s, n = performance.now(), r = t.playArea, a = r.pockets, o = e.getBallAtIndex(0);
                for (; this._ballCheckIndex < this._ballOnindices.length; ) {
                    for (s = e.getBallAtIndex(this._ballOnindices[this._ballCheckIndex]); this._pkIndex < a.length; )
                        if ($t._checkSinglePK(o, s, this._pkIndex++, r, e, i, this._routeCache),
                        performance.now() - n > .02)
                            return !1;
                    this._ballCheckIndex++,
                    this._pkIndex = 0
                }
                return !0
            }
            , (t,e,i)=>{
                let s, n, r, a, o, l = performance.now(), h = t.playArea, c = e.getBallAtIndex(0);
                for (this.getIsBreak(e) ? (n = 2 * c.radius,
                r = .85 + .14 * Math.random(),
                a = .4,
                o = 1) : (n = .5 * -c.radius,
                r = .99 + .009 * Math.random(),
                a = .6,
                o = 5); this._ballCheckIndex < this._ballOnindices.length; ) {
                    if (s = e.getBallAtIndex(this._ballOnindices[this._ballCheckIndex]),
                    $t._checkPassAbility(c, s, h, e, i, this._routeCache, n, r, a, o))
                        return !0;
                    if (this._ballCheckIndex++,
                    performance.now() - l > .02)
                        return !1
                }
                return !0
            }
            , (t,e)=>{
                if (this._ballCheckIndex >= this._ballOnindices.length)
                    return !0;
                let i, s, n, r, a, o, l, h, c, d = Mt, u = e.sidePolyGroups.polys, _ = e.getBallAtIndex(0), p = e.getBallAtIndex(this._ballOnindices[this._ballCheckIndex++]), f = e.getBalls(), g = qt.set(_.position.x, _.position.z), m = Wt.set(p.position.x, p.position.z), y = Yt.subVectors(m, g), v = Xt, b = Kt, x = Zt, S = jt, C = Nt, I = Vt, T = Ut, A = _.radius;
                for (let t = 0, e = u.length; t !== e; ++t) {
                    if (!(i = u[t]).sidehard || i.bCenter)
                        continue;
                    if (!(s = $t._getPolyHorizEdge(i))) {
                        0;
                        continue
                    }
                    if (S.set(i.normal.x, i.normal.z).normalize(),
                    v.set(s.va.x, s.va.z),
                    b.set(s.vab.x, s.vab.z),
                    o = b.length(),
                    b.scale(1 / o),
                    (r = x.subVectors(g, v).dot(S) - A) * (a = x.subVectors(m, v).dot(S) - A) < 0)
                        continue;
                    if (h = r / (l = r + a),
                    c = A + 2 * r * a / l,
                    (n = Math.abs(b.x) > Math.abs(b.y) ? (y.x * h - S.x * c + g.x - v.x) / b.x : (y.y * h - S.y * c + g.y - v.y) / b.y) < d || n > o - d)
                        continue;
                    if (C.set(v.x + b.x * n + S.x * A, _.position.y, v.y + b.y * n + S.y * A),
                    I.subVectors(C, _.position),
                    r = I.length(),
                    I.scale(1 / r),
                    !$t._isSegmentSafe(_.position, I, r, A, f, _, p))
                        continue;
                    if (T.subVectors(p.position, C),
                    a = T.length(),
                    T.scale(1 / a),
                    !$t._isSegmentSafe(C, T, a, A, f, p))
                        continue;
                    let e = .2 + .02 * (r + a)
                      , E = T.dot(I) + 1
                      , w = -e * (E *= E)
                      , R = 1 - a / 10;
                    this._routeCache.next(I.x, I.y, I.z, w, e, R)
                }
                return !1
            }
            ]
        }
        setFactors(t) {
            this._props.range = t.range,
            this._props.abf = t.abf,
            this._props.bcf = t.bcf,
            this._props.chaoticSeed = t.chaoticSeed,
            this._props.mpm = t.mpm,
            this._props.bpm = t.bpm
        }
        erase() {
            this._ballOnindices.length = 0,
            this._routeCache.clear(),
            this._currentTaskIndex = -1
        }
        getIsBreak(t) {
            if (this._isBreakDirty) {
                this._isBreakDirty = !1,
                this._isBreak = !0;
                for (let e = 0, i = this._ballOnindices.length; e !== i; ++e) {
                    let i = t.getBallAtIndex(this._ballOnindices[e]);
                    if (i.position.distanceToSq(i.spot) > .0025) {
                        this._isBreak = !1;
                        break
                    }
                }
            }
            return this._isBreak
        }
        checkRestart(t, e) {
            let i = t.evolution;
            if (this._simEvolution !== i) {
                this._simEvolution = i,
                this.erase();
                let s = t.getBalls()
                  , n = e.getContext("ballOn");
                for (let t = 1, e = s.length; t !== e; ++t)
                    s[t].active && Math.pow(2, s[t].number) & n && this._ballOnindices.push(t);
                return this._ballCheckIndex = 0,
                this._pkIndex = 0,
                this._currentTaskIndex = 0,
                this._isBreakDirty = !0,
                !0
            }
            return !1
        }
        step(t, e, i) {
            if ((0,
            this._tasks[this._currentTaskIndex])(t, e, i)) {
                let i = this._routeCache;
                if (0 === i.length)
                    return ++this._currentTaskIndex >= this._tasks.length ? (this._currentTaskIndex = -1,
                    $t._randomRoute(i),
                    i.getAtIndex(0)) : (this._ballCheckIndex = 0,
                    this._pkIndex = 0,
                    null);
                {
                    this._currentTaskIndex = -1;
                    let s = -1
                      , n = null;
                    for (let t = 0, e = i.length; t !== e; ++t) {
                        let e = i.getAtIndex(t);
                        e.priority > s && (s = e.priority,
                        n = e)
                    }
                    return -1 !== n.pkIndex && -1 !== n.ballBIndex && $t._chaos(n, t, e, this._props),
                    n
                }
            }
            return null
        }
        static _randomRoute(t) {
            let e = Vt.set(Math.random(), 0, Math.random()).normalize();
            t.next(e.x, e.y, e.z, 0, .6 * Math.random(), .05 * Math.random())
        }
        static _getPolyHorizEdge(t) {
            let e = t.edges
              , i = Mt;
            for (let t = 0, s = e.length; t !== s; ++t)
                if (Math.abs(e[t].vab.y) <= i)
                    return e[t];
            return null
        }
        static _chaos(t, e, i, s) {
            if (Math.random() < .05)
                return;
            let n = i.getBallAtIndex(0)
              , r = i.getBallAtIndex(t.ballBIndex)
              , a = e.playArea.pockets[t.pkIndex]
              , o = n.position.distanceTo(r.position)
              , l = Vt.set(t.dx, t.dy, t.dz)
              , h = Ut.subVectors(a.position, r.position);
            h.y = 0;
            let c = h.length()
              , d = Bt.scaleVector(1 / c, h)
              , u = l.dot(d)
              , _ = this._sigmoid01(c - 1.8 * u * u, .5) * s.bcf
              , p = Math.min(1, o / s.range) * s.abf
              , f = (p *= p) + _
              , g = (1 - Math.pow(Math.random(), s.chaoticSeed)) * f
              , m = Ht.crossVectors(h, Ot.UNIT_Y).normalize();
            Math.random() > .5 && (g *= -1),
            m.scale((a.radius + r.radius) * g),
            2 === t.pkIndex || 3 === t.pkIndex ? g *= s.mpm : g < 1 && (g *= s.bpm),
            h.add(m),
            d.normalizeVector(h);
            let y = Nt.scaleVector(-r.radius - n.radius, d).add(r.position)
              , v = Gt.subVectors(y, n.position).normalize();
            t.dx = v.x,
            t.dy = v.y,
            t.dz = v.z
        }
        static _sigmoid01(t, e) {
            return 1 / (1 + Math.pow(Math.E, -t / e))
        }
        static _checkSinglePK(t, e, i, s, n, r, a) {
            let o = Mt
              , l = Ut
              , h = Bt
              , c = Nt
              , d = Ft
              , u = zt
              , _ = Vt
              , p = n.getBalls()
              , f = s.pockets
              , g = f[i];
            if (l.subVectors(g.position, e.position),
            l.y = 0,
            h.normalizeVector(l),
            h.dot(g.normal) > g.maxHalfOpen)
                return;
            let m = l.length();
            if (!$t._isSegmentSafe(e.position, h, m, e.radius, p, t, e))
                return;
            if (c.scaleVector(-e.radius - t.radius, h).add(e.position),
            !r.pointProjectionOnTable(c.x, c.y, c.z))
                return;
            _.subVectors(c, t.position);
            let y = _.length();
            _.scale(1 / y);
            let v = _.dot(h);
            if (v < -o)
                return;
            if (!$t._isSegmentSafe(t.position, _, y - .002, t.radius + o, p, t, e))
                return;
            let b = 0
              , x = .97 - .31 * Math.min(1, y / 2);
            $t._vRef(_, h, x, d);
            for (let e = 0, s = f.length; e !== s; ++e) {
                let s = f[e].position;
                if (s.distanceToSq(c) < .34) {
                    u.subVectors(s, c),
                    u.y = 0;
                    let n = u.dot(d)
                      , r = wt.a.nIntersectSphereRay(s, t.radius + g.radius, c, d);
                    if (n > 0 && r > 0) {
                        b = i === e ? 1 : 2;
                        break
                    }
                }
            }
            if (2 === b)
                return;
            let S = m / s.diagonal
              , C = y / s.diagonal
              , I = 0
              , T = .2 * (C + S) * .5 + (1 - v) * S * .7;
            1 === b && (I = -.99,
            T = Math.max(T, .7 * C));
            let A = (.5 * (1 - C) + .45 * (1 - S)) * v + .05 * e.number
              , E = a.next(_.x, _.y, _.z, I, T, A);
            E.ballBIndex = e.index,
            E.pkIndex = i
        }
        static _checkPassAbility(t, e, i, s, n, r, a, o, l, h) {
            let c = Mt
              , d = s.getBalls()
              , u = Vt.subVectors(e.position, t.position)
              , _ = Ut.crossVectors(u, Ot.UNIT_Y).normalize()
              , p = Nt
              , f = (-e.radius - t.radius) * o
              , g = -f
              , m = .2 * (g - f);
            for (; f <= g; ) {
                p.scaleVector(f, _).add(e.position),
                u.subVectors(p, t.position);
                let s = u.length();
                if (u.scale(1 / s),
                $t._isSegmentSafe(t.position, u, s + a, t.radius + c, d, t, e))
                    return r.next(u.x, u.y, u.z, 0, .1 * Math.random() + s / i.diagonal * l, .1 * Math.random()),
                    r.length >= h;
                f += m
            }
            return !1
        }
        static _vRef(t, e, i, s) {
            s.scaleVector(t.dot(e) * i, e),
            s.subVectors(t, s).normalize()
        }
        static _isSegmentSafe(t, e, i, s, n, ...r) {
            if (i < s)
                return !0;
            for (let a = 0, o = n.length; a !== o; ++a) {
                let o = n[a];
                if (o.active && -1 === r.indexOf(o) && 0 !== wt.a.nIntersectSphereADirLen(o.position, o.radius + s, t, e, i))
                    return !1
            }
            return !0
        }
        static _logRoute(t) {
            console.log("\tbackSpin: " + t.fbSpin),
            console.log("\tpriority: " + t.priority),
            console.log("\tdir: " + t.dx + ", " + t.dy + ", " + t.dz)
        }
    }
    var te = new class {
        constructor() {
            let t = new $t;
            this._selectedIndex = -1,
            this._list = [{
                instance: t,
                userInfo: o.a.makeUserInfo("ai1", "AI-1", 2.5, "stickAlpha"),
                range: 1.9,
                abf: 1.2,
                bcf: 1.6,
                chaoticSeed: 3,
                mpm: .8,
                bpm: 1.2
            }, {
                instance: t,
                userInfo: o.a.makeUserInfo("ai2", "AI-2", 4, "stickAlpha"),
                range: 2.5,
                abf: 1,
                bcf: 1,
                chaoticSeed: 3,
                mpm: .7,
                bpm: 1
            }, {
                instance: t,
                userInfo: o.a.makeUserInfo("ai3", "AI-3", 5, "stickAlpha"),
                range: 3.3,
                abf: .72,
                bcf: .82,
                chaoticSeed: 2,
                mpm: .45,
                bpm: .8
            }]
        }
        setSelectedIndex(t) {
            this._selectedIndex = t
        }
        getSelectedAIInfo() {
            return this._selectedIndex < 0 || this._selectedIndex >= this._list.length ? null : this._list[this._selectedIndex].userInfo
        }
        getSelectedAIInstance() {
            if (this._selectedIndex < 0 || this._selectedIndex >= this._list.length)
                return null;
            {
                let t = this._list[this._selectedIndex]
                  , e = t.instance;
                return e.setFactors(t),
                e
            }
        }
        getInfoList() {
            let t = []
              , e = this._list;
            for (let i = 0, s = e.length; i !== s; ++i)
                t[i] = e[i].userInfo;
            return t
        }
    }
    ;
    class ee extends f {
        constructor() {
            super()
        }
        asyncLaunch(t) {
            let e = Object.create(null);
            e.sceneId = p.getGameDefineData("sceneId"),
            e.ballSet = p.getGameDefineData("ballSet"),
            e.ballRadius = p.getGameDefineData("ballRadius"),
            t(e)
        }
        setSelectedAIIndex(t) {
            te.setSelectedIndex(t)
        }
    }
    const ie = document.createElement("div");
    class se extends r.a {
        static parseUI(t) {
            return ie.innerHTML = t,
            ie.firstChild
        }
        get needsUpdate() {
            return this._needsUpdate
        }
        get active() {
            throw new Error("Naming change: use isActing instead")
        }
        get isActive() {
            return this._isActive
        }
        get element() {
            return this._element
        }
        get id() {
            return this._id
        }
        constructor(t, e) {
            super(),
            this._id = t,
            this.group = 0,
            this._styleOpts = Object.create(null),
            e ? (this._styleOpts.propName = e.propName || "display",
            this._styleOpts.on = e.on || "block",
            this._styleOpts.off = e.off || "none") : (this._styleOpts.propName = "display",
            this._styleOpts.on = "block",
            this._styleOpts.off = "none"),
            this._element = this._createElement(),
            this._tween = this._createTween(),
            this._tween && this._tween.onUpdateRequired(()=>{
                this.requireUpdate()
            }
            ),
            this._needsUpdate = !1,
            this._isActive = !0,
            this.deactivate(!0)
        }
        _createElement() {
            throw new Error("BaseUIComponent._createElement: override me, and DO NOT call super!")
        }
        _createTween() {
            return null
        }
        requireUpdate() {
            this._needsUpdate = !0
        }
        activate(t) {
            return this._isActive || (this._isActive = !0,
            this._onActivate(),
            this._tween ? t ? this._tween.end() : this._tween.play() : this._element.style[this._styleOpts.propName] = this._styleOpts.on),
            this
        }
        _onActivate() {
            this._bindEvents()
        }
        _bindEvents() {}
        deactivate(t) {
            return this._isActive && (this._isActive = !1,
            this._onDeactivate(),
            this._tween ? t ? this._tween.pause(0) : this._tween.reverse() : this._element.style[this._styleOpts.propName] = this._styleOpts.off),
            this
        }
        _onDeactivate() {
            this._unbindEvents()
        }
        _unbindEvents() {}
        update(t) {
            return this._needsUpdate = !1,
            this._tween && this._tween.needsUpdate && this._tween.update(t) && (this._needsUpdate = !0),
            this._needsUpdate
        }
    }
    class ne {
        get needsUpdate() {
            return this._needsUpdate
        }
        get element() {
            return this._element
        }
        get display() {
            return this._display
        }
        set display(t) {
            this._display !== t && (this._display = t,
            this._needsUpdate = !0,
            this._weakParent && this._weakParent.requireUpdate())
        }
        get selected() {
            return this._selected
        }
        set selected(t) {
            t *= this._enabled,
            this._selected !== t && (this._selected = t,
            this._needsUpdate = !0,
            this._weakParent && this._weakParent.requireUpdate())
        }
        get hovered() {
            return this._hovered
        }
        set hovered(t) {
            t *= this._enabled,
            this._hovered !== t && (this._hovered = t,
            this._needsUpdate = !0,
            this._weakParent && this._weakParent.requireUpdate())
        }
        get enabled() {
            return this._enabled
        }
        get index() {
            return this._index
        }
        constructor(t, e, i, s) {
            this._element = document.createElement("div"),
            this._element.className = "side-button",
            this._inner = document.createElement("div"),
            this._inner.className = "inner label-div-420",
            this._inner.innerHTML = e.toUpperCase(),
            this._element.appendChild(this._inner),
            this._element.style.display = "none",
            this._isHidding = !0,
            this._needsUpdate = !1,
            this._weakParent = t,
            this._index = i,
            s ? (this._element.className += " disabled",
            this._enabled = 0) : this._enabled = 1,
            this._display = 0,
            this._selected = 0,
            this._hovered = 0,
            this._width = 0,
            this._height = 0,
            this._renderedDisplay = -1,
            this._renderedOutterColor = -1,
            this._renderedInnerColor = -1
        }
        update() {
            this._needsUpdate = !1;
            const t = this._element;
            if (this._display < 1e-6)
                return this._isHidding || (this._isHidding = !0,
                t.style.display = "none"),
                !1;
            {
                this._isHidding && (this._isHidding = !1,
                t.style.display = "inline-block");
                let e = t.style
                  , i = this._inner.style;
                if (this._width <= 0) {
                    let i = t.getBoundingClientRect();
                    if (0 === i.width)
                        return e.visibility = "hidden",
                        this._needsUpdate = !0,
                        !0;
                    e.visibility = "inherit",
                    this._width = i.width,
                    this._height = i.height
                }
                let s = this._display;
                if (s !== this._renderedDisplay) {
                    this._renderedDisplay = s;
                    let t = q.Power1.easeOut(s > .15 ? 1 : s / .15) - 1
                      , n = q.Power1.easeInOut(s) - 1;
                    e.transform = "translate3d(" + this._width * t + "px,0,0)",
                    i.transform = "translate3d(" + 2 * this._width * n + "px,0,0)"
                }
                if (this._enabled) {
                    let t, n = this._hovered || this._selected, r = 1 - s + n * s, a = 1 - n;
                    r !== this._renderedOutterColor && (this._renderedOutterColor = r,
                    t = Math.round(255 * r),
                    e.backgroundColor = "rgba(" + t + "," + t + "," + t + ", 0.9)"),
                    a !== this._renderedInnerColor && (this._renderedInnerColor = a,
                    t = Math.round(213 * a),
                    i.color = "rgb(" + t + "," + t + "," + t + ")")
                }
                return this._needsUpdate
            }
        }
    }
    class re extends se {
        get clickedIndex() {
            return this._clickedIndex
        }
        constructor(t, e) {
            super(t, e),
            this._clickedIndex = -1,
            this._onItemHover = (t=>{
                let e = this._getButtonByElement(t.target);
                e && (e.hovered = 1)
            }
            ),
            this._onItemHoverOut = (t=>{
                let e = this._getButtonByElement(t.target);
                e && (e.hovered = 0)
            }
            ),
            this._onItemClick = (t=>{
                if (!this._isActive)
                    return;
                let e = this._getButtonByElement(t.target);
                e && e.enabled && !e.selected && (e.selected = 1,
                this._clickedIndex = e.index,
                this.deactivate())
            }
            )
        }
        _onActivate() {
            this.unselectAll(),
            this.unhoverAll(),
            this._clickedIndex = -1,
            this._tween.timeScale = 1,
            super._onActivate()
        }
        _onDeactivate() {
            this._tween.timeScale = 1.3,
            super._onDeactivate()
        }
        _bindEvents() {
            this.element.addEventListener("mouseover", this._onItemHover, !1),
            this.element.addEventListener("mouseout", this._onItemHoverOut, !1),
            this.element.addEventListener("click", this._onItemClick, !1)
        }
        _unbindEvents() {
            this.element.removeEventListener("mouseover", this._onItemHover, !1),
            this.element.removeEventListener("mouseout", this._onItemHoverOut, !1),
            this.element.removeEventListener("click", this._onItemClick, !1)
        }
        unselectAll() {
            for (var t = this._bns, e = 0, i = t.length; e !== i; ++e)
                t[e].selected = 0
        }
        unhoverAll() {
            for (var t = this._bns, e = 0, i = t.length; e !== i; ++e)
                t[e].hovered = 0
        }
        update(t) {
            this._needsUpdate = !1,
            this._tween.needsUpdate && this._tween.update(t) && (this._needsUpdate = !0);
            for (var e = this._bns, i = 0, s = e.length; i !== s; ++i)
                e[i].needsUpdate && e[i].update() && (this._needsUpdate = !0);
            return this._needsUpdate
        }
        _getButtonByElement(t) {
            for (var e = this._bns, i = 0, s = e.length; i !== s; ++i)
                if (e[i].element === t)
                    return e[i];
            return null
        }
        _createElement() {
            let t, e, i = [{
                label: "single play"
            }, {
                label: "practice"
            }];
            let s = document.createElement("div");
            s.className = "game-side-menu";
            let n = [];
            for (let r = 0, a = i.length; r !== a; ++r) {
                "string" == typeof i[r] ? (t = i[r],
                e = !1) : (t = i[r].label,
                e = i[r].disabled);
                let a = new ne(this,t,r,e);
                n.push(a),
                s.appendChild(a.element)
            }
            return this._bns = n,
            s
        }
        _createTween() {
            let t = new X;
            const e = this._bns;
            let i = [];
            i.push(new j(t=>{
                0 === t.r ? t.displayed && (t.displayed = !1,
                this._element.style.display = this._styleOpts.off) : t.displayed || (t.displayed = !0,
                this._element.style.display = this._styleOpts.on)
            }
            ).reset({
                r: 0
            }, {
                r: 1
            }, q.defaultEase, .016));
            for (let t = 0, s = e.length; t !== s; ++t)
                i.push(new Y(e[t]).reset({
                    display: 0
                }, {
                    display: 1
                }, q.defaultEase, .25, .05 * t));
            return t.reset(i)
        }
    }
    const ae = Object.create(null);
    ae.EMPTY = 0,
    ae.LOADING = 1,
    ae.MESSAGE = 2,
    ae.CONTENT = 3;
    const oe = Object.create(null);
    oe.INFO = 0,
    oe.SUCCESS = 1,
    oe.WARNING = 2,
    oe.ERROR = 3;
    const le = ["", "success-copy", "warning-copy", "error-copy"];
    class he {
        static _createBodyCopy() {
            let t = document.createElement("p");
            return t.className = "box-body-copy",
            t
        }
        static _createLoadingIcon() {
            let t = document.createElement("div");
            return t.className = "loading-32 sprite endless-r",
            t
        }
        static getMessageTypeClass(t) {
            return le[t]
        }
        get container() {
            return this._container
        }
        get state() {
            return this._state
        }
        constructor(t) {
            this._container = document.createElement("div"),
            this._container.className = "box-body",
            this._state = 0,
            this._loadingIcon = null,
            this._copy = null,
            this._messageType = 0,
            t && t.appendChild(this._container)
        }
        empty() {
            let t = this._container;
            for (; t.firstChild; )
                t.removeChild(t.firstChild);
            return this._state,
            ae.EMPTY,
            this
        }
        message(t, e=0) {
            if (this._state !== ae.MESSAGE && (this._state !== ae.EMPTY && this.empty(),
            this._copy || (this._copy = he._createBodyCopy()),
            this._container.appendChild(this._copy),
            this._state = ae.MESSAGE),
            this._copy.innerHTML = t || "",
            this._messageType !== e) {
                let t = this._messageType;
                0 !== t && this._copy.classList.remove(le[t]),
                this._messageType = e,
                0 !== e && this._copy.classList.add(le[e])
            }
            return this
        }
        loading() {
            return this._state !== ae.LOADING && (this._state !== ae.EMPTY && this.empty(),
            this._loadingIcon || (this._loadingIcon = he._createLoadingIcon()),
            this._container.appendChild(this._loadingIcon),
            this._state = ae.LOADING),
            this
        }
        pushContent(t) {
            return this._container.appendChild(t),
            this._state = ae.CONTENT,
            this
        }
        replaceContent(t) {
            return this._container.innerHTML = t,
            this._state = ae.CONTENT,
            this
        }
    }
    const ce = Object.create(null);
    ce.USER_CLOSE = "u_close",
    ce.CLOSE = "close",
    ce.ITEM_CLICK = "i_click",
    ce.CONFIRM = "confirm";
    var de = ce;
    class ue extends se {
        constructor(t, e) {
            super(t, e),
            this._isPinning = !1,
            this._onCloseClick = (()=>{
                this.emit(de.USER_CLOSE, this)
            }
            )
        }
        _createElement() {
            let t = document.createElement("div");
            return t.className = "game-box",
            this._element = t,
            this._head = this._createBoxHead(t),
            this._closeBn = null,
            t
        }
        _createBoxHead(t) {
            let e = document.createElement("h1");
            return e.className = "box-head bright-copy",
            t && t.appendChild(e),
            e
        }
        _createCloseIcon(t) {
            let e = document.createElement("div");
            return e.className = "close-icon-s sprite close-button",
            t && t.appendChild(e),
            e
        }
        _bindEvents() {
            this._closeBn && this._closeBn.addEventListener("click", this._onCloseClick, !1)
        }
        _unbindEvents() {
            this._closeBn && this._closeBn.removeEventListener("click", this._onCloseClick, !1)
        }
        _addBoxClass(...t) {
            let e = this._element.classList;
            for (let i = 0, s = t.length; i !== s; ++i)
                e.add(t[i]);
            return this
        }
        head(t) {
            return this._head.innerHTML = t || "",
            this
        }
        data(t, e) {
            throw new Error("BaseGameBox.data needs to be overridden")
        }
        pin(t) {
            return this._isPinning !== t && (this._isPinning = t,
            this._closeBn && (this._closeBn.style.display = t ? "none" : "block")),
            this
        }
    }
    class _e extends ue {
        get enabled() {
            return this._enabled
        }
        get blocked() {
            return this._blocked
        }
        set blocked(t) {
            if (this._blocked !== t) {
                this._blocked = t;
                let e = !t && this._enabled;
                this._composedEnabled !== e && (this._composedEnabled = e,
                this._onEnabledChanged(e))
            }
        }
        _setEnabled(t) {
            if (this._enabled !== t) {
                this._enabled = t;
                let e = t && !this._blocked;
                this._composedEnabled !== e && (this._composedEnabled = e,
                this._onEnabledChanged(e))
            }
        }
        get lockScreen() {
            return this._lockScreen
        }
        static _emitItemClickAction(t, e) {
            let i = void 0
              , s = void 0
              , n = null
              , r = e.currentTarget
              , a = e.target;
            for (; a !== r && (i || void 0 === (n = a.dataset) || (i = n.action || void 0),
            "SECTION" !== a.tagName || void 0 === (s = a.dataset.sid)); )
                a = a.parentNode;
            s && t.emit(de.ITEM_CLICK, s, i)
        }
        constructor(t, e) {
            super(t, e),
            this._lockScreen = !0,
            this._enabled = !0,
            this._blocked = !1,
            this._composedEnabled = !0,
            this._addBoxClass("stack-box"),
            this._onBodyClick = (t=>_e._emitItemClickAction(this, t))
        }
        _createElement() {
            let t = super._createElement();
            return this._foot = document.createElement("div"),
            this._foot.className = "box-foot",
            this._buttons = [],
            this._bodies = [],
            this._clickableBodies = [],
            this._closeBn = this._createButton("CANCEL"),
            t.appendChild(this._foot),
            t
        }
        _createButton(t, e=!1) {
            let i = document.createElement("button");
            return i.className = "default-button",
            i.innerHTML = t,
            e ? this._foot.insertBefore(i, this._foot.firstChild) : this._foot.appendChild(i),
            this._buttons.push(i),
            i
        }
        _createBody(t) {
            let e = new he;
            return this._element.insertBefore(e.container, this._foot),
            this._bodies.push(e),
            t && this._clickableBodies.push(e),
            e
        }
        _onActivate() {
            super._onActivate()
        }
        _onDeactivate() {
            super._onDeactivate(),
            this.emit(de.CLOSE, this)
        }
        _bindEvents() {
            super._bindEvents();
            let t = this._clickableBodies;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].container.addEventListener("click", this._onBodyClick, !1)
        }
        _unbindEvents() {
            super._unbindEvents();
            let t = this._clickableBodies;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].container.removeEventListener("click", this._onBodyClick, !1)
        }
        closeLabel(t) {
            return this._closeBn && (this._closeBn.innerHTML = t),
            this
        }
        _onEnabledChanged(t) {
            const e = this._buttons
              , i = this._bodies;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].disabled = !t;
            for (let e = 0, s = i.length; e !== s; ++e)
                t ? i[e].container.classList.remove("disabled") : i[e].container.classList.add("disabled")
        }
    }
    const pe = i(57);
    class fe extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("SELECT LEVEL")._addBoxClass("difficulty-box")
        }
        _createElement() {
            let t = super._createElement()
              , e = this._createBody(!0);
            e.empty();
            let i = te.getInfoList();
            for (let t = 0, n = i.length; t !== n; ++t) {
                let n = fe.parseUI(pe);
                n.setAttribute("data-sid", i[t].userId);
                let r = n.querySelector(".ai-name");
                r.innerHTML = i[t].displayName;
                let a = n.querySelector(".diff-dots")
                  , o = n.querySelector(".diff-desp")
                  , l = i[t].level;
                l <= 3 ? (o.innerHTML = "EASY",
                r.classList.add("easy")) : l < 5 ? (o.innerHTML = "NORMAL",
                r.classList.add("normal")) : (o.innerHTML = "HARD",
                r.classList.add("hard"));
                let h = "";
                for (var s = 0; s < 10; ++s)
                    h += l > .5 ? '<div class="diff-dot diff-dot-full"></div>' : l > 0 ? '<div class="diff-dot diff-dot-half"></div>' : '<div class="diff-dot"></div>',
                    l -= 1;
                a.innerHTML = h,
                e.pushContent(n)
            }
            return t
        }
    }
    let ge = i(56);
    class me extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("ABOUT").closeLabel("CLOSE")._addBoxClass("about-box")
        }
        _createElement() {
            let t = super._createElement();
            return this._body = this._createBody(!1).replaceContent(ge),
            ge = null,
            t
        }
    }
    const ye = window.gtag || null;
    class ve extends At {
        constructor(t) {
            super(t),
            this._model = new ee,
            this._homeMainMenu = null,
            this._enterAnimation = null,
            this._onDifficultyItemClick = (t=>{
                switch (ye("event", "select", {
                    event_category: "ai",
                    event_label: t
                }),
                t) {
                case "ai1":
                    this._model.setSelectedAIIndex(0),
                    this._uiLayer.closeBox("hmDifBox"),
                    this.emit(y.CHANGE_CONTROLLER, "game");
                    break;
                case "ai2":
                    this._model.setSelectedAIIndex(1),
                    this._uiLayer.closeBox("hmDifBox"),
                    this.emit(y.CHANGE_CONTROLLER, "game");
                    break;
                case "ai3":
                    this._model.setSelectedAIIndex(2),
                    this._uiLayer.closeBox("hmDifBox"),
                    this.emit(y.CHANGE_CONTROLLER, "game");
                    break;
                default:
                    0
                }
            }
            ),
            this._onBoxClosed = (()=>{
                this._homeMainMenu.activate()
            }
            )
        }
        _registerUI() {
            let t = this._uiLayer;
            t.hasRegisteredUI("hmMainMenu") || t.registerUI(new re("hmMainMenu")),
            t.hasRegisteredBox("hmDifBox") || t.registerBox(new fe("hmDifBox")),
            t.hasRegisteredBox("aboutBox") || t.registerBox(new me("aboutBox"))
        }
        _bindUI() {
            this._homeMainMenu = this._uiLayer.getRegisteredUI("hmMainMenu")
        }
        _unbindUI() {
            this._homeMainMenu = null
        }
        _onItemsReady() {
            this._enterAnimation || (this._enterAnimation = new j(t=>{
                let e = this._gView.camera;
                e.position.y = t.y,
                e.position.x = t.cx + Math.sin(t.angle) * t.radius,
                e.position.z = t.cz + Math.cos(t.angle) * t.radius,
                e.lockedTarget.x = t.lookAtX,
                e.lockedTarget.y = t.lookAtY,
                e.lockedTarget.z = t.lookAtZ,
                this._gView.requireRender()
            }
            )),
            super._onItemsReady()
        }
        enter() {
            const t = this._gView.camera
              , e = this._gView.playArea.position
              , i = t.position.x - e.x
              , s = t.position.z - e.z
              , n = Math.sqrt(i * i + s * s)
              , r = Math.atan2(i, s)
              , a = Math.PI;
            let o, l = -70 / 180 * a, h = l - r;
            h > a ? l -= 2 * a : h < -a && (l += 2 * a),
            o = .5,
            o += Math.abs(l - r) / a * 2.5,
            (o += .5 * Math.abs(3.1 - n)) > 3.5 && (o = 3.5),
            this._enterAnimation.reset({
                radius: n,
                angle: r,
                y: t.position.y,
                lookAtX: t.lockedTarget.x,
                lookAtY: t.lockedTarget.y,
                lookAtZ: t.lockedTarget.z
            }, {
                radius: 3.1,
                angle: l,
                y: this._model.getControllerSetting().eyeStandHeight,
                lookAtX: e.x,
                lookAtY: e.y,
                lookAtZ: e.z
            }, q.Power1.easeInOut, o, .1).play(),
            this._enterAnimation.target.cx = e.x,
            this._enterAnimation.target.cz = e.z,
            super.enter()
        }
        updateEntering(t) {
            let e = this._enterAnimation;
            e.needsUpdate ? e.update(t.dt) : e.isComplete() && this.emit(m.ENTERED)
        }
        action() {
            this._homeMainMenu.activate(),
            super.action()
        }
        updateActing(t) {
            !this._homeMainMenu.needsUpdate || this._homeMainMenu.update(t.dt) || this._homeMainMenu.isActive || this._confirmMenuClick()
        }
        _confirmMenuClick() {
            switch (this._homeMainMenu.clickedIndex) {
            case 0:
                ye("event", "menu_click", {
                    event_category: "game_page",
                    event_label: "single_play"
                }),
                this._uiLayer.popBox("hmDifBox").on(de.CLOSE, this._onBoxClosed).on(de.ITEM_CLICK, this._onDifficultyItemClick);
                break;
            case 1:
                ye("event", "menu_click", {
                    event_category: "game_page",
                    event_label: "practice"
                }),
                this._model.setSelectedAIIndex(-1),
                this.emit(y.CHANGE_CONTROLLER, "game");
                break;
            case 2:
                ye("event", "menu_click", {
                    event_category: "game_page",
                    event_label: "about"
                }),
                this._uiLayer.popBox("aboutBox").on(de.CLOSE, this._onBoxClosed);
                break;
            default:
                0,
                this._homeMainMenu.activate()
            }
        }
        releaseControls() {
            this._homeMainMenu.unhoverAll()
        }
        exit() {
            this._homeMainMenu.deactivate(),
            super.exit()
        }
        updateExiting(t) {
            this._homeMainMenu.needsUpdate ? this._homeMainMenu.update(t.dt) : this._homeMainMenu.isActive || this.emit(m.EXITED)
        }
    }
    var be = i(31)
      , xe = i.n(be)
      , Se = i(55)
      , Ce = i.n(Se)
      , Ie = i(15)
      , Te = i.n(Ie);
    let Ae = 0;
    class Ee extends f {
        get gState() {
            return this._gState
        }
        get players() {
            return this._players
        }
        get nPlayers() {
            return this._players.length
        }
        constructor() {
            super(),
            this._players = [],
            this._gContext = o.a.makeGContext(),
            this._refResult = o.a.makeRefResult(),
            this._gState = Te.a.NO_GAME,
            this._locRef = null
        }
        release() {
            this.removeAllListeners()._changeState(Te.a.NO_GAME),
            this._locRef = null;
            for (let t = 0, e = this._players.length; t !== e; ++t)
                this._players[t].dispose();
            this._players.length = 0
        }
        asyncLaunch(t) {
            this._gState !== Te.a.NO_GAME && this.release(),
            this._changeState(Te.a.PENDING);
            let e = Object.create(null);
            e.sceneId = p.getGameDefineData("sceneId"),
            e.ballSet = p.getGameDefineData("ballSet"),
            e.ballRadius = p.getGameDefineData("ballRadius"),
            e.ballMass = p.getGameDefineData("ballMass"),
            e.stickName = [];
            let i = p.getGameDefineData("refId")
              , s = this._players;
            s.push(new xe.a(p.getLocalUserInfo(),xe.a.PLAYER_TYPE_USER));
            let n = te.getSelectedAIInfo();
            n && s.push(new xe.a(n,xe.a.PLAYER_TYPE_AI));
            for (let t = 0, i = s.length; t !== i; ++t) {
                let i = s[t].getInfoData("stickName");
                -1 === e.stickName.indexOf(i) && e.stickName.push(i)
            }
            this._locRef = Ce.a.getInstance(i),
            t(e)
        }
        getLocalAIInstance() {
            return te.getSelectedAIInstance()
        }
        reqReset(t) {
            if (this._gState & (Te.a.ERROR | Te.a.NO_GAME))
                return void 0;
            let e = this._gState === Te.a.PENDING;
            return this._changeState(Te.a.JUDGING),
            this._onResetResponse(t, e, Ae++ % this._players.length, 0)
        }
        _onResetResponse(t, e, i, s) {
            for (let t = 0, e = this._players.length; t !== e; ++t)
                this._players[t].clearScores();
            return e && this._locRef.syncAreaWithSimulator(t),
            this._gContext.playerIndex = i,
            this._gContext.nRounds = s,
            this._locRef.resetGContext(this._gContext),
            this._response(t.reset(!0, !0), "restart")
        }
        reqEditorReset(t, e, i) {
            if (this._gState & (Te.a.SIMULATING | Te.a.READY))
                return this._changeState(Te.a.JUDGING),
                this._gContext.playerIndex = void 0 !== e ? e : 0,
                this._gContext.nRounds = 0,
                this._gContext.inHand = 1,
                this._gContext.ballOn = void 0 !== i ? i : this._locRef.sysReservedBallOn,
                this._response(t.reset(!1, !0))
        }
        reqRespotCueball(t, e) {
            if (this._gState === Te.a.READY)
                return this._changeState(Te.a.JUDGING),
                this._locRef.projectionInSideValidRegion(t.x, t.y, t.z) && (t.y = e.spotY,
                !e.touchBalls(0, t)) ? this._onRespotCueballResponse(e, t.x, t.y, t.z) : this._response(e)
        }
        _onRespotCueballResponse(t, e, i, s) {
            return t.respotIndexXYZ(0, e, i, s),
            this._gContext.inHand > 1 && (this._gContext.inHand = 1),
            this._response(t)
        }
        reqRoundResult(t) {
            if (this._gState === Te.a.SIMULATING)
                return this._changeState(Te.a.JUDGING),
                this._locRoundResultResponse(t)
        }
        _locRoundResultResponse(t) {
            let e = this._refResult;
            this._locRef.checkResult(this._gContext, t, e);
            let i = this._gContext.playerIndex;
            return this._gContext.nRounds++,
            e.score > 0 ? (this._players[i].pts += e.score,
            this._players[i].scoreCount++,
            this._players[i].brk += e.score) : (this._players[i].penalty += e.score,
            this._players[i].brk = 0,
            this._gContext.playerIndex = (i + 1) % this._players.length),
            this._response(t, e)
        }
        reportPlayerStroke(t) {
            return this._gState === Te.a.READY && (t === this._gContext.playerIndex && (this._players[t].shootingCount++,
            this._changeState(Te.a.SIMULATING),
            !0))
        }
        _changeState(t) {
            this._gState !== t && (this._gState = t,
            this.emit("gstate_change", t))
        }
        _response(t, e) {
            let i = 0;
            for (; 0 !== t.nAwakened; ) {
                if (++i > 200)
                    throw new Error("too much ff(>200), must be some error!");
                t.step(.1)
            }
            t.save(),
            this._changeState(Te.a.READY),
            void 0 === e ? this.emit("response") : this.emit("response", e)
        }
        isValidInHandPositionUnderRay(t, e, i, s) {
            return !!this._locRef && (!!this._locRef.intersectionRayValidRegionPlane(t, e, s) && (!!this._locRef.projectionInSideValidRegion(s.x, s.y, s.z) && (s.y = i.spotY,
            !i.touchBalls(0, s))))
        }
        getLocValidRegionGeoCenter() {
            return this._locRef ? this._locRef.validRegionGeoCenter : null
        }
        pointProjectionOnTable(t, e, i) {
            return this._locRef.projectionOnTable(t, e, i)
        }
        getContext(t) {
            return this._gContext[t]
        }
        getPlayer(t) {
            return this._players[t]
        }
    }
    var we = i(50)
      , Re = i.n(we)
      , ke = i(27)
      , Pe = i.n(ke)
      , De = i(28)
      , Le = i.n(De)
      , Oe = i(26)
      , Me = i.n(Oe)
      , Ue = i(48)
      , Be = i.n(Ue)
      , Ne = i(30)
      , Ve = i.n(Ne);
    class Fe {
        get state() {
            return this._state
        }
        set state(t) {
            this._state !== t && (this._state = t,
            this._enabled && (this._cancelKeyboards(t),
            this._onPointerUp()))
        }
        get enabled() {
            return this._enabled
        }
        set enabled(t) {
            this._enabled !== t && (this._enabled = t,
            t || (this._cancelKeyboards(0),
            this._onPointerUp()))
        }
        constructor() {
            this._enabled = !0,
            this._state = 0,
            this.supportsPointer = !!window.PointerEvent,
            this._evtList = Object.create(null),
            this._keyList = Object.create(null),
            this._pointerList = Object.create(null),
            this._isDragging = !1,
            this._onKeyDown = (t=>{
                if (t.repeat || !this._enabled)
                    return;
                if (t.altKey || t.metaKey)
                    return t.preventDefault(),
                    this._cancelKeyboards(0);
                const e = this._keyList[t.keyCode + ""];
                e && e.ss & this._state && !e.triggered && (t.preventDefault(),
                e.triggered = !0,
                e.down())
            }
            ),
            this._onKeyUp = (t=>{
                const e = this._keyList[t.keyCode + ""];
                e && e.triggered && (t.preventDefault(),
                e.triggered = !1,
                void 0 !== e.up && e.up())
            }
            ),
            this._onPointerDown = null,
            this._onPointerDownPressOnly = (t=>{
                if (!this._enabled)
                    return;
                const e = this._pointerList.press;
                e.ss & this._state && e.fn(t.clientX, t.clientY, t.altKey || t.metaKey)
            }
            ),
            this._onPointerDownDragOnly = (t=>{
                if (this._isDragging || !this._enabled)
                    return;
                this._pointerList.drag.ss & this._state && (this._isDragging = !0,
                this.supportsPointer && t.target.setPointerCapture(t.pointerId))
            }
            ),
            this._onPointerDownPressAndDrag = (t=>{
                this._onPointerDownDragOnly(t),
                this._onPointerDownPressOnly(t)
            }
            ),
            this._onPointerMove = null,
            this._onPointerMoveNoFrag = (t=>{
                if (!this._enabled)
                    return;
                t.preventDefault();
                const e = this._pointerList.move;
                e.ss & this._state && e.fn(t.clientX, t.clientY, t.altKey || t.metaKey)
            }
            ),
            this._onPointerMoveDragOnly = (t=>{
                if (!this._isDragging || !this._enabled)
                    return;
                t.preventDefault();
                const e = this._pointerList.drag;
                e.ss & this._state && e.fn(t.movementX, t.movementY, t.altKey || t.metaKey)
            }
            ),
            this._onPointerMoveAndDrag = (t=>{
                this._onPointerMoveNoFrag(t),
                this._onPointerMoveDragOnly(t)
            }
            ),
            this._onPointerUp = (t=>{
                this._isDragging && (this._isDragging = !1,
                t && (t.preventDefault(),
                this.supportsPointer && t.target.releasePointerCapture(t.pointerId)))
            }
            ),
            this._onWheel = (t=>{
                if (!this._enabled)
                    return;
                const e = this._pointerList.wheel;
                if (e.ss & this._state) {
                    t.preventDefault();
                    let i = t.deltaY * (1 + 39 * t.deltaMode);
                    e.fn(i, t.altKey || t.metaKey)
                }
            }
            ),
            this._onBlur = (()=>{
                this._cancelKeyboards(0),
                this._onPointerUp()
            }
            )
        }
        initialize(t, e) {
            const i = this._evtList;
            let s = !1;
            if (void 0 !== t) {
                let e = 0;
                this._keyList = Object.create(null);
                for (let i in t) {
                    let s = t[i];
                    if (!s)
                        continue;
                    const n = i.split("|");
                    for (let t = 0, i = n.length; t !== i; ++t) {
                        let i = Object.create(null);
                        i.triggered = !1,
                        i.ss = s.ss || 0,
                        i.down = s.down,
                        s.up && (i.up = s.up),
                        i.ss || console.warn('handler "' + i[t] + '" will never be triggered since ss is 0'),
                        this._keyList[n[t]] = i,
                        e++
                    }
                }
                e > 0 && (s = !0,
                i.keydown = this._onKeyDown,
                i.keyup = this._onKeyUp)
            }
            if (void 0 !== e) {
                this._pointerList = Object.create(null);
                let t = 0
                  , n = 0
                  , r = 0
                  , a = !1;
                switch (e.press && (this._pointerList.press = Object.create(null),
                this._pointerList.press.ss = e.press.ss || 0,
                this._pointerList.press.fn = e.press.fn,
                this._pointerList.press.ss || console.warn('handler "press" will never be triggered since ss is 0'),
                t |= 1),
                e.move && (this._pointerList.move = Object.create(null),
                this._pointerList.move.ss = e.move.ss || 0,
                this._pointerList.move.fn = e.move.fn,
                this._pointerList.move.ss || console.warn('handler "move" will never be triggered since ss is 0'),
                n |= 1),
                e.drag && (this._pointerList.drag = Object.create(null),
                this._pointerList.drag.ss = e.drag.ss || 0,
                this._pointerList.drag.fn = e.drag.fn,
                this._pointerList.drag.ss || console.warn('handler "drag" will never be triggered since ss is 0'),
                t |= 2,
                n |= 2,
                a = !0,
                s = !0),
                e.wheel && (this._pointerList.wheel = Object.create(null),
                this._pointerList.wheel.ss = e.wheel.ss || 0,
                this._pointerList.wheel.fn = e.wheel.fn,
                this._pointerList.wheel.ss || console.warn('handler "wheel" will never be triggered since ss is 0'),
                r |= 1),
                this._onPointerDown = null,
                t) {
                case 1:
                    this._onPointerDown = this._onPointerDownPressOnly;
                    break;
                case 2:
                    this._onPointerDown = this._onPointerDownDragOnly;
                    break;
                case 3:
                    this._onPointerDown = this._onPointerDownPressAndDrag
                }
                switch (this._onPointerMove = null,
                n) {
                case 1:
                    this._onPointerMove = this._onPointerMoveNoFrag;
                    break;
                case 2:
                    this._onPointerMove = this._onPointerMoveDragOnly;
                    break;
                case 3:
                    this._onPointerMove = this._onPointerMoveAndDrag
                }
                this._onPointerDown && (this.supportsPointer ? i.pointerdown = this._onPointerDown : i.mousedown = this._onPointerDown),
                this._onPointerMove && (this.supportsPointer ? i.pointermove = this._onPointerMove : i.mousemove = this._onPointerMove),
                a && (this.supportsPointer ? (i.pointerup = this._onPointerUp,
                i.pointercancel = this._onPointerUp) : (i.mouseup = this._onPointerUp,
                i.mouseleave = this._onPointerUp)),
                0 !== r && (i.wheel = this._onWheel)
            }
            s && (i.blur = this._onBlur)
        }
        bindEvents(t) {
            const e = this._evtList;
            for (let i in e)
                t.addEventListener(i, e[i], !1)
        }
        unbindEvents(t) {
            this._cancelKeyboards(0),
            this._onPointerUp();
            const e = this._evtList;
            for (let i in e)
                "function" == typeof e[i] && t.removeEventListener(i, e[i], !1)
        }
        _cancelKeyboards(t) {
            const e = this._keyList;
            for (let i in e)
                !e[i].triggered || e[i].ss & t || (e[i].triggered = !1,
                void 0 !== e[i].up && e[i].up())
        }
    }
    class ze {
        get active() {
            throw new Error("use isActive instead!")
        }
        get isActive() {
            return this._isActive
        }
        get name() {
            return this._name
        }
        get displayUIGroup() {
            return this._displayUIGroup
        }
        constructor(t, e, i) {
            this._name = t,
            this._binded = !1,
            this._isActive = !1,
            this._gView = null,
            this._model = null,
            this._simulator = null,
            this._evtBus = null,
            this._fpc = null,
            this._playerCtls = null,
            this._localUIGroup = i,
            this._displayUIGroup = e | i,
            this._evtManager = new Fe,
            this.update = this._defaultUpdateHandler
        }
        bindUI() {}
        onModelResponse(t) {
            this._binded && this._onModelResponseHandler(t)
        }
        _onModelResponseHandler() {}
        _registerLocalUI(t, e, i, s, n) {
            let r = i.getRegisteredUI(t);
            return r || (r = i.registerUI(new e(t))),
            -1 === s.indexOf(r) && s.push(r),
            r.group = void 0 === n ? this._localUIGroup : n,
            r
        }
        bind(t, e, i, s, n, r) {
            this._gView = t,
            this._model = e,
            this._simulator = i,
            this._evtBus = r,
            this._fpc = s,
            this._playerCtls = n,
            this._binded = !0,
            this.onModelResponse(this._model)
        }
        unbind() {
            this.deactivate(),
            this._gView = null,
            this._model = null,
            this._simulator = null,
            this._evtBus = null,
            this._fpc = null,
            this._playerCtls = null,
            this._binded = !1
        }
        activate() {
            return this._isActive || (this._isActive = !0,
            this._onActvate()),
            this
        }
        deactivate() {
            return this._isActive && (this._isActive = !1,
            this._onDeactvate()),
            this
        }
        setGState(t) {
            this._evtManager.state = t
        }
        _onActvate() {
            this._evtManager.bindEvents(this._gView.canvas)
        }
        _onDeactvate() {
            this._evtManager.unbindEvents(this._gView.canvas)
        }
        _defaultUpdateHandler() {
            return !1
        }
        updateGameBase(t) {
            const e = this._playerCtls;
            let i = !1;
            for (let s = 0, n = e.length; s !== n; ++s)
                e[s].shouldUpdate() && e[s].update(t) && (i = !0);
            return i
        }
    }
    const He = Object.create(null);
    He.SWITCH = "switch",
    He.POP_BOX = "pop_box",
    He.MESSAGE = "msg",
    He.CHANGE_CONTROL_GROUP = "gcg",
    He.SHOTTING_START = "shotting_start";
    var Ge = He;
    const qe = Object.create(null);
    qe.NULL = 0,
    qe.PAUSE = 1,
    qe.REPLAY = 2;
    class We extends se {
        constructor(t) {
            super(t, {
                on: "flex"
            }),
            this._group = 0,
            this._onClick = (t=>{
                let e = t.target.dataset.action;
                e && this.emit(de.ITEM_CLICK, e)
            }
            ),
            this._lower = !1
        }
        _createElement() {
            let t = document.createElement("div");
            return t.className = "ingame-controls",
            this._buttons = Object.create(null),
            this._addButton("replay", qe.REPLAY, "replay-icon", t),
            this._addButton("pause", qe.PAUSE, "pause-icon", t),
            t
        }
        _addButton(t, e, i, s) {
            let n = document.createElement("div");
            n.className = i + " sprite control-button-opa",
            n.dataset.action = t,
            n.style.display = "none",
            s.appendChild(n);
            let r = Object.create(null);
            r.enabled = !1,
            r.group = e,
            r.e = n,
            this._buttons[t] = r
        }
        setGroup(t) {
            this._group !== t && (this._group = t,
            this._updateGroup())
        }
        setLocationLower(t) {
            this._lower !== t && (this._lower = t,
            t ? this._element.classList.add("lower") : this._element.classList.remove("lower"))
        }
        _updateGroup() {
            const t = this._buttons
              , e = this._group;
            let i;
            for (let s in t) {
                let n = !!((i = t[s]).group & e);
                n !== i.enabled && (i.enabled = n,
                i.e.style.display = n ? "block" : "none")
            }
        }
        _bindEvents() {
            this._element.addEventListener("click", this._onClick, !1)
        }
        _unbindEvents() {
            this._element.removeEventListener("click", this._onClick, !1)
        }
    }
    const Ye = new A.a.Vec3;
    class je extends ze {
        constructor(t, e, i) {
            super(t, e, i),
            this._mouseX = NaN,
            this._mouseY = NaN,
            this._spot = new A.a.Vec3,
            this._isValidSpot = !1,
            this._firstLookToSet = !1,
            this._needsFirstAutoTip = !0,
            this._tipPopped = !1,
            this._tipMsgId = "iht",
            this._autoTipTimer = 0,
            this._evtManager.initialize({
                "68|39": {
                    down: ()=>{
                        this._fpc.orbit(void 0, 1)
                    }
                    ,
                    up: ()=>{
                        this._fpc.orbit(void 0, 0)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                "65|37": {
                    down: ()=>{
                        this._fpc.orbit(1, void 0)
                    }
                    ,
                    up: ()=>{
                        this._fpc.orbit(0, void 0)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                "80|27": {
                    down: ()=>{
                        this._evtBus.emit(Ge.SWITCH, "gaming")
                    }
                    ,
                    ss: Te.a.READY
                },
                "87|38": {
                    down: ()=>{
                        const t = this._fpc;
                        this._evtBus.emit(Ge.SWITCH, "gaming"),
                        t.active && t.gotoState1()
                    }
                    ,
                    ss: Te.a.READY
                }
            }, {
                press: {
                    fn: (t,e)=>{
                        if (isNaN(this._mouseX) || isNaN(this._mouseY))
                            return this._mouseX = t,
                            this._mouseY = e,
                            void (this._needsUpdate = !0);
                        !this._isValidSpot || this._needsUpdate || this._model.reqRespotCueball(this._spot, this._simulator)
                    }
                    ,
                    ss: Te.a.READY
                },
                drag: {
                    fn: (t,e)=>{
                        this._fpc.moveLookAt(.0025 * t, .0025 * e)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                move: {
                    fn: (t,e)=>{
                        this._mouseX = t,
                        this._mouseY = e,
                        this._needsUpdate = !0
                    }
                    ,
                    ss: Te.a.READY
                }
            })
        }
        activate() {
            super.activate();
            let t = this._simulator;
            return this._gView.showRespotIcons(t.getCueBallPosition()),
            this
        }
        _onActvate() {
            super._onActvate(),
            this._mouseX = NaN,
            this._mouseY = NaN,
            this._firstLookToSet = !1,
            this._isValidSpot = !1;
            const t = this._playerCtls;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e] !== this._fpc && t[e].deactivate();
            this._fpc.gotoState0(),
            this._autoTipTimer = 0,
            this._needsFirstAutoTip && (this._needsFirstAutoTip = !1,
            this._showTip(!0)),
            this._evtBus.emit(Ge.CHANGE_CONTROL_GROUP, qe.PAUSE)
        }
        _onDeactvate() {
            this._gView.hideRespotIcons(),
            this._closeTip(),
            super._onDeactvate()
        }
        _showTip(t=!1) {
            this._tipPopped = !0,
            this._evtBus.emit(Ge.MESSAGE, this._tipMsgId, "PLACE CUE BALL", 'CLICK IN THE "D" AREA ON THE TABLE TO PLACE THE CUE BALL. PRESS <span class="kb">ESC</span>TO CANCEL.', oe.SUCCESS, t)
        }
        _closeTip() {
            this._tipPopped && (this._tipPopped = !1,
            this._evtBus.emit(Ge.MESSAGE, this._tipMsgId)),
            this._autoTipTimer = 0
        }
        _defaultUpdateHandler(t) {
            const e = this._fpc
              , i = this._gView;
            if (0 !== e.stateRatio)
                return this.updateGameBase(t.dt);
            if (!this._firstLookToSet) {
                this._firstLookToSet = !0;
                const t = this._model.getLocValidRegionGeoCenter();
                if (t) {
                    Ye.subVectors(t, e.bodyPosition).normalize().dot(e.azimuth.forward) < .84 && e.lookTo(t.x, t.z)
                }
            }
            if (!this._tipPopped && (this._autoTipTimer += t.dt) > 10) {
                this._showTip(!1);
                const t = this._model.getLocValidRegionGeoCenter();
                e.lookTo(t.x, t.z)
            }
            if (this._needsUpdate) {
                this._needsUpdate = !1;
                let e, s = i.respotIcon, n = this._spot;
                if (isNaN(this._mouseX) || isNaN(this._mouseY))
                    return s.alpha = 0,
                    this._isValidSpot = !1,
                    this.updateGameBase(t.dt);
                e = i.mouseCameraRay(this._mouseX, this._mouseY),
                s.alpha = .8,
                this._model.isValidInHandPositionUnderRay(e.origin, e.direction, this._simulator, n) ? (s.copyRGB(H.GREEN[0], H.GREEN[1], H.GREEN[2]),
                this._isValidSpot = !0) : (s.copyRGB(H.RED[0], H.RED[1], H.RED[2]),
                this._isValidSpot = !1),
                s.copyPositionXYZ(n.x, 0, n.z)
            }
            return this.updateGameBase(t.dt)
        }
    }
    class Xe extends r.a {
        constructor(t) {
            super(),
            this.needsUpdate = !1,
            this.eps = t || .1,
            this.crt = 0,
            this.tgt = 0,
            this.clampMin = -Number.MAX_VALUE,
            this.clampMax = Number.MAX_VALUE,
            this.update = this.update,
            this.to = this._directTo,
            this.move = this._directMove,
            this.reset = this._directReset
        }
        _getClamped(t) {
            return t < this.clampMin ? t = this.clampMin : t > this.clampMax && (t = this.clampMax),
            t
        }
        dispose() {
            this.removeAllListeners()
        }
        requireUpdate() {
            return this.needsUpdate || (this.needsUpdate = !0,
            this.emit(Xe.updEvtType)),
            this
        }
        onUpdateRequired(t) {
            this.on(Xe.updEvtType, t)
        }
        clamp(t, e) {
            let i = !1;
            return void 0 !== t ? (this.clampMin = t,
            i = !0) : this.clampMin = -Number.MAX_VALUE,
            void 0 !== e ? (this.clampMax = e,
            i = !0) : this.clampMax = Number.MAX_VALUE,
            i ? (this.to = this._clampedTo,
            this.move = this._clampedMove,
            this.reset = this._clampedReset,
            this._getClamped = this._getClamped) : (this.to = this._directTo,
            this.move = this._directMove,
            this.reset = this._directReset),
            this
        }
        _directTo(t) {
            return this.tgt !== t && (this.tgt = t,
            this.requireUpdate()),
            this
        }
        _directMove(t) {
            return 0 !== t && (this.tgt += t,
            this.requireUpdate()),
            this
        }
        _directReset(t, e, i) {
            return void 0 === e && (e = t),
            this.tgt === e && this.crt === t || (this.tgt = e,
            this.crt = t,
            this.requireUpdate(),
            i && this.update()),
            this
        }
        _clampedTo(t) {
            return t = this._getClamped(t),
            this.tgt !== t && (this.tgt = t,
            this.requireUpdate()),
            this
        }
        _clampedMove(t) {
            let e = this._getClamped(this.tgt + t);
            return this.tgt !== e && (this.tgt = e,
            this.requireUpdate()),
            this
        }
        _clampedReset(t, e, i) {
            return t = this._getClamped(t),
            e = void 0 === e ? t : this._getClamped(e),
            this.tgt === e && this.crt === t || (this.tgt = e,
            this.crt = t,
            this.requireUpdate(),
            i && this.update()),
            this
        }
        update() {
            return this.needsUpdate = !1,
            this.crt = this.tgt,
            !1
        }
    }
    Xe.updEvtType = "require_update";
    class Ke extends Xe {
        constructor(t, e) {
            super(e),
            this.step = t || 9,
            this.maxSpeed = 0
        }
        update() {
            let t, e, i = this.tgt - this.crt;
            return this.needsUpdate = !1,
            Math.abs(i) < this.eps ? this.crt = this.tgt : (t = i / this.step,
            0 !== (e = this.maxSpeed) && (t > e ? t = e : t < -e && (t = -e)),
            this.crt += t,
            this.needsUpdate = !0),
            this.needsUpdate
        }
    }
    class Ze extends Xe {
        constructor(t, e, i, s) {
            super(s),
            this.bias = t || .5,
            this.gain = e || .2,
            this.damping = i || .45,
            this._v = 0
        }
        update() {
            this.needsUpdate = !1;
            let t = this.tgt - this.crt;
            return Math.abs(t) < this.eps ? (this._v = 0,
            this.crt = this.tgt) : (this._v = this.bias * this._v + (1 - this.bias) * (this._v + t * this.gain),
            this.crt += this._v *= this.damping,
            this.needsUpdate = !0),
            this.needsUpdate
        }
    }
    const Je = new Pt
      , Qe = new class {
        get count() {
            return this._count
        }
        constructor() {
            this.points = [],
            this._pointCache = [],
            this._count = 0
        }
        clear() {
            return this._count = 0,
            this.points.length = 0,
            this
        }
        add(t, e) {
            let i = this._pointCache[this.count];
            return i ? i.set(t, e) : (i = new kt(t,e),
            this._pointCache.push(i)),
            this.points[this._count++] = i,
            this
        }
        setInfinity() {
            return this._count = 1 / 0,
            this.points.length = 0,
            this
        }
    }
    ;
    class $e {
        constructor() {
            this.center = new kt,
            this.radius = 0,
            this.scaleX = 1,
            this._ellipse = new Lt,
            this._ellipseDirty = !1,
            this.angle = 0
        }
        toString() {
            let t = "{ center: " + this.center + ", radius: " + this.radius + ", scaleX: " + this.scaleX + " }";
            return t += "\n" + this._ellipse
        }
        reset(t, e, i, s) {
            this.center.set(t, e),
            this.radius = i,
            this.scaleX = s,
            this._ellipseDirty = !0
        }
        resetCenter(t, e) {
            this.center.set(t, e),
            this._ellipseDirty = !0
        }
        angleToCenter(t, e) {
            return this._ellipseDirty && (this._ellipseDirty = !1,
            this._ellipse.resetWithScaledCircle(this.scaleX, 1, this.radius, this.center.x, this.center.y)),
            this._ellipse.angleToCenter(t, e)
        }
        getLineCrossedPoint(t, e, i, s, n, r) {
            this._ellipseDirty && (this._ellipseDirty = !1,
            this._ellipse.resetWithScaledCircle(this.scaleX, 1, this.radius, this.center.x, this.center.y));
            let a, o, l, h, c, d, u, _, p = Je.resetWithXYXY(t, e, i, s), f = this._ellipse.intersectWithLine(p, Qe);
            return 0 === f.count ? null : (a = f.points,
            _ = 0,
            2 === f.count && (o = a[_].x,
            l = a[_].y,
            (h = i - t) * (d = o - t) + (c = s - e) * (u = l - e) < 0 && (_ = 1),
            r && (_ = (_ + 1) % 2)),
            n ? (n.x = a[_].x,
            n.y = a[_].y,
            n) : a[_])
        }
    }
    const ti = (t,e,i,s,n)=>{
        n.angle = Math.atan2(s - e, i - t)
    }
      , ei = (t,e,i,s,n)=>{
        let r = n.getLineCrossedPoint(t, e, i, s);
        n.angle = r ? n.angleToCenter(r.x, r.y) : Math.atan2(s - e, i - t)
    }
      , ii = (t,e,i,s)=>{
        let n = t.center
          , r = n.x + Math.cos(t.angle) * t.radius * t.scaleX
          , a = n.y + Math.sin(t.angle) * t.radius
          , o = e.center
          , l = Math.atan2(a - o.y, r - o.x)
          , h = o.x + Math.cos(l) * e.radius * e.scaleX
          , c = o.y + Math.sin(l) * e.radius;
        i.set(r, a),
        s.set(h - r, c - a)
    }
      , si = (t,e,i,s)=>{
        let n, r, a = e.center, o = a.x + Math.cos(e.angle) * e.radius * e.scaleX, l = a.y + Math.sin(e.angle) * e.radius, h = t.getLineCrossedPoint(a.x, a.y, o, l);
        h ? (n = h.x,
        r = h.y) : (n = t.center.x + Math.cos(t.angle) * t.radius * t.scaleX,
        r = t.center.y + Math.sin(t.angle) * t.radius),
        i.set(n, r),
        s.set(o - n, l - r)
    }
    ;
    class ni {
        constructor(t, e) {
            this._dirtyFlag = e,
            this._weakParent = t,
            this._angularSpd = 0,
            this._inertia = .82,
            this._orbitDirs = [0, 0],
            this._orbitSpd = new Ke(15,.001),
            this._orbitSpd.onUpdateRequired(()=>this._weakParent.needsUpdate |= this._dirtyFlag),
            this._tracks = [new $e, new $e],
            this._activeTrackIndex = -1,
            this._ctlPoint = new kt,
            this._ctlChange = new kt,
            this._ctlPointsDirty = !1
        }
        orbit(t, e) {
            let i = this._orbitDirs;
            return void 0 !== t && (i[0] = t ? 1 : 0),
            void 0 !== e && (i[1] = e ? 1 : 0),
            this._orbitSpd.to(.0018 * (i[1] - i[0])),
            this
        }
        applyAngularSpeed(t) {
            this._angularSpd += t,
            this._weakParent.needsUpdate |= this._dirtyFlag
        }
        reset(t, e, i, s, n, r, a) {
            this._tracks[0].reset(t, e, i, s),
            this._tracks[1].reset(t, e, n, 1),
            this._ctlPointsDirty = !0,
            this._angularSpd = 0,
            this._orbitSpd.reset(0),
            this._activeTrackIndex = r,
            this._tracks[this._activeTrackIndex].angle = "number" == typeof a ? a : this._tracks[this._activeTrackIndex].angleToCenter(a.x, a.z),
            this._weakParent.needsUpdate |= this._dirtyFlag
        }
        resetInnerCenter(t, e) {
            return this._tracks[1].resetCenter(t, e),
            this._ctlPointsDirty = !0,
            this._weakParent.needsUpdate |= this._dirtyFlag,
            this
        }
        getAimPoint() {
            return this._tracks[1].center
        }
        resetWithKissDir(t, e, i, s) {
            let n = this._tracks[1]
              , r = this._tracks[0];
            n.angle = Math.atan2(-e, -t);
            let a = n.center.x
              , o = n.center.y;
            ei(a, o, a - t, o - e, r);
            let l = this._ctlPoint
              , h = this._ctlChange;
            ii(r, n, l, h),
            i.x = l.x + h.x * s.renderedRatio,
            i.z = l.y + h.y * s.renderedRatio,
            this._angularSpd = 0,
            this._orbitSpd.reset(0),
            this._weakParent.needsUpdate |= this._dirtyFlag
        }
        update(t, e, i) {
            let s = !1
              , n = this._tracks[t]
              , r = this._orbitSpd;
            if (r.needsUpdate && r.update() && (s = !0),
            this._angularSpd += r.crt,
            this._activeTrackIndex !== t) {
                this._activeTrackIndex = t,
                this._ctlPointsDirty = !0;
                const e = this._tracks[1].center;
                1 === t ? ti(e.x, e.y, i.x, i.z, n) : ei(e.x, e.y, i.x, i.z, n)
            }
            if (0 !== this._angularSpd) {
                this._ctlPointsDirty = !0;
                let t = 1 - Math.abs(Math.sin(n.angle))
                  , i = .2 * e.renderedRatio + .8;
                Math.abs(this._angularSpd *= this._inertia) < 1e-4 ? this._angularSpd = 0 : s = !0,
                n.angle += (1 + n.scaleX * t - t) * this._angularSpd * i
            }
            if (0 === e.renderedRatio || 1 === e.renderedRatio)
                i.x = n.center.x + Math.cos(n.angle) * n.radius * n.scaleX,
                i.z = n.center.y + Math.sin(n.angle) * n.radius;
            else {
                let s = this._ctlPoint
                  , n = this._ctlChange;
                if (this._ctlPointsDirty) {
                    this._ctlPointsDirty = !1,
                    0 === t ? ii(this._tracks[0], this._tracks[1], s, n) : si(this._tracks[0], this._tracks[1], s, n);
                    let i = n.x * n.x + n.y * n.y;
                    i < 4 ? e.timeScale = 1 : (i > 16 && (i = 16),
                    e.timeScale = 1 - .0125 * (i - 4))
                }
                i.x = s.x + n.x * e.renderedRatio,
                i.z = s.y + n.y * e.renderedRatio
            }
            return s
        }
    }
    class ri {
        constructor(t, e) {
            this._dirtyFlag = e,
            this._weakParent = t,
            this._eyeStandHeight = 0,
            this._squatDeltaH = 0,
            this._standUpDownTween = (new W).resetBase(q.Power1.easeInOut, .6).onUpdateRequired(()=>this._weakParent.needsUpdate |= this._dirtyFlag)
        }
        squatDown(t) {
            t ? this._standUpDownTween.end() : this._standUpDownTween.play()
        }
        standUp(t) {
            t ? this._standUpDownTween.pause(0) : this._standUpDownTween.reverse()
        }
        reset(t, e) {
            this._eyeStandHeight = t,
            this._squatDeltaH = e - t,
            this.standUp(!0),
            this._weakParent.needsUpdate |= this._dirtyFlag
        }
        update(t, e, i) {
            let s = !1;
            const n = this._standUpDownTween;
            return n.needsUpdate && n.update(t) && (s = !0),
            e = (1 - e) * n.renderedRatio,
            i.y = this._eyeStandHeight + e * this._squatDeltaH,
            s
        }
    }
    class ai {
        constructor(t, e) {
            this._dirtyFlag = e,
            this._weakParent = t,
            this._followingTarget = null,
            this._isFollowing = !1,
            this._eyeTarget = Object.create(null),
            this._eyeTarget.x = new Ze(.5,.25,.5,3e-4),
            this._eyeTarget.y = new Ze(.5,.25,.5,3e-4),
            this._eyeTarget.z = new Ze(.5,.25,.5,3e-4);
            const i = ()=>{
                this._weakParent.needsUpdate |= this._dirtyFlag
            }
            ;
            for (var s in this._eyeTarget)
                this._eyeTarget[s].onUpdateRequired(i);
            this._followSpd = new j(t=>{
                var e = this._eyeTarget;
                e.x.gain = t.gain,
                e.y.gain = t.gain,
                e.z.gain = t.gain
            }
            ).reset({
                gain: .05
            }, {
                gain: .26
            }, q.defaultEase, .35).end(),
            this._origin = Object.create(null),
            this._origin.x = 0,
            this._origin.y = 0,
            this._origin.z = 0
        }
        reset(t, e, i, s, n, r) {
            const a = .5 * s
              , o = .5 * n
              , l = this._origin;
            this._isFollowing && this.unfollow(),
            l.x = t,
            l.y = e + r + .03,
            l.z = i,
            this._eyeTarget.x.reset(l.x),
            this._eyeTarget.y.reset(l.y),
            this._eyeTarget.z.reset(l.z),
            this._eyeTarget.x.clamp(l.x - a, l.x + a),
            this._eyeTarget.z.clamp(l.z - o, l.z + o),
            this._followSpd.end()
        }
        follow(t) {
            this._followingTarget = t,
            this._isFollowing = !0,
            this._weakParent.needsUpdate |= this._dirtyFlag,
            this._followSpd.pause(0)
        }
        unfollow() {
            this._followingTarget = null,
            this._isFollowing = !1,
            this._followSpd.play()
        }
        moveLookAt(t, e, i) {
            this._isFollowing && this.unfollow();
            const s = i.forward
              , n = i.side
              , r = this._eyeTarget;
            let a = (e *= 1.5) * s.x + t * n.x
              , o = e * s.z + t * n.z;
            r.x.move(a),
            r.z.move(o)
        }
        lookTo(t, e, i) {
            this._isFollowing && this.unfollow();
            const s = this._eyeTarget;
            i ? (s.x.reset(t),
            s.z.reset(e),
            this._followSpd.end()) : (s.x.tgt !== t && s.z.tgt !== e && this._followSpd.play(0),
            s.x.to(t),
            s.z.to(e))
        }
        resetLookAt() {
            const t = this._origin;
            return this.lookTo(t.x, t.z, !1)
        }
        update(t, e) {
            const i = this._eyeTarget;
            let s, n = !1;
            for (s in this._isFollowing && (i.x.to(this._followingTarget.position.x),
            i.z.to(this._followingTarget.position.z),
            n = !0),
            this._followSpd.needsUpdate && this._followSpd.update(t),
            i)
                i[s].needsUpdate && i[s].update() && (n = !0),
                e[s] = i[s].crt;
            return n
        }
    }
    class oi {
        get isDirty() {
            return this._isDirty
        }
        get angle() {
            return this._isDirty && this.update(),
            this._angle
        }
        get forward() {
            return this._isDirty && this.update(),
            this._forward
        }
        get side() {
            return this._isDirty && this.update(),
            this._side
        }
        constructor() {
            this._angle = 0,
            this._forward = new s.Vector3(1,0,0),
            this._side = new s.Vector3(0,0,1),
            this._dx = 0,
            this._dz = 0,
            this._cachedSlope = 0,
            this._isDirty = !1
        }
        setSlope(t, e) {
            let i = e / t;
            (this._isDirty || Math.abs(i - this._cachedSlope) > 1e-6) && (this._isDirty = !0,
            this._cachedSlope = i,
            this._dx = t,
            this._dz = e)
        }
        update() {
            this._isDirty = !1,
            this._angle = Math.atan2(this._dz, this._dx);
            let t = Math.cos(this._angle)
              , e = Math.sin(this._angle);
            this._forward.copyFromFloats(t, 0, e),
            this._side.copyFromFloats(-e, 0, t)
        }
    }
    class li extends r.a {
        get active() {
            return this._active
        }
        get gPlayerIndex() {
            return this._gPlayerIndex
        }
        get stickName() {
            return this._stickName
        }
        get activeStickMesh() {
            return this._activeStickMesh
        }
        constructor() {
            super(),
            this._gView = null,
            this._simulator = null,
            this._model = null,
            this._gPlayerIndex = -1,
            this._stickName = void 0,
            this._active = !1,
            this._activeStickMesh = null
        }
        reset(t, e, i, s, n) {
            this._gView = t,
            this._simulator = e,
            this._model = i,
            this._gPlayerIndex = s,
            this._stickName = n,
            -1 !== s ? n && this._gView.requireStick(n) || (this._gPlayerIndex = -1,
            this._stickName = void 0) : this._stickName = void 0
        }
        syncEnter() {}
        activate() {
            return this._active || (this._active = !0,
            this._onActive()),
            this
        }
        deactivate() {
            return this._active && (this._active = !1,
            this._onDeactive()),
            this
        }
        _onActive() {
            this._activeStickMesh = this._gView.requireStick(this._stickName),
            this._activeStickMesh && (this._activeStickMesh.inUse = !0)
        }
        _onDeactive() {
            this._activeStickMesh && (this._gView.markStickAsUnused(this._activeStickMesh),
            this._activeStickMesh = null)
        }
        syncTipMotion(t) {
            throw new Error("override me: " + t)
        }
        update(t) {
            throw new Error("should be overridden: " + t)
        }
        shouldUpdate() {
            return !1
        }
        release() {
            this._active && this.deactivate(),
            this._gView = null,
            this._simulator = null,
            this._model = null,
            this._stickName = void 0,
            this._gPlayerIndex = -1
        }
    }
    class hi {
        constructor(t, e) {
            this._weakParent = t,
            this._stateIndex = e,
            this._isDirty = !1,
            this._personBodyX = NaN,
            this._personBodyZ = NaN,
            this._azimuthSideX = NaN,
            this._azimuthSideZ = NaN,
            this._position = new s.Vector3(NaN,1.86,NaN),
            this._rotation = new s.Vector3(0,0,.5 * Math.PI)
        }
        syncPersonCtl(t) {
            const e = t.bodyPosition
              , i = t.azimuth.side;
            this._personBodyX === e.x && this._personBodyZ === e.z || (this._personBodyX = e.x,
            this._personBodyZ = e.z,
            this._markDirty()),
            this._azimuthSideX === i.x && this._azimuthSideZ === i.z || (this._azimuthSideX = i.x,
            this._azimuthSideZ = i.z,
            this._markDirty())
        }
        _markDirty() {
            this._isDirty = !0,
            this._weakParent.markStateDirty(this._stateIndex)
        }
        _update() {
            this._isDirty = !1,
            this._position.x = this._personBodyX - .2 * this._azimuthSideX,
            this._position.z = this._personBodyZ - .2 * this._azimuthSideZ
        }
        getPosition() {
            return this._isDirty && this._update(),
            this._position
        }
        getRotation() {
            return this._rotation
        }
    }
    const ci = A.a.Vec3.EPSILON
      , di = (t,e,i,n,r)=>{
        let a = s.Vector3.Dot(i, t)
          , o = n - r;
        if (o > 0 && a > 0)
            return Number.MAX_VALUE;
        let l = e
          , h = a * a - l * o;
        if (h <= 0)
            return Number.MAX_VALUE;
        let c = (-a - Math.sqrt(h)) / l;
        return c < ci && (c = 0),
        c
    }
      , ui = new A.a.Vec3
      , _i = (t,e,i,s,n,r,a,o)=>{
        let l = a.length;
        if (0 === l)
            return;
        const h = n + r
          , c = h * h;
        let d, u, _, p = ui, f = ci;
        for (let n = 0, r = l; n !== r; ++n)
            if (u = a[n].position,
            p.subVectors(t, u),
            !(p.dot(e) > 0) && (d = i.signedDistance(u),
            Math.abs(d) - h < -f)) {
                (_ = o.next()).reset(u.x - i.normal.x * d, u.y - i.normal.y * d, u.z - i.normal.z * d, Math.sqrt(c - d * d));
                let e = ui.subVectors(_.center, t);
                _.escape = _.radius + e.dot(s)
            }
    }
      , pi = (t,e,i)=>{
        let s = t.x * e[0] + t.y * e[4] + t.z * e[8] + e[12]
          , n = t.x * e[1] + t.y * e[5] + t.z * e[9] + e[13]
          , r = t.x * e[2] + t.y * e[6] + t.z * e[10] + e[14]
          , a = t.x * e[3] + t.y * e[7] + t.z * e[11] + e[15];
        i.x = s / a,
        i.y = n / a,
        i.z = r / a
    }
      , fi = new I.a
      , gi = A.a.Vec3.UNIT_Y
      , mi = new A.a.Vec3(0,0,0)
      , yi = new A.a.Vec3(0,0,0)
      , vi = new A.a.Quaternion(0,0,0,1)
      , bi = new class {
        get length() {
            return this._length
        }
        get array() {
            return this._array
        }
        constructor(t, e=3) {
            this._itemClass = t,
            this._length = 0,
            this._array = [];
            for (let t = 0, i = e; t !== i; ++t)
                this._array.push(new this._itemClass)
        }
        empty() {
            return this._length = 0,
            this
        }
        next() {
            let t = this._array[this._length++];
            return t || (t = new this._itemClass,
            this._array.push(t)),
            t
        }
    }
    (class {
        constructor() {
            this.center = new A.a.Vec3(0,0,0),
            this.radius = 0,
            this.escape = 0
        }
        reset(t, e, i, s) {
            this.center.set(t, e, i),
            this.radius = s
        }
    }
    ,6)
      , xi = Object.create(null);
    xi.ANGLE_H = 1,
    xi.WOR_TRANSFORM = 2,
    xi.LOC_TIP = 4,
    xi.WOR_PROJECTION = 8,
    xi.POTENTIAL_TOUCHES = 16,
    xi.CORRECTION = 32;
    const Si = ()=>{
        let t = Object.create(null);
        return t.ballRadius = NaN,
        t.stickName = void 0,
        t.tipRadius = NaN,
        t.midRadius = NaN,
        t.stickLen = NaN,
        t.ballNTipRadiusSq = NaN,
        t.maxTipOffset = NaN,
        t.maxTipOffsetSq = NaN,
        t
    }
    ;
    class Ci {
        constructor(t, e) {
            this._weakParent = t,
            this._stateIndex = e,
            this._cushionBody = null,
            this._balls = null,
            this._potentialTouches = [],
            this._cachedProps = Si(),
            this._kissDirtyFlag = 0,
            this._worTargetPoint = new s.Vector3(0,0,0),
            this._worCtlPoint = Object.create(null),
            this._worCtlPoint.x = NaN,
            this._worCtlPoint.z = NaN,
            this._angleH = NaN,
            this._angleV = 0,
            this._angleVRange = Object.create(null),
            this._angleVRange.min = 0,
            this._angleVRange.max = .25 * Math.PI,
            this._cachedSlopeH = 999,
            this._worTransform = new Float32Array(16),
            this._locTipPoint = new s.Vector3(0,0,0),
            this._tipMaxEscape = 0,
            this._locSupportPoint = new s.Vector3(-.66,0,0),
            this._worTipPoint = new s.Vector3(0,0,0),
            this._worSupportPoint = new s.Vector3(0,0,0),
            this._kissPoint = new s.Vector3(0,0,0),
            this._kissDir = new s.Vector3(0,0,0),
            this.needsUpdate = 0,
            this._position = new s.Vector3(0,0,0),
            this._rotation = new s.Vector3(0,0,0),
            this._lerpFactor = 1,
            this.animatedPosition = new s.Vector3(0,0,0),
            this.animatedRotation = new s.Vector3(0,0,0),
            this.lstWorSupportY = 0,
            this._leadingSpace = 0,
            this.onKissPropsChanged = (()=>{}
            )
        }
        _markKissDirty(t) {
            this._kissDirtyFlag |= t,
            this.needsUpdate |= 2,
            this._weakParent.markStateDirty(this._stateIndex)
        }
        getKissDir() {
            return 0 !== this._kissDirtyFlag && this._updateKissProps(),
            this._kissDir
        }
        getKissPoint() {
            return 0 !== this._kissDirtyFlag && this._updateKissProps(),
            this._kissPoint
        }
        get leadingSpace() {
            return this._leadingSpace
        }
        set leadingSpace(t) {
            this._leadingSpace !== t && (this._leadingSpace = t,
            this.needsUpdate |= 2,
            this._weakParent.markStateDirty(this._stateIndex))
        }
        get kissToTable() {
            const t = this.getKissDir();
            if (t.y > -ci)
                return Number.MAX_VALUE;
            return -(this.getKissPoint().y - this._worTargetPoint.y + this._cachedProps.ballRadius - this._cachedProps.tipRadius) / t.y
        }
        isReadyToStroke() {
            return 0 === this._kissDirtyFlag && 1 === this._lerpFactor
        }
        bind(t, e, i=null) {
            let s = !1;
            const n = this._cachedProps;
            let r = 0;
            const a = e[0].radius;
            if (a !== n.ballRadius && (s = !0,
            n.ballRadius = a),
            t.stickName !== n.stickName && (s = !0,
            n.stickName = t.stickName,
            n.tipRadius = t.specs.tipRadius,
            n.midRadius = .5 * (t.specs.tipRadius + t.specs.buttRadius),
            n.stickLen = t.specs.len),
            s) {
                n.ballNTipRadiusSq = Math.pow(n.ballRadius + n.tipRadius, 2),
                n.maxTipOffset = Math.min(.6 * n.ballRadius, .99 * (n.ballRadius - n.midRadius)),
                n.maxTipOffsetSq = n.maxTipOffset * n.maxTipOffset;
                let t = .5 * n.ballRadius + n.midRadius;
                this._locSupportPoint.y !== t && (this._locSupportPoint.y = t,
                r |= xi.WOR_PROJECTION),
                r |= xi.LOC_TIP | xi.POTENTIAL_TOUCHES | xi.CORRECTION
            }
            this._balls = e,
            r |= xi.POTENTIAL_TOUCHES,
            this._cushionBody !== i && (this._cushionBody = i,
            i && (r |= xi.POTENTIAL_TOUCHES | xi.CORRECTION)),
            0 !== r && this._markKissDirty(r)
        }
        unbind() {
            this._balls = null,
            this._potentialTouches.length = 0,
            this._cushionBody = null
        }
        resetAimPoint(t) {
            this._worTargetPoint.equals(t) || (this._worTargetPoint.copyFrom(t),
            this._markKissDirty(xi.ANGLE_H | xi.WOR_TRANSFORM | xi.POTENTIAL_TOUCHES))
        }
        setCtlPoint(t, e) {
            let i = this._worCtlPoint;
            i.x === t && i.z === e || (i.x = t,
            i.z = e,
            this._markKissDirty(xi.ANGLE_H))
        }
        setLocTip(t, e, i) {
            let s = this._locTipPoint;
            s.z === t && s.y === e || (s.z = t,
            s.y = e,
            this._markKissDirty(xi.LOC_TIP),
            i && this._lerpFactor > .4 && (this._lerpFactor *= .4))
        }
        moveLocTip(t, e) {
            return this.setLocTip(this._locTipPoint.z + t, this._locTipPoint.y + e, !0)
        }
        get maxTipOffset() {
            return this._cachedProps.maxTipOffset
        }
        setAngleV(t, e) {
            let i = this._angleVRange;
            t < i.min ? t = i.min : t > i.max && (t = i.max),
            t !== this._angleV && (this._angleV = t,
            this._markKissDirty(xi.WOR_TRANSFORM),
            e && (this._lerpFactor *= .4))
        }
        moveAngleV(t) {
            return this.setAngleV(t + this._angleV, !0)
        }
        _updateKissProps() {
            const t = Math.PI
              , e = xi;
            let i = this._kissDirtyFlag
              , s = this._worTargetPoint
              , n = this._worCtlPoint
              , r = this._worTipPoint
              , a = this._worSupportPoint;
            if (this._kissDirtyFlag = 0,
            i & e.ANGLE_H) {
                let r = n.x - s.x
                  , a = n.z - s.z
                  , o = a / r;
                Math.abs(o - this._cachedSlopeH) > 1e-6 && (this._cachedSlopeH = o,
                this._angleH = Math.atan2(-a, r) + t,
                i |= e.WOR_TRANSFORM)
            }
            if (i & e.WOR_TRANSFORM) {
                let t = this._worTransform
                  , n = Math.cos(this._angleH)
                  , r = Math.sin(this._angleH)
                  , a = Math.cos(-this._angleV)
                  , o = Math.sin(-this._angleV);
                t[0] = n * a,
                t[1] = o,
                t[2] = -a * r,
                t[3] = 0,
                t[4] = -n * o,
                t[5] = a,
                t[6] = o * r,
                t[7] = 0,
                t[8] = r,
                t[9] = 0,
                t[10] = n,
                t[11] = 0,
                t[12] = s.x,
                t[13] = s.y,
                t[14] = s.z,
                t[15] = 1,
                i |= e.WOR_PROJECTION
            }
            if (i & e.LOC_TIP) {
                const t = this._cachedProps.maxTipOffsetSq;
                let s, n, r = this._locTipPoint.z, a = this._locTipPoint.y;
                r * r + a * a > t && (s = Math.atan2(a, r),
                n = this._cachedProps.maxTipOffset,
                this._locTipPoint.z = r = n * Math.cos(s),
                this._locTipPoint.y = a = n * Math.sin(s)),
                this._tipMaxEscape = Math.sqrt(t - r * r) - a,
                i |= e.WOR_PROJECTION
            }
            if (i & e.WOR_PROJECTION && (pi(this._locTipPoint, this._worTransform, r),
            pi(this._locSupportPoint, this._worTransform, a),
            i |= e.CORRECTION),
            i & e.POTENTIAL_TOUCHES && (this._updatePotentialTouches(),
            i |= e.CORRECTION),
            i & e.CORRECTION) {
                if (this._correctWorTipAndSupportWithDetection()) {
                    let t = 1 - Math.abs(a.y - this.lstWorSupportY) / .03;
                    t < .5 && (t = .5),
                    this._lerpFactor > t && (this._lerpFactor *= t)
                }
                this.lstWorSupportY = a.y;
                let t = this._kissPoint
                  , e = this._kissDir;
                r.subtractToRef(a, e),
                e.normalize(),
                a.subtractToRef(s, t);
                let i = di(e, 1, t, t.lengthSquared(), this._cachedProps.ballNTipRadiusSq);
                t.copyFromFloats(a.x + i * e.x, a.y + i * e.y, a.z + i * e.z),
                this.onKissPropsChanged(t.x, t.y, t.z, e.x, e.y, e.z)
            }
        }
        updateAnimation(t) {
            const e = Math.PI;
            let i = this.animatedPosition
              , s = this.animatedRotation
              , n = this._rotation
              , r = this._position
              , a = this.needsUpdate;
            if (this.needsUpdate = 0,
            2 & a) {
                const t = this.getKissDir()
                  , i = this.getKissPoint();
                n.y = Math.atan2(t.x, t.z) - .5 * e,
                n.z = Math.asin(t.y),
                r.copyFromFloats(i.x + t.x * this._leadingSpace, i.y + t.y * this._leadingSpace, i.z + t.z * this._leadingSpace)
            }
            if (1 !== this._lerpFactor) {
                if (!((this._lerpFactor += .05) > .99)) {
                    this.needsUpdate |= 1,
                    this._lerpFactor = this._lerpFactor * t + 1 - t,
                    i.x += (r.x - i.x) * this._lerpFactor,
                    i.y += (r.y - i.y) * this._lerpFactor,
                    i.z += (r.z - i.z) * this._lerpFactor,
                    s.x += (n.x - s.x) * this._lerpFactor,
                    s.z += (n.z - s.z) * this._lerpFactor;
                    let a = n.y - s.y;
                    return a > e ? a -= 2 * e : a < -e && (a += 2 * e),
                    s.y += a * this._lerpFactor,
                    this.needsUpdate
                }
                this._lerpFactor = 1
            }
            return i.copyFrom(r),
            s.copyFrom(n),
            this.needsUpdate
        }
        _updatePotentialTouches() {
            const t = this._cachedProps
              , e = this._balls;
            let i, n, r = this._potentialTouches, a = t.stickLen + t.ballRadius + .1, o = a * a, l = this._worTargetPoint;
            if (r.length = 0,
            e)
                for (let t = 0, a = e.length; t !== a; ++t)
                    (i = e[t]).active && 0 !== i.number && (n = s.Vector3.DistanceSquared(l, i.position)) < o && r.push(i);
            this._cushionBody && this._cushionBody.filter(this._worTargetPoint, a)
        }
        _correctWorTipAndSupportWithDetection() {
            let t, e, i, s, n = this._worTipPoint, r = this._worSupportPoint, a = this._cachedProps.ballRadius, o = this._cachedProps.midRadius, l = mi.subVectors(r, n), h = gi, c = fi.setWithPointAnd2Dirs(n, l, h);
            if (c.isZeroNormal())
                return !1;
            let d = yi.crossVectors(c.normal, l).normalize()
              , u = bi.empty();
            if (_i(n, l, c, d, o, a, this._potentialTouches, u),
            this._cushionBody && this._cushionBody.detect(n, l, o, u),
            u.length > 0) {
                for (t = ci,
                e = 0,
                i = 0,
                s = u.length; i !== s; ++i)
                    u.array[i].escape > e && (e = u.array[i].escape);
                if (e - this._tipMaxEscape <= t)
                    d.scale(e),
                    n.x += d.x,
                    n.y += d.y,
                    n.z += d.z,
                    r.x += d.x,
                    r.y += d.y,
                    r.z += d.z;
                else {
                    (e = this._tipMaxEscape) > t && (n.x += e * d.x,
                    n.y += e * d.y,
                    n.z += e * d.z);
                    let a = .5 * Math.PI
                      , o = l;
                    for (i = 0,
                    s = u.length; i !== s; ++i) {
                        let t = u.array[i];
                        o.subVectors(t.center, n);
                        let e = o.length()
                          , s = Math.acos(o.dot(h) / e) - Math.asin(t.radius / e);
                        s < a && (a = s)
                    }
                    let _ = vi.setFromAngleAxis(c.normal, -a)
                      , p = l.vectorApplyQuaternion(_, h).scale(-this._locSupportPoint.x);
                    r.x = n.x + p.x,
                    r.y = n.y + p.y,
                    r.z = n.z + p.z
                }
                return !0
            }
            return !1
        }
    }
    const Ii = q.Power3.easeInOut
      , Ti = q.Power1.easeInOut
      , Ai = q.Power1.easeOut;
    class Ei {
        get stateRatio() {
            return this._stateRatio
        }
        get needsUpdate() {
            return this._needsUpdate
        }
        get rotationZ1() {
            return this._state1.animatedRotation.z
        }
        get angleH1() {
            return this._state1._angleH
        }
        get kissDir() {
            return this._state1.getKissDir()
        }
        get kissPoint() {
            return this._state1.getKissPoint()
        }
        get composedPosition() {
            return this._composedPosition
        }
        get composedRotation() {
            return this._composedRotation
        }
        get leadingSpace() {
            return this._state1.leadingSpace
        }
        set leadingSpace(t) {
            this._state1.leadingSpace = t
        }
        constructor() {
            this._stateRatio = 0,
            this._needsUpdate = !1,
            this._state0 = new hi(this,0),
            this._state1 = new Ci(this,1),
            this._slerpedS1Position = new s.Vector3(0,0,0),
            this._slerpedS1Rotation = new s.Vector3(0,0,0),
            this._composedPosition = new s.Vector3(0,0,0),
            this._composedRotation = new s.Vector3(0,0,0)
        }
        markStateDirty(t) {
            !this._needsUpdate && 0 !== this._stateRatio && Math.abs(t - this._stateRatio) < .999999 && (this._needsUpdate = !0)
        }
        onKissPropsChanged(t) {
            this._state1.onKissPropsChanged = t
        }
        reset(t, e, i=null) {
            this._state1.bind(t, e, i)
        }
        release() {
            this._state1.unbind()
        }
        resetAimPoint(t) {
            this._state1.resetAimPoint(t)
        }
        syncPersonCtl(t) {
            this._stateRatio !== t.stateRatio && (this._stateRatio = t.stateRatio,
            this._needsUpdate = !0),
            this._state0.syncPersonCtl(t),
            this._state1.setCtlPoint(t.bodyPosition.x, t.bodyPosition.z)
        }
        setAngleV(t) {
            return this._state1.setAngleV(t)
        }
        moveAngleV(t) {
            return this._state1.moveAngleV(t)
        }
        moveLocTip(t, e) {
            let i = Math.abs(t / e);
            return i > 1.5 ? e = 0 : i < 1 / 1.5 && (t = 0),
            this._state1.moveLocTip(8e-5 * t, 8e-5 * e)
        }
        clearTip(t) {
            return this._state1.setLocTip(0, 0, t)
        }
        setTipPercent(t, e) {
            let i = this._state1.maxTipOffset;
            return this._state1.setLocTip(t * i, e * i, !1)
        }
        update() {
            const t = this._stateRatio
              , e = this._composedPosition
              , i = this._composedRotation;
            let s = this._state0
              , n = this._state1;
            if (this._needsUpdate = !1,
            0 === t)
                e.copyFrom(s.getPosition()),
                i.copyFrom(s.getRotation());
            else {
                n.needsUpdate && 0 !== n.updateAnimation(t) && (this._needsUpdate = !0);
                let r = n.animatedPosition
                  , a = n.animatedRotation;
                if (1 === t)
                    e.copyFrom(r),
                    i.copyFrom(a);
                else {
                    let n = s.getPosition()
                      , o = s.getRotation()
                      , l = Math.min(1, t / .9)
                      , h = Math.min(1, t / .7)
                      , c = Ii(l)
                      , d = Ti(l)
                      , u = Ai(h);
                    e.x = n.x + (r.x - n.x) * c,
                    e.z = n.z + (r.z - n.z) * c,
                    e.y = n.y + (r.y - n.y) * d,
                    i.x = a.x,
                    i.y = a.y,
                    i.z = o.z + (a.z - o.z) * u
                }
            }
        }
        isReadyToStroke() {
            return 1 === this._stateRatio && this._state1.isReadyToStroke()
        }
        getSlowDownDistance(t, e) {
            let i = .015 + t * e * .9
              , s = this._state1.kissToTable;
            return i > s ? s : i
        }
        getStrokeSpdWithPower(t) {
            return this.getTouchSpdWithPower(t) * this.getKissSpdMulWithPower(t)
        }
        getTouchSpdWithPower(t) {
            return .5 + 11 * t
        }
        getKissSpdMulWithPower(t) {
            return 3.2 + 6 * t
        }
        render(t) {
            if (0 === this._stateRatio)
                t.isVisible = !1;
            else {
                t.isVisible = !0;
                const e = t._worldMatrix.m
                  , i = this._composedPosition
                  , s = this._composedRotation;
                t._isWorldMatrixFrozen = !0;
                let n = Math.cos(s.y)
                  , r = Math.sin(s.y)
                  , a = Math.cos(s.z)
                  , o = Math.sin(s.z);
                e[0] = n * a,
                e[1] = o,
                e[2] = -a * r,
                e[3] = 0,
                e[4] = -n * o,
                e[5] = a,
                e[6] = o * r,
                e[7] = 0,
                e[8] = r,
                e[9] = 0,
                e[10] = n,
                e[11] = 0,
                e[12] = i.x,
                e[13] = i.y,
                e[14] = i.z,
                e[15] = 1,
                t._worldMatrix._markAsUpdated(),
                t._updateBoundingInfo(),
                t.material._lightProbeManager._onMeshTransformDirty(t)
            }
        }
    }
    const wi = -.9
      , Ri = -.3
      , ki = .08
      , Pi = -.2
      , Di = .3
      , Li = .35
      , Oi = 1e-5
      , Mi = Object.create(null);
    Mi.TRANSFORM = 1,
    Mi.LOCPOSITION = 2,
    Mi.LOOKAT = 4;
    class Ui {
        constructor(t, e) {
            this._weakParent = t,
            this._dirtyFlag = e,
            this._localDirtyFlag = 0,
            this._angleH = 0,
            this._angleV = 0,
            this._translate = new s.Vector3(0,0,0),
            this._transform = new Float32Array(16),
            this._transform[0] = 1,
            this._transform[5] = 1,
            this._transform[10] = 1,
            this._transform[15] = 1,
            this._locOrigX = 0,
            this._locOrigY = .12,
            this._locOrigZ = 0,
            this._locX = this._locOrigX,
            this._locY = this._locOrigY,
            this._locZ = this._locOrigZ,
            this._locLookAtOffset = [new Ze(.4,.25,.5,.001), new Ze(.4,.25,.5,.001)],
            this._lookAtSpd = new j(t=>{
                let e = this._locLookAtOffset;
                e[0].gain = t.gain,
                e[1].gain = t.gain
            }
            ).reset({
                gain: .01
            }, {
                gain: .25
            }, q.Power1.easeIn, .5).end();
            const i = ()=>{
                this._markDirty(Mi.LOOKAT)
            }
            ;
            for (let t = 0, e = this._locLookAtOffset.length; t !== e; ++t)
                this._locLookAtOffset[t].onUpdateRequired(i);
            this._locLookAtOffset[0].clamp(.7 * -Math.PI, .7 * Math.PI),
            this.position = new s.Vector3(0,0,0),
            this.lookAtOffset = new s.Vector3(0,0,0)
        }
        _markDirty(t) {
            this._localDirtyFlag |= t,
            this._weakParent.needsUpdate |= this._dirtyFlag
        }
        reset(t) {
            this._locOrigX = -t,
            this._locLookAtOffset[1].clamp(.3 * t, 1).reset(t),
            this._markDirty(Mi.LOCPOSITION),
            this._lookAtSpd.end()
        }
        resetAimPoint(t) {
            this._translate.equalsWithEpsilon(t, 1e-6) || (this._translate.copyFrom(t),
            this._markDirty(Mi.TRANSFORM))
        }
        moveSideLookAt(t, e) {
            this._locLookAtOffset[0].to(this._locLookAtOffset[0].tgt + .5 * t),
            this._locLookAtOffset[1].to(this._locLookAtOffset[1].tgt + .5 * e)
        }
        resetSideLookAt(t) {
            if (t)
                this._locLookAtOffset[0].reset(0),
                this._locLookAtOffset[1].reset(-this._locOrigX),
                this._lookAtSpd.end();
            else {
                this._locLookAtOffset[0].to(0),
                this._locLookAtOffset[1].to(-this._locOrigX);
                let t = 1 - Math.abs(this._locLookAtOffset[0].crt) / this._locLookAtOffset[0].clampMax;
                this._lookAtSpd.play(t * t * this._lookAtSpd.duration)
            }
        }
        setAngles(t, e) {
            let i = !1;
            return Math.abs(this._angleH - t) > Oi && (this._angleH = t,
            this._localDirtyFlag |= Mi.TRANSFORM,
            i = !0),
            Math.abs(this._angleV - e) > Oi && (this._angleV = e,
            this._localDirtyFlag |= Mi.TRANSFORM | Mi.LOCPOSITION,
            i = !0),
            i
        }
        _updateLocs(t) {
            let e = t / wi;
            e > 1 ? e = 1 : e < 0 && (e = 0),
            this._locX = this._locOrigX + Ri * e,
            this._locY = this._locOrigY,
            this._locZ = this._locOrigZ,
            this.lookAtOffset.y = 0,
            e > Li && (e -= Li,
            this._locY += Pi * e,
            this._locZ += ki * e,
            this.lookAtOffset.y = Di * e)
        }
        update() {
            const t = this._transform
              , e = this._locLookAtOffset;
            let i = this._localDirtyFlag;
            this._localDirtyFlag = 0;
            let s = !1
              , n = !1
              , r = !1;
            if (i & Mi.TRANSFORM) {
                let e = Math.cos(this._angleH)
                  , i = Math.sin(this._angleH)
                  , s = Math.cos(this._angleV)
                  , a = Math.sin(this._angleV);
                t[0] = e * s,
                t[1] = a,
                t[2] = -s * i,
                t[3] = 0,
                t[4] = -e * a,
                t[5] = s,
                t[6] = a * i,
                t[7] = 0,
                t[8] = i,
                t[9] = 0,
                t[10] = e,
                t[11] = 0,
                t[12] = this._translate.x,
                t[13] = this._translate.y,
                t[14] = this._translate.z,
                t[15] = 1,
                n = !0,
                r = !0
            }
            if (i & Mi.LOCPOSITION && (this._updateLocs(this._angleV),
            n = !0),
            i & Mi.LOOKAT) {
                this._lookAtSpd.needsUpdate && this._lookAtSpd.update(.016);
                for (let t = 0, i = e.length; t !== i; ++t)
                    e[t].update() && (this._localDirtyFlag |= Mi.LOOKAT,
                    s = !0);
                r = !0
            }
            if (n) {
                let e = this._locX
                  , i = this._locY
                  , s = this._locZ
                  , n = e * t[0] + i * t[4] + s * t[8] + t[12]
                  , r = e * t[1] + i * t[5] + s * t[9] + t[13]
                  , a = e * t[2] + i * t[6] + s * t[10] + t[14]
                  , o = e * t[3] + i * t[7] + s * t[11] + t[15];
                this.position.x = n / o,
                this.position.y = r / o,
                this.position.z = a / o
            }
            if (r) {
                let i = e[0].crt
                  , s = e[1].crt
                  , n = Math.cos(i) * s + this._locOrigX
                  , r = Math.sin(i) * s;
                this.lookAtOffset.x = n * t[0] + r * t[8],
                this.lookAtOffset.z = n * t[2] + r * t[10]
            }
            return s
        }
    }
    const Bi = Object.create(null);
    Bi.TRANSTION = 1,
    Bi.HORIZON = 2,
    Bi.VERTICAL = 4,
    Bi.LOOKAT = 8,
    Bi.HORIZON_VERTICAL = 6,
    Bi.BODY = 15,
    Bi.HEAD = 16,
    Bi.FORCE = 32;
    const Ni = Object.create(null);
    Ni.STATE_STAND = 0,
    Ni.STATE_AIM = 1;
    const Vi = Object.create(null);
    Vi.STATE_CHANGE_START = "sc_start",
    Vi.STATE_CHANGE_END = "sc_end",
    Vi.AI_SHOT = "ai_shot";
    class Fi extends li {
        get bodyPosition() {
            return this._bodyPosition
        }
        get lockedTarget() {
            return this._lockedTarget
        }
        get state() {
            return this._state
        }
        get azimuth() {
            return this._azimuth
        }
        get stateRatio() {
            return this._stateTransitionTween.uneaseRenderedRatio
        }
        set strokePower(t) {
            t > 1 ? t = 1 : t < 0 && (t = 0),
            t !== this._strokePower && (this._strokePower = t,
            this.nPhysicsChanged++,
            this._onStrokePowerChanged())
        }
        get strokePower() {
            return this._strokePower
        }
        get stickCtl() {
            return this._stickCtl
        }
        constructor() {
            super(),
            this.needsUpdate = 0,
            this._bodyPosition = new s.Vector3(0,0,0),
            this._lockedTarget = new s.Vector3(0,0,0),
            this._state = Ni.STATE_STAND,
            this._stateTransitionTween = (new W).resetBase(q.Power1.easeInOut, 1.2).onUpdateRequired(()=>this.needsUpdate |= Bi.TRANSTION),
            this._horizonCtl = new ni(this,Bi.HORIZON),
            this._verticalCtl = new ri(this,Bi.VERTICAL),
            this._lookAtCtl = new ai(this,Bi.LOOKAT),
            this._headCtl = new Ui(this,Bi.HEAD),
            this._azimuth = new oi,
            this._stickCtl = new Ei,
            this._strokeVars = new Float32Array(8),
            this.nPhysicsChanged = 0,
            this._stickCtl.onKissPropsChanged((t,e,i,s,n,r)=>{
                this.nPhysicsChanged++;
                const a = this._strokeVars;
                a[0] = t,
                a[1] = e,
                a[2] = i,
                a[3] = s,
                a[4] = n,
                a[5] = r
            }
            ),
            this._strokePower = 0
        }
        reset(t, e, i, s, n) {
            if (super.reset(t, e, i, s, n),
            this._stickName) {
                let i = t.requireStick(this._stickName)
                  , s = i.specs.tipRadius;
                this._stickCtl.reset(i, e.getBalls(), t.cushionBody),
                this._strokeVars[7] = s
            }
        }
        syncEnter(t, e) {
            const i = t.innerTrackRadius
              , s = t.eyeStandHeight
              , n = t.eyeSquatHeight
              , r = this._gView.playArea.position
              , a = this._gView.playArea.size
              , o = this._gView.trackInfo
              , l = this._gView.ballRadius;
            this._horizonCtl.reset(r.x, r.z, o.radius, o.scaleX, i, 0, e),
            this._verticalCtl.reset(s, n),
            this._lookAtCtl.reset(r.x, r.y, r.z, a.w, a.h, l),
            this._headCtl.reset(i),
            this.gotoState0(!0)
        }
        release() {
            this._stickCtl.release(),
            super.release()
        }
        activate() {
            super.activate();
            const t = this._simulator.getCueBallPosition();
            return this._horizonCtl.resetInnerCenter(t.x, t.z),
            this._stickCtl.resetAimPoint(t),
            this._stickCtl.clearTip(!1),
            this._stickCtl.setAngleV(0),
            this._headCtl.resetAimPoint(t),
            this.strokePower = .5,
            this
        }
        _onActive() {
            super._onActive(),
            this.markForceUpdate()
        }
        markForceUpdate() {
            this.needsUpdate |= Bi.FORCE
        }
        gotoState0(t) {
            if (this._state !== Ni.STATE_STAND) {
                this._state = Ni.STATE_STAND;
                let e = this._stateTransitionTween;
                e.needsUpdate || this.emit(Vi.STATE_CHANGE_START),
                t ? e.pause(0) : e.reverse()
            } else
                t && !this._stateTransitionTween.isComplete(!0) && this._stateTransitionTween.pause(0);
            return this
        }
        gotoState1(t) {
            if (this._state !== Ni.STATE_AIM) {
                this._state = Ni.STATE_AIM;
                let e = this._horizonCtl.getAimPoint()
                  , i = this._stateTransitionTween;
                i.needsUpdate || this.emit(Vi.STATE_CHANGE_START),
                t ? (i.end(),
                this._lookAtCtl.lookTo(e.x, e.y, !0),
                this._headCtl.resetSideLookAt(!0)) : (i.play(),
                this._lookAtCtl.lookTo(e.x, e.y, !1),
                this._headCtl.resetSideLookAt(!1))
            } else if (t && !this._stateTransitionTween.isComplete()) {
                let t = this._horizonCtl.getAimPoint();
                this._stateTransitionTween.end(),
                this._lookAtCtl.lookTo(t.x, t.y, !0),
                this._headCtl.resetSideLookAt(!0)
            }
            return this
        }
        lookTo(t, e, i) {
            this._lookAtCtl.lookTo(t, e, i)
        }
        follow(t) {
            return this._lookAtCtl.follow(t)
        }
        get isFollowing() {
            return this._lookAtCtl._isFollowing
        }
        get followingTarget() {
            return this._lookAtCtl._followingTarget
        }
        unfollow() {
            return this._lookAtCtl.unfollow()
        }
        squatDown() {
            this._verticalCtl.squatDown()
        }
        standUp() {
            this._verticalCtl.standUp()
        }
        orbit(t, e) {
            this._horizonCtl.orbit(t, e)
        }
        moveLookAt(t, e) {
            this._state === Ni.STATE_AIM ? this._headCtl.moveSideLookAt(t, e) : this._lookAtCtl.moveLookAt(t, e, this._azimuth)
        }
        resetLookAt() {
            this._state === Ni.STATE_AIM ? this._headCtl.resetSideLookAt() : this._lookAtCtl.resetLookAt()
        }
        resetWithKissDir(t, e) {
            this._horizonCtl.resetWithKissDir(t, e, this._bodyPosition, this._stateTransitionTween)
        }
        syncTipMotion(t) {
            this._stickCtl.leadingSpace = t.length
        }
        getKissPoint() {
            return this._stickCtl.kissPoint
        }
        getKissDir() {
            return this._stickCtl.kissDir
        }
        moveStickTip(t, e) {
            return this._stickCtl.moveLocTip(t, e)
        }
        clearStickTip(t) {
            return this._stickCtl.clearTip(t)
        }
        moveStickAngleV(t) {
            this._stickCtl.moveAngleV(t)
        }
        isReadyToStroke() {
            return this._state === Ni.STATE_AIM && this._stickCtl.isReadyToStroke()
        }
        getStrokeVars() {
            const t = this._strokeVars;
            return t[6] = this._stickCtl.getStrokeSpdWithPower(this._strokePower),
            t
        }
        getStickTouchSpd() {
            return this._stickCtl.getTouchSpdWithPower(this._strokePower)
        }
        getStickSlowDownDistance(t) {
            return this._stickCtl.getSlowDownDistance(this._strokePower, t)
        }
        getTipRadius() {
            return this._strokeVars[7]
        }
        shouldUpdate() {
            return this._active && (0 !== this.needsUpdate || this._stickCtl.needsUpdate)
        }
        update(t) {
            const e = this._stateTransitionTween;
            let i = this.needsUpdate
              , s = this._bodyPosition
              , n = this._lockedTarget
              , r = this._azimuth
              , a = this._headCtl;
            if (this.needsUpdate = 0,
            i & Bi.BODY) {
                let a = !1;
                i & Bi.TRANSTION && (i |= Bi.HORIZON_VERTICAL,
                e.update(t) || (i &= ~Bi.TRANSTION,
                this.emit(Vi.STATE_CHANGE_END))),
                i & Bi.HORIZON && (this._horizonCtl.update(this._state, e, s) || (i &= ~Bi.HORIZON),
                a = !0),
                i & Bi.VERTICAL && (this._verticalCtl.update(t, e.renderedRatio, s) || (i &= ~Bi.VERTICAL)),
                i & Bi.LOOKAT && (this._lookAtCtl.update(t, n) || (i &= ~Bi.LOOKAT),
                a = !0),
                a && r.setSlope(n.x - s.x, n.z - s.z),
                this._stickCtl.syncPersonCtl(this)
            }
            return (this._stickCtl.needsUpdate || i & Bi.FORCE) && (this._stickCtl.update(),
            a.setAngles(this._stickCtl.angleH1, this._stickCtl.rotationZ1) && (i |= Bi.HEAD),
            this._active && (this._stickCtl.render(this._activeStickMesh),
            this._onStickRendered())),
            i & Bi.HEAD && !a.update() && (i &= ~Bi.HEAD),
            i &= ~Bi.FORCE,
            this.needsUpdate |= i,
            !0
        }
        _onStickRendered() {}
        _onStrokePowerChanged() {}
    }
    var zi = i(0)
      , Hi = i.n(zi);
    const Gi = i(45);
    class qi extends se {
        constructor(t) {
            super(t, {
                on: "flex"
            }),
            this._currentGroup = -1,
            this._allowAim = this._aimKey.visible,
            this._allowPickUp = this._pickUpKey.visible
        }
        _createElement() {
            let t = qi.parseUI(Gi)
              , e = t.querySelector(".stand-group")
              , i = t.querySelector(".aim-group");
            this._groups = [this._makeElementWrapper(e, !0), this._makeElementWrapper(i, !0)],
            this._aimKey = this._makeElementWrapper(e.querySelector(".aim-key"), !0),
            this._pickUpKey = this._makeElementWrapper(e.querySelector(".pickup-key"), !0),
            this.moreBn = t.querySelector(".more-button");
            let s = t.querySelectorAll(".assi-key");
            if (Hi.a.mac)
                for (let t = 0, e = s.length; t !== e; ++t)
                    s[t].innerHTML = "cmd";
            return t
        }
        _createTween() {
            return new j(t=>{
                0 !== t.r ? (t.displayed || (t.displayed = !0,
                this._element.style.display = this._styleOpts.on),
                this._element.style.opacity = t.r) : !1 !== t.displayed && (t.displayed = !1,
                this._element.style.display = this._styleOpts.off)
            }
            ).reset({
                r: 0
            }, {
                r: 1
            }, q.Power1.easeIn, .15, .3).pause(0)
        }
        _makeElementWrapper(t, e) {
            let i = Object.create(null);
            return i.e = t,
            i.visible = e,
            i
        }
        allowAim(t) {
            return this._allowAim !== t && (this._allowAim = t,
            this._setWrapperVisible(this._aimKey, t)),
            this
        }
        allowPickUp(t) {
            return this._allowPickUp !== t && (this._allowPickUp = t,
            this._setWrapperVisible(this._pickUpKey, t)),
            this
        }
        setGroup(t) {
            return this._currentGroup !== t && (this._currentGroup = t,
            1 === t ? (this._setWrapperVisible(this._groups[0], !1),
            this._setWrapperVisible(this._groups[1], !0)) : (this._setWrapperVisible(this._groups[0], !0),
            this._setWrapperVisible(this._groups[1], !1))),
            this
        }
        _setWrapperVisible(t, e) {
            t.visible !== e && (t.visible = e,
            t.e.style.display = e ? "flex" : "none")
        }
    }
    class Wi extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("BASIC CONTROLS").closeLabel("CLOSE")._addBoxClass("controls-guide-box"),
            this._lockScreen = !1
        }
        _createElement() {
            let t = super._createElement();
            return this._createBody(!1).replaceContent('<section class="basic-controls-img"></section><p class="comment-copy">FOR MORE ADVANCED CONTROLS, SEE THE INSTRUCTIONS ON THE BOTTOM-RIGHT SIDE OF THE SCREEN.</p>'),
            t
        }
    }
    let Yi = i(44);
    class ji extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("CONTROLS GUIDE").closeLabel("CLOSE")._addBoxClass("controls-guide-box")
        }
        _createElement() {
            let t = super._createElement();
            this._body = this._createBody(!1).replaceContent(Yi),
            Yi = null;
            let e = t.querySelectorAll(".assi-key");
            if (Hi.a.mac)
                for (let t = 0, i = e.length; t !== i; ++t)
                    e[t].innerHTML = "cmd";
            return t
        }
        _onDeactivate() {
            this._body.container.scrollTop = 0,
            super._onDeactivate()
        }
    }
    const Xi = q.Power3.easeInOut
      , Ki = A.a.Vec3
      , Zi = Ki.EPSILON
      , Ji = (t,e,i,s,n)=>{
        let r = i.dot(t)
          , a = s - n;
        if (a > 0 && r > 0)
            return Number.MAX_VALUE;
        let o = e
          , l = r * r - o * a;
        if (l <= 0)
            return Number.MAX_VALUE;
        let h = (-r - Math.sqrt(l)) / o;
        return h < Zi && (h = 0),
        h
    }
      , Qi = .25;
    class $i {
        get maxPullbackLen() {
            return Qi
        }
        get needsUpdate() {
            return this._needsUpdate
        }
        get gap() {
            return this._gap
        }
        get length() {
            return this._length
        }
        get pullbackProgress() {
            return this._pullbackProgress
        }
        constructor(t=-.015) {
            this._gap = t,
            this._length = t,
            this._pullbackProgress = 0,
            this._tick = 0,
            this._duration = 0,
            this._needsUpdate = !1,
            this._distance_s1 = 0,
            this._dura_s1 = 0,
            this._dura_s2 = 0,
            this._acc_s2 = 0,
            this._dura_s3 = 0,
            this._distance_s3 = 0,
            this._tipRadius = 0,
            this._kissDir = new Ki,
            this._kissPoint = new Ki,
            this._tmpSp = new Ki,
            this.launchingController = null
        }
        reset() {
            this._needsUpdate = !1,
            this._length = this._gap,
            this._pullbackProgress = 0,
            this.launchingController = null
        }
        cancel() {
            this.launchingController = null
        }
        isReady() {
            return !this._needsUpdate && 0 === this._pullbackProgress
        }
        launch(t) {
            let e = t.getStickTouchSpd()
              , i = t.strokePower
              , s = t.getStickSlowDownDistance(this.maxPullbackLen);
            this._tipRadius = t.getTipRadius(),
            this._kissDir.copy(t.getKissDir()),
            this._kissPoint.copy(t.getKissPoint()),
            this.launchingController = t,
            this._distance_s1 = q.Power1.easeOut(i) * Qi,
            this._dura_s1 = .3 + .3 * q.Power1.easeOut(i);
            let n = this._distance_s1 - this._gap;
            this._dura_s2 = 2 * n / e,
            this._acc_s2 = e / this._dura_s2;
            let r = .92 * e
              , a = .5 * r * r / s;
            return this._dura_s3 = r / a,
            this._distance_s3 = s,
            this._tick = 0,
            this._duration = this._dura_s1 + this._dura_s2 + this._dura_s3,
            this._needsUpdate = !0,
            this._dura_s1 + this._dura_s2
        }
        tick(t) {
            let e = this._tick;
            return t > .02 && (t = .02),
            this._tick += t,
            this._tick >= this._duration ? (this._tick = this._duration,
            this._needsUpdate = !1,
            this._duration - e) : t
        }
        updateLength(t) {
            let e = this._tick;
            if (e <= this._dura_s1)
                return this._pullbackProgress = e / this._dura_s1,
                void (this._length = this._gap - Xi(this._pullbackProgress) * this._distance_s1);
            if (this._pullbackProgress = 1,
            (e -= this._dura_s1) < this._dura_s2)
                return void (this._length = this._gap - this._distance_s1 + this._acc_s2 * e * e * .5);
            let i = q.Power2.easeOut((e - this._dura_s2) / this._dura_s3) * this._distance_s3
              , s = t.radius + this._tipRadius
              , n = this._tmpSp.subVectors(this._kissPoint, t.position)
              , r = Ji(this._kissDir, 1, n, n.lengthSq(), s * s);
            this._length = Math.min(i, r)
        }
    }
    class ts extends ze {
        constructor(t, e, i, s) {
            super(t, e, i),
            this._phxStrokeDelay = -1,
            this._strokToStandUpDelay = -1,
            this._tipMotion = new $i(-.015),
            this._shortcutsBar = null,
            this._needsPopNaviBox = 1,
            this._isRecording = !1,
            this._movieClip = s,
            this._camTrack = s.getTrack("cam"),
            this._stickTrack = s.getTrack("stick"),
            this._ballTracks = [];
            for (let t = 0, e = s.maxBallTracks; t !== e; ++t)
                this._ballTracks[t] = s.getTrack("b" + t);
            this._evtManager.initialize({
                "68|39": {
                    down: ()=>{
                        this._fpc.orbit(void 0, 1)
                    }
                    ,
                    up: ()=>{
                        this._fpc.orbit(void 0, 0)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                "65|37": {
                    down: ()=>{
                        this._fpc.orbit(1, void 0)
                    }
                    ,
                    up: ()=>{
                        this._fpc.orbit(0, void 0)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                "87|38": {
                    down: ()=>{
                        const t = this._fpc;
                        t.active && t.gotoState1()
                    }
                    ,
                    ss: Te.a.READY
                },
                "40|83": {
                    down: ()=>{
                        this._fpc.gotoState0()
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING
                },
                88: {
                    down: ()=>{
                        this._fpc.squatDown()
                    }
                    ,
                    up: ()=>{
                        this._fpc.standUp()
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                82: {
                    down: ()=>{
                        this._fpc.resetLookAt()
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                67: {
                    down: ()=>{
                        const t = this._fpc;
                        t.clearStickTip(t.state === Ni.STATE_AIM)
                    }
                    ,
                    ss: Te.a.READY
                },
                80: {
                    down: ()=>{
                        this._fpc.active && this._model.getContext("inHand") > 0 && this._evtBus.emit(Ge.SWITCH, "inHand")
                    }
                    ,
                    ss: Te.a.READY
                },
                32: {
                    down: ()=>{
                        this._launchShot(this._fpc)
                    }
                    ,
                    ss: Te.a.READY
                },
                191: {
                    down: ()=>{
                        this._evtBus.emit(Ge.POP_BOX, "controlsGuideBox")
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                }
            }, {
                drag: {
                    fn: (t,e,i)=>{
                        const s = this._fpc;
                        i ? s.state === Ni.STATE_AIM && s.moveStickTip(-t, -e) : s.moveLookAt(.0025 * t, .0025 * e)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                wheel: {
                    fn: (t,e)=>{
                        const i = this._fpc;
                        i.state !== Ni.STATE_STAND && (e ? i.moveStickAngleV(2e-4 * -t) : i.strokePower += 5e-4 * t)
                    }
                    ,
                    ss: Te.a.READY
                }
            }),
            this._onFPCStateChangeStart = (()=>this._shortcutsBar.deactivate()),
            this._onFPCStateChangeEnd = (()=>this._politeShowShortCuts()),
            this._onShortCutsClick = (()=>{
                this._evtBus.emit(Ge.POP_BOX, "controlsGuideBox")
            }
            ),
            this._onAIShot = (t=>{
                this._launchShot(t)
            }
            )
        }
        setGState(t) {
            super.setGState(t),
            t !== Te.a.READY && this._shortcutsBar.deactivate()
        }
        bindUI(t, e) {
            this._shortcutsBar = this._registerLocalUI("shortcutsBar", qi, t, e, 0),
            this._needsPopNaviBox > 0 && !t.hasRegisteredBox("controlsNaviBox") && t.registerBox(new Wi("controlsNaviBox")),
            t.hasRegisteredBox("controlsGuideBox") || t.registerBox(new ji("controlsGuideBox"))
        }
        unbind() {
            super.unbind(),
            this._shortcutsBar = null
        }
        _onModelResponseHandler(t) {
            let e = t.getContext("playerIndex") === this._fpc.gPlayerIndex
              , i = t.getContext("inHand");
            this._shortcutsBar.allowAim(e).allowPickUp(e && i > 0)
        }
        activate() {
            super.activate();
            const t = this._playerCtls
              , e = this._model.getContext("playerIndex");
            this._tipMotion.reset(),
            this.update = this._defaultUpdateHandler,
            this._isRecording = !1;
            let i = null;
            for (let s = 0, n = t.length; s !== n; ++s)
                t[s].gPlayerIndex === e ? i = t[s] : t[s].deactivate(),
                t[s].syncTipMotion(this._tipMotion);
            return i && i.activate(),
            this._politeShowShortCuts(),
            this._movieClip.duration > .5 ? this._evtBus.emit(Ge.CHANGE_CONTROL_GROUP, qe.PAUSE | qe.REPLAY) : this._evtBus.emit(Ge.CHANGE_CONTROL_GROUP, qe.PAUSE),
            this
        }
        _onActvate() {
            super._onActvate();
            let t = this._fpc;
            t.on(Vi.STATE_CHANGE_START, this._onFPCStateChangeStart),
            t.on(Vi.STATE_CHANGE_END, this._onFPCStateChangeEnd);
            let e = this._playerCtls;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i] !== t && e[i].on(Vi.AI_SHOT, this._onAIShot);
            this._shortcutsBar.moreBn.addEventListener("click", this._onShortCutsClick, !1),
            this._evtManager.enabled = !0,
            this._needsPopNaviBox > 0 && (this._needsPopNaviBox--,
            setTimeout(()=>{
                this._isActive ? this._evtBus.emit(Ge.POP_BOX, "controlsNaviBox") : this._needsPopNaviBox < 1 && (this._needsPopNaviBox = 1)
            }
            , 500))
        }
        _onDeactvate() {
            super._onDeactvate();
            let t = this._fpc;
            t.removeAllListeners(Vi.STATE_CHANGE_START),
            t.removeAllListeners(Vi.STATE_CHANGE_END);
            let e = this._playerCtls;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i] !== t && e[i].removeAllListeners(Vi.AI_SHOT);
            this._shortcutsBar.moreBn.removeEventListener("click", this._onShortCutsClick, !1),
            this._isRecording = !1,
            this._tipMotion.cancel()
        }
        _politeShowShortCuts() {
            let t = this._fpc;
            this._shortcutsBar.setGroup(t.state),
            !this._isActive || this._evtManager.state !== Te.a.READY || 0 !== t.stateRatio && 1 !== t.stateRatio || this._shortcutsBar.activate()
        }
        _startRecording(t) {
            this._movieClip.erase(),
            t.active && t.activeStickMesh ? this._stickTrack.setSource(t.stickCtl, t.activeStickMesh.stickName) : this._stickTrack.setSource(void 0),
            this._isRecording = !0,
            this._recordBase(0),
            this._recordBalls(0)
        }
        _recordBase(t, e=!1) {
            let i = this._camTrack
              , s = this._stickTrack;
            i.recordable && !i.record(t) && (this._isRecording = !1),
            s.recordable && !s.record(t, e) && (this._isRecording = !1)
        }
        _recordBalls(t) {
            let e, i = this._ballTracks;
            if (t > .1)
                this._isRecording = !1;
            else
                for (let s = 0, n = i.length; s !== n; ++s)
                    (e = i[s]).recordable && !e.record(t) && (this._isRecording = !1)
        }
        _extendsBalls(t) {
            let e = this._ballTracks;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].recordable && e[i].extendsLife(t);
            return this
        }
        _launchShot(t) {
            const e = this._tipMotion;
            t.isReadyToStroke() && e.isReady() && this._model.reportPlayerStroke(t.gPlayerIndex) && (this._evtBus.emit(Ge.SHOTTING_START),
            t === this._fpc && (this._evtManager.enabled = !1,
            t.follow(this._simulator.getBallAtIndex(0))),
            this._strokToStandUpDelay = .5,
            this._phxStrokeDelay = e.launch(t),
            this.update = this._updateWithTipMotion,
            this._startRecording(t))
        }
        _updateWithTipMotion(t) {
            const e = this._gView
              , i = this._simulator
              , s = this._tipMotion;
            let n = t.dt;
            for (; s.needsUpdate; ) {
                let t = s.tick(n);
                n -= t;
                let r = !1;
                if (-1 !== this._phxStrokeDelay && (this._phxStrokeDelay <= t ? (n += t - this._phxStrokeDelay,
                s._tick -= t - this._phxStrokeDelay,
                t = this._phxStrokeDelay,
                r = !0,
                i.stroke(s.launchingController.getStrokeVars()),
                this._evtManager.enabled = !0,
                this._phxStrokeDelay = -1) : this._phxStrokeDelay -= t,
                this._extendsBalls(t)),
                0 !== i.nAwakened) {
                    let s = i.step(t);
                    this._isRecording && this._recordBalls(s),
                    e.syncBalls(i.getBalls(), i.evolution)
                }
                if (s.updateLength(i.getBallAtIndex(0)),
                s.launchingController.syncTipMotion(s),
                this.updateGameBase(t),
                this._isRecording && this._recordBase(t, r),
                n < 1e-6)
                    return !0
            }
            if (0 !== i.nAwakened) {
                let t = i.step(n);
                this._isRecording && this._recordBalls(t),
                e.syncBalls(i.getBalls(), i.evolution)
            }
            return (this._strokToStandUpDelay -= n) < 0 && (s.launchingController.gotoState0(),
            this.update = this._defaultUpdateHandler),
            this.updateGameBase(n),
            this._isRecording && this._recordBase(n),
            !0
        }
        _defaultUpdateHandler(t) {
            const e = this._gView
              , i = this._simulator
              , s = this._fpc
              , n = t.dt;
            let r = !1
              , a = !1
              , o = this._tipMotion;
            if (0 !== i.nAwakened) {
                let t = i.step(n);
                this._isRecording && this._recordBalls(t),
                e.syncBalls(i.getBalls(), i.evolution),
                r = !0
            }
            if (this.updateGameBase(n) && (this._isRecording && this._recordBase(n),
            a = !0),
            !r) {
                if (s.state === Ni.STATE_AIM && 0 !== s.nPhysicsChanged && this._tipMotion.isReady()) {
                    s.nPhysicsChanged = 0;
                    let t = i.predict(s.getStrokeVars(), 1.6);
                    e.gunsight.syncPrediction(t, this._model.getContext("ballOn"), 1.6)
                }
                o.launchingController && 0 === o.launchingController.stateRatio && (o.cancel(),
                s.unfollow(),
                this._isRecording = !1,
                this._movieClip.saveRecording(),
                this._model.reqRoundResult(i))
            }
            return a
        }
    }
    class es extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("PAUSED").closeLabel("RESUME")._addBoxClass("pause-box")
        }
        _createElement() {
            let t = super._createElement();
            this._body = this._createBody(!0);
            let e = [{
                label: "RESUME",
                sid: "resume"
            }, {
                label: "RESTART",
                sid: "restart"
            }, {
                label: "CONTROLS GUIDE",
                sid: "controls_guide"
            }, {
                label: "QUIT",
                sid: "quit"
            }];
            for (let t = 0, i = e.length; t !== i; ++t) {
                let i = document.createElement("section");
                i.className = "line-section ss-l clickable-section",
                i.setAttribute("data-sid", e[t].sid),
                i.innerHTML = e[t].label,
                this._body.pushContent(i)
            }
            return t
        }
    }
    let is = i(43);
    class ss extends _e {
        constructor(t) {
            super(t, void 0),
            this.head("RESULTS").closeLabel("BACK"),
            this._onRetryClick = (()=>this.emit("retry"))
        }
        _createElement() {
            let t = super._createElement();
            this._retryBn = this._createButton("RETRY", !0);
            let e = this._createBody(!1).replaceContent(is);
            return is = null,
            this._timeValue = e.container.querySelector(".time"),
            this._ptsValue = e.container.querySelector(".pts"),
            this._brkValue = e.container.querySelector(".brk"),
            this._foulsLabel = e.container.querySelector(".fouls-label"),
            this._foulsValue = e.container.querySelector(".fouls"),
            this._accuracyValue = e.container.querySelector(".accuracy"),
            t
        }
        data(t) {
            this._timeValue.innerHTML = u.a.toTimeString(t.time);
            let e = t.players[0];
            return this._ptsValue.innerHTML = e.pts,
            this._brkValue.innerHTML = e.maxbrk,
            this._foulsValue.innerHTML = e.penalty,
            e.penalty < 0 ? (this._foulsLabel.classList.add("error-copy"),
            this._foulsValue.classList.add("error-copy")) : (this._foulsLabel.classList.remove("error-copy"),
            this._foulsValue.classList.remove("error-copy")),
            this._accuracyValue.innerHTML = (100 * e.accuracy).toFixed(1) + "%",
            this
        }
        _bindEvents() {
            super._bindEvents(),
            this._retryBn.addEventListener("click", this._onRetryClick, !1)
        }
        _unbindEvents() {
            this._retryBn.removeEventListener("click", this._onRetryClick, !1),
            super._unbindEvents()
        }
    }
    const ns = i(42);
    class rs extends se {
        get isPlaying() {
            return this._isPlaying
        }
        set isPlaying(t) {
            this._isPlaying !== t && (this._isPlaying = t,
            t ? (this._playBn.style.display = "none",
            this._pauseBn.style.display = "flex") : (this._playBn.style.display = "flex",
            this._pauseBn.style.display = "none"))
        }
        setProgress(t) {
            this._progressLen.style.width = Math.round(1e4 * t) / 100 + "%"
        }
        slomo(t) {
            t ? this._progressLen.classList.add("slomo") : this._progressLen.classList.remove("slomo")
        }
        constructor(t) {
            super(t, {
                on: "flex"
            }),
            this._isPlaying = !1,
            this._onPauseClick = (()=>this.emit(de.ITEM_CLICK, "pause")),
            this._onPlayClick = (()=>this.emit(de.ITEM_CLICK, "play")),
            this._onCloseClick = (()=>this.emit(de.ITEM_CLICK, "close")),
            this.supportsPointer = !!window.PointerEvent,
            this._isDragging = !1,
            this._progressTotalLen = 0,
            this._onProgressMouseDown = (t=>{
                this._isDragging = !0,
                this.supportsPointer && t.target.setPointerCapture(t.pointerId),
                this._progressTotalLen = t.target.getBoundingClientRect().width;
                let e = t.offsetX / this._progressTotalLen;
                e > 1 ? e = 1 : e < 0 && (e = 0),
                this.emit(de.ITEM_CLICK, "seek", e, !0)
            }
            ),
            this._onProgressMouseMove = (t=>{
                if (this._isDragging) {
                    t.preventDefault();
                    let e = t.offsetX / this._progressTotalLen;
                    e > 1 ? e = 1 : e < 0 && (e = 0),
                    this.emit(de.ITEM_CLICK, "seek", e)
                }
            }
            ),
            this._onProgressMouseUp = (t=>{
                this._isDragging = !1,
                this.supportsPointer && (t.preventDefault(),
                t.target.releasePointerCapture(t.pointerId))
            }
            )
        }
        _createElement() {
            let t = rs.parseUI(ns);
            return this._pauseBn = t.querySelector(".pause-button"),
            this._playBn = t.querySelector(".play-button"),
            this._closeBn = t.querySelector(".close-button"),
            this._progressBar = t.querySelector(".progress-bar"),
            this._progressLen = t.querySelector(".progress-len"),
            t
        }
        _createTween() {
            return new j(t=>{
                0 !== t.r ? (t.displayed || (t.displayed = !0,
                this._element.style.display = this._styleOpts.on),
                this._element.style.transform = "translate3d(0," + (40 - 40 * t.r) + "px, 0)") : !1 !== t.displayed && (t.displayed = !1,
                this._element.style.display = this._styleOpts.off)
            }
            ).reset({
                r: 0
            }, {
                r: 1
            }, q.Power1.easeInOut, .2).pause(0)
        }
        _onDeactivate() {
            this._isDragging = !1,
            super._onDeactivate()
        }
        _bindEvents() {
            this._pauseBn.addEventListener("click", this._onPauseClick, !1),
            this._playBn.addEventListener("click", this._onPlayClick, !1),
            this._closeBn.addEventListener("click", this._onCloseClick, !1),
            this.supportsPointer ? (this._progressBar.addEventListener("pointerdown", this._onProgressMouseDown, !1),
            this._progressBar.addEventListener("pointermove", this._onProgressMouseMove, !1),
            this._progressBar.addEventListener("pointerup", this._onProgressMouseUp, !1),
            this._progressBar.addEventListener("pointercancel", this._onProgressMouseUp, !1)) : (this._progressBar.addEventListener("mousedown", this._onProgressMouseDown, !1),
            this._progressBar.addEventListener("mousemove", this._onProgressMouseMove, !1),
            this._progressBar.addEventListener("mouseup", this._onProgressMouseUp, !1),
            this._progressBar.addEventListener("mouseleave", this._onProgressMouseUp, !1))
        }
        _unbindEvents() {
            this._pauseBn.removeEventListener("click", this._onPauseClick, !1),
            this._playBn.removeEventListener("click", this._onPlayClick, !1),
            this._closeBn.removeEventListener("click", this._onCloseClick, !1),
            this.supportsPointer ? (this._progressBar.removeEventListener("pointerdown", this._onProgressMouseDown, !1),
            this._progressBar.removeEventListener("pointermove", this._onProgressMouseMove, !1),
            this._progressBar.removeEventListener("pointerup", this._onProgressMouseUp, !1),
            this._progressBar.removeEventListener("pointercancel", this._onProgressMouseUp, !1)) : (this._progressBar.removeEventListener("mousedown", this._onProgressMouseDown, !1),
            this._progressBar.removeEventListener("mousemove", this._onProgressMouseMove, !1),
            this._progressBar.removeEventListener("mouseup", this._onProgressMouseUp, !1),
            this._progressBar.removeEventListener("mouseleave", this._onProgressMouseUp, !1))
        }
    }
    class as {
        constructor() {
            this._data = [],
            this._renderedDataIndex = 0
        }
        update(t, e) {
            let i = this._data
              , s = this._renderedDataIndex
              , n = i.length - 10;
            for (; e >= i[s + 1] && s < n; )
                s += 10;
            for (; e < i[s] && s >= 10; )
                s -= 10;
            this._renderedDataIndex = s;
            let r = (e - i[s]) / (i[s + 1] - i[s])
              , a = (r = r < 0 ? 0 : r > 1 ? 1 : q.Power1.easeInOut(r)) * r;
            return t.x = i[s + 2] + i[s + 4] * r + i[s + 6] * a,
            t.z = i[s + 3] + i[s + 5] * r + i[s + 7] * a,
            i[s + 8] + (i[s + 9] - i[s + 8]) * r
        }
        resetDataWithPath(t) {
            let e = this._data;
            if (e.length = 0,
            t.length < 4)
                return;
            let i = t.length / 4;
            if (1 === i) {
                let i = t[0]
                  , s = t[1]
                  , n = t[2]
                  , r = t[3];
                e.push(i, 36e4, s, n, 0, 0, 0, 0, r, r)
            } else if (2 === i) {
                let i = t[0]
                  , s = t[1]
                  , n = t[2]
                  , r = t[3]
                  , a = t[4]
                  , o = t[5]
                  , l = t[6]
                  , h = t[7];
                e.push(i, a + .4, s, n, .5 * (o - s), .5 * (l - n), 0, 0, r, h)
            } else
                for (let s = 0, n = i - 2; s !== n; ++s) {
                    let i = 4 * s
                      , r = t[i]
                      , a = t[i + 1]
                      , o = t[i + 2]
                      , l = t[i + 3]
                      , h = t[i + 4]
                      , c = t[i + 5]
                      , d = t[i + 6]
                      , u = t[i + 7]
                      , _ = t[i + 8]
                      , p = t[i + 9]
                      , f = t[i + 10]
                      , g = t[i + 11];
                    0 === s && (a -= c - a,
                    o -= d - o,
                    r -= h - r,
                    l -= u - l),
                    s === n - 1 && (p += .9 * (p - c),
                    f += .9 * (f - d),
                    _ += _ - h + .4,
                    g += g - u),
                    e.push(.5 * (r + h), .5 * (h + _), .5 * (a + c), .5 * (o + d), c - a, d - o, .5 * (a - 2 * c + p), .5 * (o - 2 * d + f), .5 * (l + u), .5 * (g + u))
                }
            return this._renderedDataIndex = 0,
            this
        }
    }
    const os = Object.create(null);
    os.POINT = 0,
    os.PATH = 1;
    class ls {
        constructor() {
            this._position = new Float32Array(3),
            this._targetPoint = new Float32Array(3),
            this._targetPath = new as,
            this._targetMode = os.POINT
        }
        setPosition(t, e, i) {
            return this._position[0] = t,
            this._position[1] = e,
            this._position[2] = i,
            this
        }
        setTargetPoint(t, e, i) {
            return this._targetPoint[0] = t,
            this._targetPoint[1] = e,
            this._targetPoint[2] = i,
            this._targetMode = os.POINT,
            this
        }
        setTargetPath(t, e) {
            return this._targetPath.resetDataWithPath(t),
            this._targetPoint[1] = e,
            this._targetMode = os.PATH,
            this
        }
        update(t, e) {
            let i = t.position
              , s = t.lockedTarget
              , n = this._position
              , r = this._targetPoint
              , a = 1;
            s.y = r[1],
            this._targetMode === os.PATH ? a = this._targetPath.update(s, e) : (s.x = r[0],
            s.z = r[2]);
            let o = 1 - a;
            i.x = n[0] + (s.x - n[0]) * o,
            i.y = n[1] + (s.y - n[1]) * o,
            i.z = n[2] + (s.z - n[2]) * o
        }
    }
    class hs {
        constructor() {
            this._camProps0123 = new Float32Array(20),
            this._pocketTestRadiusSq = .0324
        }
        resetWithPlayArea(t) {
            let e = t.position.x
              , i = t.position.y
              , s = t.position.z
              , n = t.size.w / 2
              , r = t.size.h / 2
              , a = this._camProps0123;
            a[0] = e + n + 1,
            a[1] = i + 1.1,
            a[2] = s + r + 1.2,
            a[3] = .48,
            a[4] = .6,
            a[5] = a[0],
            a[6] = a[1],
            a[7] = s - r - 1.2,
            a[8] = a[3],
            a[9] = a[4],
            a[10] = e + .9 * n,
            a[11] = i + .4,
            a[12] = s + r + 1,
            a[13] = .5,
            a[14] = .75,
            a[15] = a[10],
            a[16] = a[11],
            a[17] = s - r - 1,
            a[18] = a[13],
            a[19] = a[14]
        }
        pocketCameraForPath(t, e, i) {
            let s, n, r, a, o, l, h, c, d, u, _, p, f, g = e.pockets, m = e.size.w / 2, y = e.size.w / 3, v = e.size.h / 2, b = this._pocketTestRadiusSq;
            for (let x = t.length - 4; x > 0; x -= 4)
                if (s = t[x + 1],
                n = t[x + 2],
                (d = (r = (c = g[h = 2 * (o = s < -m ? 0 : s >= m ? 2 : Math.floor((s + m) / y)) + (l = n < -v ? 0 : n >= v ? 1 : Math.floor((n + v) / v))]).position.x - s) * r + (a = c.position.z - n) * a) < b && (u = t[x - 3],
                f = n - (_ = t[x - 2]),
                (p = s - u) * (r = c.position.x - u) + f * (a = c.position.z - _) > 0)) {
                    if (2 !== o) {
                        let e = this._camProps0123
                          , s = 5 * h;
                        i.set(e[s], e[s + 1], e[s + 2]),
                        this.updatePathZoom(t, i, e[s + 3], e[s + 4])
                    } else {
                        i.y = e.position.y + .26;
                        let t = .65
                          , s = Math.sqrt(r * r + a * a);
                        i.x = c.position.x + r / s * t,
                        i.z = c.position.z + a / s * t
                    }
                    return h
                }
            return -1
        }
        updatePathZoom(t, e, i, s) {
            let n, r, a = e.x, o = e.z, l = s - i;
            for (let e = 0, s = t.length; e !== s; e += 4) {
                n = a - t[e + 1],
                r = o - t[e + 2];
                let s = Math.sqrt(n * n + r * r);
                s < 1 ? s = 1 : s > 6 && (s = 6),
                t[e + 3] = i + (1 - (s - 1) / 5) * l
            }
        }
    }
    class cs {
        get totalFrames() {
            return this._totalFrames
        }
        get stride() {
            return this._stride
        }
        get maxKeyFrames() {
            return this._maxKeyFrames
        }
        get data() {
            return this._data
        }
        constructor(t, e) {
            this.ls = 0,
            this.rs = 0,
            this._maxKeyFrames = e,
            this._stride = t,
            this._totalFrames = 0,
            this._data = new Float32Array(e * t)
        }
        erase() {
            return this._totalFrames = 0,
            this.ls = 0,
            this.rs = 0,
            this
        }
        dispose() {
            this._data = null,
            this._totalFrames = 0,
            this.ls = 0,
            this.rs = 0,
            this._maxKeyFrames = 0,
            this._stride = 0
        }
        updateRenderRatio(t) {
            if (0 === this._totalFrames)
                return 0;
            let e = this._data
              , i = this._stride
              , s = (this._totalFrames - 1) * i
              , n = this.ls
              , r = this.rs;
            if (t >= e[r]) {
                do {
                    if (n = r,
                    r === s)
                        break;
                    r += i
                } while (t >= e[r]);
                this.ls = n,
                this.rs = r
            } else if (t < e[n]) {
                do {
                    if (r = n,
                    0 === n)
                        break;
                    n -= i
                } while (t < e[n]);
                this.ls = n,
                this.rs = r
            }
            let a = e[n]
              , o = e[r]
              , l = e[n + 1]
              , h = t - a - l
              , c = o - a - l;
            return c < 1e-6 || h < 1e-6 ? 0 : h / c
        }
        growToTick(t) {
            if (this._totalFrames < this._maxKeyFrames) {
                let e = this._data
                  , i = this._totalFrames++ * this._stride;
                return e[i] = t,
                e[i + 1] = 0,
                i + 2
            }
            return -1
        }
        extendsLife(t, e) {
            this._data[t + 1] += e
        }
    }
    class ds {
        get totalFrames() {
            return this._timeline.totalFrames
        }
        get renderable() {
            return this._renderable
        }
        get recordable() {
            return this._recordable
        }
        constructor(t, e, i=60) {
            this._timeline = new cs(t,e),
            this._actor = null,
            this._renderable = !1,
            this._recordable = !1,
            this._source = [],
            this._invSR = 1 / i,
            this._accumulator = 0,
            this.header = Object.create(null)
        }
        getHeader(t) {
            return this.header[t]
        }
        getTimelineDuration() {
            let t = this._timeline;
            if (0 === t.totalFrames)
                return 0;
            {
                let e = (t.totalFrames - 1) * t.stride
                  , i = t.data;
                return i[e] + i[e + 1]
            }
        }
        get canRender() {
            return this._renderable && 0 !== this._timeline.totalFrames
        }
        get actor() {
            return this._actor
        }
        setActor(t) {
            return this._actor = t,
            this._renderable = !!t,
            this
        }
        render(t) {
            let e = this._timeline
              , i = e.updateRenderRatio(t);
            0 === i ? this._renderF0(e.ls + 2) : this._renderF0F1(e.ls + 2, e.rs + 2, i)
        }
        logCurrentFrame() {
            let t = this._timeline;
            console.log("ls: " + t.ls / t.stride)
        }
        _renderF0(t) {
            throw new Error("Override me: " + t)
        }
        _renderF0F1(t, e, i) {
            throw new Error("Override me: " + t + "-" + e + "/" + i)
        }
        setSource(...t) {
            this._source.length = 0;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e] && this._source.push(t[e]);
            return this._recordable = this._source.length > 0,
            this
        }
        record(t, e=!1) {
            let i = this._timeline;
            if (0 === i.totalFrames) {
                this._accumulator = 0;
                let e = i.growToTick(t);
                return -1 !== e && (this._recordFrame(e),
                !0)
            }
            if ((this._accumulator += t) < this._invSR && !e)
                return !0;
            t = this._accumulator,
            this._accumulator = 0;
            let s = (i.totalFrames - 1) * i.stride;
            if (this._shouldRecordingKeyFrame(s + 2)) {
                let e = i.data
                  , n = e[s] + e[s + 1];
                return -1 !== (s = i.growToTick(t + n)) && (this._recordFrame(s),
                !0)
            }
            return i.extendsLife(s, t),
            !0
        }
        extendsLife(t) {
            let e = this._timeline;
            e.extendsLife((e.totalFrames - 1) * e.stride, t)
        }
        erase() {
            return this._timeline.erase(),
            this._accumulator = 0,
            this
        }
        _shouldRecordingKeyFrame() {
            return !0
        }
        _recordFrame(t) {
            throw new Error("Override me: " + t)
        }
    }
    class us extends ds {
        constructor(t, e) {
            super(7, t, e)
        }
        _shouldRecordingKeyFrame(t) {
            let e = this._source[0]
              , i = this._timeline.data;
            return 0 !== i[t] && (1 !== i[t] || !e.asleep)
        }
        _recordFrame(t) {
            let e = this._source[0]
              , i = this._source[1]
              , s = this._timeline.data;
            s[t] = e.active ? e.asleep ? 1 : 2 : 0;
            let n = e.position;
            s[t + 1] = n.x,
            s[t + 2] = n.y,
            s[t + 3] = n.z,
            s[t + 4] = i.alpha
        }
        _renderF0(t) {
            let e = this._timeline.data
              , i = this._actor;
            if (0 === e[t])
                return i.isVisible = !1,
                void (i.shadow.alpha = 0);
            i.isVisible = !0,
            i.position.x = e[t + 1],
            i.position.y = e[t + 2],
            i.position.z = e[t + 3],
            i.shadow.copyPositionXYZ(e[t + 1], 0, e[t + 3]),
            i.shadow.alpha = e[t + 4]
        }
        _renderF0F1(t, e, i) {
            let s = this._timeline.data
              , n = this._actor;
            if (0 === s[t])
                return n.isVisible = !1,
                void (n.shadow.alpha = 0);
            {
                n.isVisible = !0;
                let r = s[t + 1] + (s[e + 1] - s[t + 1]) * i
                  , a = s[t + 2] + (s[e + 2] - s[t + 2]) * i
                  , o = s[t + 3] + (s[e + 3] - s[t + 3]) * i;
                n.position.copyFromFloats(r, a, o),
                n.shadow.copyPositionXYZ(r, 0, o),
                n.shadow.alpha = s[t + 4] + (s[e + 4] - s[t + 4]) * i
            }
        }
        get data() {
            return this._timeline.data
        }
        get stride() {
            return this._timeline.stride
        }
        static get dataOffsetX() {
            return 3
        }
        static get dataOffsetY() {
            return 4
        }
        static get dataOffsetZ() {
            return 5
        }
        static get dataOffsetActiveSleep() {
            return 2
        }
    }
    const _s = [];
    class ps {
        constructor() {}
        static bTrackToPath(t, e, i, s) {
            const n = t.data
              , r = t.stride
              , a = t.totalFrames * r
              , o = us.dataOffsetX
              , l = us.dataOffsetY
              , h = us.dataOffsetZ
              , c = us.dataOffsetActiveSleep;
            e.length = 0;
            for (let t = r, i = a; t !== i; t += r)
                2 === n[t + c] && n[t + l] >= s && e.push(n[t], n[t + o], n[t + h], 1);
            ps.douglasPucker(e, i)
        }
        static douglasPucker(t, e) {
            let i = _s;
            for (let e = 0, s = t.length; e !== s; ++e)
                i[e] = t[e];
            t.length = 4,
            ps._douglasPuckerInternal(i, 0, i.length - 4, e * e, t),
            i.length = 0
        }
        static _douglasPuckerInternal(t, e, i, s, n) {
            if (e === i)
                return;
            let r = t[e + 1]
              , a = t[e + 2]
              , o = t[i + 1]
              , l = t[i + 2]
              , h = o - r
              , c = l - a
              , d = h * h + c * c
              , u = s
              , _ = -1;
            for (let s = e + 4, n = i; s !== n; s += 4) {
                let e, i = t[s + 1], n = t[s + 2], p = i - r, f = n - a, g = p * h + f * c;
                if (g < 1e-6)
                    e = p * p + f * f;
                else if (g >= d - 1e-6) {
                    let t = i - o
                      , s = n - l;
                    e = t * t + s * s
                } else
                    e = p * p + f * f - g * g / d;
                e > u && (u = e,
                _ = s)
            }
            -1 !== _ ? (ps._douglasPuckerInternal(t, e, _, s, n),
            ps._douglasPuckerInternal(t, _, i, s, n)) : n.push(t[i], t[i + 1], t[i + 2], t[i + 3])
        }
    }
    const fs = A.a.Vec3
      , gs = []
      , ms = []
      , ys = new Uint8Array(6)
      , vs = new fs;
    class bs extends ze {
        constructor(t, e, i, s) {
            super(t, e, i),
            this._displayUIGroup = i,
            this._ui = null,
            this._movieClip = s,
            this._sceneId = "",
            this._parsedMcId = "",
            this._pocketCameraCtl = new hs,
            this._camCtls = [];
            for (let t = 0, e = 5; t !== e; ++t)
                this._camCtls[t] = new ls;
            this._activeCamCtlIndex = -1,
            this._nActiveCamCtls = 0,
            this._forceRender = !1,
            this._evtManager.initialize({
                32: {
                    down: ()=>{
                        0 === this._movieClip.state ? this._play() : this._pause()
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                83: {
                    down: ()=>{
                        this._play(),
                        this._movieClip.timeScale = .25,
                        this._ui.slomo(!0)
                    }
                    ,
                    up: ()=>{
                        this._movieClip.timeScale = 1,
                        this._ui.slomo(!1)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                67: {
                    down: ()=>{
                        this._setCamCtlIndex(this._activeCamCtlIndex + 1)
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                },
                27: {
                    down: ()=>{
                        this._evtBus.emit(Ge.SWITCH, "gaming")
                    }
                    ,
                    ss: Te.a.READY | Te.a.SIMULATING | Te.a.JUDGING
                }
            }, void 0),
            this._onControlItemClick = ((t,...e)=>{
                switch (t) {
                case "close":
                    this._evtBus.emit(Ge.SWITCH, "gaming");
                    break;
                case "pause":
                    this._pause();
                    break;
                case "play":
                    this._play();
                    break;
                case "seek":
                    this._seek(...e)
                }
            }
            )
        }
        bind(t, e, i, s, n, r) {
            if (super.bind(t, e, i, s, n, r),
            this._sceneId !== t.sceneId) {
                this._sceneId = t.sceneId;
                let e = t.playArea.position
                  , i = t.playArea.size
                  , s = this._camCtls[0];
                s.setPosition(e.x + .5 * i.w + 1.6, e.y + 1.2, e.z),
                s.setTargetPoint(e.x, e.y, e.z + 1e-5),
                this._pocketCameraCtl.resetWithPlayArea(t.playArea)
            }
        }
        bindUI(t, e) {
            this._ui = this._registerLocalUI("replayControl", rs, t, e)
        }
        unbind() {
            super.unbind(),
            this._ui = null
        }
        _onActvate() {
            super._onActvate(),
            this._evtBus.emit(Ge.CHANGE_CONTROL_GROUP, qe.NULL),
            this._ui.on(de.ITEM_CLICK, this._onControlItemClick);
            const t = this._playerCtls;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].deactivate();
            this._parsedMcId !== this._movieClip.uniqueId && (this._parsedMcId = this._movieClip.uniqueId,
            this._parseMovieClip(),
            this._setCamCtlIndex(0, !0));
            let e = this._movieClip.getTrack("stick");
            if (e.setActor(void 0),
            e.totalFrames > 0) {
                let t = e.getHeader("stickName");
                t && e.setActor(this._gView.requireStick(t))
            }
            this._play(0),
            this._forceRender = !0
        }
        _onDeactvate() {
            super._onDeactvate();
            let t = this._movieClip.getTrack("stick");
            t.actor && (this._gView.markStickAsUnused(t.actor),
            t.actor.isVisible = !1,
            t.setActor(void 0)),
            this._fpc.markForceUpdate(),
            this._gView.syncBalls(this._simulator.getBalls(), this._simulator.evolution),
            this._ui.removeAllListeners()
        }
        _parseMovieClip() {
            let t, e = this._camCtls, i = this._pocketCameraCtl, s = gs, n = ms, r = vs, a = this._gView.playArea, o = a.position.y, l = ys;
            this._nActiveCamCtls = 1,
            this._movieClip.getLongBTracks(2, s);
            for (let h = s.length - 1; h >= 0; --h)
                if (ps.bTrackToPath(s[h], n, .2, o),
                -1 !== (t = i.pocketCameraForPath(n, a, r)) && 0 === l[t]) {
                    if (l[t] = 1,
                    e[this._nActiveCamCtls].setPosition(r.x, r.y, r.z).setTargetPath(n, o + .1),
                    ++this._nActiveCamCtls >= e.length)
                        break
                }
            s.length = 0,
            n.length = 0;
            for (let t = 0, e = l.length; t !== e; ++t)
                l[t] = 0
        }
        _play(t) {
            let e = this._movieClip;
            void 0 === t && e.playHead === e.duration ? this._movieClip.play(0) : this._movieClip.play(t)
        }
        _pause(t) {
            this._movieClip.pause(t)
        }
        _seek(t, e) {
            let i = this._movieClip;
            i.playHead = t * i.duration,
            0 === i.state || e || this._pause()
        }
        _setCamCtlIndex(t, e=!1) {
            let i = this._nActiveCamCtls;
            t >= i ? t = -1 : t < -1 && (t = i - 1),
            (t !== this._activeCamCtlIndex || e) && (this._activeCamCtlIndex = t,
            this._forceRender = !0,
            this._movieClip.getTrack("cam").setActor(-1 === t ? this._gView.camera : void 0))
        }
        _defaultUpdateHandler(t) {
            let e = this._movieClip
              , i = !1
              , s = this._activeCamCtlIndex;
            if (e.needsUpdate || this._forceRender) {
                this._forceRender = !1,
                i = !0,
                e.updatePlayback(t.dt);
                let n = this._ui
                  , r = e.progress;
                if (n.setProgress(r),
                n.isPlaying = 0 !== e.state,
                -1 !== s) {
                    let t = this._gView.camera;
                    this._camCtls[s].update(t, e.playHead)
                }
            }
            return i
        }
    }
    class xs extends ds {
        constructor(t, e) {
            super(8, t, e)
        }
        _recordFrame(t) {
            let e = this._timeline.data
              , i = this._source[0].position
              , s = this._source[0].lockedTarget;
            e[t] = i.x,
            e[t + 1] = i.y,
            e[t + 2] = i.z,
            e[t + 3] = s.x,
            e[t + 4] = s.y,
            e[t + 5] = s.z
        }
        _renderF0(t) {
            let e = this._timeline.data
              , i = this._actor;
            i.position.x = e[t],
            i.position.y = e[t + 1],
            i.position.z = e[t + 2],
            i.lockedTarget.x = e[t + 3],
            i.lockedTarget.y = e[t + 4],
            i.lockedTarget.z = e[t + 5]
        }
        _renderF0F1(t, e, i) {
            let s = this._timeline.data
              , n = this._actor;
            n.position.x = s[t] + (s[e] - s[t]) * i,
            n.position.y = s[t + 1] + (s[e + 1] - s[t + 1]) * i,
            n.position.z = s[t + 2] + (s[e + 2] - s[t + 2]) * i,
            n.lockedTarget.x = s[t + 3] + (s[e + 3] - s[t + 3]) * i,
            n.lockedTarget.y = s[t + 4] + (s[e + 4] - s[t + 4]) * i,
            n.lockedTarget.z = s[t + 5] + (s[e + 5] - s[t + 5]) * i
        }
    }
    class Ss extends ds {
        constructor(t, e) {
            super(8, t, e)
        }
        setSource(t, e) {
            return this._source.length = 0,
            t && (this._source[0] = t),
            this.header.stickName = e,
            this._recordable = !!t,
            this
        }
        _shouldRecordingKeyFrame(t) {
            let e = this._source[0];
            return 0 !== this._timeline.data[t] || 0 !== e.stateRatio
        }
        _recordFrame(t) {
            let e = this._source[0]
              , i = this._timeline.data
              , s = e.composedPosition
              , n = e.composedRotation;
            i[t] = 0 === e.stateRatio ? 0 : 1,
            i[t + 1] = s.x,
            i[t + 2] = s.y,
            i[t + 3] = s.z,
            i[t + 4] = n.y,
            i[t + 5] = n.z
        }
        _renderF0(t) {
            let e = this._timeline.data
              , i = this._actor;
            0 !== e[t] ? (i.isVisible = !0,
            Ss._updateTargetMatrix(i, e[t + 1], e[t + 2], e[t + 3], e[t + 4], e[t + 5])) : i.isVisible = !1
        }
        _renderF0F1(t, e, i) {
            let s = this._timeline.data
              , n = this._actor;
            if (0 !== s[t]) {
                n.isVisible = !0;
                let r = s[t + 1] + (s[e + 1] - s[t + 1]) * i
                  , a = s[t + 2] + (s[e + 2] - s[t + 2]) * i
                  , o = s[t + 3] + (s[e + 3] - s[t + 3]) * i
                  , l = Math.PI
                  , h = s[e + 4] - s[t + 4];
                h > l ? h -= 2 * l : h < -l && (h += 2 * l);
                let c = s[t + 4] + h * i
                  , d = s[t + 5] + (s[e + 5] - s[t + 5]) * i;
                Ss._updateTargetMatrix(n, r, a, o, c, d)
            } else
                n.isVisible = !1
        }
        static _updateTargetMatrix(t, e, i, s, n, r) {
            t._isWorldMatrixFrozen = !0;
            let a = t._worldMatrix.m
              , o = Math.cos(n)
              , l = Math.sin(n)
              , h = Math.cos(r)
              , c = Math.sin(r);
            a[0] = o * h,
            a[1] = c,
            a[2] = -h * l,
            a[3] = 0,
            a[4] = -o * c,
            a[5] = h,
            a[6] = c * l,
            a[7] = 0,
            a[8] = l,
            a[9] = 0,
            a[10] = o,
            a[11] = 0,
            a[12] = e,
            a[13] = i,
            a[14] = s,
            a[15] = 1,
            t._worldMatrix._markAsUpdated(),
            t._updateBoundingInfo(),
            t.material._lightProbeManager._onMeshTransformDirty(t)
        }
    }
    const Cs = 22;
    class Is {
        get nTracks() {
            return this._tracks.length
        }
        get tracks() {
            return this._tracks
        }
        get playHead() {
            return this._playHead
        }
        set playHead(t) {
            this._playHead !== t && (this._playHead = t,
            this._needsUpdate = !0)
        }
        get duration() {
            return this._duration
        }
        get progress() {
            return this._playHead / this._duration
        }
        get state() {
            return this._playbackState
        }
        get needsUpdate() {
            return this._needsUpdate
        }
        get maxBallTracks() {
            return Cs
        }
        get uniqueId() {
            return this._uniqueId
        }
        constructor() {
            this._tracks = Object.create(null),
            this._tracks.cam = new xs(80,10),
            this._tracks.stick = new Ss(58,30);
            for (let t = 0; t !== Cs; ++t)
                this._tracks["b" + t] = new us(500,60);
            this._playbackState = 0,
            this._playHead = 0,
            this._duration = 0,
            this._needsUpdate = !1,
            this.loop = !1,
            this.timeScale = 1,
            this._uniqueId = ""
        }
        syncBallTracks(t, e) {
            let i, s = t.getBalls(), n = this.tracks;
            if (s.length > Cs)
                throw new Error("Not enough Ball tracks: " + s.length + " > " + Cs);
            for (let t = 0, r = s.length; t !== r; ++t)
                (i = n["b" + t]).setSource(s[t], e[t].shadow).setActor(e[t]);
            for (let t = s.length; t < Cs; ++t)
                (i = n["b" + t]).setSource(void 0).setActor(void 0)
        }
        erase() {
            let t = this._tracks;
            for (let e in t)
                t[e].erase();
            return this._playbackState = 0,
            this._playHead = 0,
            this._duration = 0,
            this
        }
        saveRecording() {
            let t, e = this._tracks;
            this._playbackState = 0,
            this._playHead = 0,
            this._duration = 0;
            for (let i in e) {
                let s = (t = e[i]).getTimelineDuration();
                s > this._duration && (this._duration = s)
            }
            return this._uniqueId = "mc" + Date.now(),
            this
        }
        getLongBTracks(t, e) {
            let i, s = this._tracks;
            e.push(s.b0);
            for (let n = 1, r = Cs; n !== r; ++n)
                (i = s["b" + n]).totalFrames >= t && e.push(i)
        }
        log() {
            let t, e = this._tracks;
            console.error("[MC LOG]: ");
            for (let i in e)
                t = e[i],
                console.log("\t" + i + ": keyFrames: " + t.totalFrames + ",recordable: " + t.recordable + ", renderable: " + t.renderable);
            console.log("[MC DURATION]: " + this._duration)
        }
        getTrack(t) {
            return this._tracks[t]
        }
        releaseAllTargets() {
            let t = this._tracks;
            for (let e in t)
                t[e].setActor(void 0).setSource(void 0);
            return this
        }
        play(t) {
            return this._playPausePlayHead(1, t)
        }
        reverse(t) {
            return this._playPausePlayHead(-1, t)
        }
        pause(t) {
            return this._playPausePlayHead(0, t)
        }
        _playPausePlayHead(t, e) {
            return this._playbackState !== t && (this._playbackState = t,
            0 !== t && (this._needsUpdate = !0)),
            void 0 !== e && e !== this._playHead && (this.playHead = e),
            this
        }
        updatePlayback(t) {
            if (0 === this._playbackState)
                this._needsUpdate = !1;
            else {
                let e = 0
                  , i = this._duration
                  , s = i - e
                  , n = this.loop;
                if (t *= this._playbackState * this.timeScale,
                Math.abs(s) < 1e-6)
                    this._playHead = e,
                    this._playbackState = 0;
                else {
                    this._playHead += s > 0 ? t : -t;
                    let r = (this._playHead - e) / s;
                    r < 0 ? n ? this._playHead = i - (e - this._playHead) % s : (this._playHead = e,
                    this._playbackState = 0) : r > 1 && (n ? this._playHead = e + (this._playHead - i) % s : (this._playHead = i,
                    this._playbackState = 0))
                }
            }
            Is._render(this, this._playHead)
        }
        static _render(t, e) {
            let i, s = t._tracks;
            for (let t in s)
                (i = s[t]).canRender && i.render(e)
        }
    }
    const Ts = i(41);
    class As extends se {
        get playerCount() {
            return this._playerCount
        }
        constructor(t, e) {
            super(t, e),
            this._playerCount = 2
        }
        _createElement() {
            let t = As.parseUI(Ts);
            return this._groups = [As._makeGroup(t.querySelector(".left")), As._makeGroup(t.querySelector(".right"))],
            t
        }
        static _makeGroup(t) {
            let e = Object.create(null);
            return e.head = Object.create(null),
            e.head.value = "",
            e.head.e = t.querySelector(".head"),
            e.pts = Object.create(null),
            e.pts.value = NaN,
            e.pts.e = t.querySelector(".pts"),
            e.brk = Object.create(null),
            e.brk.value = NaN,
            e.brk.e = t.querySelector(".brk"),
            e.ballOn = Object.create(null),
            e.ballOn.value = 0,
            e.ballOn.e = t.querySelector(".ball-on-icon"),
            e.e = t,
            e.visible = !0,
            e
        }
        static setGroupLabel(t, e, i) {
            let s = t[e];
            s.value !== i && (s.value = i,
            s.e.innerHTML = i)
        }
        static setGroupBallOn(t, e) {
            e !== t.ballOn.value && (t.ballOn.value = e,
            t.ballOn.e.className = "ball-on-icon snooker b-" + e)
        }
        resetPlayers(t) {
            let e = t[0]
              , i = t[1]
              , s = this._groups[1];
            return As.setGroupLabel(this._groups[0], "head", e.displayName.toUpperCase()),
            i ? (s.visible || (s.visible = !0,
            s.e.style.display = "block",
            this._element.classList.remove("single")),
            As.setGroupLabel(s, "head", i.displayName.toUpperCase()),
            this._playerCount = 2) : (s.visible && (s.visible = !1,
            s.e.style.display = "none",
            this._element.classList.add("single")),
            this._playerCount = 1),
            this
        }
        syncResults(t, e, i) {
            let s = t[0]
              , n = t[1]
              , r = this._groups[0];
            As.setGroupLabel(r, "brk", s.brk),
            As.setGroupBallOn(r, 0 === e ? i : 0);
            let a = s.pts;
            if (n) {
                let t = this._groups[1];
                As.setGroupLabel(t, "brk", n.brk),
                As.setGroupBallOn(t, 1 === e ? i : 0),
                As.setGroupLabel(t, "pts", n.pts - s.penalty),
                a -= n.penalty
            }
            As.setGroupLabel(r, "pts", a)
        }
    }
    class Es extends Fi {
        constructor(t) {
            super(),
            this._ai = t,
            this._shootingDelay = -1,
            this._aiThinkingRandomDelay = -1
        }
        shouldUpdate() {
            return this._active
        }
        activate() {
            return super.activate(),
            this._model.gState === Te.a.READY && this._ai.checkRestart(this._simulator, this._model) && (this._state !== Ni.STATE_STAND && this.gotoState0(!0),
            this._aiThinkingRandomDelay = 1 + Math.random()),
            this
        }
        update(t) {
            let e = this._ai;
            if (this._aiThinkingRandomDelay >= 0)
                this._aiThinkingRandomDelay -= t;
            else if (e.taskRunning) {
                let t = e.step(this._gView, this._simulator, this._model);
                t && (this.resetWithKissDir(t.dx, t.dz),
                this.strokePower = .3 + t.powerFactor,
                this._stickCtl.setTipPercent(0, t.fbSpin),
                t.fbSpin < 0 ? this._stickCtl.setAngleV(.025 * Math.PI) : this._stickCtl.setAngleV(0),
                this.gotoState1(),
                this._shootingDelay = 1 + Math.random())
            } else
                this.isReadyToStroke() && this._shootingDelay >= 0 && (this._shootingDelay -= t) < 0 && (this._shootingDelay = -1,
                this.emit(Vi.AI_SHOT, this));
            return !(0 === this.needsUpdate && !this._stickCtl.needsUpdate) && super.update(t)
        }
    }
    class ws extends Fi {
        constructor() {
            super(),
            this._camera = null,
            this._uiFactor = 0
        }
        reset(t, e, i, s, n) {
            super.reset(t, e, i, s, n),
            this._camera = t.camera,
            t.powerUI && (t.powerUI.percent = this._strokePower)
        }
        syncEnter(t, e) {
            super.syncEnter(t, e),
            this.update(0)
        }
        syncTipMotion(t) {
            super.syncTipMotion(t),
            this._uiFactor = t.pullbackProgress
        }
        release() {
            this._camera = null,
            super.release()
        }
        _onDeactive() {
            const t = this._gView;
            t.powerUI && (t.powerUI.autoAlpha = 0),
            t.gunsight && (t.gunsight.alpha = 0),
            super._onDeactive()
        }
        shouldUpdate() {
            return 0 !== this.needsUpdate || this._stickCtl.needsUpdate
        }
        update(t) {
            let e = super.update(t)
              , i = this._stateTransitionTween.renderedRatio
              , n = this._bodyPosition
              , r = this._lockedTarget
              , a = this._headCtl;
            return s.Vector3.LerpToRef(n, a.position, i, this._camera.position),
            this._camera.lockedTarget.copyFromFloats(r.x + a.lookAtOffset.x * i, r.y + a.lookAtOffset.y * i, r.z + a.lookAtOffset.z * i),
            e
        }
        _onStickRendered() {
            let t = this._gView.powerUI
              , e = this._gView.gunsight
              , i = (1 - this._uiFactor) * this._stateTransitionTween.renderedRatio;
            i = i > .8 ? (i - .8) / .2 : 0,
            t.autoAlpha = i,
            e.alpha = .6 * i,
            i > 0 && (t._isWorldMatrixFrozen = !0,
            t._worldMatrix.copyFrom(this._activeStickMesh._worldMatrix),
            t._updateBoundingInfo())
        }
        _onStrokePowerChanged() {
            this._gView && this._gView.powerUI && (this._gView.powerUI.percent = this._strokePower)
        }
    }
    let Rs = i(40);
    class ks extends _e {
        constructor(t) {
            super(t, void 0),
            this.closeLabel("BACK"),
            this._onRetryClick = (()=>this.emit("retry"))
        }
        _createElement() {
            let t = super._createElement();
            this._retryBn = this._createButton("RETRY", !0);
            let e = this._createBody(!1).replaceContent(Rs);
            return Rs = null,
            this._timeValue = e.container.querySelector(".time"),
            this._names = [e.container.querySelector(".name0"), e.container.querySelector(".name1")],
            this._pts = [e.container.querySelector(".pts0"), e.container.querySelector(".pts1")],
            this._brks = [e.container.querySelector(".brk0"), e.container.querySelector(".brk1")],
            this._fouls = [e.container.querySelector(".fouls0"), e.container.querySelector(".fouls1")],
            this._accuracies = [e.container.querySelector(".accuracy0"), e.container.querySelector(".accuracy1")],
            t
        }
        data(t) {
            this._timeValue.innerHTML = u.a.toTimeString(t.time);
            let e = t.players
              , i = e[0]
              , s = e[1]
              , n = i.pts - s.penalty
              , r = s.pts - i.penalty;
            return ks._setLabel(this._names, i.displayName.toUpperCase(), s.displayName.toUpperCase()),
            ks._setLabel(this._pts, n, r, !0),
            ks._setLabel(this._brks, i.maxbrk, s.maxbrk),
            ks._setLabel(this._fouls, i.penalty, s.penalty),
            ks._setLabel(this._accuracies, (100 * i.accuracy).toFixed(1) + "%", (100 * s.accuracy).toFixed(1) + "%"),
            n > r ? (this.head("YOU WIN!"),
            this._head.className = "box-head success-copy",
            this._names[0].classList.add("success-copy"),
            this._names[1].classList.remove("success-copy")) : n < r ? (this.head("YOU LOSE"),
            this._head.className = "box-head error-copy",
            this._names[0].classList.remove("success-copy"),
            this._names[1].classList.add("success-copy")) : (this.head("DARW"),
            this._head.className = "box-head bright-copy",
            this._names[0].classList.remove("success-copy"),
            this._names[1].classList.remove("success-copy")),
            this
        }
        static _setLabel(t, e, i, s=!1) {
            t[0].innerHTML = e,
            t[1].innerHTML = i,
            s && (t[0].classList.remove("success-copy"),
            t[1].classList.remove("success-copy"),
            e > i ? t[0].classList.add("success-copy") : e < i && t[1].classList.add("success-copy"))
        }
        _bindEvents() {
            super._bindEvents(),
            this._retryBn.addEventListener("click", this._onRetryClick, !1)
        }
        _unbindEvents() {
            this._retryBn.removeEventListener("click", this._onRetryClick, !1),
            super._unbindEvents()
        }
    }
    const Ps = window.gtag || null
      , Ds = new Re.a("local",new A.a.WorldClient,Be.a)
      , Ls = new Is;
    class Os extends At {
        constructor(t) {
            super(t),
            this._model = new Ee,
            this._simulator = Ds,
            this._enterAnimation = null,
            this._fpc = new ws,
            this._playerCtls = [],
            this._movieClip = Ls,
            this.selfUIGroup = 1,
            this._subControl = Object.create(null),
            this._subControl.gaming = new ts("gaming",this.selfUIGroup,this.selfUIGroup << 1,this._movieClip),
            this._subControl.inHand = new je("inHand",this.selfUIGroup,this.selfUIGroup << 2),
            this._subControl.replay = new bs("replay",this.selfUIGroup,this.selfUIGroup << 3,this._movieClip),
            this._activeSubControl = null,
            this._holdingSubControlName = void 0,
            this._subControlEvtBus = new r.a,
            this._localUIInstances = [],
            this._gameTime = 0,
            this._paused = !1,
            this._onSubControlSwitch = (t=>this._activateSubControl(t)),
            this._onSubControlPopBox = (t=>this._uiLayer.popBox(t)),
            this._onSubControlMessage = ((t,...e)=>{
                0 === e.length ? this._uiLayer.closeMessage(t) : this._uiLayer.message(e[0], e[1], e[2], e[3], t)
            }
            ),
            this._onSubControlChangeControlGroup = (t=>{
                this._uiLayer.getRegisteredUI("gControl").setGroup(t)
            }
            ),
            this._onSubControlShottingStart = (()=>{
                this._uiLayer.getRegisteredUI("gControl").setGroup(qe.PAUSE)
            }
            ),
            this._onInGameControlClick = (t=>{
                switch (t) {
                case "pause":
                    return this._paused = !0,
                    void this._uiLayer.popBox("pauseBox").on(de.ITEM_CLICK, this._onPauseItemClick).on(de.CLOSE, this._onPauseBoxClosed);
                case "replay":
                    return void this._activateSubControl("replay")
                }
            }
            ),
            this._onPauseBoxClosed = (()=>{
                this._paused = !1
            }
            ),
            this._onPauseItemClick = (t=>{
                switch (t) {
                case "resume":
                    return void this._uiLayer.closeBox("pauseBox");
                case "restart":
                    return void this._uiLayer.confirm("Are you sure to restart the game?", this._onRestartConfirm);
                case "quit":
                    return void this._uiLayer.confirm("Are you sure to quit the game?", this._onQuitConfirm);
                case "controls_guide":
                    return void this._uiLayer.popBox("controlsGuideBox");
                default:
                    return
                }
            }
            ),
            this._onRestartConfirm = (()=>{
                this._paused && Ps("event", "give_up", {
                    event_category: "ai",
                    event_label: "restart",
                    value: 0
                }),
                this._uiLayer.closeBox("pauseBox"),
                this._uiLayer.closeBox("singleResultBox"),
                this._uiLayer.closeBox("duoResultBox"),
                this._model.reqReset(this._simulator)
            }
            ),
            this._onQuitConfirm = (()=>{
                this._paused && Ps("event", "give_up", {
                    event_category: "ai",
                    event_label: "quit",
                    value: 0
                }),
                this._uiLayer.closeBox("pauseBox"),
                this.emit(y.CHANGE_CONTROLLER, "home")
            }
            ),
            this._onSimFirstKiss = (t=>{
                let e = this._fpc;
                e.isFollowing && e.follow(this._simulator.getBallAtIndex(t))
            }
            ),
            this._onSimPrepot = (t=>{
                let e = this._fpc;
                e.followingTarget === this._simulator.getBallAtIndex(t) && e.unfollow()
            }
            )
        }
        _registerUI() {
            let t = this._uiLayer;
            t.hasRegisteredUI("gControl") || t.registerUI(new We("gControl")),
            t.hasRegisteredUI("scoreBar") || t.registerUI(new As("scoreBar")),
            t.hasRegisteredBox("pauseBox") || t.registerBox(new es("pauseBox")),
            t.hasRegisteredBox("controlsGuideBox") || t.registerBox(new ji("controlsGuideBox")),
            t.hasRegisteredBox("singleResultBox") || t.registerBox(new ss("singleResultBox")),
            t.hasRegisteredBox("duoResultBox") || t.registerBox(new ks("duoResultBox"))
        }
        _bindUI() {
            let t = this._localUIInstances
              , e = this._uiLayer;
            t.push(e.getRegisteredUI("scoreBar")),
            t.push(e.getRegisteredUI("gControl"));
            for (let e = 0, i = t.length; e !== i; ++e)
                "gControl" === t[e].id ? t[e].group = 255 : t[e].group = this.selfUIGroup;
            let i = this._subControl;
            for (let s in i)
                i[s].bindUI(e, t)
        }
        _unbindUI() {
            this._localUIInstances.length = 0
        }
        _onModelLaunched(t) {
            super._onModelLaunched(t);
            let e = this._uiLayer.getRegisteredUI("scoreBar")
              , i = this._uiLayer.getRegisteredUI("gControl");
            e.resetPlayers(this._model.players),
            i.setLocationLower(e.playerCount > 1),
            this._simulator.on(Pe.a.SYNCHRONIZED, ()=>{
                this._onItemsReady()
            }
            ).sync(t)
        }
        _onItemsReady() {
            if (this._gView.state !== Ct.READY || this._simulator.state !== Le.a.SYNCHRONIZED)
                return;
            this._enterAnimation || (this._enterAnimation = new j(t=>{
                var e = this._gView.camera;
                e.position.x = t.x,
                e.position.y = t.y,
                e.position.z = t.z,
                e.lockedTarget.x = t.lookAtX,
                e.lockedTarget.y = t.lookAtY,
                e.lockedTarget.z = t.lookAtZ,
                this._gView.requireRender()
            }
            ));
            let t, e = this._model.players, i = this._playerCtls;
            for (let s = 0, n = e.length; s !== n; ++s) {
                let n = e[s];
                switch (n.type) {
                case xe.a.PLAYER_TYPE_USER:
                    this._fpc.reset(this._gView, this._simulator, this._model, s, n.getInfoData("stickName")),
                    i.push(this._fpc);
                    break;
                case xe.a.PLAYER_TYPE_AI:
                    (t = new Es(this._model.getLocalAIInstance())).reset(this._gView, this._simulator, this._model, s, n.getInfoData("stickName")),
                    i.push(t);
                    break;
                default:
                    throw new Error("Unhandled GPlayerType: " + n.type)
                }
            }
            -1 === i.indexOf(this._fpc) && (this._fpc.reset(this._gView, this._simulator, this._model, -1, void 0),
            i.push(this._fpc));
            let s = this._movieClip;
            s.getTrack("cam").setSource(this._gView.camera).setActor(this._gView.camera),
            s.syncBallTracks(this._simulator, this._gView.ballMeshes),
            this._gView.removeAllListeners(St.READY),
            this._simulator.removeAllListeners(Pe.a.SYNCHRONIZED),
            this._model.on("response", t=>{
                this._onModelResponse(t),
                this._state === v.PENDING && this.emit(m.READY)
            }
            ).on("gstate_change", t=>{
                this._onModelGStateChanged(t)
            }
            ).reqReset(this._simulator)
        }
        enter() {
            const t = this._gView.camera
              , e = this._model.getControllerSetting()
              , i = this._fpc
              , s = this._playerCtls;
            let n, r = {
                x: t.position.x,
                y: t.position.y,
                z: t.position.z,
                lookAtX: t.lockedTarget.x,
                lookAtY: t.lockedTarget.y,
                lookAtZ: t.lockedTarget.z
            }, a = this._model.getContext("playerIndex");
            for (let i = 0, n = s.length; i !== n; ++i)
                s[i].gPlayerIndex === a ? s[i].syncEnter(e, Math.PI) : s[i].syncEnter(e, t.position);
            for (let t in this._subControl)
                this._subControl[t].bind(this._gView, this._model, this._simulator, i, this._playerCtls, this._subControlEvtBus);
            (n = Object.create(null)).x = i.bodyPosition.x,
            n.y = i.bodyPosition.y,
            n.z = i.bodyPosition.z,
            n.lookAtX = i.lockedTarget.x,
            n.lookAtY = i.lockedTarget.y,
            n.lookAtZ = i.lockedTarget.z;
            let o = r.x - n.x
              , l = r.y - n.y
              , h = r.z - n.z
              , c = Math.sqrt(o * o + l * l + h * h)
              , d = Math.min(2, c / 3 + .8);
            this._enterAnimation.reset(r, n, q.Power1.easeInOut, d, .1).play(),
            this._simulator.evolution !== this._gView.ballSyncEvolution && this._gView.syncBalls(this._simulator.getBalls(), this._simulator.evolution),
            super.enter()
        }
        updateEntering(t) {
            let e = this._enterAnimation;
            e.needsUpdate ? e.update(t.dt) : e.isComplete() && this.emit(m.ENTERED)
        }
        action() {
            super.action(),
            this._holdingSubControlName && this._activateSubControl(this._holdingSubControlName)
        }
        updateActing(t) {
            const e = this._localUIInstances;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].needsUpdate && e[i].update(t.dt);
            this._paused || (this._gameTime += t.dt,
            this._activeSubControl.update(t) && this._gView.requireRender())
        }
        _bindEvents() {
            super._bindEvents(),
            this._subControlEvtBus.on(Ge.SWITCH, this._onSubControlSwitch),
            this._subControlEvtBus.on(Ge.POP_BOX, this._onSubControlPopBox),
            this._subControlEvtBus.on(Ge.MESSAGE, this._onSubControlMessage),
            this._subControlEvtBus.on(Ge.CHANGE_CONTROL_GROUP, this._onSubControlChangeControlGroup),
            this._subControlEvtBus.on(Ge.SHOTTING_START, this._onSubControlShottingStart);
            let t = this._simulator;
            t.on(Me.a.FIRST_KISS, this._onSimFirstKiss),
            t.on(Me.a.PREPOT, this._onSimPrepot),
            this._uiLayer.getRegisteredUI("gControl").on(de.ITEM_CLICK, this._onInGameControlClick)
        }
        _unbindEvents() {
            this._subControlEvtBus.removeAllListeners();
            let t = this._simulator;
            t.removeAllListeners(Me.a.FIRST_KISS),
            t.removeAllListeners(Me.a.PREPOT),
            super._unbindEvents(),
            this._uiLayer.getRegisteredUI("gControl").removeAllListeners(de.ITEM_CLICK)
        }
        _onModelGStateChanged(t) {
            for (let e in this._subControl)
                this._subControl[e].setGState(t)
        }
        _onModelResponse(t) {
            let e = this._model
              , i = this._simulator
              , s = this._gView
              , n = this._fpc;
            n.unfollow();
            let r = this._uiLayer
              , a = e.getContext("playerIndex")
              , o = e.getContext("ballOn")
              , l = e.getContext("inHand");
            r.getRegisteredUI("scoreBar").syncResults(e.players, a, o);
            let h = this._subControl;
            for (let t in h)
                h[t].onModelResponse(e);
            if (i.evolution !== s.ballSyncEvolution && s.syncBalls(i.getBalls(), i.evolution),
            0 === o)
                this._showResult();
            else {
                if (t)
                    if (t.foulCode) {
                        let e = Ve.a.getFoulDescription(t.foulCode);
                        this._uiLayer.message("FOUL", t.score + ": " + e, oe.ERROR)
                    } else if ("string" == typeof t)
                        switch (t) {
                        case "restart":
                            this._gameTime = 0,
                            n.gotoState0();
                            break;
                        default:
                            throw console.error(t),
                            new Error("unhandled ResponseMessage: ")
                        }
                a === n.gPlayerIndex && 2 === l ? this._activateSubControl("inHand") : this._activateSubControl("gaming")
            }
        }
        _activateSubControl(t) {
            let e = !1;
            if ((!this._activeSubControl || this._activeSubControl.name !== t) && (e = !0,
            this._activeSubControl && this._activeSubControl.deactivate(),
            this._state !== v.ACTING))
                return this._holdingSubControlName = t,
                void (this._activeSubControl = null);
            if (this._holdingSubControlName = void 0,
            this._activeSubControl = this._subControl[t],
            e) {
                let t = this._localUIInstances
                  , e = this._activeSubControl.displayUIGroup;
                for (let i = 0, s = t.length; i !== s; ++i)
                    t[i].group & e ? t[i].activate() : t[i].deactivate()
            }
            this._activeSubControl.activate()
        }
        _showResult() {
            let t = Object.create(null);
            if (t.time = this._gameTime,
            t.players = this._model.players,
            t.players.length > 1) {
                this._uiLayer.popBox("duoResultBox", t).on(de.USER_CLOSE, this._onQuitConfirm).on("retry", this._onRestartConfirm);
                let e = t.players[1];
                if (e.type === xe.a.PLAYER_TYPE_AI) {
                    let i = t.players[0]
                      , s = i.pts - e.penalty
                      , n = e.pts - i.penalty > s ? 1 : 0;
                    Ps("event", "result", {
                        event_category: "ai",
                        event_label: e.id,
                        value: n
                    }),
                    Ps("event", "timing_complete", {
                        name: "frame_time",
                        value: Math.round(1e3 * this._gameTime),
                        event_label: e.id
                    })
                }
            } else
                this._uiLayer.popBox("singleResultBox", t).on(de.USER_CLOSE, this._onQuitConfirm).on("retry", this._onRestartConfirm),
                Ps("event", "result", {
                    event_category: "ai",
                    event_label: "practice",
                    value: 0
                }),
                Ps("event", "timing_complete", {
                    name: "frame_time",
                    value: Math.round(1e3 * this._gameTime),
                    event_label: "practice"
                })
        }
        exit() {
            this._gView.cancelStickPendingCheck();
            const t = this._localUIInstances;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].deactivate(!0);
            for (let t in this._subControl)
                this._subControl[t].unbind();
            this._activeSubControl = null;
            for (let t = 0, e = this._playerCtls.length; t !== e; ++t)
                this._playerCtls[t].deactivate();
            this._model.release(),
            this._movieClip.releaseAllTargets().erase(),
            super.exit()
        }
        updateExiting(t) {
            const e = this._localUIInstances;
            let i = !0;
            for (let s = 0, n = e.length; s !== n; ++s)
                e[s].isActive && e[s].deactivate(),
                e[s].needsUpdate && (i = !1,
                e[s].update(t.dt));
            i && this.emit(m.EXITED)
        }
        free() {
            for (let t = 0, e = this._playerCtls.length; t !== e; ++t)
                this._playerCtls[t].release();
            this._playerCtls.length = 0,
            super.free()
        }
    }
    class Ms extends ue {
        constructor(t, e) {
            super(t, e),
            this._addBoxClass("message-box"),
            this._msgType = 0
        }
        _createElement() {
            let t = super._createElement();
            return this._body = new he(t),
            this._closeBn = this._createCloseIcon(t),
            t
        }
        _createBoxHead(t) {
            let e = document.createElement("h3");
            return e.className = "box-head",
            t && t.appendChild(e),
            e
        }
        data(t, e=0) {
            if (this._body.message(t),
            e !== this._msgType) {
                let t = this._msgType;
                0 !== t && this._head.classList.remove(he.getMessageTypeClass(t)),
                this._msgType = e,
                0 !== e && this._head.classList.add(he.getMessageTypeClass(e))
            }
            return this
        }
    }
    class Us extends _e {
        constructor(t) {
            super(t, void 0),
            this.closeLabel("NO").head("")._addBoxClass("confirm-box"),
            this._onConfirmClick = (()=>{
                this.emit(de.CONFIRM),
                this.deactivate()
            }
            )
        }
        _createElement() {
            let t = super._createElement();
            return this._confirmBn = this._createButton("YES"),
            this._body = this._createBody(!1),
            t
        }
        data(t, e) {
            return this._body.message(t, e),
            this
        }
        _bindEvents() {
            super._bindEvents(),
            this._confirmBn.addEventListener("click", this._onConfirmClick, !1)
        }
        _unbindEvents() {
            super._unbindEvents(),
            this._confirmBn.removeEventListener("click", this._onConfirmClick, !1)
        }
    }
    const Bs = Object.create(null);
    Bs.MESSAGE_BOX = 10,
    Bs.GAME_BOX = 20;
    const Ns = Object.create(null);
    Ns.MESSAGE_AUTO_CLOSE = 1,
    Ns.ACTIVE_BOX_DIRTY = 2;
    class Vs {
        get isBlocked() {
            return this._isBlocked
        }
        constructor(t, e) {
            this._container = t,
            this._gameCanvas = e,
            this._registeredUI = Object.create(null),
            this._registeredBox = Object.create(null),
            this._activeBoxStack = [],
            this.needsUpdate = 0,
            this._isBlocked = !1,
            this._block = document.createElement("div");
            let i = this._block.style;
            i.position = "absolute",
            i.display = "none",
            i.width = "100%",
            i.height = "100%",
            i.top = "0",
            i.left = "0",
            i.backgroundColor = "rgba(0,0,0,0.4)",
            i.zIndex = Bs.GAME_BOX + "",
            this._container.appendChild(this._block),
            this._msgAutoCloseTimer = -1,
            this._msgId = void 0,
            this._bMsgBox = new Ms("msg"),
            this._setZIndex(this._bMsgBox, Bs.MESSAGE_BOX),
            this._container.appendChild(this._bMsgBox.element),
            this._bMsgBox.on(de.USER_CLOSE, ()=>{
                this.closeMessage()
            }
            ),
            this._onBoxUserClose = (t=>{
                t.deactivate()
            }
            ),
            this._onBoxClosed = (t=>{
                t.removeAllListeners();
                let e = this._activeBoxStack
                  , i = e.indexOf(t);
                -1 !== i && (e.splice(i, 1),
                this.needsUpdate |= Ns.ACTIVE_BOX_DIRTY)
            }
            ),
            this.registerBox(new Us("confirm"))
        }
        registerUI(t) {
            let e = t.id;
            if (!this._registeredUI[e])
                return this._registeredUI[e] = t,
                this._container.appendChild(t.element),
                t
        }
        hasRegisteredUI(t) {
            return !!this._registeredUI[t]
        }
        getRegisteredUI(t) {
            return this._registeredUI[t]
        }
        registerBox(t) {
            let e = t.id;
            this._registeredBox[e] || (this._registeredBox[e] = t,
            this._container.appendChild(t.element))
        }
        hasRegisteredBox(t) {
            return !!this._registeredBox[t]
        }
        popBox(t, e) {
            let i = this._activeBoxStack
              , s = this._registeredBox[t];
            return void 0 !== e && s.data(e),
            s.activate().on(de.USER_CLOSE, this._onBoxUserClose).on(de.CLOSE, this._onBoxClosed),
            s.blocked = !0,
            i.push(s),
            this._setZIndex(s, Bs.GAME_BOX + i.length),
            this.needsUpdate |= Ns.ACTIVE_BOX_DIRTY,
            s
        }
        closeBox(t) {
            this._registeredBox[t].deactivate()
        }
        confirm(t, e) {
            return this.popBox("confirm", t).on(de.CONFIRM, e)
        }
        message(t, e, i=0, s=!1, n, r) {
            if (this._bMsgBox.head(t).data(e, i).activate().pin(s),
            this._msgId = n,
            s)
                this._msgAutoCloseTimer = -1;
            else {
                if (void 0 !== r)
                    this._msgAutoCloseTimer = r;
                else {
                    let i = t ? t.length : 0
                      , s = e.length;
                    this._msgAutoCloseTimer = 1 + .08 * (i + s),
                    this._msgAutoCloseTimer > 15 && (this._msgAutoCloseTimer = 15)
                }
                this.needsUpdate |= Ns.MESSAGE_AUTO_CLOSE
            }
        }
        closeMessage(t) {
            void 0 !== t && t !== this._msgId || (this._bMsgBox.deactivate(),
            this._msgAutoCloseTimer = -1,
            this._msgId = void 0)
        }
        update(t) {
            let e = this.needsUpdate;
            if (this.needsUpdate = 0,
            this._msgAutoCloseTimer > 0 && ((this._msgAutoCloseTimer -= t) <= 0 ? this.closeMessage() : this.needsUpdate |= Ns.MESSAGE_AUTO_CLOSE),
            e & Ns.ACTIVE_BOX_DIRTY) {
                let t = this._activeBoxStack
                  , e = t.length
                  , i = !1;
                for (let s = 0; s !== e; ++s)
                    t[s].blocked = s !== e - 1,
                    t[s].lockScreen && (i = !0);
                this._isBlocked !== i ? (this._isBlocked = i,
                i ? (this._block.style.display = "block",
                this._gameCanvas.blur()) : (this._block.style.display = "none",
                this._gameCanvas.focus())) : i || this._gameCanvas.focus()
            }
        }
        _setZIndex(t, e) {
            t.element.style.zIndex = e
        }
    }
    var Fs = i(25)
      , zs = i.n(Fs);
    i.d(e, "default", function() {
        return qs
    });
    const Hs = window.gtag || null;
    class Gs {
        get dt() {
            return this._dt
        }
        get duration() {
            return this._duration
        }
        get frames() {
            return this._frames
        }
        constructor() {
            this._now = 0,
            this._dt = 0,
            this._duration = 0,
            this._frames = 0,
            this.timeScale = 1
        }
        reset(t) {
            return this._now = void 0 !== t ? t : .001 * Date.now(),
            this._dt = 0,
            this._duration = 0,
            this._frames = 0,
            this._dt
        }
        tick() {
            let t = .001 * Date.now();
            return this._dt = (t - this._now) * this.timeScale,
            this._duration += this._dt,
            this._now = t,
            this._frames++,
            this._dt
        }
        tickFixed(t) {
            return this._dt = t * this.timeScale,
            this._duration += this._dt,
            this._now += t,
            this._frames++,
            this._dt
        }
    }
    class qs extends b {
        showLoading() {
            this._loadingIsOn || (this._loadingView.style.display = "block",
            this._loadingIsOn = !0)
        }
        hideLoading() {
            this._loadingIsOn && (this._loadingView.style.display = "none",
            this._loadingIsOn = !1)
        }
        constructor() {
            super(),
            this._initialLoadingTime = Date.now(),
            this._tipBadBrowser = !1,
            s.Engine.ShadersRepository = zs.a.shaders,
            s.SceneLoader.ShowLoadingScreen = !1;
            const t = document.getElementById("game-view");
            t.addEventListener("contextmenu", t=>(t.preventDefault(),
            !1), !1),
            this._engine = new s.Engine(t,!0,void 0,!0),
            this._engine.enableOfflineSupport = !1,
            this._engine.disablePerformanceMonitorInBackground = !0,
            this._engine.getHardwareScalingLevel() < .5 && this._engine.setHardwareScalingLevel(.5),
            this._customizeBJSBuiltinEvents(t, this._engine),
            this._loadingView = document.getElementById("game-loading"),
            this._loadingIsOn = !1,
            this._gView = new Tt(this._engine,t),
            this._model = new g,
            this._controllers.home = new ve("home"),
            this._controllers.game = new Os("game"),
            this._uiLayer = new Vs(document.getElementById("game-container"),t),
            this._controllerLaunchOptions.gView = this._gView,
            this._controllerLaunchOptions.uiLayer = this._uiLayer,
            this._gTimer = new Gs,
            this._updateHandler = null,
            this._onModelRestored = ((t,e)=>{
                if (t)
                    throw t;
                this._engine.runRenderLoop(()=>{
                    let t = this._gTimer.tick();
                    this._uiLayer.needsUpdate && this._uiLayer.update(t),
                    this._updateHandler()
                }
                ),
                this.changeController(e)
            }
            ),
            this._onChangeController = (t=>{
                this.changeController(t)
            }
            ),
            this._engine.resize(),
            window.addEventListener("resize", ()=>{
                this._engine.resize(),
                this._gView.requireRender()
            }
            ),
            this._gView.on(St.LOADED, ()=>{
                const t = this._model.cameraSettings;
                for (const e in t)
                    this._gView.camera[e] = t[e]
            }
            )
        }
        launch(t) {
            this.showLoading(),
            this._model.asyncLaunch(t, this._onModelRestored)
        }
        onCurrentControllerStateChanged() {
            this._gTimer.reset();
            let t = this._currentController;
            if (t)
                switch (t.state) {
                case v.PENDING:
                    return this._updateHandler = this._updatePending,
                    void t.on(y.CHANGE_CONTROLLER, this._onChangeController);
                case v.ENTERING:
                    if (this.hideLoading(),
                    this._gView.show(),
                    this._updateHandler = this._updateEntering,
                    this._initialLoadingTime > 0) {
                        let t = Date.now() - this._initialLoadingTime;
                        this._initialLoadingTime = -1,
                        Hs("event", "timing_complete", {
                            name: "initial_load",
                            value: t
                        }),
                        Hs("event", "loaded", {
                            event_category: "game_page",
                            value: 1
                        })
                    }
                    return;
                case v.ACTING:
                    return this._tipBadBrowser && (this._tipBadBrowser = !1,
                    this._uiLayer.message("PERFORMANCE TIP", 'The WebGL version of the current browser is low. For better performance, please consider playing this game in a WebGL 2.0 supported browser like the latest version of <b class="bright-copy">Firefox</b> or <b class="bright-copy">Google Chrome</b>.', oe.WARNING, !1, void 0, 40)),
                    this.hideLoading(),
                    this._gView.show(),
                    this._uiLayer.isBlocked || this._gView.canvas.focus(),
                    void (this._updateHandler = this._updateActing);
                case v.EXITING:
                    return this._updateHandler = this._updateExiting,
                    void t.removeAllListeners(y.CHANGE_CONTROLLER);
                default:
                    return void (this._updateHandler = this._updateNone)
                }
            else
                this._updateHandler = this._updateNone
        }
        _updateNone() {}
        _updatePending() {
            10 === this._gTimer.frames && this.showLoading(),
            this._gView.update()
        }
        _updateEntering() {
            this._currentController.updateEntering(this._gTimer),
            this._gView.update()
        }
        _updateActing() {
            this._currentController.updateActing(this._gTimer),
            this._gView.update()
        }
        _updateExiting() {
            this._currentController.updateExiting(this._gTimer),
            this._gView.update()
        }
        _customizeBJSBuiltinEvents(t, e) {
            t.removeEventListener("focus", e._onCanvasFocus),
            t.removeEventListener("blur", e._onCanvasBlur),
            t.removeEventListener("pointerout", e._onCanvasBlur),
            t.removeEventListener("pointerout", e._onCanvasPointerOut),
            document.removeEventListener("pointerlockchange", e._onPointerLockChange),
            document.removeEventListener("mspointerlockchange", e._onPointerLockChange),
            document.removeEventListener("mozpointerlockchange", e._onPointerLockChange),
            document.removeEventListener("webkitpointerlockchange", e._onPointerLockChange),
            document.removeEventListener("fullscreenchange", e._onFullscreenChange),
            document.removeEventListener("mozfullscreenchange", e._onFullscreenChange),
            document.removeEventListener("webkitfullscreenchange", e._onFullscreenChange),
            document.removeEventListener("msfullscreenchange", e._onFullscreenChange),
            window.removeEventListener("vrdisplaypointerrestricted", e._onVRDisplayPointerRestricted),
            window.removeEventListener("vrdisplaypointerunrestricted", e._onVRDisplayPointerUnrestricted),
            document.addEventListener("mouseup", ()=>{
                this._uiLayer.isBlocked || document.activeElement !== document.body || t.focus()
            }
            , !1)
        }
        _checkEvents(t, e) {
            throw new Error("debug function called: checkEvents")
        }
    }
    qs.VERSION = "0.1.0.03152018"
}
, , function(t, e) {
    function i(t, e, i) {
        this.x = t || 0,
        this.y = e || 0,
        this.z = i || 0
    }
    i.ZERO = new i(0,0,0),
    i.UNIT_X = new i(1,0,0),
    i.UNIT_Y = new i(0,1,0),
    i.UNIT_Z = new i(0,0,1),
    i.EPSILON = 1e-6,
    i.prototype.toArray = function(t, e) {
        t[e] = this.x,
        t[e + 1] = this.y,
        t[e + 2] = this.z
    }
    ,
    i.prototype.fromArray = function(t, e) {
        return e = e || 0,
        this.x = t[e],
        this.y = t[e + 1],
        this.z = t[e + 2],
        3
    }
    ,
    i.prototype.set = function(t, e, i) {
        return this.x = t,
        this.y = e,
        this.z = i,
        this
    }
    ,
    i.prototype.setZero = function() {
        return this.x = this.y = this.z = 0,
        this
    }
    ,
    i.prototype.copy = function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.z = t.z,
        this
    }
    ,
    i.prototype.copyNeg = function(t) {
        return this.x = -t.x,
        this.y = -t.y,
        this.z = -t.z,
        this
    }
    ,
    i.prototype.clone = function() {
        return new i(this.x,this.y,this.z)
    }
    ,
    i.prototype.lengthSq = function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }
    ,
    i.prototype.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }
    ,
    i.prototype.normalize = function() {
        const t = this.length();
        if (t > 0) {
            const e = 1 / t;
            this.x *= e,
            this.y *= e,
            this.z *= e
        } else
            this.x = 0,
            this.y = 0,
            this.z = 0;
        return this
    }
    ,
    i.prototype.normalizeVector = function(t) {
        const e = t.length();
        if (e > 0) {
            const i = 1 / e;
            this.x = t.x * i,
            this.y = t.y * i,
            this.z = t.z * i
        } else
            this.x = 0,
            this.y = 0,
            this.z = 0;
        return this
    }
    ,
    i.prototype.add = function(t) {
        return this.x += t.x,
        this.y += t.y,
        this.z += t.z,
        this
    }
    ,
    i.prototype.addScaled = function(t, e) {
        return this.x += t.x * e,
        this.y += t.y * e,
        this.z += t.z * e,
        this
    }
    ,
    i.prototype.interpolate = function(t, e, i) {
        return this.x = t.x + e.x * i,
        this.y = t.y + e.y * i,
        this.z = t.z + e.z * i,
        this
    }
    ,
    i.prototype.addVectors = function(t, e) {
        return this.x = t.x + e.x,
        this.y = t.y + e.y,
        this.z = t.z + e.z,
        this
    }
    ,
    i.prototype.sub = function(t) {
        return this.x -= t.x,
        this.y -= t.y,
        this.z -= t.z,
        this
    }
    ,
    i.prototype.subVectors = function(t, e) {
        return this.x = t.x - e.x,
        this.y = t.y - e.y,
        this.z = t.z - e.z,
        this
    }
    ,
    i.prototype.cross = function(t) {
        let e = this.x
          , i = this.y
          , s = this.z;
        return this.x = i * t.z - s * t.y,
        this.y = s * t.x - e * t.z,
        this.z = e * t.y - i * t.x,
        this
    }
    ,
    i.prototype.crossVectors = function(t, e) {
        let i = t.x
          , s = t.y
          , n = t.z
          , r = e.x
          , a = e.y
          , o = e.z;
        return this.x = s * o - n * a,
        this.y = n * r - i * o,
        this.z = i * a - s * r,
        this
    }
    ,
    i.prototype.setCrossThenAdd = function(t, e, i) {
        let s = t.x
          , n = t.y
          , r = t.z
          , a = e.x
          , o = e.y
          , l = e.z;
        return this.x = n * l - r * o + i.x,
        this.y = r * a - s * l + i.y,
        this.z = s * o - n * a + i.z,
        this
    }
    ,
    i.prototype.distanceToSq = function(t) {
        let e = this.x - t.x
          , i = this.y - t.y
          , s = this.z - t.z;
        return e * e + i * i + s * s
    }
    ,
    i.prototype.distanceTo = function(t) {
        let e = this.x - t.x
          , i = this.y - t.y
          , s = this.z - t.z;
        return Math.sqrt(e * e + i * i + s * s)
    }
    ,
    i.prototype.scale = function(t) {
        return this.x *= t,
        this.y *= t,
        this.z *= t,
        this
    }
    ,
    i.prototype.scaleVector = function(t, e) {
        return this.x = t * e.x,
        this.y = t * e.y,
        this.z = t * e.z,
        this
    }
    ,
    i.prototype.multiply = function(t) {
        return this.x *= t.x,
        this.y *= t.y,
        this.z *= t.z,
        this
    }
    ,
    i.prototype.negate = function() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this
    }
    ,
    i.prototype.dot = function(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z
    }
    ,
    i.prototype.isZero = function() {
        return 0 === this.x && 0 === this.y && 0 === this.z
    }
    ,
    i.prototype.almostZero = function(t) {
        return void 0 === t && (t = i.EPSILON),
        !(Math.abs(this.x) > t || Math.abs(this.y) > t || Math.abs(this.z) > t)
    }
    ,
    i.prototype.almostEquals = function(t) {
        const e = i.EPSILON
          , s = Math.abs;
        return !(s(this.x - t.x) > e || s(this.y - t.y) > e || s(this.z - t.z) > e)
    }
    ,
    i.prototype.toString = function() {
        return "{" + this.x + ", " + this.y + ", " + this.z + "}"
    }
    ,
    i.prototype.lerp = function(t, e) {
        return this.x += (t.x - this.x) * e,
        this.y += (t.y - this.y) * e,
        this.z += (t.z - this.z) * e,
        this
    }
    ,
    i.prototype.applyQuaternion = function(t) {
        let e = this.x
          , i = this.y
          , s = this.z
          , n = t.x
          , r = t.y
          , a = t.z
          , o = t.w
          , l = o * e + r * s - a * i
          , h = o * i + a * e - n * s
          , c = o * s + n * i - r * e
          , d = -n * e - r * i - a * s;
        return this.x = l * o + d * -n + h * -a - c * -r,
        this.y = h * o + d * -r + c * -n - l * -a,
        this.z = c * o + d * -a + l * -r - h * -n,
        this
    }
    ,
    i.prototype.vectorApplyQuaternion = function(t, e) {
        let i = e.x
          , s = e.y
          , n = e.z
          , r = t.x
          , a = t.y
          , o = t.z
          , l = t.w
          , h = l * i + a * n - o * s
          , c = l * s + o * i - r * n
          , d = l * n + r * s - a * i
          , u = -r * i - a * s - o * n;
        return this.x = h * l + u * -r + c * -o - d * -a,
        this.y = c * l + u * -a + d * -r - h * -o,
        this.z = d * l + u * -o + h * -a - c * -r,
        this
    }
    ,
    t.exports = i
}
, function(t, e, i) {
    t.exports = {
        Vec3: i(12),
        Quaternion: i(23),
        WorldClient: i(95),
        World: i(39),
        MeshBody: i(84),
        Sphere: i(36),
        exts: {
            uv4pg: i(80)
        }
    }
}
, function(t, e, i) {
    "use strict";
    const s = (t,e,i)=>{
        let s, n;
        if ("function" != typeof i)
            throw new TypeError('"listener" argument must be a function');
        return (s = t._events) ? n = s[e] : (s = t._events = Object.create(null),
        t._eventsCount = 0),
        n ? "function" == typeof n ? n = s[e] = [n, i] : n.push(i) : (n = s[e] = i,
        ++t._eventsCount),
        t
    }
      , n = (t,e)=>{
        for (var i = e, s = i + 1, n = t.length; s < n; i += 1,
        s += 1)
            t[i] = t[s];
        t.pop()
    }
    ;
    let r = [];
    const a = (t,e,i)=>{
        for (let s = 0; s < i; ++s)
            e[s] = t[s];
        return e
    }
      , o = t=>{
        let e = t.length
          , i = a(t, r, e);
        for (let t = 0; t < e; ++t)
            i[t]();
        i.length = 0
    }
      , l = (t,e)=>{
        let i = t.length
          , s = a(t, r, i);
        for (let t = 0; t < i; ++t)
            s[t](e);
        s.length = 0
    }
      , h = (t,e,i)=>{
        let s = t.length
          , n = a(t, r, s);
        for (let t = 0; t < s; ++t)
            n[t](e, i);
        n.length = 0
    }
      , c = (t,e)=>{
        let i = t.length
          , s = a(t, r, i);
        for (let t = 0; t < i; ++t)
            s[t](...e);
        s.length = 0
    }
    ;
    t.exports = class {
        constructor() {
            this._events = Object.create(null),
            this._eventsCount = 0,
            this.emit = this._emit,
            this.on = this._on
        }
        _on(t, e) {
            return s(this, t, e)
        }
        _emit(t, ...e) {
            const i = this._events;
            let s, n, r = "error" === t;
            if (i)
                r = r && null == i.error;
            else if (!r)
                return !1;
            if (r) {
                if (e.length > 0 && (s = e[0]),
                s instanceof Error)
                    throw s;
                {
                    let t = new Error('Unhandled "error" emitted. (' + s + ")");
                    throw t.message = s,
                    t
                }
            }
            if (!(n = i[t]))
                return !1;
            switch (e.length) {
            case 0:
                "function" == typeof n ? n() : o(n);
                break;
            case 1:
                "function" == typeof n ? n(e[0]) : l(n, e[0]);
                break;
            case 2:
                "function" == typeof n ? n(e[0], e[1]) : h(n, e[0], e[1]);
                break;
            default:
                "function" == typeof n ? n(...e) : c(n, e)
            }
            return !0
        }
        removeAllListeners(t) {
            let e = this._events;
            return e ? (void 0 === t ? (this._events = Object.create(null),
            this._eventsCount = 0) : e[t] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete e[t]),
            this) : this
        }
        removeListener(t, e) {
            let i, s, r, a;
            if ("function" != typeof e)
                throw new TypeError('"listener" argument must be a function');
            if (!(s = this._events))
                return this;
            if (!(i = s[t]))
                return this;
            if (i === e || i.listener === e)
                0 == --this._eventsCount ? this._events = Object.create(null) : delete s[t];
            else if ("function" != typeof i) {
                for (r = -1,
                a = i.length - 1; a >= 0; a--)
                    if (i[a] === e || i[a].listener === e) {
                        r = a;
                        break
                    }
                if (r < 0)
                    return this;
                0 === r ? i.shift() : n(i, r),
                1 === i.length && (s[t] = i[0])
            }
            return this
        }
    }
}
, function(t, e) {
    const i = Object.create(null);
    i.ERROR = 0,
    i.NO_GAME = 1,
    i.PENDING = 2,
    i.READY = 4,
    i.SIMULATING = 8,
    i.JUDGING = 16,
    t.exports = i
}
, function(t, e, i) {
    const s = i(12);
    t.exports = {
        gravity: new s(0,-19,0),
        tPrecision: 3e-4,
        islandUpdMinDisSq: .1,
        airAngularDamping: .99,
        frictionS: .01,
        frictionP: .15,
        restitution: {
            ball: .985,
            ground: .3,
            sidehard: .92,
            sidesoft: .45,
            tunnel: 0,
            pocket: .002,
            default: .5
        },
        __gravityDir: null,
        getGravityDir: function() {
            return this.__gravityDir || (this.__gravityDir = (new s).normalizeVector(this.gravity)),
            this.__gravityDir
        },
        setBallFrictionAndRestitution: function(t) {
            t.restitution = this.restitution.ball,
            t.friction = this.frictionS
        },
        setPolyFrictionAndRestitution: function(t) {
            t.friction = this.frictionP;
            var e = this.restitution;
            for (var i in e)
                if (t[i])
                    return void (t.restitution = e[i]);
            t.restitution = e.default
        }
    }
}
, function(t, e) {
    function i() {
        this.data = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
    }
    i.prototype.toArray = function(t, e) {
        let i = this.data;
        for (let s = 0, n = i.length; s !== n; ++s)
            t[e + s] = i[s]
    }
    ,
    i.prototype.toString = function() {
        let t = this.data;
        return "Mat: [\n\t" + t[0] + "," + t[1] + "," + t[2] + "\n\t" + t[3] + "," + t[4] + "," + t[5] + "\n\t" + t[6] + "," + t[7] + "," + t[8] + "]"
    }
    ,
    i.prototype.transform = function(t, e) {
        let i = this.data
          , s = t.x * i[0] + t.y * i[1] + t.z * i[2]
          , n = t.x * i[3] + t.y * i[4] + t.z * i[5]
          , r = t.x * i[6] + t.y * i[7] + t.z * i[8];
        e.set(s, n, r)
    }
    ,
    i.prototype.transformTranspose = function(t, e) {
        let i = this.data
          , s = t.x * i[0] + t.y * i[3] + t.z * i[6]
          , n = t.x * i[1] + t.y * i[4] + t.z * i[7]
          , r = t.x * i[2] + t.y * i[5] + t.z * i[8];
        e.set(s, n, r)
    }
    ,
    i.prototype.set = function(t, e, i, s, n, r, a, o, l) {
        let h = this.data;
        return h[0] = t,
        h[1] = s,
        h[2] = a,
        h[3] = e,
        h[4] = n,
        h[5] = o,
        h[6] = i,
        h[7] = r,
        h[8] = l,
        this
    }
    ,
    i.prototype.identity = function() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
        this
    }
    ,
    i.prototype.clone = function() {
        return (new i).fromArray(this.data)
    }
    ,
    i.prototype.fromArray = function(t, e) {
        void 0 === e && (e = 0);
        for (let i = 0; i < 9; i++)
            this.data[i] = t[i + e];
        return 9
    }
    ,
    i.prototype.copy = function(t) {
        let e = t.data;
        return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]),
        this
    }
    ,
    i.prototype.multiplyScalar = function(t) {
        let e = this.data;
        return e[0] *= t,
        e[3] *= t,
        e[6] *= t,
        e[1] *= t,
        e[4] *= t,
        e[7] *= t,
        e[2] *= t,
        e[5] *= t,
        e[8] *= t,
        this
    }
    ,
    i.prototype.multiply = function(t) {
        let e = this.data
          , i = t.data
          , s = e[0] * i[0] + e[1] * i[3] + e[2] * i[6]
          , n = e[0] * i[1] + e[1] * i[4] + e[2] * i[7]
          , r = e[0] * i[2] + e[1] * i[5] + e[2] * i[8];
        return e[0] = s,
        e[1] = n,
        e[2] = r,
        s = e[3] * i[0] + e[4] * i[3] + e[5] * i[6],
        n = e[3] * i[1] + e[4] * i[4] + e[5] * i[7],
        r = e[3] * i[2] + e[4] * i[5] + e[5] * i[8],
        e[3] = s,
        e[4] = n,
        e[5] = r,
        s = e[6] * i[0] + e[7] * i[3] + e[8] * i[6],
        n = e[6] * i[1] + e[7] * i[4] + e[8] * i[7],
        r = e[6] * i[2] + e[7] * i[5] + e[8] * i[8],
        e[6] = s,
        e[7] = n,
        e[8] = r,
        this
    }
    ,
    i.prototype.add = function(t) {
        let e = this.data
          , i = t.data;
        return e[0] += i[0],
        e[1] += i[1],
        e[2] += i[2],
        e[3] += i[3],
        e[4] += i[4],
        e[5] += i[5],
        e[6] += i[6],
        e[7] += i[7],
        e[8] += i[8],
        this
    }
    ,
    i.prototype.addToDiagonal = function(t) {
        let e = this.data;
        return e[0] += t,
        e[4] += t,
        e[8] += t,
        this
    }
    ,
    i.prototype.setInverse = function(t) {
        let e = t.data
          , i = this.data
          , s = e[0]
          , n = e[1]
          , r = e[2]
          , a = e[3]
          , o = e[4]
          , l = e[5]
          , h = e[6]
          , c = e[7]
          , d = e[8]
          , u = d * o - l * c
          , _ = l * h - d * a
          , p = c * a - o * h
          , f = s * u + n * _ + r * p;
        if (0 === f)
            return console.warn("setInverse(): can't invert matrix, determinant is 0"),
            this.identity();
        let g = 1 / f;
        return i[0] = u * g,
        i[1] = (r * c - d * n) * g,
        i[2] = (l * n - r * o) * g,
        i[3] = _ * g,
        i[4] = (d * s - r * h) * g,
        i[5] = (r * a - l * s) * g,
        i[6] = p * g,
        i[7] = (n * h - c * s) * g,
        i[8] = (o * s - n * a) * g,
        this
    }
    ,
    i.prototype.setTranspose = function(t) {
        let e = this.data
          , i = t.data;
        return e[0] = i[0],
        e[1] = i[3],
        e[2] = i[6],
        e[3] = i[1],
        e[4] = i[4],
        e[5] = i[7],
        e[6] = i[2],
        e[7] = i[5],
        e[8] = i[8],
        this
    }
    ,
    i.prototype.transpose = function() {
        let t, e = this.data;
        return t = e[1],
        e[1] = e[3],
        e[3] = t,
        t = e[2],
        e[2] = e[6],
        e[6] = t,
        t = e[5],
        e[5] = e[7],
        e[7] = t,
        this
    }
    ,
    i.prototype.setSkewSymmetric = function(t) {
        let e = this.data;
        return e[0] = e[4] = e[8] = 0,
        e[1] = -t.z,
        e[2] = t.y,
        e[3] = t.z,
        e[5] = -t.x,
        e[6] = -t.y,
        e[7] = t.x,
        this
    }
    ,
    i.prototype.setComponents = function(t, e, i) {
        let s = this.data;
        s[0] = t.x,
        s[1] = e.x,
        s[2] = i.x,
        s[3] = t.y,
        s[4] = e.y,
        s[5] = i.y,
        s[6] = t.z,
        s[7] = e.z,
        s[8] = i.z
    }
    ,
    t.exports = i
}
, function(t, e, i) {
    const s = i(13).Vec3
      , n = s.EPSILON;
    class r {
        get geoCenter() {
            return null
        }
        constructor() {
            this.normal = new s(0,0,0),
            this.d = 0
        }
        isZeroNormal() {
            const t = n
              , e = this.normal;
            return !(Math.abs(e.x) > t || Math.abs(e.y) > t || Math.abs(e.z) > t)
        }
        setWithPointNormal(t, e) {
            return this.normal.copy(e),
            this.d = -e.x * t.x - e.y * t.y - e.z * t.z,
            this
        }
        setWithPointAnd2Dirs(t, e, i) {
            let s = this.normal;
            return s.crossVectors(e, i).normalize(),
            this.d = -s.x * t.x - s.y * t.y - s.z * t.z,
            this
        }
        setWithPoint(t, e, i) {
            let s = e.x - t.x
              , n = e.y - t.y
              , r = e.z - t.z
              , a = i.x - t.x
              , o = i.y - t.y
              , l = i.z - t.z
              , h = n * l - r * o
              , c = r * a - s * l
              , d = s * o - n * a
              , u = Math.sqrt(h * h + c * c + d * d)
              , _ = 0 !== u ? 1 / u : 0
              , p = this.normal;
            return p.x = h * _,
            p.y = c * _,
            p.z = d * _,
            this.d = -(p.x * t.x + p.y * t.y + p.z * t.z),
            this
        }
        signedDistance(t) {
            let e = this.normal;
            return e.x * t.x + e.y * t.y + e.z * t.z + this.d
        }
        intersectionWithRay(t, e, i, s=9999) {
            const r = t
              , a = e
              , o = this.signedDistance(r)
              , l = n;
            let h = o / -this.normal.dot(a);
            return !(h < -l || h > s) && (h < 0 && (h = 0),
            i.copy(r).addScaled(a, h),
            !0)
        }
        projectionInside() {
            return !0
        }
    }
    r.TmpV = new s,
    t.exports = r
}
, function(t, e) {
    const i = {
        makeUserInfo: function(t, e, i, s) {
            let n = Object.create(null);
            return n.userId = t,
            n.displayName = e,
            n.level = i,
            n.stickName = s,
            n
        },
        makeGContext: function() {
            let t = Object.create(null);
            return t.nRounds = 0,
            t.inHand = 0,
            t.playerIndex = -1,
            t.ballOn = 0,
            t
        },
        makeSimulatorResult: function() {
            let t = Object.create(null);
            return t.nKissed = 0,
            t.firstKissIndex = 0,
            t.pottedIndices = [],
            t.outOfBoundsIndices = [],
            t
        },
        makeRefResult: function() {
            let t = Object.create(null);
            return t.score = 0,
            t.foulCode = 0,
            t
        }
    };
    t.exports = i
}
, function(t, e, i) {
    const s = i(90)
      , n = i(89);
    t.exports = new class {
        constructor() {
            this.data = s;
            for (let t = 0, e = this.data.length; t !== e; ++t)
                this[this.data[t].name] = t;
            this._viewer = null
        }
        createViewer() {
            this._viewer || (this._viewer = new n)
        }
        clear() {
            let t = this.data;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].value = 0
        }
        startTick(t) {
            const e = this[t];
            this.data[e].value = performance.now() - this.data[e].value
        }
        stopTick(t) {
            const e = this[t];
            this.data[e].value = performance.now() - this.data[e].value
        }
        count(t, e) {
            const i = this[t];
            this.data[i].value += e
        }
        end() {
            this._viewer && this._viewer.update(this)
        }
    }
}
, function(t, e, i) {
    "use strict";
    const s = i(20)
      , n = i(12)
      , r = n.EPSILON
      , a = new n
      , o = new n
      , l = new n
      , h = new n
      , c = new n;
    class d {
        constructor() {
            this.maxIter = 4
        }
        solveContact(t) {
            let e = t.transformLocVel2Imp
              , i = t.spaceTransformL2W
              , s = a
              , n = -1 - t.restitution;
            i.transformTranspose(t.getRelativeVelocity(), s);
            let r = s.x >= t.bounceThreshold ? -s.x : n * s.x
              , c = o.set(r, -s.y, -s.z)
              , d = l
              , u = h;
            e.transform(c, d);
            let _ = Math.sqrt(d.y * d.y + d.z * d.z)
              , p = d.x * t.friction;
            if (_ > p) {
                let t = p / _;
                d.y *= t,
                d.z *= t
            }
            p = d.x * t.rollingFriction,
            i.transform(d, u),
            t.bi.applyImpulseAtPoint(u, t.armI, p / t.armLenI),
            t.isSS && (u.scale(-1),
            t.bj.applyImpulseAtPoint(u, t.armJ, p / t.armLenJ))
        }
        solveList(t, e) {
            s.startTick("solve");
            let i = t.entry;
            if (e)
                for (; i; )
                    this.solveIsland(i),
                    i = i.next;
            else
                for (; i; )
                    i.dirty && this.solveIsland(i),
                    i = i.next;
            s.stopTick("solve")
        }
        solveIsland(t) {
            t.dirty = !1;
            for (let e = 0, i = this.maxIter; e !== i && !this._solveMostUrgentChildren(t); ++e)
                ;
            this._sloveChildrenPene(t)
        }
        _solveMostUrgentChildren(t) {
            const e = r;
            let i, n, a, o;
            if (1 === t.totalItems)
                return (i = t.itemEntry).getCloseSpeed() < -e && (this.solveContact(i),
                s.count("nSolvedCts", 1)),
                !0;
            for (let r = 0, l = t.totalItems; r !== l; ++r) {
                for (i = t.itemEntry,
                n = 0,
                o = null; i; )
                    (a = i.getCloseSpeed()) < n && (n = a,
                    o = i),
                    i = i.next;
                if (!(o && n < -e))
                    return !0;
                this.solveContact(o),
                s.count("nSolvedCts", 1)
            }
            return !1
        }
        _sloveChildrenPene(t) {
            const e = r;
            let i = t.itemEntry
              , s = c;
            for (; i; ) {
                if (i.penetration < -e) {
                    let t = i.penetration;
                    s.scaleVector(.5 * -t, i.normal),
                    i.bi.addPeneOffset(t, s),
                    i.isSS && i.bj.addPeneOffset(t, s.scale(-1))
                }
                i = i.next
            }
        }
    }
    d.sharedInstance = new d,
    t.exports = d
}
, function(t, e, i) {
    "use strict";
    const s = i(12)
      , n = i(17)
      , r = s.EPSILON
      , a = new s
      , o = new s;
    class l {
        get label() {
            return this.idi + "->" + this.idj
        }
        get penetration() {
            return this._penetration
        }
        get normal() {
            return this.normalDirty && this.normalUpdateHandler(),
            this._normal
        }
        get bounceThreshold() {
            return this.bounceThresholdDirty && (this.bounceThresholdDirty = !1,
            this._bounceThreshold = l.gt.dot(this.normal)),
            this._bounceThreshold
        }
        get armI() {
            return this.armDirty && this.updateForceArm(),
            this._armI
        }
        get armLenI() {
            return this.armDirty && this.updateForceArm(),
            this._armLenI
        }
        get spaceTransformL2W() {
            return this.spaceTransformDirty && this.updateSpaceTransform(),
            this._m_loc2Wor
        }
        get spaceTransformW2L() {
            return this.spaceTransformDirty && this.updateSpaceTransform(),
            this._m_wor2Loc
        }
        get transformImp2LocVel() {
            return this.impulseTransformDirty && this.updateImpulseTransform(),
            this._m_imp2LocVel
        }
        get transformLocVel2Imp() {
            return this.impulseTransformDirty && this.updateImpulseTransform(),
            this._m_locVel2Imp
        }
        constructor(t, e) {
            this.__weakParent = t,
            this.poolIndex = t ? e : -1,
            this.inUse = !1,
            this.next = null,
            this.prev = null,
            this.isSS = !1,
            this.markedAsKilled = !1,
            this.bi = null,
            this.bj = null,
            this.idi = NaN,
            this.idj = NaN,
            this.cdRoundI = NaN,
            this.restitution = 0,
            this.friction = 0,
            this.toi = 0,
            this.life = 0,
            this._penetration = 0,
            this.restingCheckPosI = new s(0,0,0),
            this.normalUpdateHandler = null,
            this.armDirty = !1,
            this._armI = new s(0,0,0),
            this._armLenI = 0,
            this.bounceThresholdDirty = !1,
            this._bounceThreshold = 0,
            this.relVelDirty = !1,
            this._closeSpeed = 0,
            this.relativeVelW = new s,
            this.vChangedCountI = -1,
            this.spaceTransformDirty = !1,
            this._m_loc2Wor = new n,
            this._m_wor2Loc = new n,
            this.impulseTransformDirty = !1,
            this._m_locVel2Imp = new n,
            this._m_imp2LocVel = new n,
            this.m_imp2WorVel = new n,
            this.skewSymmetric = new n,
            this.normalDirty = !1,
            this._normal = new s(0,0,0),
            this.rollingFriction = .013
        }
        toString() {
            return this.label + ": {toi:" + this.toi + ", life:" + this.life + ", outdated:" + this.isOutdated() + ", isSS:" + this.isSS + "}"
        }
        free() {
            this.bi = null,
            this.bj = null,
            this.inUse = !1,
            this.__weakParent.freeIndex(this.poolIndex)
        }
        dispose() {
            this.bi = null,
            this.bj = null,
            this.inUse = !1,
            this.__weakParent = null
        }
        activate() {
            return this.inUse = !0,
            this.life = 0,
            this.toi = Number.MAX_VALUE,
            this._penetration = 0,
            this
        }
        isOutdated() {
            return this.cdRoundI !== this.bi.cdRound || this.markedAsKilled
        }
        startResting() {
            let t = this.bi
              , e = this.bj;
            this.restingCheckPosI.copy(t.position),
            this.restitution = t.restitution > e.restitution ? e.restitution : t.restitution,
            this.friction = t.friction > e.friction ? t.friction : e.friction
        }
        needsUpdateResting() {
            return !this.restingCheckPosI.almostEquals(this.bi.position)
        }
        resetRestingWithPeneNormal(t, e) {
            this._penetration = t > -r ? 0 : t,
            this.restingCheckPosI.copy(this.bi.position),
            this.normalDirty = !1,
            this._normal.almostEquals(e) || (this._normal.copy(e),
            this.markNormalRelatedDirty())
        }
        stopResting() {
            this.bi.wakeUp()
        }
        resetWithBiBj(t, e) {
            this.bi === t && this.bj === e || (this.bi = t,
            this.idi = t.uid,
            this.bj = e,
            this.idj = e.uid,
            this.markObjectChanged())
        }
        getCloseSpeed() {
            return (this.relVelDirty || this.vChangedCountI !== this.bi.vChangedCount) && this.updateRelVelocity(),
            this._closeSpeed
        }
        getRelativeVelocity() {
            return (this.relVelDirty || this.vChangedCountI !== this.bi.vChangedCount) && this.updateRelVelocity(),
            this.relativeVelW
        }
        updateRelVelocity() {
            this.vChangedCountI = this.bi.vChangedCount,
            this.relVelDirty = !1,
            this.relativeVelW.setCrossThenAdd(this.bi.w, this.armI, this.bi.v),
            this._closeSpeed = this.relativeVelW.dot(this.normal)
        }
        markNormalRelatedDirty() {
            this.bounceThresholdDirty = !0,
            this.spaceTransformDirty = !0,
            this.armDirty = !0,
            this.relVelDirty = !0,
            this.impulseTransformDirty = !0
        }
        markNormalDirty() {
            this.normalDirty = !0,
            this.markNormalRelatedDirty()
        }
        markObjectChanged() {
            this.armDirty = !0,
            this.relVelDirty = !0,
            this.impulseTransformDirty = !0
        }
        updateForceArm() {
            this.armDirty = !1,
            console.log("BaseContact.updateForceArm: Overwrite me!!!")
        }
        updateSpaceTransform() {
            this.spaceTransformDirty = !1;
            let t = this.normal;
            if (Math.abs(t.x) > Math.abs(t.y)) {
                let e = 1 / Math.sqrt(t.z * t.z + t.x * t.x);
                a.x = t.z * e,
                a.y = 0,
                a.z = -t.x * e,
                o.x = t.y * a.z,
                o.y = t.z * a.x - t.x * a.z,
                o.z = -t.y * a.x
            } else {
                let e = 1 / Math.sqrt(t.z * t.z + t.y * t.y);
                a.x = 0,
                a.y = -t.z * e,
                a.z = t.y * e,
                o.x = t.y * a.z - t.z * a.y,
                o.y = -t.x * a.z,
                o.z = t.x * a.y
            }
            this._m_loc2Wor.setComponents(t, a, o),
            this._m_wor2Loc.setTranspose(this._m_loc2Wor)
        }
        updateImpulseTransform() {
            this.impulseTransformDirty = !1;
            let t = this._m_imp2LocVel
              , e = this.skewSymmetric.setSkewSymmetric(this.armI)
              , i = this.m_imp2WorVel.copy(e);
            i.multiply(this.bi.invInertia),
            i.multiply(e),
            i.multiplyScalar(-1),
            t.copy(this.spaceTransformW2L),
            t.multiply(i),
            t.multiply(this.spaceTransformL2W),
            t.addToDiagonal(this.bi.invMass),
            this._m_locVel2Imp.setInverse(t)
        }
    }
    l.gt = new s,
    t.exports = l
}
, function(t, e) {
    function i(t, e, i, s) {
        this.x = t || 0,
        this.y = e || 0,
        this.z = i || 0,
        this.w = void 0 !== s ? s : 1
    }
    i.prototype.toArray = function(t, e) {
        t[e] = this.x,
        t[e + 1] = this.y,
        t[e + 2] = this.z,
        t[e + 3] = this.w
    }
    ,
    i.prototype.fromArray = function(t, e) {
        return e = e || 0,
        this.x = t[e],
        this.y = t[e + 1],
        this.z = t[e + 2],
        this.w = t[e + 3],
        4
    }
    ,
    i.prototype.toString = function() {
        return "{x:" + this.x + ",y:" + this.y + ",z:" + this.z + ",w:" + this.w
    }
    ,
    i.prototype.set = function(t, e, i, s) {
        return this.x = t,
        this.y = e,
        this.z = i,
        this.w = s,
        this
    }
    ,
    i.prototype.setFromAngleAxis = function(t, e) {
        let i = Math.sin(e / 2);
        return this.w = Math.cos(e / 2),
        this.x = t.x * i,
        this.y = t.y * i,
        this.z = t.z * i,
        this
    }
    ,
    i.prototype.setFromEuler = function(t, e, i, s) {
        let n = Math.cos(t / 2)
          , r = Math.cos(e / 2)
          , a = Math.cos(i / 2)
          , o = Math.sin(t / 2)
          , l = Math.sin(e / 2)
          , h = Math.sin(i / 2);
        if (void 0 === s)
            return this.x = o * r * a + n * l * h,
            this.y = n * l * a - o * r * h,
            this.z = n * r * h + o * l * a,
            this.w = n * r * a - o * l * h,
            this;
        switch (s) {
        case "XYZ":
            return this.x = o * r * a + n * l * h,
            this.y = n * l * a - o * r * h,
            this.z = n * r * h + o * l * a,
            this.w = n * r * a - o * l * h,
            this;
        case "YXZ":
            return this.x = o * r * a + n * l * h,
            this.y = n * l * a - o * r * h,
            this.z = n * r * h - o * l * a,
            this.w = n * r * a + o * l * h,
            this;
        case "ZXY":
            return this.x = o * r * a - n * l * h,
            this.y = n * l * a + o * r * h,
            this.z = n * r * h + o * l * a,
            this.w = n * r * a - o * l * h,
            this;
        case "ZYX":
            return this.x = o * r * a - n * l * h,
            this.y = n * l * a + o * r * h,
            this.z = n * r * h - o * l * a,
            this.w = n * r * a + o * l * h,
            this;
        case "YZX":
            return this.x = o * r * a + n * l * h,
            this.y = n * l * a + o * r * h,
            this.z = n * r * h - o * l * a,
            this.w = n * r * a - o * l * h,
            this;
        case "XZY":
            return this.x = o * r * a - n * l * h,
            this.y = n * l * a - o * r * h,
            this.z = n * r * h + o * l * a,
            this.w = n * r * a + o * l * h,
            this;
        default:
            throw new Error("Unknown order")
        }
    }
    ,
    i.prototype.clone = function() {
        return new i(this.x,this.y,this.z,this.w)
    }
    ,
    i.prototype.copy = function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.z = t.z,
        this.w = t.w,
        this
    }
    ,
    i.prototype.normalize = function() {
        let t = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return 0 === t ? (this.x = 0,
        this.y = 0,
        this.z = 0,
        this.w = 1) : (t = 1 / t,
        this.x = this.x * t,
        this.y = this.y * t,
        this.z = this.z * t,
        this.w = this.w * t),
        this
    }
    ,
    i.prototype.integrate = function(t, e) {
        e *= .5;
        let i = t.x
          , s = t.y
          , n = t.z
          , r = this.w
          , a = this.x
          , o = this.y
          , l = this.z
          , h = (-i * a - s * o - n * l) * e + r
          , c = (i * r + s * l - n * o) * e + a
          , d = (-i * l + s * r + n * a) * e + o
          , u = (i * o - s * a + n * r) * e + l
          , _ = 1 / Math.sqrt(h * h + c * c + d * d + u * u);
        return this.w = h * _,
        this.x = c * _,
        this.y = d * _,
        this.z = u * _,
        this
    }
    ,
    i.prototype.integrateQuad = function(t, e, i) {
        i *= .5;
        let s = e.x
          , n = e.y
          , r = e.z
          , a = t.w
          , o = t.x
          , l = t.y
          , h = t.z
          , c = (-s * o - n * l - r * h) * i + a
          , d = (s * a + n * h - r * l) * i + o
          , u = (-s * h + n * a + r * o) * i + l
          , _ = (s * l - n * o + r * a) * i + h
          , p = 1 / Math.sqrt(c * c + d * d + u * u + _ * _);
        return this.w = c * p,
        this.x = d * p,
        this.y = u * p,
        this.z = _ * p,
        this
    }
    ,
    i.prototype.slerpQuaternions = function(t, e, i) {
        let s, n, r = i, a = t.x * e.x + t.y * e.y + t.z * e.z + t.w * e.w, o = !1;
        if (a < 0 && (o = !0,
        a = -a),
        a > .999999)
            n = 1 - r,
            s = o ? -r : r;
        else {
            let t = Math.acos(a)
              , e = 1 / Math.sin(t);
            n = Math.sin((1 - r) * t) * e,
            s = o ? -Math.sin(r * t) * e : Math.sin(r * t) * e
        }
        this.x = n * t.x + s * e.x,
        this.y = n * t.y + s * e.y,
        this.z = n * t.z + s * e.z,
        this.w = n * t.w + s * e.w
    }
    ,
    i.prototype.multiply = function(t) {
        let e = this.x
          , i = this.y
          , s = this.z
          , n = this.w
          , r = t.x
          , a = t.y
          , o = t.z
          , l = t.w;
        return this.x = e * l + n * r + i * o - s * a,
        this.y = i * l + n * a + s * r - e * o,
        this.z = s * l + n * o + e * a - i * r,
        this.w = n * l - e * r - i * a - s * o,
        this
    }
    ,
    t.exports = i
}
, function(t, e, i) {
    const s = Object.create(null);
    s.number = !0,
    s.string = !0,
    s.boolean = !0,
    s[void 0] = !0;
    const n = Object.create(null);
    n.deepClone = (t=>{
        const e = typeof t;
        if (s[e] || null === t)
            return t;
        if (Array.isArray(t)) {
            let e = [];
            for (let i = 0, s = t.length; i !== s; ++i)
                e[i] = n.deepClone(t[i]);
            return e
        }
        if ("object" === e) {
            let e = {};
            for (let i in t)
                e[i] = n.deepClone(t[i]);
            return e
        }
    }
    ),
    n.politeMerge = ((t,e,i)=>{
        const r = typeof i;
        if (!s[r] && null !== i && !Array.isArray(i) && e in t)
            if ("object" === r)
                for (let s in i)
                    n.politeMerge(t[e], s, i[s]);
            else
                0;
        else
            t[e] = i
    }
    ),
    n.toTimeString = (t=>{
        if (t <= 0)
            return "00:00:00";
        {
            let e = Math.floor(t % 60);
            t /= 60;
            let i = Math.floor(t % 60);
            t /= 60;
            let s = Math.floor(t % 60)
              , n = s > 9 ? s : "0" + s;
            return n += i > 9 ? ":" + i : ":0" + i,
            n += e > 9 ? ":" + e : ":0" + e
        }
    }
    ),
    n.xhr = ((t,e,i)=>{
        let s = new XMLHttpRequest;
        s.open(t, e, !0);
        let n = ()=>{
            s.readyState === (XMLHttpRequest.DONE || 4) && (s.removeEventListener("readystatechange", n, !1),
            i(s.status, s.responseText))
        }
        ;
        return s.addEventListener("readystatechange", n, !1),
        s
    }
    ),
    n.requestJson = ((t,e)=>{
        let i = n.xhr("GET", t, e);
        i.setRequestHeader("Content-Type", "application/json; charset=UTF-8"),
        i.send()
    }
    ),
    t.exports = n
}
, function(t, e, i) {
    const s = Object.create(null);
    s.rgb = "http://cdn.heyzxz.me/pcol_1_0_0/",
    s.shaders = "http://cdn.heyzxz.me/pcol_1_0_0/",
    t.exports = s
}
, function(t, e) {
    const i = Object.create(null);
    i.FIRST_KISS = "fk",
    i.OUT_OF_BOUNDS = "oob",
    i.POTTED = "ptd",
    i.PREPOT = "ppt",
    t.exports = i
}
, function(t, e) {
    const i = Object.create(null);
    i.ERROR = "error",
    i.SYNCHRONIZED = "synchronized",
    t.exports = i
}
, function(t, e) {
    const i = Object.create(null);
    i.ERROR = -1,
    i.NO_SCENE = 0,
    i.LOADING = 1,
    i.SYNCHRONIZED = 2,
    t.exports = i
}
, function(t, e) {
    t.exports = {
        tigerClubSno: {
            rgb: "tiger-club-sno-rgb.json",
            dArea: {
                cx: -1.04,
                cz: 0,
                sx: -1.33,
                sz: 0
            }
        }
    }
}
, function(t, e) {
    const i = Object.create(null);
    i.MISS_TARGET = 1,
    i.ILLEGAL_FIRST_HIT = 2,
    i.ILLEGAL_POTTING = 4,
    i.POTTING_CUE_BALL = 8,
    i.OFF_TABLE = 16;
    const s = ["", "MISS TARGET", "ILLEGAL FIRST HIT", "ILLEGAL POTTING", "POTTING THE CUE BALL", "OFF TABLE"];
    t.exports = {
        FoulCode: i,
        getFoulDescription: t=>{
            let e = ""
              , i = 1
              , n = 1
              , r = !1;
            for (; i <= t; )
                i & t && (e += r ? ", " + s[n] : s[n],
                r = !0),
                i <<= 1,
                n++;
            return r ? e + "." : e
        }
    }
}
, function(t, e) {
    class i {
        get id() {
            return this._userId
        }
        get type() {
            return this._type
        }
        get displayName() {
            return this._userInfo.displayName
        }
        constructor(t, e) {
            this._userInfo = t,
            this._userId = t.userId,
            this._type = e,
            this.pts = 0,
            this.penalty = 0,
            this._brk = 0,
            this._maxBrk = 0,
            this.shootingCount = 0,
            this.scoreCount = 0
        }
        get maxbrk() {
            return this._maxBrk
        }
        get brk() {
            return this._brk
        }
        set brk(t) {
            this._brk = t,
            this._maxBrk < t && (this._maxBrk = t)
        }
        get accuracy() {
            return 0 === this.shootingCount ? 0 : this.scoreCount / this.shootingCount
        }
        clearScores() {
            this.pts = 0,
            this.penalty = 0,
            this._brk = 0,
            this._maxBrk = 0,
            this.shootingCount = 0,
            this.scoreCount = 0
        }
        getInfoData(t) {
            return this._userInfo[t]
        }
        dispose() {
            this._userInfo = null
        }
    }
    i.PLAYER_TYPE_USER = 0,
    i.PLAYER_TYPE_AI = 1,
    i.PLAYER_TYPE_REMOTE = 2,
    t.exports = i
}
, function(t, e, i) {
    const s = i(13).Vec3
      , n = s.EPSILON;
    const r = new class {
        constructor() {
            this._tmpSP = new s,
            this._tmpAB = new s,
            this._tmpSectionsSubCopy = [],
            this._tmpSectionsSubResults = [],
            this._tmpResults = [],
            this._tmpIndices = []
        }
        sectionSub(t, e, i, s, r) {
            const a = n;
            if (s <= t || i >= e)
                return r[0] = t,
                r[1] = e,
                2;
            let o = 0;
            return i > t + a && (r[o++] = t,
            r[o++] = i),
            e > s + a && (r[o++] = s,
            r[o++] = e),
            o
        }
        sectionsSub(t, e, i) {
            let s = this._tmpSectionsSubCopy
              , n = this._tmpSectionsSubResults
              , r = t.length;
            for (let e = 0, i = r; e !== i; ++e)
                s[e] = t[e];
            t.length = 0;
            for (let a = 0, o = r / 2; a !== o; ++a) {
                let r = this.sectionSub(s[2 * a], s[2 * a + 1], e, i, n);
                for (let e = 0; e < r; ++e)
                    t.push(n[e])
            }
        }
        findClosestTInSections(t, e) {
            let i = e.length;
            if (0 === i)
                return t;
            let s = 0
              , n = !1;
            for (; s < i && t - e[s] >= 0; )
                n = !n,
                s++;
            if (n)
                return t;
            if (0 === s)
                return e[s];
            if (s === i)
                return e[s - 1];
            {
                let i = e[s - 1]
                  , n = e[s];
                return t - i > n - t ? n : i
            }
        }
        findCenterOfLongestInSections(t, e=0) {
            let i = NaN
              , s = t.length / 2;
            if (0 === s)
                return i;
            let n = 0;
            for (let r = 0; r !== s; ++r) {
                let s = t[2 * r]
                  , a = t[2 * r + 1]
                  , o = a - s;
                o - n > e && (n = o,
                i = (s + a) / 2)
            }
            return i
        }
        intersectSphereRay(t, e, i, s, r) {
            const a = n;
            let o = this._tmpSP.subVectors(i, t)
              , l = o.dot(s)
              , h = o.dot(o) - e * e;
            if (h > 0 && l > 0)
                return 0;
            let c = l * l - h;
            if (c < -a)
                return 0;
            if (c > a) {
                let t = Math.sqrt(c)
                  , e = -l - t
                  , i = -l + t;
                return r[0] = e < 0 ? 0 : e,
                r[1] = i < 0 ? 0 : i,
                2
            }
            return r[0] = -l < 0 ? 0 : -l,
            1
        }
        nIntersectSphereRay(t, e, i, s) {
            return this.intersectSphereRay(t, e, i, s, this._tmpResults)
        }
        intersectSphereAB(t, e, i, s, n) {
            let r = this._tmpAB.subVectors(s, i)
              , a = r.length();
            return this.intersectSphereADirLen(t, e, i, r.normalize(), a, n)
        }
        intersectSphereADirLen(t, e, i, s, n, r) {
            let a = this.intersectSphereRay(t, e, i, s, r);
            return 0 === a ? 0 : 1 === a ? r[0] > n ? 0 : 1 : r[0] > n ? 0 : (r[1] > n && (r[1] = n),
            2)
        }
        nIntersectSphereADirLen(t, e, i, s, n) {
            return this.intersectSphereADirLen(t, e, i, s, n, this._tmpResults)
        }
        sectionsBallsAB(t, e, i, s, r, a, o) {
            const l = n;
            let h, c = this._tmpAB.subVectors(r, s), d = c.length(), u = this._tmpResults, _ = this._tmpIndices, p = 0;
            c.normalize(),
            a[0] = 0,
            a[1] = d,
            a.length = 2;
            for (let n = 0, r = t.length; n !== r; ++n)
                if ((h = t[n]) !== e && h.active) {
                    let t = i + h.radius;
                    2 === this.intersectSphereADirLen(h.position, t, s, c, d, u) && u[1] - u[0] > l && (this.sectionsSub(a, u[0], u[1]),
                    _[p++] = h.index)
                }
            if (a.length > 0)
                return !0;
            if (o) {
                let e = this._tmpSP
                  , n = Number.MAX_VALUE;
                for (let r = 0, a = p; r !== a; ++r) {
                    h = t[_[r]],
                    e.subVectors(s, h.position);
                    let a = i + h.radius - e.dot(o);
                    a < n && (n = a)
                }
                a[0] = n
            }
            return !1
        }
    }
    ;
    t.exports = r
}
, function(t, e, i) {
    const s = i(11);
    s.Effect.ShadersStore.pcolDyIBLVertexShader = "#include<__decl__pcolDyIBLVertex>\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n\n#include<instancesDeclaration>\n#ifdef MAINUV1\nvarying vec2 vMainUV1;\n#endif\n#ifdef MAINUV2\nvarying vec2 vMainUV2;\n#endif\n#if defined(DIFFUSE) && DIFFUSEDIRECTUV == 0\nvarying vec2 vDiffuseUV;\n#endif\n#if defined(AO) && AODIRECTUV == 0\nvarying vec2 vAoUV;\n#endif\n#if defined(REFLECTIVITYROUGHNESS) && REFLECTIVITYROUGHNESSDIRECTUV == 0\nvarying vec2 vReflectivityRoughnessUV;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#ifdef USELODFALLOFF\nuniform vec4 vEyePosition;\nvarying float vLodFallOffFactor;\n#endif\n#include<clipPlaneVertexDeclaration>\nvoid main(void) {\n#include<instancesVertex>\ngl_Position=viewProjection*finalWorld*vec4(position,1.0);\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef MAINUV1\nvMainUV1=uv;\n#endif\n#ifdef MAINUV2\nvMainUV2=uv2;\n#endif\n#if defined(DIFFUSE) && DIFFUSEDIRECTUV == 0\nif (vDiffuseInfos.x == 0.){\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv,1.0,0.0));\n}else{\nvDiffuseUV=vec2(diffuseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#if defined(AO) && AODIRECTUV == 0\nif (vAoInfos.x == 0.){\nvAoUV=vec2(aoMatrix*vec4(uv,1.0,0.0));\n}else{\nvAoUV=vec2(aoMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#if defined(REFLECTIVITYROUGHNESS) && REFLECTIVITYROUGHNESSDIRECTUV == 0\nif (vReflectivityRoughnessInfos.x == 0.){\nvReflectivityRoughnessUV=vec2(reflectivityRoughnessMatrix*vec4(uv,1.0,0.0));\n}else{\nvReflectivityRoughnessUV=vec2(reflectivityRoughnessMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#ifdef USELODFALLOFF\nfloat dis=distance(vPositionW,vEyePosition.xyz);\n\nvLodFallOffFactor=clamp( (dis-vLodFallOff.x)/vLodFallOff.y,0.0,1.0);\n#endif\n\n#include<clipPlaneVertex>\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n#include<pointCloudVertex>\n}\n",
    s.Effect.ShadersStore.pcolDyIBLPixelShader = "#ifdef NORMAL\n#extension GL_OES_standard_derivatives : enable\n#endif\n#ifdef LODBASEDMICROSURFACE\n#extension GL_EXT_shader_texture_lod : enable\n#endif\nprecision highp float;\n#include<__decl__pcolDyIBLFragment>\n\nuniform vec4 vEyePosition;\n#if defined(IRRADIANCE) || defined(DYAO)\n\nuniform float vDynamicRatios[9];\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#ifdef MAINUV1\nvarying vec2 vMainUV1;\n#endif\n#ifdef MAINUV2\nvarying vec2 vMainUV2;\n#endif\n#ifdef USELODFALLOFF\nvarying float vLodFallOffFactor;\n#endif\n\n#include<helperFunctions>\n#include<pbrFunctions>\n\n#ifdef DIFFUSE\n#if DIFFUSEDIRECTUV == 1\n#define vDiffuseUV vMainUV1\n#elif DIFFUSEDIRECTUV == 2\n#define vDiffuseUV vMainUV2\n#else\nvarying vec2 vDiffuseUV;\n#endif\nuniform sampler2D diffuseSampler;\n#endif\n#ifdef AO\n#if AODIRECTUV == 10\nuniform samplerCube aoSampler;\n#else\nuniform sampler2D aoSampler;\n#if AODIRECTUV == 1\n#define vAoUV vMainUV1\n#elif AODIRECTUV == 2\n#define vAoUV vMainUV2\n#else\nvarying vec2 vAoUV;\n#endif\n#endif\n#endif\n#define sampleCube(s,c) textureCube(s,c)\n#ifdef LODBASEDMICROSURFACE\n#define sampleCubeLod(s,c,l) textureCubeLodEXT(s,c,l)\n#endif\n\n#ifdef IRRADIANCE\nuniform samplerCube iradSampler0;\nuniform samplerCube iradSampler1;\nuniform samplerCube iradSampler2;\nuniform samplerCube iradSampler3;\nuniform samplerCube iradSampler4;\nuniform samplerCube iradSampler5;\nuniform samplerCube iradSampler6;\nuniform samplerCube iradSampler7;\n#endif\n\n#ifdef RADIANCE\nuniform samplerCube radSampler;\n#endif\n#ifdef ENVIRONMENTBRDF\nuniform sampler2D environmentBrdfSampler;\n#endif\n#ifdef REFLECTIVITYROUGHNESS\n#if REFLECTIVITYROUGHNESSDIRECTUV == 1\n#define vReflectivityRoughnessUV vMainUV1\n#elif REFLECTIVITYROUGHNESSDIRECTUV == 2\n#define vReflectivityRoughnessUV vMainUV2\n#else\nvarying vec2 vReflectivityRoughnessUV;\n#endif\nuniform sampler2D reflectivityRoughnessSampler;\n#endif\n#include<clipPlaneFragmentDeclaration>\n\n\n\n\n\n\nvec3 fresnelSchlickRoughness(float cosTheta,vec3 F0,float roughness){\nreturn F0+(max(vec3(1.0-roughness),F0)-F0)*pow(1.0-cosTheta,5.0);\n}\n\n\nvec3 toneMappingACES( vec3 color) {\nconst float A=2.51;\nconst float B=0.03;\nconst float C=2.43;\nconst float D=0.59;\nconst float E=0.14;\nreturn (color*(A*color+B))/(color*(C*color+D)+E);\n}\nvoid main(void) {\n#include<clipPlaneFragment>\n\nvec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);\n\n\n#ifdef NORMAL\nvec3 normalW=normalize(vNormalW)*-vEyePosition.w;\n#else\n\nvec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*-vEyePosition.w;\n#endif\n\n\nvec3 surfaceAlbedo=vDiffuseColor.rgb;\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSE\nvec4 baseDiffuseTexture=texture2D(diffuseSampler,vDiffuseUV);\n#ifdef ALPHATEST\nalpha*=baseDiffuseTexture.a;\n#endif\nsurfaceAlbedo*=toLinearSpace(baseDiffuseTexture.rgb);\nsurfaceAlbedo*=vDiffuseInfos.y;\n#endif\n\n\n#ifdef VERTEXCOLOR\nsurfaceAlbedo*=vColor.rgb;\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n#endif\n\n\n#ifdef ALPHATEST\nif (alpha<=0.4)discard;\n#endif\n\n\nfloat NdotVUnclamped=dot( normalW,viewDirectionW ); \nfloat NdotV=max(NdotVUnclamped,0.0); \nfloat roughness=vReflectivity.a;\n#ifdef REFLECTIVITYROUGHNESS\nvec4 specularRoughness=texture2D(reflectivityRoughnessSampler,vReflectivityRoughnessUV);\nroughness*=1.0-specularRoughness.a;\nvec3 F0=specularRoughness.rgb;\n#else\nvec3 F0=vReflectivity.rgb;\n#endif\nvec3 F=fresnelSchlickRoughness( NdotV,F0,roughness);\n\n#ifdef RADIANCE\nvec3 radCoords=reflect(-1.*viewDirectionW,normalW);\n#ifdef USEPARALLAXCORRECTION\nvec3 localPos=vPositionW-vAABB[0].xyz;\nvec3 intersect1=(vAABB[2].xyz-localPos)/radCoords;\nvec3 intersect2=(vAABB[1].xyz-localPos)/radCoords;\nvec3 intersect=max(intersect1,intersect2);\nfloat dis=min(min(intersect.x,intersect.y),intersect.z);\n\nintersect=vPositionW+radCoords*dis;\nradCoords=intersect-vAABB[0].xyz;\n#endif\n#ifdef LODBASEDMICROSURFACE\n#ifdef USERADIANCELODROUGHNESS\nfloat radLod=log2(vLightProbeInfos.x*roughness*roughness);\n#else\nfloat radLod=0.0;\n#endif\n#ifdef USELODFALLOFF\nradLod+=vLodFallOffFactor*vLodFallOff.z;\n#endif\nvec3 radiance=sampleCubeLod(radSampler,radCoords,radLod).rgb;\n#else\nvec3 radiance=sampleCube(radSampler,radCoords ).rgb;\n#endif\nradiance*=vLightProbeInfos.y;\n#else\nvec3 radiance=vec3(0.0);\n#endif\n\n\n\n#ifdef IRRADIANCE\nvec3 irradiance=vec3(0.0);\n#ifdef LODBASEDMICROSURFACE\n#ifdef USELODFALLOFF\nfloat lmLOD=vLodFallOffFactor*vLodFallOff.w;\n#else\nfloat lmLOD=0.;\n#endif\n\n\n\n\nirradiance+=sampleCubeLod( iradSampler0,normalW,lmLOD).rgb*vDynamicRatios[0];\nirradiance+=sampleCubeLod( iradSampler1,normalW,lmLOD).rgb*vDynamicRatios[1];\nirradiance+=sampleCubeLod( iradSampler4,normalW,lmLOD).rgb*vDynamicRatios[4];\nirradiance+=sampleCubeLod( iradSampler5,normalW,lmLOD).rgb*vDynamicRatios[5];\nif( vDynamicRatios[2]>=0.) {\nirradiance+=sampleCubeLod( iradSampler2,normalW,lmLOD).rgb*vDynamicRatios[2];\nirradiance+=sampleCubeLod( iradSampler3,normalW,lmLOD).rgb*vDynamicRatios[3];\nirradiance+=sampleCubeLod( iradSampler6,normalW,lmLOD).rgb*vDynamicRatios[6];\nirradiance+=sampleCubeLod( iradSampler7,normalW,lmLOD).rgb*vDynamicRatios[7];\n}\n#else\nirradiance+=sampleCube( iradSampler0,normalW).rgb*vDynamicRatios[0];\nirradiance+=sampleCube( iradSampler1,normalW).rgb*vDynamicRatios[1];\nirradiance+=sampleCube( iradSampler4,normalW).rgb*vDynamicRatios[4];\nirradiance+=sampleCube( iradSampler5,normalW).rgb*vDynamicRatios[5];\nif( vDynamicRatios[2]>=0. ) {\nirradiance+=sampleCube( iradSampler2,normalW).rgb*vDynamicRatios[2];\nirradiance+=sampleCube( iradSampler3,normalW).rgb*vDynamicRatios[3];\nirradiance+=sampleCube( iradSampler6,normalW).rgb*vDynamicRatios[6];\nirradiance+=sampleCube( iradSampler7,normalW).rgb*vDynamicRatios[7];\n}\n#endif\nirradiance=mix( vec3(1.0),irradiance,vLightProbeInfos.z);\n#else\n\nvec3 irradiance=vec3(0.6);\n#endif\n\n\nvec3 brdf=vec3(0.0);\n#ifdef ENVIRONMENTBRDF\nvec2 envBRDF=texture2D( environmentBrdfSampler,vec2(NdotV,roughness) ).xy;\nbrdf=F*envBRDF.x+envBRDF.y;\n#endif\n\n\n#ifdef AO\n#if AODIRECTUV == 10\nfloat ao=textureCube(aoSampler,normalW).r;\n#else\nfloat ao=toLinearSpace( texture2D(aoSampler,vAoUV).rgb).r;\n#endif\n#ifdef DYAO\nao=mix(1.0,ao,vAoInfos.y*vDynamicRatios[8] );\n\n#else\nao=mix(1.0,ao,vAoInfos.y );\n#endif\nbrdf*=environmentRadianceOcclusion(ao,NdotVUnclamped);\n#else\nfloat ao=1.0;\n#endif\n\n\nvec3 diffuse=surfaceAlbedo*irradiance*(1.0-F)*ao;\nvec3 specular=brdf*radiance*ao;\nvec3 final=diffuse+specular;\n\n#if TONEMAPPINGMODE == 3\nfinal=toneMappingACES( final );\n#elif TONEMAPPINGMODE == 2\nconst float tonemappingCalibration=1.590579;\nfinal=1.0-exp2(-tonemappingCalibration*final);\n#elif TONEMAPPINGMODE == 1\nfinal=final/(final+vec3(1.0));\n#endif\n\nfinal=toGammaSpace( final );\ngl_FragColor=vec4( final,alpha );\n\n}\n",
    s.Effect.IncludesShadersStore.pcolDyIBLFragmentDeclaration = "uniform vec4 vDiffuseColor;\n\n#ifdef DIFFUSE\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef AO\nuniform vec2 vAoInfos;\n#endif\n#ifdef REFLECTIVITYROUGHNESS\nuniform vec2 vReflectivityRoughnessInfos;\n#endif\n#ifdef USELODFALLOFF\nuniform vec4 vLodFallOff;\n#endif\nuniform vec4 vLightProbeInfos;\nuniform vec4 vReflectivity;\n#ifdef USEPARALLAXCORRECTION\nuniform mat3 vAABB;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif\n",
    s.Effect.IncludesShadersStore.pcolDyIBLUboDeclaration = "layout(std140,column_major) uniform;\nuniform Material {\nvec4 vDiffuseColor;\nvec2 vDiffuseInfos;\nmat4 diffuseMatrix;\nvec2 vAoInfos;\nmat4 aoMatrix;\nvec2 vReflectivityRoughnessInfos;\nmat4 reflectivityRoughnessMatrix;\nvec4 vLodFallOff;\nvec4 vLightProbeInfos;\nvec4 vReflectivity;\nmat4 vAABB;\nfloat pointSize;\n};\nuniform Scene {\nmat4 viewProjection;\nmat4 view;\n};\n",
    s.Effect.IncludesShadersStore.pcolDyIBLVertexDeclaration = "\nuniform mat4 viewProjection;\nuniform mat4 view;\n#ifdef DIFFUSE\nuniform mat4 diffuseMatrix;\nuniform vec2 vDiffuseInfos;\n#endif\n#ifdef AO\nuniform mat4 aoMatrix;\nuniform vec2 vAoInfos;\n#endif\n#ifdef REFLECTIVITYROUGHNESS\nuniform mat4 reflectivityRoughnessMatrix;\nuniform vec2 vReflectivityRoughnessInfos; \n#endif\n#ifdef USELODFALLOFF\nuniform vec4 vLodFallOff;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif";
    var n, r = this && this.__extends || (n = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        n(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    ), a = this && this.__decorate || function(t, e, i, s) {
        var n, r = arguments.length, a = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(t, e, i, s);
        else
            for (var o = t.length - 1; o >= 0; o--)
                (n = t[o]) && (a = (r < 3 ? n(a) : r > 3 ? n(e, i, a) : n(e, i)) || a);
        return r > 3 && a && Object.defineProperty(e, i, a),
        a
    }
    ;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.MAINUV1 = !1,
                e.MAINUV2 = !1,
                e.DIFFUSE = !1,
                e.DIFFUSEDIRECTUV = 0,
                e.AO = !1,
                e.AODIRECTUV = 0,
                e.DYAO = !1,
                e.REFLECTIVITYROUGHNESS = !1,
                e.REFLECTIVITYROUGHNESSDIRECTUV = 0,
                e.TONEMAPPINGMODE = 0,
                e.RADIANCE = !1,
                e.IRRADIANCE = !1,
                e.USEPARALLAXCORRECTION = !1,
                e.USELODFALLOFF = !1,
                e.USERADIANCELODROUGHNESS = !1,
                e.LODBASEDMICROSURFACE = !1,
                e.ENVIRONMENTBRDF = !1,
                e.CLIPPLANE = !1,
                e.ALPHATEST = !1,
                e.DEPTHPREPASS = !1,
                e.POINTSIZE = !1,
                e.NORMAL = !1,
                e.UV1 = !1,
                e.UV2 = !1,
                e.VERTEXCOLOR = !1,
                e.VERTEXALPHA = !1,
                e.INSTANCES = !1,
                e.PBR = !0,
                e.USEPHYSICALLIGHTFALLOFF = !0,
                e.rebuild(),
                e
            }
            return r(e, t),
            e.prototype.reset = function() {
                t.prototype.reset.call(this),
                this.PBR = !0,
                this.USEPHYSICALLIGHTFALLOFF = !0
            }
            ,
            e
        }(t.MaterialDefines)
          , i = function(i) {
            function s(e, s, n) {
                void 0 === n && (n = null);
                var r = i.call(this, e, s) || this;
                return r._environmentBRDFTexture = null,
                r._diffuseColor = new t.Color3(1,1,1),
                r._lastBindedLPGroupId = -1,
                r._lightProbeManager = null,
                r._reflectivityColor = new t.Color3(.04,.04,.04),
                r._roughness = 0,
                r.radianceLevel = 1,
                r.irradianceLevel = 1,
                r._toneMappingMode = 1,
                r.useRadianceLodRoughness = !1,
                r.lodFallOffFactor = {
                    near: 0,
                    farSubNear: 0,
                    radMax: 0,
                    iradMax: 0
                },
                r._lightProbeManager = n,
                r._environmentBRDFTexture = t.TextureTools.GetEnvironmentBRDFTexture(s),
                r
            }
            return r(s, i),
            s.prototype.setLodFallOff = function(t, e, i, s) {
                this.lodFallOffFactor.near = t,
                this.lodFallOffFactor.farSubNear = e - t,
                this.lodFallOffFactor.radMax = i,
                this.lodFallOffFactor.iradMax = s
            }
            ,
            s.prototype.getClassName = function() {
                return "PcolDyIBLMaterial"
            }
            ,
            s.prototype.needAlphaBlending = function() {
                return !1
            }
            ,
            s.prototype.needAlphaTesting = function() {
                return !1
            }
            ,
            s.prototype.getAlphaTestTexture = function() {
                return null
            }
            ,
            s.prototype.isReadyForSubMesh = function(i, s, n) {
                if (s.effect && this.isFrozen && this._wasPreviouslyReady)
                    return !0;
                s._materialDefines || (s._materialDefines = new e);
                var r = this.getScene()
                  , a = s._materialDefines;
                if (!this.checkReadyOnEveryCall && s.effect && a._renderId === r.getRenderId())
                    return !0;
                var o = this._lightProbeManager
                  , l = r.getEngine();
                if (a._needNormals = !0,
                a._areTexturesDirty) {
                    if (a._needUVs = !1,
                    a.MAINUV1 = !1,
                    a.MAINUV2 = !1,
                    r.texturesEnabled) {
                        if (o) {
                            if (!o.isReady())
                                return !1;
                            o.radianceMap ? (a.RADIANCE = !0,
                            a.USERADIANCELODROUGHNESS = this.useRadianceLodRoughness) : (a.RADIANCE = !1,
                            a.USERADIANCELODROUGHNESS = !1),
                            a.IRRADIANCE = o.hasGroup(),
                            a.USEPARALLAXCORRECTION = !!o.aabb,
                            a.USELODFALLOFF = this.lodFallOffFactor.farSubNear > 0
                        } else
                            a.RADIANCE = !1,
                            a.USERADIANCELODROUGHNESS = !1,
                            a.IRRADIANCE = !1,
                            a.USEPARALLAXCORRECTION = !1,
                            a.USELODFALLOFF = !1;
                        if (r.getEngine().getCaps().textureLOD && (a.LODBASEDMICROSURFACE = !0),
                        this._diffuseTexture) {
                            if (!this._diffuseTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._diffuseTexture, a, "DIFFUSE")
                        } else
                            a.DIFFUSE = !1;
                        if (this._aoTexture) {
                            if (!this._aoTexture.isReadyOrNotBlocking())
                                return !1;
                            a.AO = !0,
                            this._aoTexture.isCube ? a.AODIRECTUV = 10 : t.MaterialHelper.PrepareDefinesForMergedUV(this._aoTexture, a, "AO"),
                            a.DYAO = !!(o && o.aabb && o.aabb.useDyao)
                        } else
                            a.AO = !1,
                            a.AODIRECTUV = 0,
                            a.DYAO = !1;
                        if (this._reflectivityRoughnessTexture) {
                            if (!this._reflectivityRoughnessTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._reflectivityRoughnessTexture, a, "REFLECTIVITYROUGHNESS")
                        } else
                            a.REFLECTIVITYROUGHNESS = !1;
                        if (this._environmentBRDFTexture) {
                            if (!this._environmentBRDFTexture.isReady())
                                return !1;
                            a.ENVIRONMENTBRDF = !0
                        } else
                            a.ENVIRONMENTBRDF = !1
                    } else
                        a.LODBASEDMICROSURFACE = !1,
                        a.DIFFUSE = !1,
                        a.AO = !1,
                        a.DYAO = !1,
                        a.REFLECTIVITYROUGHNESS = !1,
                        a.RADIANCE = !1,
                        a.USERADIANCELODROUGHNESS = !1,
                        a.IRRADIANCE = !1,
                        a.USEPARALLAXCORRECTION = !1,
                        a.USELODFALLOFF = !1,
                        a.ENVIRONMENTBRDF = !1;
                    a.TONEMAPPINGMODE = this._toneMappingMode
                }
                if (a._areMiscDirty && (a.POINTSIZE = this.pointsCloud || r.forcePointsCloud),
                t.MaterialHelper.PrepareDefinesForAttributes(i, a, !0, !1, !1) && i && (l.getCaps().standardDerivatives || i.isVerticesDataPresent(t.VertexBuffer.NormalKind) || i.createNormals(!0)),
                t.MaterialHelper.PrepareDefinesForFrameBoundValues(r, l, a, !!n),
                a.isDirty) {
                    a.markAsProcessed(),
                    r.resetCachedMaterial();
                    var h = new t.EffectFallbacks
                      , c = [t.VertexBuffer.PositionKind];
                    a.NORMAL && c.push(t.VertexBuffer.NormalKind),
                    a.UV1 && c.push(t.VertexBuffer.UVKind),
                    a.UV2 && c.push(t.VertexBuffer.UV2Kind),
                    a.VERTEXCOLOR && c.push(t.VertexBuffer.ColorKind),
                    t.MaterialHelper.PrepareAttributesForInstances(c, a);
                    for (var d = [{
                        name: "vDiffuseColor",
                        len: 4
                    }, {
                        name: "vDiffuseInfos",
                        len: 2
                    }, {
                        name: "diffuseMatrix",
                        len: 16
                    }, {
                        name: "vAoInfos",
                        len: 2
                    }, {
                        name: "aoMatrix",
                        len: 16
                    }, {
                        name: "vReflectivityRoughnessInfos",
                        len: 2
                    }, {
                        name: "reflectivityRoughnessMatrix",
                        len: 16
                    }, {
                        name: "vLodFallOff",
                        len: 4
                    }, {
                        name: "vLightProbeInfos",
                        len: 4
                    }, {
                        name: "vReflectivity",
                        len: 4
                    }, {
                        name: "vAABB",
                        len: 16
                    }, {
                        name: "pointSize",
                        len: 1
                    }], u = ["world", "view", "viewProjection", "vEyePosition", "vFogInfos", "vFogColor", "vClipPlane", "vDynamicRatios"], _ = ["diffuseSampler", "aoSampler", "radSampler", "iradSampler0", "iradSampler1", "iradSampler2", "iradSampler3", "iradSampler4", "iradSampler5", "iradSampler6", "iradSampler7", "reflectivityRoughnessSampler", "environmentBrdfSampler"], p = 0, f = d.length; p !== f; ++p)
                        u.push(d[p].name);
                    var g = ["Material", "Scene"];
                    t.MaterialHelper.PrepareUniformsAndSamplersList({
                        uniformsNames: u,
                        uniformBuffersNames: g,
                        samplers: _,
                        defines: a
                    }),
                    s.setEffect(r.getEngine().createEffect("pcolDyIBL", {
                        attributes: c,
                        uniformsNames: u,
                        uniformBuffersNames: g,
                        samplers: _,
                        defines: a.toString(),
                        fallbacks: h,
                        onCompiled: this.onCompiled,
                        onError: this.onError
                    }, l), a),
                    this.buildUniformLayout(d),
                    o && o.watchMesh(i)
                }
                return !(!s.effect || !s.effect.isReady()) && (a._renderId = r.getRenderId(),
                this._wasPreviouslyReady = !0,
                !0)
            }
            ,
            s.prototype.buildUniformLayout = function(t) {
                for (var e = 0, i = t.length; e !== i; ++e)
                    this._uniformBuffer.addUniform(t[e].name, t[e].len);
                this._uniformBuffer.create()
            }
            ,
            s.prototype.bindForSubMesh = function(e, i, s) {
                var n = this.getScene();
                if (s._materialDefines) {
                    var r = s.effect;
                    if (r) {
                        this._activeEffect = r,
                        this.bindOnlyWorldMatrix(e);
                        var a = this._mustRebind(n, r, i.visibility)
                          , o = this._lightProbeManager;
                        if (a) {
                            this._uniformBuffer.bindToEffect(r, "Material"),
                            this.bindViewProjection(r),
                            this._uniformBuffer.useUbo && this.isFrozen && this._uniformBuffer.isSync || (n.texturesEnabled && (this._diffuseTexture && (this._uniformBuffer.updateFloat2("vDiffuseInfos", this._diffuseTexture.coordinatesIndex, this._diffuseTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._diffuseTexture, this._uniformBuffer, "diffuse")),
                            this._aoTexture && (this._uniformBuffer.updateFloat2("vAoInfos", this._aoTexture.coordinatesIndex, this._aoTexture.level),
                            this._aoTexture.isCube || t.MaterialHelper.BindTextureMatrix(this._aoTexture, this._uniformBuffer, "ao")),
                            this._reflectivityRoughnessTexture && (this._uniformBuffer.updateFloat2("vReflectivityRoughnessInfos", this._reflectivityRoughnessTexture.coordinatesIndex, this._reflectivityRoughnessTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._reflectivityRoughnessTexture, this._uniformBuffer, "reflectivityRoughness")),
                            this._uniformBuffer.updateFloat4("vReflectivity", this._reflectivityColor.r, this._reflectivityColor.g, this._reflectivityColor.b, this._roughness),
                            o && (o.radianceMap ? this._uniformBuffer.updateFloat4("vLightProbeInfos", o.radianceMap.getSize().width, o.radianceLevel * this.radianceLevel, o.irradianceLevel * this.irradianceLevel, 0) : this._uniformBuffer.updateFloat4("vLightProbeInfos", 0, o.radianceLevel * this.radianceLevel, o.irradianceLevel * this.irradianceLevel, 0),
                            o.aabb && this._uniformBuffer.updateMatrix3x3("vAABB", o.aabb.array))),
                            this.lodFallOffFactor.farSubNear > 0 && this._uniformBuffer.updateFloat4("vLodFallOff", this.lodFallOffFactor.near, this.lodFallOffFactor.farSubNear, this.lodFallOffFactor.radMax, this.lodFallOffFactor.iradMax),
                            this.pointsCloud && this._uniformBuffer.updateFloat("pointSize", this.pointSize),
                            this._uniformBuffer.updateColor4("vDiffuseColor", this._diffuseColor, this.alpha * i.visibility)),
                            n.texturesEnabled && (this._diffuseTexture && t.StandardMaterial.DiffuseTextureEnabled && r.setTexture("diffuseSampler", this._diffuseTexture),
                            this._aoTexture && r.setTexture("aoSampler", this._aoTexture),
                            this._reflectivityRoughnessTexture && r.setTexture("reflectivityRoughnessSampler", this._reflectivityRoughnessTexture),
                            o && o.radianceMap && r.setTexture("radSampler", o.radianceMap),
                            this._environmentBRDFTexture && r.setTexture("environmentBrdfSampler", this._environmentBRDFTexture)),
                            t.MaterialHelper.BindClipPlane(r, n);
                            var l = n._forcedViewPosition ? n._forcedViewPosition : n._mirroredCameraPosition ? n._mirroredCameraPosition : n.activeCamera.globalPosition
                              , h = n.useRightHandedSystem === (null != n._mirroredCameraPosition);
                            r.setFloat4("vEyePosition", l.x, l.y, l.z, h ? -1 : 1)
                        }
                        if (o) {
                            var c = o.getIBLData(i.uniqueId)
                              , d = o.hasGroup()
                              , u = d || o.aabb && o.aabb.useDyao;
                            if (c.isDirty && o.updateDynamicRatios(i, c),
                            d && (a || c.groupId !== this._lastBindedLPGroupId)) {
                                this._lastBindedLPGroupId = c.groupId;
                                var _ = o.getGroup(c.groupId).probes;
                                r.setTexture("iradSampler0", _[0].texture),
                                r.setTexture("iradSampler1", _[1].texture),
                                r.setTexture("iradSampler4", _[4].texture),
                                r.setTexture("iradSampler5", _[5].texture),
                                r.setTexture("iradSampler2", _[2].texture),
                                r.setTexture("iradSampler3", _[3].texture),
                                r.setTexture("iradSampler6", _[6].texture),
                                r.setTexture("iradSampler7", _[7].texture)
                            }
                            u && r.setArray("vDynamicRatios", c.dynamicRatios)
                        }
                        this._uniformBuffer.update(),
                        this._afterBind(i, this._activeEffect)
                    }
                }
            }
            ,
            s.prototype.getAnimatables = function() {
                var t = [];
                return this._diffuseTexture && this._diffuseTexture.animations && this._diffuseTexture.animations.length > 0 && t.push(this._diffuseTexture),
                this._aoTexture && this._aoTexture.animations && this._aoTexture.animations.length > 0 && t.push(this._aoTexture),
                this._reflectivityRoughnessTexture && this._reflectivityRoughnessTexture.animations && this._reflectivityRoughnessTexture.animations.length > 0 && t.push(this._reflectivityRoughnessTexture),
                t
            }
            ,
            s.prototype.getActiveTextures = function() {
                var t = i.prototype.getActiveTextures.call(this);
                return this._diffuseTexture && t.push(this._diffuseTexture),
                this._aoTexture && t.push(this._aoTexture),
                this._reflectivityRoughnessTexture && t.push(this._reflectivityRoughnessTexture),
                t
            }
            ,
            s.prototype.hasTexture = function(t) {
                return !!i.prototype.hasTexture.call(this, t) || (this._diffuseTexture === t || (this._aoTexture === t || this._reflectivityRoughnessTexture === t))
            }
            ,
            s.prototype.dispose = function(t, e) {
                e && (this._diffuseTexture && this._diffuseTexture.dispose(),
                this._aoTexture && this._aoTexture.dispose(),
                this._reflectivityRoughnessTexture && this._reflectivityRoughnessTexture.dispose(),
                this._environmentBRDFTexture && this.getScene()._environmentBRDFTexture !== this._environmentBRDFTexture && this._environmentBRDFTexture.dispose()),
                this._lightProbeManager = null,
                i.prototype.dispose.call(this, t, e)
            }
            ,
            s.prototype.clone = function(t) {
                throw new Error("PcolDyIBLMaterial no clone implemented")
            }
            ,
            a([t.serializeAsTexture("diffuseTexture")], s.prototype, "_diffuseTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "diffuseTexture", void 0),
            a([t.serializeAsTexture("aoTexture")], s.prototype, "_aoTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "aoTexture", void 0),
            a([t.serializeAsTexture("reflectivityRoughnessTexture")], s.prototype, "_reflectivityRoughnessTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "reflectivityRoughnessTexture", void 0),
            a([t.serializeAsColor3("diffuseColor")], s.prototype, "_diffuseColor", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "diffuseColor", void 0),
            a([t.serializeAsColor3("reflectivity")], s.prototype, "_reflectivityColor", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "reflectivityColor", void 0),
            a([t.serialize("roughness")], s.prototype, "_roughness", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "roughness", void 0),
            a([t.serialize("toneMappingMode")], s.prototype, "_toneMappingMode", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "toneMappingMode", void 0),
            s
        }(t.PushMaterial);
        t.PcolDyIBLMaterial = i
    }(s || (s = {}));
    r = this && this.__extends || function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        ;
        return function(e, i) {
            function s() {
                this.constructor = e
            }
            t(e, i),
            e.prototype = null === i ? Object.create(i) : (s.prototype = i.prototype,
            new s)
        }
    }();
    !function(t) {
        var e = function(e) {
            function i(i, s, n, r) {
                void 0 === r && (r = 0);
                var a = e.call(this, i) || this;
                return a.coordinatesMode = t.Texture.CUBIC_MODE,
                a.isGC = !1,
                a.hasAlpha = !1,
                a.isCube = !0,
                a.gammaSpace = !1,
                a.lodGenerationScale = 1,
                a.name = s,
                a.url = n,
                a.dataIndex = r,
                a.__initInternalTexture(),
                a
            }
            return r(i, e),
            i.prototype.__initInternalTexture = function() {
                var e = this.getScene();
                if (e) {
                    var i = t.PcolCubeMapDataManager.getInstance().getData(e, this.url, this.dataIndex);
                    if (i) {
                        var s = e.getEngine();
                        this._texture = s.createRawCubeTexture(i.getFaceArray(), i.fsize, t.Engine.TEXTUREFORMAT_RGB, s.getCaps().textureFloat ? t.Engine.TEXTURETYPE_FLOAT : t.Engine.TEXTURETYPE_UNSIGNED_INT, !0, !1, t.Texture.TRILINEAR_SAMPLINGMODE),
                        this._texture.isReady = !0
                    }
                }
            }
            ,
            i.prototype.isReady = function() {
                return this._texture || this.__initInternalTexture(),
                e.prototype.isReady.call(this)
            }
            ,
            i.prototype.clone = function() {
                throw new Error("PcolHdrCubeTexture no clone implemented")
            }
            ,
            i.prototype.dispose = function() {
                this.isGC || (this.isGC = !0,
                e.prototype.dispose.call(this))
            }
            ,
            i
        }(t.BaseTexture);
        t.PcolHdrCubeTexture = e
    }(s || (s = {})),
    function(t) {
        var e = function() {
            function t(t) {
                this._faceDatas = [],
                this.fsize = t;
                for (var e = 0; e < 6; ++e)
                    this._faceDatas[e] = new Float32Array(t * t * 3)
            }
            return t.prototype.getFaceData = function(t) {
                return this._faceDatas[t]
            }
            ,
            t.prototype.getFaceArray = function() {
                return this._faceDatas
            }
            ,
            t
        }();
        t.PcolCubeMapData = e;
        var i = function() {
            function i() {
                if (this._cachedDatas = {},
                this._pendingDatas = {},
                i._sharedInstance)
                    throw new Error("PcolCubeMapDataManager should be singleton")
            }
            return i.tmpCanvas = function() {
                return i._tmpCanvas || (i._tmpCanvas = document.createElement("canvas")),
                i._tmpCanvas
            }
            ,
            i.getInstance = function() {
                return i._sharedInstance || (i._sharedInstance = new i),
                i._sharedInstance
            }
            ,
            i.prototype.getData = function(t, e, i, s) {
                void 0 === i && (i = 0),
                void 0 === s && (s = !1);
                var n = this._cachedDatas[e];
                return n ? ((i >= n.length || i < 0) && (i = 0),
                n[i]) : (s || this._pendingDatas[e] || this.__loadAndCache(t, e),
                null)
            }
            ,
            i.prototype.getDataLen = function(t) {
                var e = this._cachedDatas[t];
                return e ? e.length : 0
            }
            ,
            i.prototype.clear = function() {
                this._cachedDatas = {},
                this._pendingDatas = {}
            }
            ,
            i.prototype.__loadAndCache = function(e, i) {
                this._pendingDatas[i] = !0;
                var s = this;
                /\.hdr$/.test(i) ? t.Tools.LoadFile(i, function(t) {
                    s._pendingDatas[i] && s.__parseAndCacheHdrData(t, i)
                }, void 0, e.database, !0, void 0) : t.Tools.LoadImage(i, function(t) {
                    s._pendingDatas[i] && s.__parseAndCacheLdrData(t, i)
                }, function(t, e) {
                    if (t)
                        throw new Error(t);
                    if (e)
                        throw e
                }, e.database)
            }
            ,
            i.prototype.__parseAndSaveCubeMapDatas = function(t, i, s, n, r, a, o) {
                var l = n / 6
                  , h = s / l;
                if (h < 1 || h !== Math.floor(h) || l !== Math.floor(l))
                    throw new Error("data size error: " + t);
                for (var c = [], d = 0, u = h; d < u; ++d) {
                    for (var _ = new e(l), p = 0; p < 6; ++p)
                        for (var f = _.getFaceData(p), g = 0; g < l; ++g)
                            for (var m = g * l, y = (g + l * p) * s + d * l, v = 0; v < l; ++v) {
                                var b = m + v
                                  , x = y + v;
                                f[3 * b] = Math.pow(i[r * x] / a, o),
                                f[3 * b + 1] = Math.pow(i[r * x + 1] / a, o),
                                f[3 * b + 2] = Math.pow(i[r * x + 2] / a, o)
                            }
                    c[d] = _
                }
                this._cachedDatas[t] = c,
                this._pendingDatas[t] = !1
            }
            ,
            i.prototype.__parseAndCacheHdrData = function(e, i) {
                var s = new Uint8Array(e)
                  , n = t.HDRTools.RGBE_ReadHeader(s)
                  , r = t.HDRTools.RGBE_ReadPixels(s, n);
                this.__parseAndSaveCubeMapDatas(i, r, n.width, n.height, 3, 1, 1)
            }
            ,
            i.prototype.__parseAndCacheLdrData = function(t, e) {
                var s = t.width
                  , n = t.height
                  , r = i.tmpCanvas();
                r.width = s,
                r.height = n;
                var a = r.getContext("2d");
                if (!a)
                    throw new Error("No canvas2D support");
                a.clearRect(0, 0, s, n),
                a.drawImage(t, 0, 0),
                this.__parseAndSaveCubeMapDatas(e, a.getImageData(0, 0, s, n).data, s, n, 4, 255, 2.2)
            }
            ,
            i
        }();
        t.PcolCubeMapDataManager = i
    }(s || (s = {}));
    r = this && this.__extends || function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        ;
        return function(e, i) {
            function s() {
                this.constructor = e
            }
            t(e, i),
            e.prototype = null === i ? Object.create(i) : (s.prototype = i.prototype,
            new s)
        }
    }();
    !function(t) {
        var e = function(t) {
            function e(e, i, s, n) {
                void 0 === n && (n = null);
                var r = t.call(this, e, i, s) || this;
                return r.texture = n,
                r
            }
            return r(e, t),
            e.prototype.dispose = function() {
                this.texture && (this.texture.dispose(),
                this.texture = null)
            }
            ,
            e
        }(t.Vector3);
        t.PcolLightProbe = e
    }(s || (s = {})),
    function(t) {
        var e = function() {
            function e(i, s) {
                if (this.left = null,
                this.right = null,
                this.front = null,
                this.back = null,
                this.size = new t.Vector3(0,0,0),
                this.id = i,
                this.probes = s,
                this.size.copyFromFloats(s[1].x - s[0].x, s[3].y - s[0].y, s[4].z - s[0].z),
                !e.validate(this))
                    throw console.error("Invalid cube: id " + i),
                    this.log(),
                    new Error("Invalid cube: id " + i)
            }
            return e.prototype.release = function() {
                this.probes.length = 0,
                this.left = null,
                this.right = null,
                this.front = null,
                this.back = null
            }
            ,
            e.prototype.log = function(t) {
                void 0 === t && (t = null);
                var e, i, s = "", n = this.probes;
                if (n) {
                    if (t)
                        for (e = 0,
                        i = t.length; e !== i; ++e) {
                            var r = t[e];
                            s += r + ": " + n[r].x + "|" + n[r].y + "|" + n[r].z + "\n"
                        }
                    else
                        for (e = 0,
                        i = n.length; e !== i; ++e)
                            s += e + ": " + n[e].x + "|" + n[e].y + "|" + n[e].z + "\n";
                    console.log(s + "\nsize: {" + this.size.x + "," + this.size.y + "," + this.size.z + "}")
                } else
                    console.log("NO probes...")
            }
            ,
            e.validate = function(t) {
                var e = t.probes
                  , i = 1e-6
                  , s = t.size;
                return !!e && (!(s.x < i || Math.abs(e[2].x - e[3].x - s.x) > i || Math.abs(e[6].x - e[7].x - s.x) > i || Math.abs(e[5].x - e[4].x - s.x) > i) && (!(s.y < i || Math.abs(e[2].y - e[1].y - s.y) > i || Math.abs(e[6].y - e[5].y - s.y) > i || Math.abs(e[7].y - e[4].y - s.y) > i) && !(s.z < i || Math.abs(e[5].z - e[1].z - s.z) > i || Math.abs(e[6].z - e[2].z - s.z) > i || Math.abs(e[7].z - e[3].z - s.z) > i)))
            }
            ,
            e
        }();
        t.PcolLightProbeGroupCube = e
    }(s || (s = {})),
    function(t) {
        var e = function() {
            return function(t, e, i) {
                this.array = new Float32Array(9),
                this.useDyao = !1,
                this.aoCenter = 1,
                this.aoOffset = 0,
                this.aoRangeY = 0,
                this.aoRangeXZSq = 0;
                var s = this.array;
                s[0] = t[0],
                s[1] = t[1],
                s[2] = t[2],
                s[3] = e[0] - t[0],
                s[4] = e[1] - t[1],
                s[5] = e[2] - t[2],
                s[6] = i[0] - t[0],
                s[7] = i[1] - t[1],
                s[8] = i[2] - t[2],
                this.aoRangeY = s[7];
                var n = .5 * (i[0] - e[0])
                  , r = .5 * (i[2] - e[2]);
                this.aoRangeXZSq = n * n + r * r
            }
        }();
        t.PcolLightProbeAABB = e;
        var i = function() {
            function i(i, s, n, r) {
                var a = this;
                this._isReady = !1,
                this.radianceLevel = 1,
                this.radianceMap = null,
                this.irradianceLevel = 1,
                this._probes = [],
                this._groups = [],
                this._cachedIBLDatas = Object.create(null),
                this.aabb = null,
                this._id = r.id,
                this._onMeshTransformDirty = function(t) {
                    a.getIBLData(t.uniqueId).isDirty = !0
                }
                ,
                this._onMeshDisposed = function(t) {
                    a.deleteIBLData(t.uniqueId)
                }
                ,
                s && s.length ? this.radianceMap = new t.PcolHdrCubeTexture(i,this._id + "-r",s) : this.radianceMap = null,
                r.aabbPosition && r.aabbSizeMin && r.aabbSizeMax ? (this.aabb = new e(r.aabbPosition,r.aabbSizeMin,r.aabbSizeMax),
                r.aabbAO && (this.aabb.aoCenter = r.aabbAO[0],
                this.aabb.aoOffset = r.aabbAO[1] - r.aabbAO[0],
                this.aabb.aoRangeY = r.aabbAO[2],
                this.aabb.useDyao = !0)) : this.aabb = null;
                var o, l = r.lpx, h = r.lpy, c = r.lpz;
                if (l && 0 !== l.length && h && c && 0 !== c.length && n && 0 !== n.length) {
                    if (2 !== h.length)
                        throw new Error("Invalid config: Length of py not 2");
                    for (var d = this._probes, u = this._groups, _ = 0, p = h.length; _ !== p; ++_)
                        for (var f = n[_], g = 0, m = 0, y = c.length; m !== y; ++m)
                            for (var v = 0, b = l.length; v !== b; ++v)
                                o = new t.PcolHdrCubeTexture(i,this._id + "-i" + g,f,g++),
                                d.push(new t.PcolLightProbe(l[v],h[_],c[m],o));
                    for (var x, S, C, I, T, A = l.length - 1, E = c.length - 1, w = l.length * c.length, R = A * E, k = 0, P = R; k !== P; ++k)
                        I = (C = (S = (x = k + Math.floor(k / A)) + 1) + A) + 1,
                        T = new t.PcolLightProbeGroupCube(k,[d[x], d[S], d[S + w], d[x + w], d[C], d[I], d[I + w], d[C + w]]),
                        u.push(T);
                    for (k = 0,
                    P = R; k !== P; ++k)
                        (T = u[k]).right = k - A >= 0 ? u[k - A] : null,
                        T.front = k % A < A - 1 ? u[k + 1] : null,
                        T.left = k + A < R ? u[k + A] : null,
                        T.back = k % A > 0 ? u[k - 1] : null
                } else
                    this._probes.length = 0,
                    this._groups.length = 0
            }
            return Object.defineProperty(i.prototype, "id", {
                get: function() {
                    return this._id
                },
                enumerable: !0,
                configurable: !0
            }),
            i.prototype.hasGroup = function() {
                return this._groups.length > 0
            }
            ,
            i.prototype.getGroup = function(t) {
                return this._groups[t]
            }
            ,
            i.prototype.isReady = function() {
                if (!this._isReady) {
                    if (this.radianceMap && !this.radianceMap.isReadyOrNotBlocking())
                        return !1;
                    for (var t = this._probes, e = 0, i = t.length; e !== i; ++e) {
                        var s = t[e].texture;
                        if (s && !s.isReadyOrNotBlocking())
                            return !1
                    }
                    this._isReady = !0
                }
                return this._isReady
            }
            ,
            i.prototype.dispose = function() {
                this._isReady = !1;
                for (var t = 0, e = this._groups.length; t !== e; ++t)
                    this._groups[t].release();
                for (t = 0,
                e = this._probes.length; t !== e; ++t)
                    this._probes[t].dispose();
                this._groups.length = 0,
                this._probes.length = 0,
                this.radianceMap && (this.radianceMap.dispose(),
                this.radianceMap = null),
                this._cachedIBLDatas = Object.create(null)
            }
            ,
            i.prototype.watchMesh = function(t) {
                this.getIBLData(t.uniqueId, !0) || (this.getIBLData(t.uniqueId),
                t.registerAfterWorldMatrixUpdate(this._onMeshTransformDirty),
                t.onDispose = this._onMeshDisposed)
            }
            ,
            i.prototype.getIBLData = function(e, i) {
                void 0 === i && (i = !1);
                var s = e + ""
                  , n = this._cachedIBLDatas[s];
                return n || i || (n = new t.PcolIBLMeshData,
                this._cachedIBLDatas[s] = n),
                n
            }
            ,
            i.prototype.deleteIBLData = function(t) {
                var e = t + "";
                this._cachedIBLDatas[e] && delete this._cachedIBLDatas[e]
            }
            ,
            i.prototype.updateDynamicRatios = function(t, e) {
                e.isDirty = !1;
                var i, s, n = e.dynamicRatios, r = t.position, a = 0;
                if (this._groups.length > 0) {
                    var o, l, h, c = 1e-5, d = -1 !== e.groupId ? this._groups[e.groupId] : this._groups[0];
                    if (i = r.x - d.probes[0].x,
                    s = r.z - d.probes[0].z,
                    i < -c)
                        for (; d.back && (d = d.back,
                        !((i = r.x - d.probes[0].x) >= -c)); )
                            ;
                    else
                        for (; i > d.size.x + c && d.front; )
                            d = d.front,
                            i = r.x - d.probes[0].x;
                    if (s < -c)
                        for (; d.right && (d = d.right,
                        !((s = r.z - d.probes[0].z) >= -c)); )
                            ;
                    else
                        for (; s > d.size.z + c && d.left; )
                            d = d.left,
                            s = r.z - d.probes[0].z;
                    e.groupId = d.id,
                    i /= d.size.x,
                    a = (r.y - d.probes[0].y) / d.size.y,
                    s /= d.size.z,
                    i < c ? i = 0 : i > 1 - c && (i = 1),
                    a < c ? a = 0 : a > 1 - c && (a = 1),
                    s < c ? s = 0 : s > 1 - c && (s = 1),
                    o = 1 - i,
                    l = 1 - a,
                    h = 1 - s,
                    n[0] = o * l * h,
                    n[1] = i * l * h,
                    n[4] = o * l * s,
                    n[5] = i * l * s,
                    a > c ? (n[2] = i * a * h,
                    n[3] = o * a * h,
                    n[6] = i * a * s,
                    n[7] = o * a * s) : n[2] = -1
                }
                var u = this.aabb;
                if (u && u.useDyao) {
                    var _ = void 0;
                    (a = Math.max(0, r.y - u.array[1])) < u.aoRangeY ? (n[8] = 1 - a / u.aoRangeY,
                    _ = (i = r.x - u.array[0]) * i + (s = r.z - u.array[2]) * s,
                    n[8] *= u.aoCenter + u.aoOffset * Math.min(1, _ / u.aoRangeXZSq)) : n[8] = 0
                } else
                    n[8] = 1
            }
            ,
            i
        }();
        t.PcolLightProbeManager = i
    }(s || (s = {})),
    function(t) {
        var e = function() {
            return function() {
                this.groupId = -1,
                this.dynamicRatios = new Float32Array(9),
                this.isDirty = !1,
                this.isDirty = !0
            }
        }();
        t.PcolIBLMeshData = e
    }(s || (s = {}))
}
, function(t, e, i) {
    "use strict";
    const s = i(20)
      , n = i(12)
      , r = i(16).tPrecision
      , a = n.EPSILON
      , o = new n
      , l = new n
      , h = new n
      , c = new n
      , d = new n
      , u = new n
      , _ = new n
      , p = new n;
    var f, g, m = [];
    t.exports = {
        initIslands: function(t, e, i, s, n) {
            for (var r, a, o, l = e.groups, h = 0, c = t.length; h !== c; ++h)
                if ((r = t[h]).active) {
                    o = s.acquire();
                    for (var d = h + 1, u = c; d < u; ++d)
                        (a = t[d]).active && (o.resetWithBiBj(r, a),
                        this.dcdSS(o) && (i.add(o),
                        o.startResting(),
                        o.impulseTransformDirty && o.updateImpulseTransform(),
                        o = s.acquire()));
                    o.free(),
                    o = n.acquire();
                    for (d = 0,
                    u = l.length; d !== u; ++d)
                        for (var _ = l[d].polys, p = 0, f = _.length; p !== f; ++p)
                            o.resetWithBiBj(r, _[p]),
                            this.dcdSP(o) && (i.add(o),
                            o.startResting(),
                            o.impulseTransformDirty && o.updateImpulseTransform(),
                            o = n.acquire());
                    o.free()
                }
        },
        updateIslands: function(t, e) {
            var i, n = t.entry;
            if (s.startTick("island_update"),
            e)
                for (; n; )
                    i = n.next,
                    this.updateIsland(n, t),
                    n = i;
            else
                for (; n; )
                    i = n.next,
                    n.needsUpdate && this.updateIsland(n, t),
                    n = i;
            s.stopTick("island_update")
        },
        updateIsland: function(t, e) {
            var i = t.itemEntry
              , s = m;
            for (t.needsUpdate = !1; i; )
                i.markedAsKilled ? s.push(i) : i.needsUpdateResting() && (i.isSS ? this.dcdSS(i) || (i.bi.predictionDirty = !0,
                i.bj.predictionDirty = !0,
                s.push(i)) : this.dcdSP(i) || (i.bi.predictionDirty = !0,
                s.push(i))),
                i = i.next;
            if (0 !== s.length) {
                for (var n = 0, r = s.length; n !== r; ++n)
                    (i = s[n]).stopResting(),
                    e.remove(i, !0);
                s.length = 0
            }
        },
        updateSSToi: function(t, e, i, s, n, r, a) {
            for (var o, l = i.acquire(), h = t.uid, c = 0, d = e.length; c !== d; ++c)
                !(o = e[c]).active || o == t || t.collisionGroup & o.collisionMask || o.collisionGroup & t.collisionMask || -1 !== n.indexOf(o.uid) || s.isResting(h, o.uid) || this.ccdSS(t, o, r, l) && (a.add(l),
                l = i.acquire());
            l.free()
        },
        updateSPToi: function(t, e, i, s, n) {
            for (var a = e.groups, o = m, l = Number.MAX_VALUE, h = 0, c = null, d = 0, u = a.length; d !== u; ++d)
                (h = this.dSPB(t, a[d], i, s, l, o)) < l && (l = h);
            var _ = o.length;
            if (0 !== _) {
                if (l !== Number.MAX_VALUE) {
                    l += r;
                    for (var p = 0; p != _; ++p)
                        (c = o[p]).toi <= l ? n.add(c) : c.free()
                } else {
                    p = 0;
                    for (var f = o.length; p != f; ++p)
                        o[p].free()
                }
                o.length = 0
            }
        },
        dSPB: function(t, e, i, n, a, o) {
            s.startTick("dSPB");
            for (var l, h = e.polys, c = i.acquire(), d = r, u = a + d, _ = t.uid, p = 0, f = h.length; p !== f; ++p)
                l = h[p],
                n.isResting(_, l.uid) || this.ccdSP(t, l, u, c) && (o.push(c),
                c.toi < a && (u = (a = c.toi) + d),
                c = i.acquire());
            return c.free(),
            s.stopTick("dSPB"),
            a
        },
        dcdSS: function(t) {
            var e = t.bi
              , i = t.bj
              , s = e.radius
              , n = i.radius
              , r = a
              , o = e.position.distanceToSq(i.position);
            if (o - e.radiusSq - i.radiusSq - 2 * s * n > r)
                return !1;
            var l = Math.sqrt(o)
              , h = u;
            return l < a ? h.set(0, 1, 0) : h.subVectors(e.position, i.position).scale(1 / l),
            t.resetRestingWithPeneNormal(.5 * (l - s - n), h),
            !0
        },
        dcdSP: function(t) {
            var e = t.bi
              , i = t.bj
              , s = e.position
              , n = e.radius
              , r = i.edges
              , o = i.distanceFromPointToPlane(s)
              , l = a
              , h = o - n;
            if (h > l || h < l - 2 * n)
                return !1;
            if (this.pointInPolygon(r, i.edgeXNormals, s))
                return i.hasCustomNormalHandler ? t.resetRestingWithPeneCP(h, s) : t.resetRestingWithPeneNormal(h, i.normal),
                !0;
            var c = _
              , d = this.closestPointOnEdges(r, s, c);
            return !(d - e.radiusSq > l) && (t.resetRestingWithPeneCP(Math.sqrt(d) - n, c),
            !0)
        },
        ccdSS: function(t, e, i, n) {
            s.startTick("ccdSS");
            var r = d.subVectors(t.position, e.position)
              , a = o.subVectors(t.v, e.v);
            if (a.dot(r) > 0)
                return s.stopTick("ccdSS"),
                !1;
            s.count("nCcdSS", 1);
            var l = t.radius
              , h = e.radius
              , c = t.radiusSq
              , u = e.radiusSq
              , _ = r.lengthSq()
              , p = c + u + 2 * l * h;
            if (_ < p)
                return n.resetPendingWithToiPene(t, e, 0, .5 * (Math.sqrt(_) - l - h)),
                s.stopTick("ccdSS"),
                !0;
            var f = this.pRaySphereToi(a, a.dot(a), r, _, p);
            return f < i ? (n.resetPendingWithToiPene(t, e, f, 0),
            s.stopTick("ccdSS"),
            !0) : (s.stopTick("ccdSS"),
            !1)
        },
        ccdSP: function(t, e, i, s) {
            if (t.collisionMask & e.collisionGroup)
                return !1;
            if (0 !== e.bR && !this.rayIntersect(t.position, t.v, t.vSq, e.bCenter, t.radiusSq + e.bRSq + 2 * t.radius * e.bR))
                return !1;
            var n = e.distanceFromPointToPlane(t.position)
              , r = t.radius
              , o = a;
            if (n - r >= -o) {
                var l = t.v.dot(e.normal);
                return !(l >= 0) && this.__ccdspFar(n, t, e, l, i, s)
            }
            return n > o - r && this.__ccdspNear(n, t, e, i, s)
        },
        __ccdspFar: function(t, e, i, n, r, o) {
            s.count("nCcdSP_Far", 1),
            s.startTick("ccdSP_Far");
            var u = i.normal
              , p = e.v
              , f = e.position
              , g = e.radius
              , m = i.edges
              , y = l.scaleVector(g, u)
              , v = (g - t) / n;
            if (v < a && (v = 0),
            v > r)
                return s.stopTick("ccdSP_Far"),
                !1;
            var b = h.interpolate(f, p, v).sub(y);
            if (this.pointInPolygon(m, i.edgeXNormals, b))
                return i.hasCustomNormalHandler ? o.resetPendingWithToiPeneCP(e, i, v, 0, b) : o.resetPendingWithToiPeneNormal(e, i, v, 0, u),
                s.stopTick("ccdSP_Far"),
                !0;
            var x = _;
            this.closestPointOnEdges(m, b, x);
            var S = c.copyNeg(p)
              , C = d.subVectors(x, f);
            return (v = this.pRaySphereToi(S, e.vSq, C, C.lengthSq(), e.radiusSq)) <= r && v !== Number.MAX_VALUE ? (o.resetPendingWithToiPeneCP(e, i, v, 0, x),
            s.stopTick("ccdSP_Far"),
            !0) : (s.stopTick("ccdSP_Far"),
            !1)
        },
        __ccdspNear: function(t, e, i, n, r) {
            s.count("nCcdSP_Near", 1),
            s.startTick("ccdSP_Near");
            var a = e.position
              , o = e.radius
              , u = i.normal
              , p = i.edges
              , f = l.scaleVector(o, u)
              , g = h.subVectors(a, f);
            if (this.pointInPolygon(p, i.edgeXNormals, g))
                return i.hasCustomNormalHandler ? r.resetPendingWithToiPeneCP(e, i, 0, t - o, g) : r.resetPendingWithToiPeneNormal(e, i, 0, t - o, u),
                s.stopTick("ccdSP_Near"),
                !0;
            var m = _;
            this.closestPointOnEdges(p, g, m);
            var y = d.subVectors(m, a)
              , v = y.lengthSq()
              , b = e.radiusSq;
            if (v <= b)
                return r.resetPendingWithToiPeneCP(e, i, 0, Math.sqrt(v) - o, m),
                s.stopTick("ccdSP_Near"),
                !0;
            var x = c.copyNeg(e.v)
              , S = this.pRaySphereToi(x, e.vSq, y, v, b);
            return S <= n && S !== Number.MAX_VALUE ? (r.resetPendingWithToiPeneCP(e, i, S, 0, m),
            s.stopTick("ccdSP_Near"),
            !0) : (s.stopTick("ccdSP_Near"),
            !1)
        },
        pointInPolygon: function(t, e, i) {
            for (var s, n, r = null, a = p, o = 0, l = t.length; o !== l; ++o) {
                if (s = t[o],
                a.subVectors(i, s.va),
                n = e[o].dot(a),
                !(null === r || n > 0 && !0 === r || n <= 0 && !1 === r))
                    return !1;
                null === r && (r = n > 0)
            }
            return !0
        },
        rayIntersect: function(t, e, i, s, n) {
            var r = d.subVectors(t, s)
              , a = r.lengthSq() - n
              , o = r.dot(e);
            return !(a > 0 && o > 0) && o * o - a * i >= 0
        },
        pRaySphereToi: function(t, e, i, s, n) {
            var r = i.dot(t)
              , o = s - n;
            if (o > 0 && r > 0)
                return Number.MAX_VALUE;
            var l = e
              , h = r * r - l * o;
            if (h <= 0)
                return Number.MAX_VALUE;
            var c = (-r - Math.sqrt(h)) / l;
            return c < a && (c = 0),
            c
        },
        closestPointOnEdges: (f = new n,
        g = new n,
        function(t, e, i) {
            for (var s = null, n = f, r = g, a = null, o = 0, l = Number.MAX_VALUE, h = 0, c = 0, d = t.length; c !== d; ++c)
                s = t[c],
                n.subVectors(e, s.va),
                l > (h = (a = (o = n.dot(s.vab) / s.abDotAb) <= 0 ? s.va : o >= 1 ? s.vb : r.scaleVector(o, s.vab).add(s.va)).distanceToSq(e)) && (l = h,
                i.copy(a));
            return l
        }
        )
    }
}
, function(t, e, i) {
    const s = i(12)
      , n = i(17)
      , r = i(23)
      , a = i(16)
      , o = s.EPSILON
      , l = a.gravity
      , h = new s
      , c = ["uid", "active", "acc", "cdRound", "v", "vProp_dir", "vProp_sq", "vProp_dirty", "vChangedCount", "vProp0_dir", "vProp0_sq", "__vState", "__vStateDirty", "w", "wProp_sq", "wProp_dirty", "position", "orientation", "predictionDirty", "steppedLenSq", "canSleep", "asleep", "energy"];
    class d {
        get wSq() {
            return this.wProp_dirty && (this.wProp_dirty = !1,
            this.wProp_sq = this.w.lengthSq()),
            this.wProp_sq
        }
        get vDir() {
            return this.vProp_dirty && this.updateVProps(),
            this.vProp_dir
        }
        get vSq() {
            return this.vProp_dirty && this.updateVProps(),
            this.vProp_sq
        }
        get vState() {
            return this.__vStateDirty && this.updateVState(),
            this.__vState
        }
        constructor(t, e, i, o, h, c, u) {
            this.uid = -1,
            this.active = !0,
            this.mass = t,
            this.invMass = t > 0 ? 1 / t : 0,
            this.acc = l.clone(),
            this.cdRound = 0,
            this.v = new s,
            this.vProp_dir = new s,
            this.vProp_sq = 0,
            this.vProp_dirty = !1,
            this.vChangedCount = 0,
            this.vProp0_dir = new s,
            this.vProp0_sq = 0,
            this.__vState = 0,
            this.__vStateDirty = !1,
            this.w = new s(0,0,0),
            this.wProp_sq = 0,
            this.wProp_dirty = !1,
            this.invInertia = new n,
            this.airAngularDamping = a.airAngularDamping,
            this.rfPower = 0,
            this.rfDir = new s(0,0,0),
            this.position = new s(e || 0,i || 0,o || 0),
            this.orientation = (new r).setFromEuler(h || 0, c || 0, u || 0),
            this.predictionDirty = !1,
            this.steppedLenSq = 0,
            this.canSleep = !0,
            this.asleep = !1,
            this.energy = d.minEnergy,
            this.userData = null,
            this.restitution = 0,
            this.friction = 0,
            this.peneOffset = new s(0,0,0),
            this.penetration = 0,
            this.serializable = !0,
            this.collisionGroup = 1,
            this.collisionMask = 0
        }
        serialize(t) {
            if (!this.serializable)
                return void t.push(-1 - Math.floor(10 * Math.random()));
            if (t.push(this.uid),
            t.push(this.active ? 1 : 0),
            !this.active)
                return;
            let e = c;
            for (let i = 2, s = e.length; i !== s; ++i) {
                let s = this[e[i]];
                switch (typeof s) {
                case "number":
                    t.push(s);
                    break;
                case "boolean":
                    t.push(s ? 1 : 0);
                    break;
                case "object":
                    s.toArray(t, t.length)
                }
            }
        }
        deserialize(t, e) {
            if (t[e] < 0)
                return e + 1;
            if (0 === t[e + 1])
                return this.active = !1,
                e + 2;
            this.active = !0,
            e += 2;
            let i = c;
            for (let s = 2, n = i.length; s !== n; ++s) {
                let n = i[s];
                switch (typeof this[n]) {
                case "number":
                    this[n] = t[e++];
                    break;
                case "boolean":
                    this[n] = !!t[e++];
                    break;
                case "object":
                    e += this[n].fromArray(t, e)
                }
            }
            return e
        }
        dispose() {
            this.acc = null,
            this.v = null,
            this.vProp_dir = null,
            this.vProp0_dir = null,
            this.w = null,
            this.invInertia = null,
            this.position = null,
            this.orientation = null,
            this.userData = null
        }
        setSleep() {
            this.asleep || (this.asleep = !0,
            this.energy = 0,
            this.vProp0_dir.set(0, 0, 0),
            this.vProp0_sq = 0,
            this.v.set(0, 0, 0),
            this.w.set(0, 0, 0),
            this.__vStateDirty = !0,
            this.vProp_dirty = !0,
            this.wProp_dirty = !0)
        }
        wakeUp() {
            this.asleep && (this.asleep = !1,
            this.energy = d.wakeUpEnergy)
        }
        applyForce(t) {
            this.acc.addScaled(t, this.invMass),
            this.wakeUp()
        }
        applyForce2(t, e) {
            this.acc.addScaled(e, this.invMass * t),
            this.wakeUp()
        }
        predVelocities(t) {
            if (this.predictionDirty = !1,
            !this.asleep) {
                if (this.v.addScaled(this.acc, t),
                0 !== this.rfPower) {
                    let t = this.rfDir.normalize().scale(this.rfPower)
                      , e = t.x >= 0 ? t.x : -t.x
                      , i = t.y >= 0 ? t.y : -t.y
                      , s = t.z >= 0 ? t.z : -t.z
                      , n = this.w;
                    n.x > e ? n.x -= e : n.x < -e ? n.x += e : n.x = 0,
                    n.y > i ? n.y -= i : n.y < -i ? n.y += i : n.y = 0,
                    n.z > s ? n.z -= s : n.z < -s ? n.z += s : n.z = 0,
                    this.rfPower = 0,
                    t.set(0, 0, 0)
                }
                this.w.scale(this.airAngularDamping),
                this.__vStateDirty = !0,
                this.vProp_dirty = !0,
                this.vChangedCount++
            }
        }
        applyImpulseAtPoint(t, e, i) {
            this.v.addScaled(t, this.invMass);
            let s = h.crossVectors(e, t);
            this.invInertia.transform(s, s),
            this.w.add(s),
            i > this.rfPower && (this.rfPower = i),
            this.rfDir.add(s),
            this.__vStateDirty = !0,
            this.vProp_dirty = !0,
            this.wProp_dirty = !0,
            this.vChangedCount++,
            this.wakeUp(),
            this.canSleep = !0
        }
        step(t) {
            if (this.asleep)
                return this.steppedLenSq = 0,
                this.penetration = 0,
                !0;
            this.position.addScaled(this.v, t),
            0 !== this.penetration && (this.position.add(this.peneOffset),
            this.penetration = 0,
            this.canSleep = !1),
            this.orientation.integrate(this.w, t),
            this.acc.copy(l),
            this.steppedLenSq = this.vSq * t;
            let e = Math.pow(d.baseSleepBias, t)
              , i = e * this.energy + (1 - e) * this.getMotion();
            if (i > d.maxEnergy)
                i = d.maxEnergy;
            else if (i < d.minEnergy && this.canSleep)
                return this.setSleep(),
                !0;
            return this.energy = i,
            this.vProp0_dir.copy(this.vDir),
            this.vProp0_sq = this.vSq,
            !1
        }
        addPeneOffset(t, e) {
            t < this.penetration && (this.penetration = t,
            this.peneOffset.copy(e),
            t < -.001 && this.wakeUp())
        }
        reset(t, e, i) {
            this.position.set(t, e, i),
            this.vProp0_dir.set(0, 0, 0),
            this.vProp0_sq = 0,
            this.acc.copy(l),
            this.v.set(0, 0, 0),
            this.w.set(0, 0, 0),
            this.__vStateDirty = !0,
            this.vProp_dirty = !0,
            this.wProp_dirty = !0,
            this.wakeUp()
        }
        updateVProps() {
            this.vProp_dirty = !1,
            this.vProp_sq = this.v.lengthSq();
            let t = this.vProp_dir;
            this.vProp_sq < o ? (this.vProp_sq = 0,
            t.set(0, 0, 0),
            this.v.set(0, 0, 0)) : t.scaleVector(1 / Math.sqrt(this.vProp_sq), this.v)
        }
        updateVState() {
            this.__vStateDirty = !1;
            const t = d.vStates;
            let e = this.vSq;
            return 0 === e ? void (this.__vState = t.ZERO) : e > this.vProp0_sq ? void (this.__vState = t.FASTER) : void (this.__vState = 1 - o > this.vDir.dot(this.vProp0_dir) ? t.DIR_CHANGE : t.SLOWER)
        }
        getMotion() {
            return this.vSq + this.wSq
        }
    }
    d.baseSleepBias = .3,
    d.minEnergy = NaN,
    d.maxEnergy = NaN,
    d.wakeUpEnergy = NaN,
    d.vStates = {
        ZERO: 0,
        SLOWER: 1,
        FASTER: 2,
        DIR_CHANGE: 3
    },
    t.exports = d
}
, function(t, e, i) {
    const s = i(35)
      , n = i(12)
      , r = i(23);
    t.exports = class extends s {
        constructor(t, e, i, s, a, o, l, h) {
            super(e, i, s, a, o, l, h),
            this.radius = t,
            this.radiusSq = t * t;
            let c = 1 / (.4 * this.mass * this.radiusSq);
            this.invInertia.set(c, 0, 0, 0, c, 0, 0, 0, c),
            this.states = {
                position: new n,
                orientation: new r
            }
        }
        getMotion() {
            return this.vSq + this.wSq * this.radiusSq
        }
        syncStates(t) {
            let e = this.states;
            e.position.interpolate(this.position, this.v, t),
            e.orientation.integrateQuad(this.orientation, this.w, t)
        }
    }
}
, function(t, e, i) {
    const s = i(22)
      , n = i(17)
      , r = i(12)
      , a = r.EPSILON;
    t.exports = class extends s {
        get armJ() {
            return this.armDirty && this.updateForceArm(),
            this._armJ
        }
        get armLenJ() {
            return this.armDirty && this.updateForceArm(),
            this._armLenJ
        }
        constructor(t, e) {
            super(t, e),
            this.isSS = !0,
            this.cdRoundJ = NaN,
            this.vChangedCountJ = -1,
            this._armJ = new r(0,0,0),
            this._armLenJ = 0,
            this.restingCheckPosJ = new r(0,0,0),
            this.relVelWJ = new r,
            this.m_imp2LocVel2 = new n,
            this.normalUpdateHandler = (()=>{
                this.normalDirty = !1,
                this._normal.subVectors(this.bi.position, this.bj.position);
                let t = this._normal.length();
                t < a ? this._normal.set(0, 1, 0) : this._normal.scale(1 / t)
            }
            ),
            this.rollingFriction = 0
        }
        isOutdated() {
            return this.cdRoundI !== this.bi.cdRound || this.cdRoundJ !== this.bj.cdRound || this.markedAsKilled
        }
        startResting() {
            this.restingCheckPosJ.copy(this.bj.position),
            super.startResting()
        }
        needsUpdateResting() {
            return !this.restingCheckPosI.almostEquals(this.bi.position) || !this.restingCheckPosJ.almostEquals(this.bj.position)
        }
        resetRestingWithPeneNormal(t, e) {
            this.restingCheckPosJ.copy(this.bj.position),
            super.resetRestingWithPeneNormal(t, e)
        }
        resetPendingWithToiPene(t, e, i, s) {
            this.resetWithBiBj(t, e),
            this.toi = i,
            this._penetration = s > -a ? 0 : s,
            this.cdRoundI = t.cdRound,
            this.cdRoundJ = e.cdRound,
            this.life = 0,
            this.markNormalDirty()
        }
        stopResting() {
            this.bi.wakeUp(),
            this.bj.wakeUp()
        }
        updateForceArm() {
            this.armDirty = !1,
            this._armLenI = this.bi.radius,
            this._armLenJ = this.bj.radius,
            this._armI.scaleVector(-this._armLenI, this.normal),
            this._armJ.scaleVector(this._armLenJ, this.normal)
        }
        getCloseSpeed() {
            return (this.relVelDirty || this.vChangedCountI !== this.bi.vChangedCount || this.vChangedCountJ !== this.bj.vChangedCount) && this.updateRelVelocity(),
            this._closeSpeed
        }
        getRelativeVelocity() {
            return (this.relVelDirty || this.vChangedCountI !== this.bi.vChangedCount || this.vChangedCountJ !== this.bj.vChangedCount) && this.updateRelVelocity(),
            this.relativeVelW
        }
        updateRelVelocity() {
            this.vChangedCountI = this.bi.vChangedCount,
            this.vChangedCountJ = this.bj.vChangedCount,
            this.relVelDirty = !1,
            this.relativeVelW.setCrossThenAdd(this.bi.w, this.armI, this.bi.v),
            this.relativeVelW.sub(this.relVelWJ.setCrossThenAdd(this.bj.w, this.armJ, this.bj.v)),
            this._closeSpeed = this.relativeVelW.dot(this.normal)
        }
        updateImpulseTransform() {
            this.impulseTransformDirty = !1;
            let t = this._m_imp2LocVel
              , e = this.skewSymmetric.setSkewSymmetric(this.armI)
              , i = this.m_imp2WorVel.copy(e);
            i.multiply(this.bi.invInertia),
            i.multiply(e),
            i.multiplyScalar(-1),
            e.setSkewSymmetric(this.armJ);
            let s = this.m_imp2LocVel2.copy(e);
            s.multiply(this.bj.invInertia),
            s.multiply(e),
            s.multiplyScalar(-1),
            i.add(s),
            t.copy(this.spaceTransformW2L),
            t.multiply(i),
            t.multiply(this.spaceTransformL2W),
            t.addToDiagonal(this.bi.invMass + this.bj.invMass),
            this._m_locVel2Imp.setInverse(t)
        }
    }
}
, function(t, e, i) {
    "use strict";
    t.exports = class {
        get size() {
            return this.pool.length
        }
        get nInUse() {
            let t = this.pool
              , e = 0;
            for (let i = 0, s = t.length; i !== s; ++i)
                t[i].inUse && e++;
            return e
        }
        constructor(t, e, i) {
            this.pool = [];
            for (let t = 0; t !== i; ++t)
                this.pool[t] = new e(this,t);
            this.freedIndices = new Uint16Array(i),
            this.maxFreedIndex = i - 1,
            this.freedIndex = -1,
            this.poolIndex = -1,
            this.itemClass = e,
            this.maxExpCount = Math.max(1, i),
            this.name = t
        }
        freeIndex(t) {
            this.freedIndex < this.maxFreedIndex && (this.freedIndices[++this.freedIndex] = t)
        }
        dispose() {
            let t = this.pool;
            for (let e = 0, i = t.length; e < i; ++e)
                t[e].dispose()
        }
        indexAt(t) {
            return this.pool[t]
        }
        freeAll() {
            let t = this.pool;
            for (let e = 0, i = t.length; e < i; ++e)
                t[e].free();
            this.freedIndex = -1,
            this.poolIndex = -1
        }
        acquire() {
            let t, e = this.pool;
            if (-1 !== this.freedIndex)
                return t = e[this.freedIndices[this.freedIndex]],
                this.freedIndex--,
                t.activate();
            for (let i = 0, s = e.length; i !== s; ++i)
                if (!(t = e[++this.poolIndex % s]).inUse)
                    return t.activate();
            let i = e.length;
            this.poolIndex = i;
            for (let t = 0, s = Math.min(this.maxExpCount, Math.floor(Math.floor(i / 3) + 1)); t < s; ++t)
                e.push(new this.itemClass(this,e.length));
            return console.warn("::: POOL EXPANDED ::: " + e.length + "(" + this.name + ")"),
            e[this.poolIndex].activate()
        }
        log() {
            let t = this.pool;
            console.log("===== ObjectPool: (" + t.length + ") =====");
            for (var e = 0, i = t.length; e !== i; ++e)
                console.log("\t>inUse: " + t[e].inUse + ": " + t[e]);
            console.log("=============================================\n")
        }
    }
}
, function(t, e, i) {
    "use strict";
    const s = i(94)
      , n = i(38)
      , r = i(92)
      , a = i(37)
      , o = (i(36),
    i(35))
      , l = i(22)
      , h = i(91)
      , c = i(16)
      , d = i(21)
      , u = i(34)
      , _ = i(20)
      , p = i(86)
      , f = t=>{}
      , g = t=>{}
    ;
    t.exports = class {
        get stepSize() {
            return this._stepSize
        }
        set stepSize(t) {
            this._stepSize !== t && (this._stepSize = t,
            o.minEnergy = Math.round(c.gravity.length() * t * (1 - Math.pow(o.baseSleepBias, t)) * .5 * 1e3) / 1e3,
            o.maxEnergy = 4.5 * o.minEnergy,
            o.wakeUpEnergy = 1.4 * o.minEnergy,
            l.gt.scaleVector(2.3 * t, c.gravity))
        }
        get environmentReady() {
            return this._environmentReady
        }
        get timestamp() {
            throw new Error("No more timestamp, use evolution")
        }
        get evolution() {
            return this._evolution
        }
        constructor() {
            this.accumulator = 0,
            this.meshBody = null,
            this.balls = [],
            this.qCDSP = [],
            this.qCDSS = [],
            this.ssSkips = [],
            this.p2a = [],
            this.rechecks = [],
            this.nRechecks = 0,
            this.cActings = new s(44),
            this.cPendings = new h,
            this.spPool = new n("sp",r,70),
            this.ssPool = new n("ss",a,70),
            this._environmentReady = !1,
            this.internalStep = this.__internalStep_error,
            this.nAwakened = 0,
            this.touchPresolveHandler = f,
            this.outOfBoundsHandler = g,
            this.useStrictMode = !0,
            this.solver = d.sharedInstance,
            this.lowestBoundY = -Number.MAX_VALUE,
            this._maxSteps = 10,
            this.stepSize = .0167,
            this._evolution = 0
        }
        static makeSerialData() {
            let t = Object.create(null);
            return t.balls = [],
            t.mbid = "",
            t.evolution = 0,
            t
        }
        static copySerialDataAToB(t, e) {
            e.evolution = t.evolution,
            e.mbid = t.mbid;
            for (let i = 0, s = t.balls.length; i !== s; ++i)
                e.balls[i] = t.balls[i];
            e.balls.length = t.balls.length
        }
        onTouchPresolve(t) {
            void 0 !== t && (this.touchPresolveHandler = t)
        }
        onOutOfBounds(t) {
            void 0 !== t && (this.outOfBoundsHandler = t)
        }
        clearCallbacks() {
            this.touchPresolveHandler = f,
            this.outOfBoundsHandler = g
        }
        shoot(t, e) {
            this.tipContact || (this.tipContact = new p(.15)),
            this.tipContact.resetTip(t, e),
            this.solver.solveContact(this.tipContact),
            this.tipContact.free(),
            t.wakeUp()
        }
        _breakEnvironment() {
            this._environmentReady = !1,
            this.internalStep = this.__internalStep_error,
            this.cPendings.freeAll(),
            this.cActings.freeAll(),
            this.spPool.freeAll(),
            this.ssPool.freeAll(),
            this.qCDSP.length = 0,
            this.qCDSS.length = 0,
            this.ssSkips.length = 0,
            this.p2a.length = 0
        }
        _rebuildEnvironment() {
            this._environmentReady = !0;
            let t = this.balls
              , e = this.meshBody.nPolygons
              , i = e;
            for (let i = 0, s = t.length; i !== s; ++i)
                t[i].uid = e++,
                c.setBallFrictionAndRestitution(t[i]);
            this.cActings.resize(e, i),
            this.internalStep = this.__internalStep__
        }
        emptyMeshBody() {
            this._environmentReady && this._breakEnvironment(),
            this.meshBody = null
        }
        emptyBalls() {
            this._environmentReady && this._breakEnvironment();
            for (let t = 0, e = this.balls.length; t !== e; ++t)
                this.balls[t].dispose();
            this.balls.length = 0
        }
        reset() {
            let t = this.balls
              , e = this.meshBody;
            if (this._environmentReady) {
                if (this.cPendings.freeAll(),
                this.cActings.freeAll(),
                this.spPool.freeAll(),
                this.ssPool.freeAll(),
                0 !== this.nRechecks)
                    throw new Error("logic error: nRechecks not zero when reset")
            } else
                this._rebuildEnvironment();
            u.initIslands(t, e, this.cActings, this.ssPool, this.spPool),
            this._evolution++
        }
        serialize(t) {
            if (!this._environmentReady)
                throw new Error("serialize should be called after environmentReady");
            t.balls.length = 0;
            const e = this.balls;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].serialize(t.balls);
            return t.evolution = this._evolution,
            t.mbid = this.meshBody.id,
            t
        }
        deserialize(t) {
            if (!this._environmentReady)
                throw new Error("deserialize should be called after environmentReady");
            if (t.mbid !== this.meshBody.id)
                throw new Error("deserialize data error: mbid not match: " + t.mbid + ", " + this.meshBody.id);
            const e = this.balls;
            this.nAwakened = 0;
            let i = 0;
            for (let s = 0, n = e.length; s !== n; ++s)
                i = e[s].deserialize(t.balls, i),
                e[s].active && !e[s].asleep && this.nAwakened++;
            this.reset(),
            this._evolution = t.evolution
        }
        addBall(t) {
            if (this._environmentReady)
                throw new Error("addBall after environmentReady");
            this.balls.push(t)
        }
        setMeshBody(t) {
            if (this._environmentReady)
                throw new Error("setMeshBody after environmentReady");
            this.meshBody = t,
            this.lowestBoundY = t.lowestPosition.y
        }
        inactivateBall(t) {
            if (!t.active)
                return;
            let e = t.uid;
            t.active = !1,
            this.cActings.removeAllContactsWithId(e);
            let i, s = this.cPendings.stack;
            for (let t = 0, n = s.length; t !== n; ++t)
                (i = s[t]).idi !== e && i.idj !== e || (i.markedAsKilled = !0)
        }
        step(t) {
            _.clear(),
            _.startTick("step");
            let e = this._stepSize
              , i = this._maxSteps
              , s = 0;
            for (this.accumulator += t; this.accumulator >= e && s < i; )
                this.accumulator -= e,
                s++,
                this.internalStep();
            if (0 === s) {
                this.nAwakened = 0;
                let t = this.balls;
                for (let e = 0, i = t.length; e !== i; ++e)
                    t[e].active && !t[e].asleep && this.nAwakened++
            }
            return _.count("nSteps", s),
            _.count("nIslands", this.cActings.nIslands),
            _.count("nPendings", this.cPendings.length),
            _.count("nAwakened", this.nAwakened),
            _.stopTick("step"),
            _.end(),
            s * e
        }
        markRecheck(t) {
            this.nRechecks++,
            this.rechecks.push(t)
        }
        flushRechecks(t, e) {
            let i, s = this.rechecks, n = this.cPendings, r = u;
            for (let a = 0, o = s.length; a !== o; ++a)
                if ((i = s[a]).isOutdated())
                    i.free();
                else if (i.isSS) {
                    if (!i.bi.active || !i.bj.active || -1 !== t.indexOf(i.bi) || -1 !== t.indexOf(i.bj) || 0 === i.bi.vState && 0 === i.bj.vState || !r.ccdSS(i.bi, i.bj, e, i)) {
                        i.free();
                        continue
                    }
                    n.add(i)
                } else
                    i.bi.active && 0 !== i.bi.vState && r.ccdSP(i.bi, i.bj, Number.MAX_VALUE, i) ? n.add(i) : i.free();
            s.length = 0,
            this.nRechecks = 0
        }
        __internalStep_error() {
            throw new Error("Reset should be called explicitly before any simulation start")
        }
        __internalStep__() {
            let t = this.balls
              , e = this.cActings
              , i = this.cPendings
              , s = u
              , n = this.solver
              , r = this.ssPool
              , a = this.spPool
              , l = this.p2a
              , h = this.qCDSP
              , d = this.qCDSS
              , p = this.ssSkips
              , f = c.islandUpdMinDisSq
              , g = o.vStates.ZERO
              , m = o.vStates.SLOWER
              , y = null
              , v = null
              , b = this.useStrictMode
              , x = 0
              , S = 0
              , C = 0
              , I = 0
              , T = this._stepSize;
            _.count("internalStep", 1),
            this._evolution++,
            b ? i.removeAllSS() : g = m,
            s.updateIslands(e, !0);
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].active && t[e].predVelocities(T);
            n.solveList(e, !0);
            for (let e = 0, i = t.length; e !== i; ++e)
                (y = t[e]).active && (y.vState > m ? (y.cdRound++,
                h.push(y),
                d.push(y)) : y.vState > g && d.push(y));
            for (; x < T || h.length; ) {
                if (S = T - x,
                C = b ? S : Number.MAX_VALUE,
                ++I > 100)
                    throw new Error("Loop overflow: " + I);
                if (_.count("iteration", 1),
                0 !== h.length) {
                    for (let t = 0, n = h.length; t < n; ++t)
                        s.updateSPToi(h[t], this.meshBody, a, e, i);
                    h.length = 0
                }
                if (this.nRechecks && this.flushRechecks(d, C),
                0 !== d.length) {
                    for (let n = 0, a = d.length; n < a; ++n)
                        s.updateSSToi(d[n], t, r, e, p, C, i),
                        p.push(d[n].uid);
                    d.length = 0,
                    p.length = 0
                }
                if (_.startTick("pending_step"),
                S = i.step2(S, l),
                _.stopTick("pending_step"),
                0 === l.length) {
                    this.nAwakened = 0;
                    let e = this.lowestBoundY;
                    for (let i = 0, s = t.length; i !== s; ++i)
                        t[i].active && (t[i].step(S) || this.nAwakened++,
                        t[i].position.y < e && (this.inactivateBall(t[i]),
                        this.outOfBoundsHandler(t[i])));
                    0 === this.nAwakened && (i.freeAll(),
                    this.accumulator = 0);
                    break
                }
                if (S > 0) {
                    x += S,
                    this.nAwakened = 0;
                    for (let e = 0, i = t.length; e !== i; ++e)
                        t[e].active && !t[e].step(S) && this.nAwakened++;
                    for (let t = 0, i = l.length; t !== i; ++t)
                        (v = l[t]).bi.steppedLenSq > f && e.markReupdate(v.idi),
                        v.isSS && v.bj.steppedLenSq > f && e.markReupdate(v.idj);
                    s.updateIslands(e, !1);
                    for (let e = 0, i = t.length; e !== i; ++e)
                        (y = t[e]).active && y.predictionDirty && t[e].predVelocities(T - x)
                }
                for (let t = 0, i = l.length; t !== i; ++t)
                    !(v = l[t]).bi.active || v.isSS && !v.bj.active ? v.free() : 0 === v.life ? (e.add(v),
                    v.startResting(),
                    this.touchPresolveHandler(v)) : this.markRecheck(v);
                l.length = 0,
                n.solveList(e, !1);
                for (let e = 0, s = t.length; e !== s; ++e)
                    (y = t[e]).active && (y.vState > m ? (y.cdRound++,
                    h.push(y),
                    d.push(y)) : y.vState > g && (i.outdateAllSSWithId(y.uid),
                    d.push(y)))
            }
        }
    }
}
, function(t, e) {
    t.exports = '<section class="multi-section-group duo-result-box">\n\t<section class="flex-section ss-xxl ali-justify s-split">\n\t\t<div class="name0 bright-copy"></div>\n\t\t<div class="name1 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-xl ali-justify-fixed">\n\t\t<div class="pts0 label-div-250 bright-copy"></div>\n\t\t<label class="dark-copy">POINTS</label>\n\t\t<div class="pts1 label-div-250 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify-fixed">\n\t\t<div class="brk0 label-div-150 bright-copy"></div>\n\t\t<label class="dark-copy">MAX BREAK</label>\n\t\t<div class="brk1 label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify-fixed">\n\t\t<div class="fouls0 label-div-150 bright-copy"></div>\n\t\t<label class="fouls-label dark-copy">FOULS</label>\n\t\t<div class="fouls1 label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify-fixed  s-split">\n\t\t<div class="accuracy0 label-div-150 bright-copy"></div>\n\t\t<label class="dark-copy">ACCURACY</label>\n\t\t<div class="accuracy1 label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-l-xspace ali-justify-fixed">\n\t\t<label class="dark-copy">TIME</label>\n\t\t<div class="time label-div-150 bright-copy"></div>\n\t</section>\n</section>\n'
}
, function(t, e) {
    t.exports = '<div class="score-container no-drag">\n\t<div class="left">\n\t\t<h2 class="head"></h2>\n\t\t<div class="ball-on-icon snooker"></div>\n\t\t<div class="brk-label label-div-125">BRK</div>\n\t\t<div class="brk label-div-125">999</div>\n\t\t<div class="pts">999</div>\n\t</div>\n\t<div class="right">\n\t\t<h2 class="head"></h2>\n\t\t<div class="ball-on-icon snooker"></div>\n\t\t<div class="brk-label label-div-125">BRK</div>\n\t\t<div class="brk label-div-125">999</div>\n\t\t<div class="pts">999</div>\n\t</div>\n</div>\n\n'
}
, function(t, e) {
    t.exports = '<div class="replay-control">\n\t<h3 class="head bright-copy">REPLAY</h3>\n\t<div class="pause-button sprite-button-std"><div class="pause-icon sprite"></div></div>\n\t<div class="play-button sprite-button-std"><div class="play-icon sprite"></div></div>\n\t<div class="progress-bar"><div class="progress-len"></div></div>\n\t<div class="shortcut-group no-drag">\n\t\t<div class="shortcut-item"><span class="kb">SPACE</span>PLAY/PAUSE</div>\n\t\t<div class="shortcut-item"><span class="kb">C</span>CAMERA</div>\n\t</div>\n\t<div class="close-button sprite-button-std"><div class="close-icon sprite"></div></div>\n</div>\n'
}
, function(t, e) {
    t.exports = '<section class="multi-section-group single-result-box">\n\t<section class="flex-section ss-m ali-justify">\n\t\t<label class="dark-copy">TIME</label>\n\t\t<div class="time label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify">\n\t\t<label class="dark-copy">POINTS</label>\n\t\t<div class="pts label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify">\n\t\t<label class="dark-copy">MAX BREAK</label>\n\t\t<div class="brk label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify">\n\t\t<label class="fouls-label dark-copy">FOULS</label>\n\t\t<div class="fouls label-div-150 bright-copy"></div>\n\t</section>\n\t<section class="flex-section ss-m ali-justify">\n\t\t<label class="dark-copy">ACCURACY</label>\n\t\t<div class="accuracy label-div-150 bright-copy"></div>\n\t</section>\n</section>\n'
}
, function(t, e) {
    t.exports = '<section>\n\t<h3 class="subhead-section">GENERAL</h3>\n\t<section class="basic-controls-img"></section>\n</section>\n<section>\n\t<h3 class="subhead-section">STANDING</h3>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>AIM</label>\n\t\t<div class="shortcut-item"><span class="kb">W</span><span class="ps"> (WHEN YOUR TURN)</span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>CROUCH</label>\n\t\t<div class="shortcut-item"><span class="kb">X</span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>PLACE BALL</label>\n\t\t<div class="shortcut-item"><span class="kb">P</span><span class="ps"> (WHEN BALL IN HAND)</span></div>\n\t</section>\n</section>\n<section>\n\t<h3 class="subhead-section">AIMING</h3>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>SHOT</label>\n\t\t<div class="shortcut-item"><span class="kb">SPACE</span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>ADD SPIN</label>\n\t\t<div class="shortcut-item"><span class="kb assi-key">Alt</span><span class="plus-icon sprite"></span><span class="m-d-i sprite"></span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>CLEAR SPIN</label>\n\t\t<div class="shortcut-item"><span class="kb">C</span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>SET POWER</label>\n\t\t<div class="shortcut-item"><span class="m-w-i sprite"></span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>ELEVATION</label>\n\t\t<div class="shortcut-item"><span class="kb assi-key">Alt</span><span class="plus-icon sprite"></span><span class="m-w-i sprite"></span></div>\n\t</section>\n\t<section class="flex-section ss-s ali-ms46">\n\t\t<label>STAND</label>\n\t\t<div class="shortcut-item"><span class="kb">S</span></div>\n\t</section>\n</section>\n\n'
}
, function(t, e) {
    t.exports = '<div class="shortcuts-bar">\n\t<div class="shortcut-group no-drag stand-group">\n\t\t<div class="shortcut-item aim-key"><span class="kb">W</span>AIM</div>\n\t\t<div class="shortcut-item"><span class="kb">X</span>CROUCH</div>\n\t\t<div class="shortcut-item pickup-key"><span class="kb">P</span>PLACE BALL</div>\n\t</div>\n\t<div class="shortcut-group no-drag aim-group">\n\t\t<div class="shortcut-item"><span class="kb">S</span>STAND</div>\n\t\t<div class="shortcut-item"><span class="kb">SPACE</span>SHOT</div>\n\t\t<div class="shortcut-item"><span class="kb assi-key">Alt</span><span class="plus-icon sprite"></span><span class="m-d-i sprite"></span>ADD SPIN</div>\n\t\t<div class="shortcut-item"><span class="kb">C</span>CLEAR SPIN</div>\n\t\t<div class="shortcut-item"><span class="m-w-i sprite"></span>SET POWER</div>\n\t\t<div class="shortcut-item"><span class="kb assi-key">Alt</span><span class="plus-icon sprite"></span><span class="m-w-i sprite"></span>ELEVATION</div>\n\t</div>\n\t<a class="more-button">...</a>\n</div>\n'
}
, function(t, e) {
    const i = {
        joinPath: function(t, e) {
            return t && 0 !== t.length ? t.replace(/\/+$/, "").concat("/" + e) : e
        },
        ajaxGet: function(t, e, i) {
            i || (i = e,
            e = null);
            let s = new XMLHttpRequest;
            s.open("GET", t, !0);
            let n = ()=>{
                s.readyState === XMLHttpRequest.DONE && (s.removeEventListener("readystatechange", n, !1),
                s.status >= 200 && s.status < 300 ? i(null, s.response) : i(new Error("Error status: " + s.status + " - Unable to load " + t)))
            }
            ;
            if (s.addEventListener("readystatechange", n, !1),
            e)
                for (let t in e)
                    s.setRequestHeader(t, e[t]);
            s.send(null)
        },
        loadImg: function(t, e) {
            let i = document.createElement("img");
            i.crossOrigin = "anonymous";
            let s = ()=>(i.removeEventListener("load", s, !1),
            i.removeEventListener("error", n, !1),
            e(null, i))
              , n = t=>(i.removeEventListener("load", s, !1),
            i.removeEventListener("error", n, !1),
            e(t, i));
            return i.addEventListener("load", s, !1),
            i.addEventListener("error", n, !1),
            i.src = t,
            i
        },
        img2ImgData: function() {
            let t = null;
            return function(e) {
                t || (t = document.createElement("canvas")),
                t.width = e.width,
                t.height = e.height;
                const i = t.getContext("2d");
                return i.drawImage(e, 0, 0),
                i.getImageData(0, 0, e.width, e.height)
            }
        }()
    };
    t.exports = i
}
, function(t, e) {
    const i = Object.create(null);
    i.isPending = !0;
    t.exports = class {
        constructor(t=5) {
            this._concurrency = t || 5,
            this._currentTaskCount = 0,
            this._caches = Object.create(null),
            this._pendingRequests = []
        }
        static errObj(t) {
            let e = Object.create(null);
            return e.message = t || "undefined message",
            e.isError = !0,
            e
        }
        getCache(t, e) {
            let i = this._caches[t];
            return i ? i.isPending ? null : i : (e || this.reload(t),
            null)
        }
        reload(t) {
            this._caches[t] = i,
            this._currentTaskCount < this._concurrency ? this._startLoadAndCache(t) : this._pendingRequests.push(t)
        }
        _startLoadAndCache(t) {
            this._currentTaskCount++,
            this._loadHandler(t)
        }
        _loadHandler(t) {
            throw new Error('AbstractMBCache.loadHandler: should override me, let me know how to load "' + t + '"? ')
        }
        _onTaskComplete(t, e) {
            let i = this._pendingRequests;
            for (this._caches[t] = e,
            e.id = t,
            this._currentTaskCount--; this._currentTaskCount < this._concurrency && i.length > 0; )
                this._startLoadAndCache(this._pendingRequests.shift())
        }
    }
}
, function(t, e, i) {
    const s = i(47)
      , n = i(46)
      , r = i(13)
      , a = r.exts.uv4pg
      , o = i(25);
    t.exports = new class extends s {
        constructor(t) {
            super(t)
        }
        _loadHandler(t) {
        	o.rgb = "cdn.heyzxz.me/pcol_1_0_0/";
            let e = o.rgb + t;
            n.ajaxGet(e, (e,i)=>{
                if (e)
                    return this._onTaskComplete(t, s.errObj(e.message));
                const l = JSON.parse(i);
                let h = new r.MeshBody(l)
                  , c = h.groups
                  , d = Object.create(null)
                  , u = 0
                  , _ = null;
                const p = (e,i)=>{
                    if (e) {
                        _ = e;
                        for (let t = 0, e = c.length; t !== e; ++t)
                            c[t].pendingImg === i && delete c[t].pendingImg
                    } else {
                        let t = n.img2ImgData(i)
                          , e = a.createNTableWithImgData(t);
                        for (let t = 0, s = c.length; t !== s; ++t)
                            c[t].pendingImg === i && (a.extendPolyGroup(c[t], e),
                            delete c[t].pendingImg)
                    }
                    if (0 == --u)
                        return _ ? this._onTaskComplete(t, s.errObj(_.message)) : this._onTaskComplete(t, h)
                }
                ;
                for (let t = 0, e = c.length; t !== e; ++t) {
                    let e = l[c[t].name];
                    if (e.nt) {
                        var f = d[e.nt];
                        f || (f = n.loadImg(o.rgb + e.nt, p),
                        d[e.nt] = f,
                        u++),
                        c[t].pendingImg = f
                    }
                }
                if (0 === u)
                    return this._onTaskComplete(t, h);
                for (let t in d)
                    d[t] = null;
                d = null
            }
            )
        }
    }
}
, function(t, e, i) {
    const s = i(13)
      , n = s.Vec3
      , r = s.Sphere;
    t.exports = class extends r {
        constructor(t, e, i, s, r, a, o) {
            super(e, i, 0, 0, 0, 0, 0, 0),
            this.number = t,
            this.spot = new n(s,r,a),
            this.index = o
        }
    }
}
, function(t, e, i) {
    const s = i(14)
      , n = i(28)
      , r = i(27)
      , a = i(26)
      , o = i(49)
      , l = i(29)
      , h = i(13).Vec3.EPSILON
      , c = i(19);
    t.exports = class extends s {
        get sceneId() {
            return this._sceneId
        }
        get id() {
            return this._id
        }
        get state() {
            return this._state
        }
        get nAwakened() {
            return this._nPhxAwakened
        }
        get ground() {
            return this._world.meshBody.ground
        }
        get sidePolyGroups() {
            return this._world.meshBody.getGroupByName("side")
        }
        get ballRadius() {
            return this._syncList.ballRadius
        }
        get spotY() {
            return this._spotY
        }
        get evolution() {
            return this._world.evolution
        }
        get stepSize() {
            return this._world.stepSize
        }
        get result() {
            return this._result
        }
        constructor(t, e, i) {
            super(),
            this._id = t + "",
            this._world = e,
            this._sceneId = "",
            this._mbCache = i,
            this._spotY = NaN,
            this._syncList = Object.create(null),
            this._syncList.ballSet = [],
            this._syncList.ballRadius = 0,
            this._syncList.ballMass = 0,
            this._syncList.sceneId = "",
            this._nPhxAwakened = 0,
            this._state = NaN,
            this._setState(n.NO_SCENE),
            this._result = c.makeSimulatorResult(),
            this._onTouch = (t=>{
                const e = this._result;
                if (t.isSS) {
                    let i = null;
                    0 === t.bi.number ? (e.nKissed++,
                    i = t.bj) : 0 === t.bj.number && (e.nKissed++,
                    i = t.bi),
                    1 === e.nKissed && null !== i && (e.firstKissIndex = i.index,
                    this.emit(a.FIRST_KISS, e.firstKissIndex))
                } else if (t.bj.end) {
                    let i = t.bi;
                    this._world.inactivateBall(i),
                    e.pottedIndices.push(i.index),
                    this.emit(a.POTTED, i.index)
                } else
                    t.bj.tunnel && this.emit(a.PREPOT, t.bi.index)
            }
            ),
            this._onOutOfBounds = (t=>{
                this._result.outOfBoundsIndices.push(t.index),
                this.emit(a.OUT_OF_BOUNDS, t.index)
            }
            ),
            this._checkSyncTimerId = -1,
            this._onCheckSyncTimeout = (()=>{
                this._checkSyncTimerId = -1,
                this._checkSyncList()
            }
            ),
            this._world.onTouchPresolve(this._onTouch),
            this._world.onOutOfBounds(this._onOutOfBounds)
        }
        sync(t) {
            this._setState(n.LOADING);
            let e = this._syncList;
            if (void 0 !== t.sceneId && (e.sceneId = t.sceneId),
            void 0 !== t.ballSet) {
                for (let i = 0, s = t.ballSet.length; i !== s; ++i)
                    e.ballSet[i] = t.ballSet[i];
                e.ballSet.length = t.ballSet.length
            }
            void 0 !== t.ballRadius && (e.ballRadius = t.ballRadius),
            void 0 !== t.ballMass && (e.ballMass = t.ballMass),
            -1 === this._checkSyncTimerId && this._checkSyncList()
        }
        _checkSyncList() {
            const t = this._syncList;
            if (t.sceneId !== this._sceneId) {
                const e = l[t.sceneId];
                if (!e)
                    return this._err('env not found: "' + t.sceneId + '"');
                const i = e.rgb;
                if (!i || 0 === i.length)
                    return this._err('rgb not found in env: "' + t.sceneId + '"');
                const s = this._mbCache.getCache(i);
                if (!s)
                    return void (this._checkSyncTimerId = setTimeout(this._onCheckSyncTimeout, 100));
                if (s.isError)
                    return this._err(s.message);
                this._world.emptyMeshBody(),
                this._world.setMeshBody(s),
                this._sceneId = t.sceneId
            }
            const e = t.ballSet;
            let i = this._world.balls;
            if (0 === i.length || i.length !== e.length / 3 || i[0].radius !== t.ballRadius || i[0].mass !== t.ballMass) {
                if (this._world.emptyBalls(),
                t.ballRadius <= 0 || t.ballMass <= 0)
                    return this._err("invalid simulator sync opts: mass, radius: " + t.ballMass + ", " + t.ballRadius);
                if (0 === e.length || e.length % 3 != 0)
                    return this._err("invalid simulator sync opts: ballSet.length: " + e.length);
                let i = this._world.meshBody.ground;
                this._spotY = i.centerPosition.y + t.ballRadius;
                for (let i = 0, s = e.length / 3; i !== s; ++i) {
                    let s = new o(e[3 * i],t.ballRadius,t.ballMass,e[3 * i + 1],this._spotY,e[3 * i + 2],i);
                    this._world.addBall(s)
                }
            }
            this._setState(n.SYNCHRONIZED),
            this.emit(r.SYNCHRONIZED)
        }
        reset(t, e) {
            if (t) {
                let t = this._world.balls;
                for (let e = 0, i = t.length; e !== i; ++e)
                    this.resetBallPosition(t[e], t[e].spot)
            }
            return e && this.clearResult(),
            this._world.reset(),
            this
        }
        getBalls() {
            return this._world.balls
        }
        getBallAtIndex(t) {
            return this._world.balls[t]
        }
        getCueBallPosition() {
            return this._world.balls[0].position
        }
        respotIndexDefault(t) {
            const e = this._world.balls;
            this.resetBallPosition(e[t], e[t].spot)
        }
        respotIndexXYZ(t, e, i, s) {
            const n = this._world.balls;
            this.resetBallXYZ(n[t], e, i, s)
        }
        resetBallPosition(t, e) {
            e ? this.resetBallXYZ(t, e.x, e.y, e.z) : (this._world.inactivateBall(t),
            this._nPhxAwakened++)
        }
        step(t) {
            let e = this._world.step(t);
            return this._nPhxAwakened = this._world.nAwakened,
            e
        }
        save() {
            this._world.save()
        }
        predict(t, e) {
            return this._world.predict(this._world.balls[0], t, e)
        }
        getPredictionCtx() {
            return this._world.predictionCtx
        }
        stroke(t) {
            this.clearResult(),
            this._world.shoot(this._world.balls[0], t),
            this._nPhxAwakened++
        }
        clearResult() {
            const t = this._result;
            t.nKissed = 0,
            t.firstKissIndex = 0,
            t.pottedIndices.length = 0,
            t.outOfBoundsIndices.length = 0
        }
        touchBalls(t, e, i) {
            void 0 === i && (i = 1.02 * this.ballRadius);
            const s = i + this.ballRadius
              , n = s * s
              , r = this._world.balls
              , a = h;
            let o;
            for (let i = 0, s = r.length; i !== s; ++i)
                if (o = r[i],
                i !== t && o.active && o.position.distanceToSq(e) < n - a)
                    return !0;
            return !1
        }
        _setState(t) {
            this._state !== t && (this._state = t)
        }
        _err(t) {
            this._setState(n.ERROR),
            this.emit(r.ERROR, new Error(t))
        }
        resetBallXYZ(t, e, i, s) {
            t.reset(e, i, s),
            t.active = !0,
            this._nPhxAwakened++
        }
    }
}
, function(t, e, i) {
    const s = i(13).Vec3
      , n = i(18);
    t.exports = class extends n {
        get radius() {
            return this._radius
        }
        get center() {
            return this._center
        }
        get arcDir() {
            return this._arcDir
        }
        get geoCenter() {
            return this._geoCenter || (this._geoCenter = this._center.clone().addScaled(this._arcDir, .5 * this._radius)),
            this._geoCenter
        }
        get diameterDir() {
            return this._diameterDir
        }
        get diameterA() {
            return this._diameterA
        }
        get diameterB() {
            return this._diameterB
        }
        constructor() {
            super(),
            this._center = new s,
            this._radius = 0,
            this._arcDir = new s,
            this._diameterA = new s,
            this._diameterB = new s,
            this._diameterDir = new s,
            this._geoCenter = null
        }
        resetWithCenterTopNormal(t, e, i, s, n, r, a) {
            this._center.set(t, e, i),
            this.setWithPointNormal(this._center, a),
            this._arcDir.set(s, n, r).sub(this._center),
            this._radius = this._arcDir.length(),
            this._arcDir.normalize(),
            this._diameterDir.crossVectors(a, this._arcDir).normalize(),
            this._diameterA.interpolate(this._center, this._diameterDir, -this._radius),
            this._diameterB.interpolate(this._center, this._diameterDir, this._radius),
            this._geoCenter = null
        }
        projectionInside(t, e, i) {
            if (n.TmpV.set(t, e, i).sub(this._center).dot(this._arcDir) < 0)
                return !1;
            let s = n.TmpV.set(t, e, i)
              , r = this.signedDistance(s);
            return s.addScaled(this.normal, -r).distanceToSq(this._center) <= this._radius * this._radius
        }
        toString() {
            return "{c: " + this._center.toString() + ", n: " + this.normal.toString() + ", radius: " + this._radius + "}"
        }
    }
}
, function(t, e, i) {
    const s = i(18)
      , n = i(13).Vec3;
    t.exports = class extends s {
        get geoCenter() {
            if (!this._geoCenter) {
                const t = this._ps.length;
                if (0 === t)
                    return null;
                let e = new n;
                for (let i = 0, s = t; i !== s; ++i)
                    e.add(this._ps[i]);
                this._geoCenter = e.scale(1 / t)
            }
            return this._geoCenter
        }
        constructor() {
            super(),
            this._ps = [],
            this._edgeXNormals = [],
            this._geoCenter = null
        }
        resetWithAtomPolygon(t) {
            const e = t.edges;
            for (let t = 0, i = e.length; t !== i; ++t) {
                let i = this._ps[t];
                i ? i.copy(e[t].va) : this._ps[t] = e[t].va.clone()
            }
            if (this._ps.length = e.length,
            this._ps.length < 3)
                throw new Error('err polygon3d, ps count < 3: "' + this._ps.length + '"');
            this.setWithPointNormal(this._ps[0], t.normal);
            for (let e = 0, i = t.edgeXNormals.length; e !== i; ++e)
                this._edgeXNormals[e] ? this._edgeXNormals[e].copy(t.edgeXNormals[e]) : this._edgeXNormals[e] = t.edgeXNormals[e].clone();
            this._edgeXNormals.length = t.edgeXNormals.length,
            this._geoCenter = null
        }
        projectionInside(t, e, i) {
            const n = this._ps
              , r = this._edgeXNormals;
            let a, o = null, l = s.TmpV;
            for (var h = 0, c = n.length; h !== c; ++h) {
                if (l.set(t, e, i).sub(n[h]),
                a = r[h].dot(l),
                !(null === o || a > 0 && !0 === o || a <= 0 && !1 === o))
                    return !1;
                null === o && (o = a > 0)
            }
            return !0
        }
    }
}
, function(t, e, i) {
    const s = i(14)
      , n = i(52)
      , r = 65535;
    t.exports = class extends s {
        get validRegionGeoCenter() {
            return this._playArea.geoCenter
        }
        get sysReservedBallOn() {
            return r
        }
        constructor() {
            super(),
            this._sceneId = "",
            this._playArea = new n
        }
        syncAreaWithSimulator(t) {
            this._sceneId !== t.sceneId && (this._sceneId = t.sceneId,
            this._playArea.resetWithAtomPolygon(t.ground))
        }
        intersectionRayValidRegionPlane(t, e, i) {
            return this._playArea.intersectionWithRay(t, e, i, 10)
        }
        projectionInSideValidRegion(t, e, i) {
            return this.projectionOnTable(t, e, i)
        }
        projectionOnTable(t, e, i) {
            return this._playArea.projectionInside(t, e, i)
        }
        resetGContext(t) {
            throw t.inHand = 2,
            t.ballOn = 0,
            new Error("Override me!")
        }
        checkResult(t, e, i) {
            throw new Error("Override me!" + t + e + i)
        }
    }
}
, function(t, e, i) {
    const s = i(30).FoulCode
      , n = i(53)
      , r = i(29)
      , a = i(51)
      , o = i(32)
      , l = i(13).Vec3
      , h = Object.create(null);
    h.RED = 2,
    h.YELLOW = 4,
    h.BLACK = 128,
    h.COLOR_ALL = 252;
    t.exports = class extends n {
        get validRegionGeoCenter() {
            return this._dArea.geoCenter
        }
        constructor() {
            super(),
            this._dArea = new a,
            this._tmpArray = [],
            this._tmpOccupiedSpots = [],
            this._tmpSections = [],
            this._tmpA = new l,
            this._tmpB = new l,
            this._respotColorBallsSortHandler = ((t,e)=>t.number - e.number)
        }
        syncAreaWithSimulator(t) {
            if (this._sceneId !== t.sceneId) {
                this._sceneId = t.sceneId;
                const e = r[this._sceneId].dArea
                  , i = t.ground;
                this._playArea.resetWithAtomPolygon(i),
                this._dArea.resetWithCenterTopNormal(e.cx, i.centerPosition.y, e.cz, e.sx, i.centerPosition.y, e.sz, i.normal)
            }
        }
        intersectionRayValidRegionPlane(t, e, i) {
            return this._dArea.intersectionWithRay(t, e, i, 10)
        }
        projectionInSideValidRegion(t, e, i) {
            return this._dArea.projectionInside(t, e, i)
        }
        resetGContext(t) {
            t.inHand = 2,
            t.ballOn = h.RED
        }
        checkResult(t, e, i) {
            const n = e.result;
            i.score = 0,
            i.foulCode = 0;
            let r = 0
              , a = e.getBallAtIndex(n.firstKissIndex).number;
            if (t.ballOn === this.sysReservedBallOn)
                return this._liveRespot(n.pottedIndices, n.outOfBoundsIndices, e),
                void (t.inHand = 1);
            let o = 0
              , l = 0;
            t.ballOn === h.COLOR_ALL ? a <= 1 ? (i.foulCode |= 0 === a ? s.MISS_TARGET : s.ILLEGAL_FIRST_HIT,
            o = -7) : l = a : Math.pow(2, a) !== t.ballOn ? (i.foulCode |= 0 === a ? s.MISS_TARGET : s.ILLEGAL_FIRST_HIT,
            o = Math.min(-a, -Math.log2(t.ballOn), -4)) : l = a;
            let c = n.outOfBoundsIndices
              , d = 0;
            for (let t = 0, n = c.length; t !== n; ++t) {
                let n = e.getBallAtIndex(c[t]).number;
                d = Math.min(d, -n, -l, -4),
                i.foulCode |= s.OFF_TABLE
            }
            let u = n.pottedIndices
              , _ = 0;
            for (let t = 0, n = u.length; t !== n; ++t) {
                let n = e.getBallAtIndex(u[t]).number;
                0 !== n && n === l ? r += n : (_ = Math.min(_, -n, -l, -4),
                i.foulCode |= 0 === n ? s.POTTING_CUE_BALL : s.ILLEGAL_POTTING)
            }
            let p = Math.min(o, d, _);
            i.score = 0 === p ? r : p,
            t.inHand = 0,
            t.ballOn === h.BLACK && 0 !== i.score ? t.ballOn = 0 : ((i.score <= 0 || t.ballOn === h.RED || t.ballOn === h.COLOR_ALL) && (e.getBallAtIndex(0).active || (t.inHand = 2),
            this._liveRespot(n.pottedIndices, n.outOfBoundsIndices, e)),
            i.score > 0 ? t.ballOn === h.RED ? t.ballOn = h.COLOR_ALL : t.ballOn === h.COLOR_ALL ? t.ballOn = 0 === this._nActiveReds(e) ? h.YELLOW : h.RED : t.ballOn = t.ballOn << 1 : t.ballOn !== h.RED && t.ballOn !== h.COLOR_ALL || (t.ballOn = 0 === this._nActiveReds(e) ? h.YELLOW : h.RED))
        }
        _liveRespot(t, e, i) {
            const s = this._tmpArray;
            let n, r = !1;
            for (let e = 0, a = t.length; e !== a; ++e)
                (n = i.getBallAtIndex(t[e])).number > 1 ? s.push(n) : 0 === n.number && (r = !0);
            for (let t = 0, a = e.length; t !== a; ++t)
                (n = i.getBallAtIndex(e[t])).number > 1 ? s.push(n) : 0 === n.number && (r = !0);
            0 !== s.length && (this._liveRespotColorBalls(s, i),
            s.length = 0),
            r && this._liveRespotCueBall(i)
        }
        _nActiveReds(t) {
            const e = t.getBalls();
            let i = 0;
            for (let t = 0, s = e.length; t !== s; ++t)
                1 === e[t].number && e[t].active && i++;
            return i
        }
        _liveRespotColorBalls(t, e) {
            const i = 1.05 * e.ballRadius
              , s = this._tmpOccupiedSpots;
            let n;
            s.length = 0;
            for (let r = t.length - 1; r >= 0; --r)
                n = t[r],
                e.touchBalls(n.index, n.spot, i) || (t.splice(r, 1),
                e.respotIndexDefault(n.index)),
                s[n.number] = 1;
            if (0 === t.length)
                return;
            t.sort(this._respotColorBallsSortHandler);
            let r = e.getBalls();
            for (let a = r.length - 1; a >= 0 && !((n = r[a]).number < 2); --a) {
                let r = t[t.length - 1].index;
                if (!s[n.number] && !e.touchBalls(r, n.spot, i) && (e.resetBallPosition(t.pop(), n.spot),
                0 === t.length))
                    return
            }
            let a = e.ground
              , h = this._tmpA
              , c = this._tmpB
              , d = this._tmpSections
              , u = l.UNIT_Z;
            for (let s = t.length - 1; s >= 0; --s) {
                let l = (n = t[s]).spot;
                h.set(a.centerPosition.x - a.size.x / 2 + i, l.y, l.z),
                c.set(a.centerPosition.x + a.size.x / 2 - i, l.y, l.z);
                let _ = 10;
                for (; _ > 0 && !o.sectionsBallsAB(r, n, i, h, c, d, u); )
                    h.addScaled(u, d[0]),
                    c.addScaled(u, d[0]),
                    _--;
                if (_ > 0) {
                    let t = o.findClosestTInSections(l.x - h.x, d);
                    e.resetBallXYZ(n, h.x + t, h.y, h.z)
                } else
                    e.resetBallPosition(n, n.spot)
            }
        }
        _liveRespotCueBall(t) {
            const e = 1.05 * t.ballRadius
              , i = t.getBallAtIndex(0);
            if (!t.touchBalls(0, i.spot, e))
                return t.respotIndexDefault(0);
            let s = t.getBalls()
              , n = this._dArea
              , r = this._tmpA.copy(n.diameterA)
              , a = this._tmpB.copy(n.diameterB)
              , l = this._tmpSections
              , h = 0
              , c = n.radius;
            for (r.y = i.spot.y,
            a.y = i.spot.y; !o.sectionsBallsAB(s, i, e, r, a, l, n.arcDir); ) {
                if ((h += l[0]) > c)
                    return void t.respotIndexDefault(0);
                let e = c - Math.sqrt(c * c - h * h);
                r.addScaled(n.arcDir, l[0]).addScaled(n.diameterDir, e),
                a.addScaled(n.arcDir, l[0]).addScaled(n.diameterDir, -e)
            }
            let d = o.findCenterOfLongestInSections(l);
            t.resetBallPosition(i, r.addScaled(n.diameterDir, d))
        }
    }
}
, function(t, e, i) {
    const s = Object.create(null);
    s["std-sno"] = i(54);
    const n = Object.create(null);
    t.exports = {
        getInstance(t) {
            let e = n[t];
            if (void 0 !== e)
                return e;
            const i = s[t];
            if (void 0 !== i)
                return e = new i,
                n[t] = e,
                e;
            throw new Error('Ref not found: "' + t + '"')
        }
    }
}
, function(t, e) {
    t.exports = '<section>\n\t<div>CREATED BY</div>\n\t<div class="author">\n\t\t<a class="name" href="http://www.heyzxz.me" target="_blank">ZHENGXI ZHANG</a>\n\t</div>\n\t<div class="label-value-v">\n\t\t<div class="label">THIS GAME IS POWERED BY</div>\n\t\t<div class="value logo-container">\n\t\t\t<a href="https://www.babylonjs.com/" target="_blank"><div class="bjs-logo"></div></a>\n\t\t</div>\n\t</div>\n\t<p class="para-copy">FOR MORE INFORMATIONS AND BUG REPORT, PLEASE <a href="https://github.com/heyzxz/all-about-pcol" target="_blank">SEE HERE.</a></p>\n</section>\n'
}
, function(t, e) {
    t.exports = '<section class="difficulty-item clickable-section">\n\t<div class="ai-name label-div-420"></div>\n\t<div class="diff-label">\n\t\t<div class="diff-dots"></div>\n\t\t<h3 class="diff-desp"></h3>\n\t</div>\n</section>\n'
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/1d7af82a4bcfa1d965e85bf46a90bb29.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/fea245db64f3c20d58337e086797b65a.png"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/3427c4cbb59a2e2ab0efe1f0ecc91863.babylon"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/1a2152a3740bde223ab5523cc9458021.png"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/50bfb6586540c6eca915efab8949b3fc.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/413ac7b2bf52ce05e45f4f6d8497a651.babylon"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/0b8abbd09ae011d71d4558e0d30e0c85.png"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/fab6def1bc4a56974cd45ffc0be44b25.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/912c4020723463fc80e708a4ed8356cf.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/49d071e163c3ec19a212dd057dad38a1.hdr"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/d6e4cbeb6e1babc3e26cb444422bed49.png"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/5401661d949732feeeb754ef7f93f5be.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/f04dbae40e7d593c7914bf51880dfe87.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/19cfc57b94b49b3ebac00319a7b7a0f0.hdr"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/819e348970711b27f3ad5f5ffeeac62e.hdr"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/154a31248c69da93379562cbf6763238.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/1d6ef5b7e6c568c14684b0458ea0f5f4.png"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/d9ffaafe595fd0df1c3eb7f32b7ece5a.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/dbbde6970d29f635825a2403197b8699.jpg"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/b5198a9d33ee6ddd70a2b62c32cbc866.hdr"
}
, function(t, e, i) {
    t.exports = i.p + "pcol_1_0_0/bccbcdf0859ab8fd3ba7f7adac09c284.png"
}
, function(t, e, i) {
    const s = i(11);
    var n, r = this && this.__extends || (n = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var i in e)
            e.hasOwnProperty(i) && (t[i] = e[i])
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        n(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    ), a = this && this.__decorate || function(t, e, i, s) {
        var n, r = arguments.length, a = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
            a = Reflect.decorate(t, e, i, s);
        else
            for (var o = t.length - 1; o >= 0; o--)
                (n = t[o]) && (a = (r < 3 ? n(a) : r > 3 ? n(e, i, a) : n(e, i)) || a);
        return r > 3 && a && Object.defineProperty(e, i, a),
        a
    }
    ;
    !function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.MAINUV1 = !1,
                e.MAINUV2 = !1,
                e.CHAOTIC = !1,
                e.CHAOTICDIRECTUV = 0,
                e.DIFFUSEBASE = !1,
                e.DIFFUSEBASEDIRECTUV = 0,
                e.DIFFUSEOVERLAY = !1,
                e.DIFFUSEOVERLAYDIRECTUV = 0,
                e.LIGHTMAP = !1,
                e.LIGHTMAPDIRECTUV = 0,
                e.TONEMAPPINGMODE = 0,
                e.CLIPPLANE = !1,
                e.ALPHATEST = !1,
                e.DEPTHPREPASS = !1,
                e.POINTSIZE = !1,
                e.NORMAL = !1,
                e.UV1 = !1,
                e.UV2 = !1,
                e.VERTEXCOLOR = !1,
                e.VERTEXALPHA = !1,
                e.INSTANCES = !1,
                e.PBR = !0,
                e.USEPHYSICALLIGHTFALLOFF = !0,
                e.rebuild(),
                e
            }
            return r(e, t),
            e.prototype.reset = function() {
                t.prototype.reset.call(this),
                this.PBR = !0,
                this.USEPHYSICALLIGHTFALLOFF = !0
            }
            ,
            e
        }(t.MaterialDefines)
          , i = function(i) {
            function s(e, s) {
                var n = i.call(this, e, s) || this;
                return n.diffuseColor = new t.Color3(1,1,1),
                n.reflectivityColor = new t.Color3(.04,.04,.04),
                n._disableLighting = !1,
                n._maxSimultaneousLights = 4,
                n._toneMappingMode = 2,
                n
            }
            return r(s, i),
            s.prototype.getClassName = function() {
                return "PcolCarpetMaterial"
            }
            ,
            s.prototype.needAlphaBlending = function() {
                return this.alpha < 1
            }
            ,
            s.prototype.needAlphaTesting = function() {
                return !1
            }
            ,
            s.prototype.getAlphaTestTexture = function() {
                return null
            }
            ,
            s.prototype.isReadyForSubMesh = function(i, s, n) {
                if (s.effect && this.isFrozen && this._wasPreviouslyReady)
                    return !0;
                s._materialDefines || (s._materialDefines = new e);
                var r = this.getScene()
                  , a = s._materialDefines;
                if (!this.checkReadyOnEveryCall && s.effect && a._renderId === r.getRenderId())
                    return !0;
                var o = r.getEngine();
                if (a._needNormals = t.MaterialHelper.PrepareDefinesForLights(r, i, a, !0, this._maxSimultaneousLights, this._disableLighting),
                a._areTexturesDirty) {
                    if (a._needUVs = !1,
                    a.MAINUV1 = !1,
                    a.MAINUV2 = !1,
                    r.texturesEnabled) {
                        if (this._chaoticTexture) {
                            if (!this._chaoticTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._chaoticTexture, a, "CHAOTIC")
                        } else
                            a.CHAOTIC = !1;
                        if (this._diffuseBaseTexture) {
                            if (!this._diffuseBaseTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._diffuseBaseTexture, a, "DIFFUSEBASE")
                        } else
                            a.DIFFUSEBASE = !1;
                        if (this._diffuseOverlayTexture) {
                            if (!this._diffuseOverlayTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._diffuseOverlayTexture, a, "DIFFUSEOVERLAY")
                        } else
                            a.DIFFUSEOVERLAY = !1;
                        if (this._lightmapTexture) {
                            if (!this._lightmapTexture.isReadyOrNotBlocking())
                                return !1;
                            t.MaterialHelper.PrepareDefinesForMergedUV(this._lightmapTexture, a, "LIGHTMAP")
                        } else
                            a.LIGHTMAP = !1
                    } else
                        a.CHAOTIC = !1,
                        a.DIFFUSEBASE = !1,
                        a.DIFFUSEOVERLAY = !1,
                        a.LIGHTMAP = !1;
                    a.TONEMAPPINGMODE = this._toneMappingMode
                }
                if (a._areMiscDirty && (a.POINTSIZE = this.pointsCloud || r.forcePointsCloud),
                t.MaterialHelper.PrepareDefinesForAttributes(i, a, !0, !1, !1),
                t.MaterialHelper.PrepareDefinesForFrameBoundValues(r, o, a, !!n),
                a.isDirty) {
                    a.markAsProcessed(),
                    r.resetCachedMaterial();
                    var l = new t.EffectFallbacks;
                    t.MaterialHelper.HandleFallbacksForShadows(a, l, this.maxSimultaneousLights);
                    var h = [t.VertexBuffer.PositionKind];
                    a.NORMAL && h.push(t.VertexBuffer.NormalKind),
                    a.UV1 && h.push(t.VertexBuffer.UVKind),
                    a.UV2 && h.push(t.VertexBuffer.UV2Kind),
                    a.VERTEXCOLOR && h.push(t.VertexBuffer.ColorKind),
                    t.MaterialHelper.PrepareAttributesForInstances(h, a);
                    var c = ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor", "vReflectivityColor", "vFogInfos", "vFogColor", "pointSize", "vChaoticInfos", "vDiffuseBaseInfos", "vDiffuseOverlayInfos", "vLightmapInfos", "vClipPlane", "chaoticMatrix", "diffuseBaseMatrix", "diffuseOverlayMatrix", "lightmapMatrix"]
                      , d = ["chaoticSampler", "diffuseBaseSampler", "diffuseOverlaySampler", "lightmapSampler"]
                      , u = ["Material", "Scene"];
                    t.MaterialHelper.PrepareUniformsAndSamplersList({
                        uniformsNames: c,
                        uniformBuffersNames: u,
                        samplers: d,
                        defines: a,
                        maxSimultaneousLights: this.maxSimultaneousLights
                    });
                    var _ = a.toString();
                    s.setEffect(r.getEngine().createEffect("pcolCarpet", {
                        attributes: h,
                        uniformsNames: c,
                        uniformBuffersNames: u,
                        samplers: d,
                        defines: _,
                        fallbacks: l,
                        onCompiled: this.onCompiled,
                        onError: this.onError,
                        indexParameters: {
                            maxSimultaneousLights: this._maxSimultaneousLights
                        }
                    }, o), a),
                    this.buildUniformLayout()
                }
                return !(!s.effect || !s.effect.isReady()) && (a._renderId = r.getRenderId(),
                this._wasPreviouslyReady = !0,
                !0)
            }
            ,
            s.prototype.buildUniformLayout = function() {
                this._uniformBuffer.addUniform("vChaoticInfos", 2),
                this._uniformBuffer.addUniform("vDiffuseBaseInfos", 2),
                this._uniformBuffer.addUniform("vDiffuseOverlayInfos", 2),
                this._uniformBuffer.addUniform("vLightmapInfos", 2),
                this._uniformBuffer.addUniform("chaoticMatrix", 16),
                this._uniformBuffer.addUniform("diffuseBaseMatrix", 16),
                this._uniformBuffer.addUniform("diffuseOverlayMatrix", 16),
                this._uniformBuffer.addUniform("lightmapMatrix", 16),
                this._uniformBuffer.addUniform("vDiffuseColor", 4),
                this._uniformBuffer.addUniform("vReflectivityColor", 3),
                this._uniformBuffer.addUniform("pointSize", 1),
                this._uniformBuffer.create()
            }
            ,
            s.prototype.bindForSubMesh = function(e, i, s) {
                var n = this.getScene()
                  , r = s._materialDefines;
                if (r) {
                    var a = s.effect;
                    if (a) {
                        this._activeEffect = a,
                        this.bindOnlyWorldMatrix(e);
                        var o = this._mustRebind(n, a, i.visibility);
                        if (o) {
                            this._uniformBuffer.bindToEffect(a, "Material"),
                            this.bindViewProjection(a),
                            this._uniformBuffer.useUbo && this.isFrozen && this._uniformBuffer.isSync || (n.texturesEnabled && (this._chaoticTexture && (this._uniformBuffer.updateFloat2("vChaoticInfos", this._chaoticTexture.coordinatesIndex, this._chaoticTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._chaoticTexture, this._uniformBuffer, "chaotic")),
                            this._diffuseBaseTexture && (this._uniformBuffer.updateFloat2("vDiffuseBaseInfos", this._diffuseBaseTexture.coordinatesIndex, this._diffuseBaseTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._diffuseBaseTexture, this._uniformBuffer, "diffuseBase")),
                            this._diffuseOverlayTexture && (this._uniformBuffer.updateFloat2("vDiffuseOverlayInfos", this._diffuseOverlayTexture.coordinatesIndex, this._diffuseOverlayTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._diffuseOverlayTexture, this._uniformBuffer, "diffuseOverlay")),
                            this._lightmapTexture && (this._uniformBuffer.updateFloat2("vLightmapInfos", this._lightmapTexture.coordinatesIndex, this._lightmapTexture.level),
                            t.MaterialHelper.BindTextureMatrix(this._lightmapTexture, this._uniformBuffer, "lightmap"))),
                            this.pointsCloud && this._uniformBuffer.updateFloat("pointSize", this.pointSize),
                            this._uniformBuffer.updateColor4("vDiffuseColor", this.diffuseColor, this.alpha * i.visibility),
                            this._uniformBuffer.updateColor3("vReflectivityColor", this.reflectivityColor)),
                            n.texturesEnabled && (this._chaoticTexture && a.setTexture("chaoticSampler", this._chaoticTexture),
                            this._diffuseBaseTexture && a.setTexture("diffuseBaseSampler", this._diffuseBaseTexture),
                            this._diffuseOverlayTexture && a.setTexture("diffuseOverlaySampler", this._diffuseOverlayTexture),
                            this._lightmapTexture && a.setTexture("lightmapSampler", this._lightmapTexture)),
                            t.MaterialHelper.BindClipPlane(a, n);
                            var l = n._forcedViewPosition ? n._forcedViewPosition : n._mirroredCameraPosition ? n._mirroredCameraPosition : n.activeCamera.globalPosition
                              , h = n.useRightHandedSystem === (null != n._mirroredCameraPosition);
                            a.setFloat4("vEyePosition", l.x, l.y, l.z, h ? -1 : 1)
                        }
                        !o && this.isFrozen || n.lightsEnabled && !this._disableLighting && t.MaterialHelper.BindLights(n, i, a, r, this._maxSimultaneousLights),
                        this._uniformBuffer.update(),
                        this._afterBind(i, this._activeEffect)
                    }
                }
            }
            ,
            s.prototype.getAnimatables = function() {
                var t = [];
                return this._chaoticTexture && this._chaoticTexture.animations && this._chaoticTexture.animations.length > 0 && t.push(this._chaoticTexture),
                this._diffuseBaseTexture && this._diffuseBaseTexture.animations && this._diffuseBaseTexture.animations.length > 0 && t.push(this._diffuseBaseTexture),
                this._diffuseOverlayTexture && this._diffuseOverlayTexture.animations && this._diffuseOverlayTexture.animations.length > 0 && t.push(this._diffuseOverlayTexture),
                this._lightmapTexture && this._lightmapTexture.animations && this._lightmapTexture.animations.length > 0 && t.push(this._lightmapTexture),
                t
            }
            ,
            s.prototype.getActiveTextures = function() {
                var t = i.prototype.getActiveTextures.call(this);
                return this._chaoticTexture && t.push(this._chaoticTexture),
                this._diffuseBaseTexture && t.push(this._diffuseBaseTexture),
                this._diffuseOverlayTexture && t.push(this._diffuseOverlayTexture),
                this._lightmapTexture && t.push(this._lightmapTexture),
                t
            }
            ,
            s.prototype.hasTexture = function(t) {
                return !!i.prototype.hasTexture.call(this, t) || (this._chaoticTexture === t || (this._diffuseBaseTexture === t || (this._diffuseOverlayTexture === t || this._lightmapTexture === t)))
            }
            ,
            s.prototype.dispose = function(t, e) {
                e && (this._chaoticTexture && this._chaoticTexture.dispose(),
                this._diffuseBaseTexture && this._diffuseBaseTexture.dispose(),
                this._diffuseOverlayTexture && this._diffuseOverlayTexture.dispose(),
                this._lightmapTexture && this._lightmapTexture.dispose()),
                i.prototype.dispose.call(this, t, e)
            }
            ,
            s.prototype.clone = function(e) {
                var i = this
                  , n = t.SerializationHelper.Clone(function() {
                    return new s(e,i.getScene())
                }, this);
                return n.name = e,
                n.id = e,
                n
            }
            ,
            s.prototype.serialize = function() {
                return t.SerializationHelper.Serialize(this)
            }
            ,
            s.Parse = function(e, i, n) {
                return t.SerializationHelper.Parse(function() {
                    return new s(e.name,i)
                }, e, i, n)
            }
            ,
            a([t.serializeAsTexture("chaoticTexture")], s.prototype, "_chaoticTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "chaoticTexture", void 0),
            a([t.serializeAsTexture("diffuseBaseTexture")], s.prototype, "_diffuseBaseTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "diffuseBaseTexture", void 0),
            a([t.serializeAsTexture("diffuseOverlayTexture")], s.prototype, "_diffuseOverlayTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "diffuseOverlayTexture", void 0),
            a([t.serializeAsTexture("lightmapTexture")], s.prototype, "_lightmapTexture", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "lightmapTexture", void 0),
            a([t.serializeAsColor3("diffuse")], s.prototype, "diffuseColor", void 0),
            a([t.serializeAsColor3("reflectivity")], s.prototype, "reflectivityColor", void 0),
            a([t.serialize("disableLighting")], s.prototype, "_disableLighting", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsLightsDirty")], s.prototype, "disableLighting", void 0),
            a([t.serialize("maxSimultaneousLights")], s.prototype, "_maxSimultaneousLights", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsLightsDirty")], s.prototype, "maxSimultaneousLights", void 0),
            a([t.serialize("toneMappingMode")], s.prototype, "_toneMappingMode", void 0),
            a([t.expandToProperty("_markAllSubMeshesAsTexturesDirty")], s.prototype, "toneMappingMode", void 0),
            s
        }(t.PushMaterial);
        t.PcolCarpetMaterial = i
    }(s || (s = {})),
    s.Effect.ShadersStore.pcolCarpetVertexShader = "#include<__decl__pcolCarpetVertex>\n\nattribute vec3 position;\n#ifdef NORMAL\nattribute vec3 normal;\n#endif\n#ifdef UV1\nattribute vec2 uv;\n#endif\n#ifdef UV2\nattribute vec2 uv2;\n#endif\n#ifdef VERTEXCOLOR\nattribute vec4 color;\n#endif\n\n#include<instancesDeclaration>\n#ifdef MAINUV1\nvarying vec2 vMainUV1;\n#endif\n#ifdef MAINUV2\nvarying vec2 vMainUV2;\n#endif\n#if defined(CHAOTIC) && CHAOTICDIRECTUV == 0\nvarying vec2 vChaoticUV;\n#endif\n#if defined(DIFFUSEBASE) && DIFFUSEBASEDIRECTUV == 0\nvarying vec2 vDiffuseBaseUV;\n#endif\n#if defined(DIFFUSEOVERLAY) && DIFFUSEOVERLAYDIRECTUV == 0\nvarying vec2 vDiffuseOverlayUV;\n#endif\n#if defined(LIGHTMAP) && LIGHTMAPDIRECTUV == 0\nvarying vec2 vLightmapUV;\n#endif\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#include<clipPlaneVertexDeclaration>\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\nvoid main(void) {\n#include<instancesVertex>\ngl_Position=viewProjection*finalWorld*vec4(position,1.0);\nvec4 worldPos=finalWorld*vec4(position,1.0);\nvPositionW=vec3(worldPos);\n#ifdef NORMAL\nvNormalW=normalize(vec3(finalWorld*vec4(normal,0.0)));\n#endif\n\n#ifndef UV1\nvec2 uv=vec2(0.,0.);\n#endif\n#ifndef UV2\nvec2 uv2=vec2(0.,0.);\n#endif\n#ifdef MAINUV1\nvMainUV1=uv;\n#endif\n#ifdef MAINUV2\nvMainUV2=uv2;\n#endif\n#if defined(CHAOTIC) && CHAOTICDIRECTUV == 0\nif (vChaoticInfos.x == 0.){\nvChaoticUV=vec2(chaoticMatrix*vec4(uv,1.0,0.0));\n}else{\nvChaoticUV=vec2(chaoticMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#if defined(DIFFUSEBASE) && DIFFUSEBASEDIRECTUV == 0\nif (vDiffuseBaseInfos.x == 0.){\nvDiffuseBaseUV=vec2(diffuseBaseMatrix*vec4(uv,1.0,0.0));\n}else{\nvDiffuseBaseUV=vec2(diffuseBaseMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#if defined(DIFFUSEOVERLAY) && DIFFUSEOVERLAYDIRECTUV == 0\nif (vDiffuseOverlayInfos.x == 0.){\nvDiffuseOverlayUV=vec2(diffuseOverlayMatrix*vec4(uv,1.0,0.0));\n}else{\nvDiffuseOverlayUV=vec2(diffuseOverlayMatrix*vec4(uv2,1.0,0.0));\n}\n#endif\n#if defined(LIGHTMAP) && LIGHTMAPDIRECTUV == 0\nif (vLightmapInfos.x == 0.){\nvLightmapUV=vec2( lightmapMatrix*vec4(uv,1.0,0.0) );\n}else{\nvLightmapUV=vec2( lightmapMatrix*vec4(uv2,1.0,0.0) );\n}\n#endif\n\n#include<clipPlaneVertex>\n#include<shadowsVertex>[0..maxSimultaneousLights]\n\n#ifdef VERTEXCOLOR\nvColor=color;\n#endif\n#include<pointCloudVertex>\n}\n",
    s.Effect.ShadersStore.pcolCarpetPixelShader = "#if defined(CHAOTIC) || !defined(NORMAL)\n#extension GL_OES_standard_derivatives : enable\n#endif\n#include<__decl__pcolCarpetFragment>\n\nuniform vec4 vEyePosition;\n\nvarying vec3 vPositionW;\n#ifdef NORMAL\nvarying vec3 vNormalW;\n#endif\n#ifdef VERTEXCOLOR\nvarying vec4 vColor;\n#endif\n#ifdef MAINUV1\nvarying vec2 vMainUV1;\n#endif\n#ifdef MAINUV2\nvarying vec2 vMainUV2;\n#endif\n\n#include<helperFunctions>\n#include<pbrFunctions>\n\n#include<__decl__lightFragment>[0..maxSimultaneousLights]\n#include<pbrLightFunctions>\n#include<shadowsFragmentFunctions>\n\n#ifdef CHAOTIC\n#if CHAOTICDIRECTUV == 1\n#define vChaoticUV vMainUV1\n#elif CHAOTICDIRECTUV == 2\n#define vChaoticUV vMainUV2\n#else\nvarying vec2 vChaoticUV;\n#endif\nuniform sampler2D chaoticSampler;\n#endif\n#ifdef DIFFUSEBASE\n#if DIFFUSEBASEDIRECTUV == 1\n#define vDiffuseBaseUV vMainUV1\n#elif DIFFUSEBASEDIRECTUV == 2\n#define vDiffuseBaseUV vMainUV2\n#else\nvarying vec2 vDiffuseBaseUV;\n#endif\nuniform sampler2D diffuseBaseSampler;\n#endif\n#ifdef DIFFUSEOVERLAY\n#if DIFFUSEOVERLAYDIRECTUV == 1\n#define vDiffuseOverlayUV vMainUV1\n#elif DIFFUSEOVERLAYDIRECTUV == 2\n#define vDiffuseOverlayUV vMainUV2\n#else\nvarying vec2 vDiffuseOverlayUV;\n#endif\nuniform sampler2D diffuseOverlaySampler;\n#endif\n#ifdef LIGHTMAP\n#if LIGHTMAPDIRECTUV == 1\n#define vLightmapUV vMainUV1\n#elif LIGHTMAPDIRECTUV == 2\n#define vLightmapUV vMainUV2\n#else\nvarying vec2 vLightmapUV;\n#endif\nuniform sampler2D lightmapSampler;\n#endif\n#include<clipPlaneFragmentDeclaration>\nconst vec3 axisY=vec3(0.0,1.0,0.0);\nconst vec3 white=vec3(1.0,1.0,1.0);\nmat3 cotangent_frame(vec3 normal,vec3 p,vec2 uv){\n\nuv=gl_FrontFacing ? uv : -uv;\n\nvec3 dp1=dFdx(p);\nvec3 dp2=dFdy(p);\nvec2 duv1=dFdx(uv);\nvec2 duv2=dFdy(uv);\n\nvec3 dp2perp=cross(dp2,normal);\nvec3 dp1perp=cross(normal,dp1);\nvec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;\nvec3 bitangent=dp2perp*duv1.y+dp1perp*duv2.y;\n\nfloat invmax=inversesqrt(max(dot(tangent,tangent),dot(bitangent,bitangent)));\nreturn mat3(tangent*invmax,bitangent*invmax,normal);\n}\n\n\nvec3 toneMappingACES( vec3 color) {\nconst float A=2.51;\nconst float B=0.03;\nconst float C=2.43;\nconst float D=0.59;\nconst float E=0.14;\nreturn (color*(A*color+B))/(color*(C*color+D)+E);\n}\nvoid main(void) {\n#include<clipPlaneFragment>\n\nvec3 viewDirectionW=normalize(vEyePosition.xyz-vPositionW);\n\n\nvec3 surfaceAlbedo=vDiffuseColor.rgb;\nfloat alpha=vDiffuseColor.a;\n#ifdef DIFFUSEOVERLAY\nvec4 overlayTexture=texture2D(diffuseOverlaySampler,vDiffuseOverlayUV);\nfloat overlayMixFactor=overlayTexture.a*vDiffuseOverlayInfos.y;\nsurfaceAlbedo=mix( surfaceAlbedo,toLinearSpace(overlayTexture.rgb),overlayMixFactor );\n#endif\n\n\n#ifdef VERTEXCOLOR\nsurfaceAlbedo*=vColor.rgb;\n#endif\n#ifdef VERTEXALPHA\nalpha*=vColor.a;\n#endif\n\n\n#ifdef ALPHATEST\nif (alpha<=0.4)discard;\n#endif\n\n\n#ifdef NORMAL\n#ifdef CHAOTIC\nmat3 transform=cotangent_frame(vNormalW,vPositionW,vChaoticUV );\nvec3 normalOffset=texture2D(chaoticSampler,vChaoticUV).rgb*2.0-1.0;\n\nconst vec3 normalOffset0=vec3(0.0,0.0,1.0);\nnormalOffset=mix(normalOffset0,normalOffset,vChaoticInfos.y);\nvec3 normalW=normalize( transform*normalOffset )*-vEyePosition.w;\n#else\nvec3 normalW=normalize(vNormalW)*-vEyePosition.w;\n#endif\n#else\n#ifdef CHAOTIC\nvec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW));\nmat3 transform=cotangent_frame(normalW,vPositionW,vChaoticUV );\nvec3 normalOffset=texture2D(chaoticSampler,vChaoticUV).rgb*2.0-1.0;\nnormalW=normalize( transform*normalOffset )*-vEyePosition.w;\n#else\nvec3 normalW=normalize(cross(dFdx(vPositionW),dFdy(vPositionW)))*-vEyePosition.w;\n#endif\n#endif\n\n\n\nfloat NdotVUnclamped=dot( normalW,viewDirectionW );\nfloat NdotV=clamp(NdotVUnclamped,0.,1.)+0.00001;\nfloat reflectance=max(max(vReflectivityColor.r,vReflectivityColor.g),vReflectivityColor.b);\nvec3 specularEnvironmentR0=vReflectivityColor;\nvec3 specularEnvironmentR90=vec3(1.0);\n\nvec3 diffuseBase=vec3(0.,0.,0.);\n#ifdef SPECULARTERM\nvec3 specularBase=vec3(0.,0.,0.);\n#endif\nlightingInfo info;\nfloat shadow=1.;\nfloat roughness=1.0;\nfloat NdotL=-1.;\n\nfloat geometricRoughnessFactor=0.;\n\n#include<lightFragment>[0..maxSimultaneousLights]\n#ifdef DIFFUSEBASE\nvec3 diffuseBaseTexture=toLinearSpace(texture2D(diffuseBaseSampler,vDiffuseBaseUV).rgb);\ndiffuseBase*=mix( white,diffuseBaseTexture,vDiffuseBaseInfos.y);\n#ifdef SPECULARTERM\n\nspecularBase*=diffuseBaseTexture*2.0;\n#endif\n#endif\n\n\n#ifdef LIGHTMAP\nvec3 lightmapColor=texture2D(lightmapSampler,vLightmapUV).rgb;\n\n\ndiffuseBase+=lightmapColor.b;\ndiffuseBase*=lightmapColor.g;\n#ifdef SPECULARTERM\n\nreflectance*=(1.0-lightmapColor.r);\nspecularBase*=lightmapColor.g*(1.0-lightmapColor.r);\n#endif\n#endif\n\n\nvec3 finalDiffuse=max(diffuseBase*surfaceAlbedo*(1.0-reflectance),0.0);\n\n\nvec3 final=finalDiffuse;\n#ifdef SPECULARTERM\nfinal+=specularBase;\n#endif\n\n#if TONEMAPPINGMODE == 3\nfinal=toneMappingACES( final );\n#elif TONEMAPPINGMODE == 2\nconst float tonemappingCalibration=1.590579;\nfinal=1.0-exp2(-tonemappingCalibration*final);\n#elif TONEMAPPINGMODE == 1\nfinal=final/(final+vec3(1.0));\n#endif\n\nfinal=toGammaSpace( final );\ngl_FragColor=vec4( final,alpha );\n}\n",
    s.Effect.IncludesShadersStore.pcolCarpetFragmentDeclaration = "uniform vec4 vDiffuseColor;\nuniform vec3 vReflectivityColor;\n\n#ifdef CHAOTIC\nuniform vec2 vChaoticInfos;\n#endif\n#ifdef DIFFUSEBASE\nuniform vec2 vDiffuseBaseInfos;\n#endif\n#ifdef DIFFUSEOVERLAY\nuniform vec2 vDiffuseOverlayInfos;\n#endif\n#ifdef LIGHTMAP\nuniform vec2 vLightmapInfos;\n#endif",
    s.Effect.IncludesShadersStore.pcolCarpetUboDeclaration = "layout(std140,column_major) uniform;\nuniform Material\n{\nvec2 vChaoticInfos;\nvec2 vDiffuseBaseInfos;\nvec2 vDiffuseOverlayInfos;\nvec2 vLightmapInfos;\nmat4 chaoticMatrix;\nmat4 diffuseBaseMatrix;\nmat4 diffuseOverlayMatrix;\nmat4 lightmapMatrix;\nvec4 vDiffuseColor;\nvec3 vReflectivityColor;\nfloat pointSize; \n};\nuniform Scene {\nmat4 viewProjection;\nmat4 view;\n};",
    s.Effect.IncludesShadersStore.pcolCarpetVertexDeclaration = "\nuniform mat4 viewProjection;\nuniform mat4 view;\n#ifdef CHAOTIC\nuniform mat4 chaoticMatrix;\nuniform vec2 vChaoticInfos;\n#endif\n#ifdef DIFFUSEBASE\nuniform mat4 diffuseBaseMatrix;\nuniform vec2 vDiffuseBaseInfos;\n#endif\n#ifdef DIFFUSEOVERLAY\nuniform mat4 diffuseOverlayMatrix;\nuniform vec2 vDiffuseOverlayInfos;\n#endif\n#ifdef LIGHTMAP\nuniform mat4 lightmapMatrix;\nuniform vec2 vLightmapInfos;\n#endif\n#ifdef POINTSIZE\nuniform float pointSize;\n#endif"
}
, function(t, e, i) {
    const s = i(12)
      , n = s.EPSILON;
    function r(t) {
        const e = t.width
          , i = t.height;
        let s = [];
        for (let n = i - 1; n >= 0; --n) {
            let i = n * e
              , r = new Float32Array(3 * e);
            for (let s = 0; s < e; ++s) {
                let e = 4 * (i + s)
                  , n = t.data[e]
                  , a = t.data[e + 1]
                  , o = t.data[e + 2];
                r[3 * s] = 2 * (n / 255 - .5),
                r[3 * s + 1] = 2 * (o / 255 - .5),
                r[3 * s + 2] = 2 * -(a / 255 - .5)
            }
            s.push(r)
        }
        this.array2D = s,
        this.maxRow = e - 1,
        this.maxLine = i - 1
    }
    r.prototype.getNormalByUV = function(t, e, i) {
        let s = Math.floor(e * this.maxLine)
          , n = 3 * Math.floor(t * this.maxRow)
          , r = this.array2D;
        i.set(r[s][n], r[s][n + 1], r[s][n + 2])
    }
    ;
    const a = function(t) {
        if (4 !== t.edges.length)
            throw new Error("validateUV4Poly Error: error edge count: " + t.edges.length);
        if (!t.uv)
            throw new Error("validateUV4Poly Error: uv not found for poly: " + t.uid);
        if (8 !== t.uv.length)
            throw new Error("validateUV4Poly Error: error uv count: " + t.uv.length);
        return !0
    }
      , o = function(t) {
        const e = n;
        let i = t.edges
          , r = null
          , a = null
          , o = 0;
        for (let s = 0, n = i.length; s !== n; ++s) {
            let l = i[s].vab;
            if (Math.abs(l.y) <= e && t.edgeXNormals[s].y > e) {
                o = s,
                r = i[s],
                a = s === n - 1 ? i[0] : i[s + 1];
                break
            }
        }
        if (!r)
            throw new Error("setUVLonLat Error: No right edge found for poly: " + t.uid);
        let l = r.va.distanceTo(r.vb)
          , h = a.va.distanceTo(a.vb);
        t.lonLatOrigin = r.va,
        t.lonDir = (new s).normalizeVector(r.vab),
        t.lon = l,
        t.lat = h,
        t.u0 = t.uv[2 * o],
        t.v0 = t.uv[2 * o + 1],
        o = 3 === o ? 0 : o + 1,
        t.uChange = t.uv[2 * o] - t.u0,
        o = 3 === o ? 0 : o + 1,
        t.vChange = t.uv[2 * o + 1] - t.v0
    }
      , l = function() {
        let t = new s;
        return function(e, i) {
            let s = this.lonLatOrigin;
            t.subVectors(e, s);
            let n = t.dot(this.lonDir)
              , r = this.u0 + n / this.lon * this.uChange
              , a = this.v0 + (e.y - s.y) / this.lat * this.vChange;
            r > 1 ? r = 1 : r < 0 && (r = 0),
            a > 1 ? a = 1 : a < 0 && (a = 0),
            this.nTable.getNormalByUV(r, a, i)
        }
    }();
    t.exports = {
        createNTableWithImgData: function(t) {
            return new r(t)
        },
        extendPolyGroup: function(t, e) {
            let i = t.polys;
            for (let t = 0, s = i.length; t !== s; ++t) {
                let s = i[t];
                a(s),
                o(s),
                s.nTable = e,
                s.hasCustomNormalHandler = !0,
                s.customNormalHandler = l.bind(s)
            }
        }
    }
}
, function(t, e, i) {
    const s = i(16);
    t.exports = class {
        constructor(t, e) {
            this.name = t,
            this.polys = e
        }
        getPolygonByID(t) {
            let e = this.polys;
            for (let i = 0, s = e.length; i !== s; ++i)
                if (e[i].uid === t)
                    return e[i];
            return null
        }
        setCollisionGroup(t) {
            let e = this.polys;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].collisionGroup = t
        }
        setPolyFrictionAndRestitution() {
            let t = this.polys;
            for (let e = 0, i = t.length; e !== i; ++e)
                s.setPolyFrictionAndRestitution(t[e])
        }
        setCustomRelativeVelHandler(t) {
            let e = this.polys;
            for (let i = 0, s = e.length; i !== s; ++i)
                e[i].setCustomRelativeVelHandler(t)
        }
    }
}
, function(t, e, i) {
    const s = i(12);
    t.exports = class {
        get label() {
            return this.uid + ": ground:" + !!this.ground + ", sidesoft:" + !!this.sidesoft + ", sidehard:" + !!this.sidehard + ", tunnel:" + !!this.tunnel + ", pocket:" + !!this.pocket
        }
        get size() {
            if (!this._size) {
                let t = Number.MAX_VALUE
                  , e = 0
                  , i = Number.MAX_VALUE
                  , n = 0
                  , r = Number.MAX_VALUE
                  , a = 0
                  , o = this.edges;
                for (let s = 0, l = o.length; s !== l; ++s) {
                    let l = o[s].va;
                    t > l.x && (t = l.x),
                    e < l.x && (e = l.x),
                    i > l.y && (i = l.y),
                    n < l.y && (n = l.y),
                    r > l.z && (r = l.z),
                    a < l.z && (a = l.z)
                }
                this._size = new s(e - t,n - i,a - r)
            }
            return this._size
        }
        constructor(t, e) {
            this.ground = !1,
            this.sidesoft = !1,
            this.sidehard = !1,
            this.pocket = !1,
            this.tunnel = !1,
            this.end = !1,
            this.uid = -1,
            this.normal = t,
            this.edges = e,
            this.edgeXNormals = [];
            let i = 0
              , n = 0
              , r = 0
              , a = this.edges.length;
            for (let t = 0, e = a; t !== e; ++t)
                this.edgeXNormals[t] = new s,
                this.edgeXNormals[t].crossVectors(this.edges[t].vab, this.normal),
                i += this.edges[t].va.x,
                n += this.edges[t].va.y,
                r += this.edges[t].va.z;
            this.centerPosition = new s(i / a,n / a,r / a),
            this.a = this.normal.x,
            this.b = this.normal.y,
            this.c = this.normal.z,
            this.d = -this.normal.dot(this.edges[0].va),
            this.bCenter = null,
            this.bR = 0,
            this.bRSq = 0,
            this.restitution = 0,
            this.friction = 0,
            this.collisionGroup = 1,
            this.uv = null,
            this._size = null
        }
        toString() {
            return this.a + "x + " + this.b + "y + " + this.c + "z + " + this.d + " = 0,restitution:" + this.restitution + ",bCenter: " + this.bCenter + ",bR:" + this.bR
        }
        toStringShort() {
            var t = "uid: " + this.uid;
            return this.ground && (t = t.concat(", ground")),
            this.sidesoft && (t = t.concat(", sidesoft")),
            this.sidehard && (t = t.concat(", sidehard")),
            this.pocket && (t = t.concat(", pocket")),
            this.tunnel && (t = t.concat(", tunnel")),
            this.end && (t = t.concat(", end")),
            t = t.concat(", restitution: " + this.restitution + ", friction: " + this.friction + ", cg: " + this.collisionGroup)
        }
        setBoundingSphere(t, e) {
            this.bCenter = t,
            this.bR = e,
            this.bRSq = e * e
        }
        distanceFromPointToPlane(t) {
            return this.a * t.x + this.b * t.y + this.c * t.z + this.d
        }
        dispose() {
            this.normal = null,
            this.edges = null,
            this.edgeXNormals = null,
            this.bCenter = null,
            this.bR = 0
        }
    }
}
, function(t, e, i) {
    const s = i(12);
    function n(t, e, i) {
        this.va = t,
        this.vb = e,
        this.vab = new s,
        this.vab.subVectors(e, t),
        this.abDotAb = this.vab.dot(this.vab),
        this.sharedData = i || {
            count: 0
        },
        this.sharedData.count++
    }
    n.prototype.cloneReversed = function() {
        return new n(this.vb,this.va,this.sharedData)
    }
    ,
    t.exports = n
}
, function(t, e, i) {
    const s = i(12)
      , n = i(83)
      , r = i(82)
      , a = i(81)
      , o = {
        ground: 0,
        side: 1,
        tunnel: 2
    }
      , l = {
        ground: 2,
        side: 4,
        tunnel: 8
    };
    t.exports = class {
        get ground() {
            return this._groundPolygon
        }
        constructor(t) {
            this.groups = [],
            this._groundPolygon = null,
            this.lowestPosition = new s(0,Number.MAX_VALUE,0),
            this.initData(t)
        }
        getGroupByName(t) {
            let e = this.groups;
            for (let i = 0, s = e.length; i !== s; ++i)
                if (e[i].name === t)
                    return e[i];
            return null
        }
        getPolygonByID(t) {
            let e = this.groups;
            for (let i = 0, s = e.length; i !== s; ++i) {
                let s = e[i].getPolygonByID(t);
                if (s)
                    return s
            }
            return null
        }
        slice(t) {
            let e = []
              , i = this.groups;
            for (let s = 0, n = i.length; s !== n; ++s)
                i[s].name === t && e.push(i[s]);
            let s = Object.create(null);
            return s.groups = e,
            s
        }
        initData(t) {
            let e = this.groups;
            this.nPolygons = 0,
            this.nEdges = 0;
            for (let i in t) {
                let s = new a(i,this.dataToPolys(t[i]));
                s.setCollisionGroup(l[i] || 1),
                s.setPolyFrictionAndRestitution(),
                e.push(s)
            }
            e.sort(function(t, e) {
                return o[t.name] - o[e.name]
            })
        }
        dataToPolys(t) {
            let e = t.p
              , i = [];
            for (let t = 0, n = e.length / 3; t !== n; ++t)
                i.push(new s(e[3 * t],e[3 * t + 1],e[3 * t + 2]));
            let a, o, l = t.q, h = [], c = {};
            for (let t = 0, e = l.length; t !== e; ++t) {
                let e = l[t]
                  , d = e.i;
                if (d.length < 3)
                    throw new Error("PolyGroup Error: invalid indices length" + d.length);
                let u, _, p = [];
                for (let t = 0, e = d.length; t !== e; ++t)
                    c[u = (a = d[t]) + "-" + (o = d[(t + 1) % e])] ? p.push(c[u]) : c[_ = o + "-" + a] ? p.push(c[_].cloneReversed()) : (c[u] = new n(i[a],i[o]),
                    this.nEdges++,
                    p.push(c[u]));
                let f = new r(new s(e.n[0],e.n[1],e.n[2]),p);
                e.uv && (f.uv = e.uv),
                f.uid = this.nPolygons++,
                e.s && f.setBoundingSphere(new s(e.s[0],e.s[1],e.s[2]), e.s[3]);
                let g = e.f;
                if (g)
                    for (let t = 0, e = g.length; t !== e; ++t)
                        f[g[t]] = !0;
                f.ground && (this._groundPolygon = f),
                f.centerPosition.y < this.lowestPosition.y && this.lowestPosition.copy(f.centerPosition),
                h.push(f)
            }
            return i.length = 0,
            i = null,
            h
        }
        log() {
            let t = this.groups
              , e = "";
            for (let i = 0, s = t.length; i !== s; ++i) {
                e = e.concat(t[i].name + "\n");
                for (let s = 0, n = t[i].polys.length; s !== n; ++s)
                    e = e.concat("\t" + s + ": " + t[i].polys[s].toStringShort() + "\n")
            }
            console.log(e)
        }
    }
}
, function(t, e, i) {
    "use strict";
    const s = i(21)
      , n = i(12).EPSILON;
    class r extends s {
        constructor() {
            super(),
            this.callback = null,
            this.interrupt = !1
        }
        reset(t) {
            this.callback = t
        }
        solveList(t, e) {
            if (this.interrupt)
                return;
            let i = t.entry;
            if (e)
                for (; i; ) {
                    if (this.solveIsland(i),
                    this.interrupt)
                        return;
                    i = i.next
                }
            else
                for (; i; ) {
                    if (i.dirty && (this.solveIsland(i),
                    this.interrupt))
                        return;
                    i = i.next
                }
        }
        solveIsland(t) {
            t.dirty = !1;
            for (let e = 0, i = this.maxIter; e !== i && !this._solveMostUrgentChildren(t); ++e)
                ;
            this._sloveChildrenPene(t)
        }
        _solveMostUrgentChildren(t) {
            const e = n;
            let i, s, r, a;
            if (1 === t.totalItems)
                return !((i = t.itemEntry).getCloseSpeed() < -e && (this.solveContact(i),
                this.callback(i))) || (this.interrupt = !0,
                !0);
            for (let n = 0, o = t.totalItems; n !== o; ++n) {
                for (i = t.itemEntry,
                s = 0,
                a = null; i; )
                    (r = i.getCloseSpeed()) < s && (s = r,
                    a = i),
                    i = i.next;
                if (!(a && s < -e))
                    return !0;
                if (this.solveContact(a),
                this.callback(a))
                    return this.interrupt = !0,
                    !0
            }
            return !1
        }
    }
    r.sharedInstance = new r,
    t.exports = r
}
, function(t, e, i) {
    const s = i(37)
      , n = i(12)
      , r = i(17);
    t.exports = class extends s {
        get label() {
            return "tip"
        }
        constructor(t) {
            super(null, 0),
            this.isSS = !1,
            this.restitution = 0,
            this.friction = .9,
            this.bj = {
                v: new n(0,0,0),
                w: new n(0,0,0),
                radius: 0,
                mass: t,
                invMass: t > 0 ? 1 / t : 0,
                invInertia: (new r).set(0, 0, 0, 0, 0, 0, 0, 0, 0)
            }
        }
        resetTip(t, e) {
            this.bi = t;
            let i = this.bj;
            i.radius = e[7],
            i.v.set(e[3], e[4], e[5]).scale(e[6]);
            let s = t.position;
            this._normal.set(s.x - e[0], s.y - e[1], s.z - e[2]).normalize(),
            this.markNormalRelatedDirty()
        }
        free() {
            this.bi = null
        }
        dispose() {
            this.bi = null,
            this.bj = null
        }
    }
}
, function(t, e) {
    t.exports = class {
        get avg() {
            return this.counter ? this.counter > this.length ? this.sum / this.length : this.sum / this.counter : 0
        }
        constructor(t) {
            this.a = new Float32Array(t),
            this.counter = 0,
            this.length = t,
            this.sum = 0,
            this.current = 0,
            this.peak = 0
        }
        push(t) {
            this.sum += t;
            let e = this.counter++ % this.length
              , i = this.a[e];
            this.sum -= i,
            this.a[e] = t,
            this.current = t,
            i >= this.peak - 1e-5 && (this.peak = this.updatePeak()),
            t > this.peak && (this.peak = t)
        }
        updatePeak() {
            let t = this.a
              , e = Number.NEGATIVE_INFINITY;
            for (let i = 0, s = t.length; i !== s; ++i)
                t[i] > e && (e = t[i]);
            return e
        }
    }
}
, function(t, e, i) {
    const s = i(87);
    t.exports = class {
        constructor(t, e, i, n, r) {
            this.recorder = new s(void 0 === n ? 320 : n),
            this.precision = void 0 === r ? 1 : r,
            this.name = t,
            this.color = e,
            this.upperBound = i,
            this.width = 245,
            this.height = 36,
            this.fpu = 60,
            this.frame = Math.round(Math.random() * this.fpu),
            this.initView()
        }
        initView() {
            this.container = document.createElement("div");
            var t = this.container.style;
            t.width = this.width + "px",
            t.height = this.height + "px",
            t.backgroundColor = "#1a1a1a",
            t.opacity = "0.9",
            t.display = "block",
            t.position = "absolute",
            t.borderTop = "1px solid #2c2c2c",
            t.borderRight = "1px solid #2c2c2c",
            t.borderBottom = "1px solid #2c2c2c",
            t.boxSizing = "border-box";
            var e = document.createElement("div");
            (t = e.style).display = "block",
            t.position = "absolute",
            t.width = "2px",
            t.height = this.height + "px",
            t.top = "-1px",
            t.left = "-1px",
            t.backgroundColor = this.color,
            this.container.appendChild(e);
            var i = document.createElement("div");
            i.innerHTML = this.name,
            (t = i.style).display = "block",
            t.position = "absolute",
            t.color = this.color,
            t.top = "14px",
            t.left = "8px",
            t.fontSize = "10px",
            this.container.appendChild(i);
            var s = document.createElement("canvas");
            s.width = 320,
            s.height = 60,
            (t = s.style).display = "block",
            t.position = "absolute",
            t.width = "160px",
            t.height = "30px",
            t.top = "2px",
            t.left = "81px",
            t.backgroundColor = "#303030",
            this.container.appendChild(s);
            var n = document.createElement("div");
            (t = n.style).display = "block",
            t.position = "absolute",
            t.color = this.color,
            t.fontSize = "12px",
            t.left = "88px",
            t.top = "12px",
            this.container.appendChild(n);
            var r = document.createElement("div");
            (t = r.style).display = "block",
            t.position = "absolute",
            t.color = "#ccc",
            t.fontSize = "9px",
            t.right = "4px",
            t.top = "4px",
            this.container.appendChild(r);
            var a = document.createElement("div");
            (t = a.style).display = "block",
            t.position = "absolute",
            t.color = "#ccc",
            t.fontSize = "9px",
            t.right = "4px",
            t.bottom = "4px",
            this.container.appendChild(a),
            this.viewWidth = s.width,
            this.viewHeight = s.height,
            this.ctx = s.getContext("2d"),
            this.ctx.strokeStyle = this.color,
            this.ctx.lineWidth = 1,
            this.valueLabel = n,
            this.peakLabel = r,
            this.avgLabel = a
        }
        push(t) {
            this.recorder.push(t)
        }
        update() {
            var t = this.recorder
              , e = this.ctx
              , i = this.viewWidth
              , s = this.viewHeight
              , n = this.upperBound;
            if (this.valueLabel.innerHTML = t.current.toFixed(this.precision),
            this.peakLabel.innerHTML = "P " + t.peak.toFixed(this.precision),
            this.avgLabel.innerHTML = "A " + t.avg.toFixed(this.precision),
            t.counter > 1 && ++this.frame >= this.fpu) {
                this.frame = 0,
                e.clearRect(0, 0, i, s),
                e.beginPath();
                var r = Math.min(t.counter, t.length)
                  , a = i / (t.length - 1)
                  , o = t.a
                  , l = t.counter - 1
                  , h = i
                  , c = (1 - o[l % t.length] / n) * s;
                c < 0 && (c = 0),
                e.moveTo(h, c);
                for (var d = 1; d !== r; ++d)
                    h -= a,
                    (c = (1 - o[--l % t.length] / n) * s) < 0 && (c = 0),
                    e.lineTo(h, c);
                e.stroke()
            }
        }
        setPosition(t, e) {
            let i = this.container.style;
            i.left = e + "px",
            i.top = t + "px"
        }
    }
}
, function(t, e, i) {
    const s = i(88)
      , n = 600
      , r = function(t) {
        return t.toUpperCase()
    };
    t.exports = class {
        constructor() {
            this.startTime = 0,
            this.__viewInited = !1,
            this.monitors = Object.create(null)
        }
        initView(t) {
            this.__viewInited = !0,
            this.height = 0,
            this.container = document.createElement("div"),
            this.container.id = "dev-tool";
            for (var e = t.data, i = 0, s = e.length; i !== s; ++i) {
                var r = e[i];
                r.visible && this.appendMonitor(r.name, r.color, r.ceiling, n, r.digits)
            }
            var a = this.container.style;
            a.display = "block",
            a.position = "absolute",
            a.top = "1px",
            a.right = "1px",
            a.width = "245px",
            a.webkitUserSelect = "none",
            a.pointerEvents = "none",
            document.body.appendChild(this.container)
        }
        appendMonitor(t, e, i, n, a) {
            var o = new s(t.replace(/^(\w)/, r),e,i,n,a);
            o.setPosition(this.height, 0),
            this.container.appendChild(o.container),
            this.monitors[t] = o,
            this.height += o.height - 1
        }
        update(t) {
            this.__viewInited || this.initView(t);
            for (var e = this.monitors, i = t.data, s = 0, n = i.length; s !== n; ++s) {
                var r = i[s]
                  , a = e[r.name];
                a && (a.push(r.value),
                a.update())
            }
        }
    }
}
, function(t, e) {
    t.exports = [{
        name: "step",
        color: "#62C6E3",
        ceiling: 18,
        digits: 3,
        visible: !0
    }, {
        name: "nSteps",
        color: "#62C6E3",
        ceiling: 10,
        digits: 0,
        visible: !0
    }, {
        name: "internalStep",
        color: "#62C6E3",
        ceiling: 10,
        digits: 0,
        visible: !0
    }, {
        name: "iteration",
        color: "#62C6E3",
        ceiling: 10,
        digits: 0,
        visible: !0
    }, {
        name: "pending_step",
        color: "#A64DD9",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "island_update",
        color: "#A64DD9",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "nIslands",
        color: "#A64DD9",
        ceiling: 22,
        digits: 0,
        visible: !0
    }, {
        name: "nPendings",
        color: "#A64DD9",
        ceiling: 22,
        digits: 0,
        visible: !0
    }, {
        name: "nAwakened",
        color: "#A64DD9",
        ceiling: 22,
        digits: 0,
        visible: !0
    }, {
        name: "solve",
        color: "#7FCC5B",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "nSolvedCts",
        color: "#7FCC5B",
        ceiling: 100,
        digits: 0,
        visible: 1
    }, {
        name: "dSPB",
        color: "#D94A6C",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "ccdSS",
        color: "#D94A6C",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "nCcdSS",
        color: "#D94A6C",
        ceiling: 200,
        digits: 0,
        visible: 1
    }, {
        name: "ccdSP_Far",
        color: "#D94A6C",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "nCcdSP_Far",
        color: "#D94A6C",
        ceiling: 200,
        digits: 0,
        visible: 1
    }, {
        name: "ccdSP_Near",
        color: "#D94A6C",
        ceiling: 5,
        digits: 3,
        visible: 1
    }, {
        name: "nCcdSP_Near",
        color: "#D94A6C",
        ceiling: 200,
        digits: 0,
        visible: 1
    }]
}
, function(t, e, i) {
    const s = i(16).tPrecision;
    class n {
        get length() {
            return this.stack.length
        }
        constructor() {
            this.__stack1 = [],
            this.__stack2 = [],
            this.stack = this.__stack1,
            this.idleStack = this.__stack2,
            this.__stackOrderDirty = !1
        }
        freeAll() {
            let t = this.stack;
            for (let e = 0, i = t.length; e !== i; ++e)
                t[e].free();
            t.length = 0,
            this.__stackOrderDirty = !1
        }
        add(t) {
            t.markedAsKilled = !1,
            this.__stackOrderDirty = !0,
            this.stack.push(t)
        }
        removeAllSS() {
            let t, e = this.stack, i = this.idleStack, s = -1;
            for (let n = 0, r = e.length; n !== r; ++n)
                (t = e[n]).isSS ? t.free() : i[++s] = t;
            e.length = 0,
            this.stack = i,
            this.idleStack = e
        }
        outdateAllSSWithId(t) {
            let e = this.stack
              , i = null;
            for (let s = 0, n = e.length; s !== n; ++s)
                !(i = e[s]).isSS || i.idi !== t && i.idj !== t || (i.markedAsKilled = !0)
        }
        resort() {
            this.__stackOrderDirty = !1;
            let t, e = this.stack, i = this.idleStack, s = -1;
            for (let n = 0, r = e.length; n !== r; ++n)
                (t = e[n]).isOutdated() ? t.free() : i[++s] = t;
            e.length = 0,
            i.sort(n.TOISorter),
            this.stack = i,
            this.idleStack = e
        }
        step2(t, e) {
            let i, n, r, a, o = s, l = !1, h = t;
            if (this.__stackOrderDirty)
                for (this.resort(),
                a = n = (i = this.stack).length; a > 0 && (r = i[--a]).toi <= h; )
                    e.push(r),
                    n--,
                    l || (l = !0,
                    h = Math.min(t, r.toi + o));
            else
                for (a = n = (i = this.stack).length; a > 0; )
                    if ((r = i[--a]).isOutdated())
                        r.free(),
                        n--;
                    else {
                        if (!(r.toi <= h))
                            break;
                        e.push(r),
                        n--,
                        l || (l = !0,
                        h = Math.min(t, r.toi + o))
                    }
            if (i.length = n,
            0 !== e.length && (t = e[e.length - 1].toi),
            t > 0)
                for (let e = 0, s = i.length; e !== s; ++e)
                    (r = i[e]).toi -= t,
                    r.life += t;
            return t
        }
        log(t, e) {
            let i = ""
              , s = 0;
            if (void 0 === e)
                for (let e = 0, n = this.stack.length; e !== n; ++e) {
                    let n = this.stack[e];
                    t && n.isOutdated() || (i += n.toString() + "\n",
                    s++)
                }
            else
                for (let n = 0, r = this.stack.length; n !== r; ++n) {
                    let r = this.stack[n];
                    t && r.isOutdated() || (-1 === e.indexOf(r.idi) && -1 === e.indexOf(r.idj) || (i += r.toString() + "\n",
                    s++))
                }
            0 === s ? console.log("Not found.") : (console.log("--- LOG STACK:(" + s + "/" + this.stack.length + ") -------------------"),
            console.log(i + "\n/////////////////////////////////////"))
        }
    }
    n.TOISorter = function(t, e) {
        let i = e.toi - t.toi;
        return 0 !== i ? i : e.penetration - t.penetration
    }
    ,
    t.exports = n
}
, function(t, e, i) {
    const s = i(22)
      , n = i(12)
      , r = n.EPSILON;
    t.exports = class extends s {
        constructor(t, e) {
            super(t, e),
            this.contactPoint = new n(0,0,0),
            this.normalUpdateCP = (()=>{
                if (this.normalDirty = !1,
                this.bj.hasCustomNormalHandler)
                    this.bj.customNormalHandler(this.contactPoint, this._normal);
                else {
                    this._normal.subVectors(this.bi.position, this.contactPoint);
                    let t = this._normal.length();
                    t < r ? this._normal.copy(this.bj.normal) : this._normal.scale(1 / t)
                }
            }
            )
        }
        resetRestingWithPeneCP(t, e) {
            this._penetration = t > -r ? 0 : t,
            this.restingCheckPosI.copy(this.bi.position),
            this.contactPoint.copy(e),
            this.normalUpdateHandler = this.normalUpdateCP,
            this.markNormalDirty()
        }
        updateRelVelocity() {
            this.vChangedCountI = this.bi.vChangedCount,
            this.relVelDirty = !1,
            this.relativeVelW.setCrossThenAdd(this.bi.w, this.armI, this.bi.v),
            this._closeSpeed = this.relativeVelW.dot(this.normal)
        }
        resetPendingWithToiPeneNormal(t, e, i, s, n) {
            this.resetWithBiBj(t, e),
            this.toi = i,
            this._penetration = s > -r ? 0 : s,
            this.cdRoundI = t.cdRound,
            this.life = 0,
            this.normalDirty = !1,
            this._normal.almostEquals(n) || (this._normal.copy(n),
            this.markNormalRelatedDirty())
        }
        resetPendingWithToiPeneCP(t, e, i, s, n) {
            this.resetWithBiBj(t, e),
            this.toi = i,
            this._penetration = s > -r ? 0 : s,
            this.cdRoundI = t.cdRound,
            this.life = 0,
            this.contactPoint.copy(n),
            this.normalUpdateHandler = this.normalUpdateCP,
            this.markNormalDirty()
        }
        updateForceArm() {
            this.armDirty = !1,
            this._armLenI = this.bi.radius,
            this._armI.scaleVector(-this._armLenI, this.normal)
        }
    }
}
, function(t, e, i) {
    "use strict";
    t.exports = class {
        constructor(t, e) {
            this.weakParent = t,
            this.id = e,
            this.inUse = !1,
            this.itemEntry = null,
            this.itemTail = null,
            this.next = null,
            this.prev = null,
            this.totalItems = 0,
            this.dirty = !1,
            this.needsUpdate = !1,
            this.needsPure = !1
        }
        activate() {
            return this.inUse = !0,
            this
        }
        getGroundContact(t) {
            let e = this.itemEntry;
            for (; e; ) {
                if (!e.isSS && e.idi === t && e.bj.ground)
                    return e;
                e = e.next
            }
            return null
        }
        free() {
            this.next = null,
            this.prev = null,
            this.itemEntry = null,
            this.itemTail = null,
            this.totalItems = 0,
            this.inUse = !1,
            this.dirty = !1,
            this.needsUpdate = !1,
            this.needsPure = !1,
            this.weakParent.freeIndex(this.id)
        }
        dispose() {
            this.weakParent = null,
            this.next = null,
            this.prev = null,
            this.itemEntry = null,
            this.itemTail = null,
            console.warn("TODO: Island.dispose doesn't confirmed!!!")
        }
        setEntry(t) {
            t.next = null,
            t.prev = null,
            this.itemEntry = this.itemTail = t,
            this.totalItems = 1,
            this.dirty = !0
        }
        remove(t) {
            let e = t.prev
              , i = t.next;
            e ? e.next = i : this.itemEntry = i,
            i ? i.prev = e : this.itemTail = e,
            this.dirty = !0,
            this.totalItems--,
            t.prev = null,
            t.next = null
        }
        push(t) {
            this.itemTail.next = t,
            t.prev = this.itemTail,
            t.next = null,
            this.itemTail = t,
            this.totalItems++,
            this.dirty = !0
        }
        merge(t) {
            this.itemTail.next = t.itemEntry,
            t.itemEntry.prev = this.itemTail,
            this.itemTail = t.itemTail,
            this.totalItems += t.totalItems,
            this.dirty = !0
        }
        toString() {
            let t = this.itemEntry;
            if (t) {
                let e = "Island " + this.id + ": {count:" + this.totalItems + ", items:[" + t.label;
                for (t = t.next; t; )
                    e += "," + t.label,
                    t = t.next;
                return e + "], tail: " + this.itemTail.label + "}"
            }
            return "Island " + this.id + ": {count:0, items:[]}"
        }
    }
}
, function(t, e, i) {
    "use strict";
    const s = i(38)
      , n = i(93)
      , r = i(12).EPSILON
      , a = [];
    t.exports = class {
        get entry() {
            return this.needsPure && this.__pureIslands(),
            this.__entry
        }
        get tail() {
            return this.needsPure && this.__pureIslands(),
            this.__tail
        }
        constructor(t) {
            this.pool = new s("island",n,t),
            this.__entry = null,
            this.__tail = null,
            this.idMap = null,
            this.__pureMap = null,
            this.ssIdCounter = null,
            this.restingGrid = [],
            this.width = 0,
            this.height = 0,
            this.dataWidth = 0,
            this.dataHeight = 0,
            this.ssIdStart = 0,
            this.nIslands = 0,
            this.totalItems = 0,
            this.needsPure = !1
        }
        resize(t, e) {
            this.ssIdStart = e;
            let i = t
              , s = t - e
              , n = !1;
            if (s > this.dataHeight && (n = !0,
            this.dataHeight = s,
            this.idMap = new Int8Array(s),
            this.__pureMap = new Int8Array(s),
            this.ssIdCounter = new Uint8Array(s)),
            i > this.dataWidth && (n = !0,
            this.dataWidth = i),
            n) {
                let t = this.restingGrid;
                t.length = 0;
                for (let e = 0, n = s; e !== n; ++e)
                    t[e] = new Uint8Array(i)
            }
            this.width = i,
            this.height = s,
            this.freeAll()
        }
        freeAll() {
            this.pool.freeAll(),
            this.__entry = null,
            this.__tail = null;
            let t = this.width
              , e = this.height
              , i = this.idMap;
            for (let t = 0; t !== e; ++t)
                i[t] = -1;
            let s = this.ssIdCounter;
            for (let t = 0; t !== e; ++t)
                s[t] = 0;
            let n = this.restingGrid;
            for (let i = 0; i !== e; ++i) {
                let e = n[i];
                for (let i = 0; i !== t; ++i)
                    e[i] = 0
            }
            this.nIslands = 0,
            this.totalItems = 0,
            this.needsUpdate = !1
        }
        isResting(t, e) {
            {
                let i = this.restingGrid[t - this.ssIdStart][e];
                if (0 !== i && 1 !== i)
                    throw this.log(),
                    new Error("resting grid error: " + i + "idi,idj: " + t + "->" + e);
                return 0 !== i
            }
        }
        markReupdate(t) {
            this.needsPure && this.__pureIslands();
            let e = this.pool.indexAt(this.idMap[t - this.ssIdStart]);
            e && (e.needsUpdate = !0)
        }
        getNContacts(t) {
            return this.ssIdCounter[t - this.ssIdStart]
        }
        getIslandByIdi(t) {
            let e = this.idMap[t - this.ssIdStart];
            return -1 !== e ? this.pool.indexAt(e) : null
        }
        add(t) {
            t.markedAsKilled = !1,
            t.isSS ? this.__addSS(t) : this.__addSP(t),
            this.totalItems++
        }
        __addSP(t) {
            this.needsPure && this.__pureIslands();
            let e, i = this.idMap, s = t.idi - this.ssIdStart, n = i[s];
            this.ssIdCounter[s]++,
            this.restingGrid[s][t.idj]++,
            -1 !== n ? (e = this.pool.indexAt(n)).push(t) : ((e = this.pool.acquire()).setEntry(t),
            i[s] = e.id,
            this.__tail ? (this.__tail.next = e,
            e.prev = this.__tail,
            this.__tail = e) : (this.__entry = e,
            this.__tail = e),
            this.nIslands++)
        }
        __addSS(t) {
            this.needsPure && this.__pureIslands();
            let e = this.idMap
              , i = this.pool
              , s = t.idi - this.ssIdStart
              , n = t.idj - this.ssIdStart
              , r = e[s]
              , a = e[n];
            if (this.ssIdCounter[s]++,
            this.ssIdCounter[n]++,
            this.restingGrid[s][t.idj]++,
            this.restingGrid[n][t.idi]++,
            -1 !== r) {
                let s = i.indexAt(r);
                if (-1 !== a && r !== a) {
                    let t = i.indexAt(a);
                    s.merge(t),
                    this.__removeIsland(t);
                    for (let t = 0, i = this.height; t !== i; ++t)
                        e[t] === a && (e[t] = r)
                } else
                    e[n] = r;
                s.push(t)
            } else if (-1 !== a)
                i.indexAt(a).push(t),
                e[s] = a;
            else {
                let i = this.pool.acquire();
                i.setEntry(t),
                e[s] = i.id,
                e[n] = i.id,
                this.__tail ? (this.__tail.next = i,
                i.prev = this.__tail,
                this.__tail = i) : (this.__entry = i,
                this.__tail = i),
                this.nIslands++
            }
        }
        __removeIsland(t) {
            let e = t.prev
              , i = t.next;
            e ? e.next = i : this.__entry = i,
            i ? i.prev = e : this.__tail = e,
            this.nIslands--,
            t.free()
        }
        __pureIslands() {
            this.needsPure = !1;
            let t = this.__entry;
            for (; t; )
                t.needsPure && this.__pureIsland(t),
                t = t.next
        }
        removeAllContactsWithId(t) {
            let e = this.idMap
              , i = this.ssIdStart
              , s = t - i
              , n = this.ssIdCounter;
            if (-1 === e[s]) {
                if (0 !== n[s])
                    throw new Error("HERER>>>>");
                return
            }
            let r = this.pool.indexAt(e[s])
              , a = this.restingGrid
              , o = r.itemEntry
              , l = null
              , h = -1;
            for (; o; )
                l = o.next,
                o.idi === t ? (this.totalItems--,
                a[s][o.idj]--,
                r.remove(o),
                o.free(),
                o.isSS && (a[h = o.idj - i][t]--,
                0 == --n[h] && (e[h] = -1))) : o.idj === t && (this.totalItems--,
                a[s][o.idi]--,
                r.remove(o),
                o.free(),
                a[h = o.idi - i][t]--,
                0 == --n[h] && (e[h] = -1)),
                o = l;
            n[s] = 0,
            e[s] = -1,
            0 === r.totalItems ? this.__removeIsland(r) : r.totalItems > 1 && (r.needsPure = !0,
            this.needsPure = !0)
        }
        remove(t, e) {
            this.totalItems--;
            let i = this.idMap
              , s = t.idi - this.ssIdStart
              , n = this.pool.indexAt(i[s])
              , r = this.ssIdCounter
              , a = this.restingGrid;
            if (n.remove(t),
            t.isSS) {
                let e = t.idj - this.ssIdStart
                  , o = !0;
                a[s][t.idj]--,
                a[e][t.idi]--,
                0 == --r[s] && (i[s] = -1,
                o = !1),
                0 == --r[e] && (i[e] = -1,
                o = !1),
                0 === n.totalItems ? this.__removeIsland(n) : o && (n.needsPure = !0,
                this.needsPure = !0)
            } else
                a[s][t.idj]--,
                0 == --r[s] && (i[s] = -1),
                0 === n.totalItems && this.__removeIsland(n);
            e && t.free()
        }
        __pureIsland(t) {
            let e, i, s = this.__pureMap, n = this.idMap, r = a, o = t.itemEntry, l = 0, h = 0, c = 0, d = this.ssIdStart, u = 0, _ = 0;
            for (let t = 0, e = this.height; t !== e; ++t)
                s[t] = -1;
            for (r[h] = t; o; ) {
                for (c = t.id,
                s[u = o.idi - d] = h,
                n[u] = c,
                o.isSS && (s[_ = o.idj - d] = h,
                n[_] = c),
                e = o,
                i = o.next,
                l = 1; i; ) {
                    if (u = i.idi - d,
                    _ = i.idj - d,
                    s[u] === h)
                        n[u] = c,
                        i.isSS && (s[_] = h,
                        n[_] = c),
                        e = i,
                        l++;
                    else {
                        if (s[_] !== h)
                            break;
                        s[u] = h,
                        n[u] = c,
                        n[_] = c,
                        e = i,
                        l++
                    }
                    i = i.next
                }
                for (i = e.next; i; )
                    u = i.idi - d,
                    _ = i.idj - d,
                    s[u] !== h && s[_] !== h || (s[u] = h,
                    n[u] = c,
                    i.isSS && (s[_] = h,
                    n[_] = c),
                    i.prev.next = i.next,
                    i.next && (i.next.prev = i.prev),
                    e.next && (e.next.prev = i),
                    i.next = e.next,
                    e.next = i,
                    i.prev = e,
                    e = i,
                    l++),
                    i = i.next;
                i = e.next,
                o.prev = null,
                e.next = null,
                t.itemEntry = o,
                t.itemTail = e,
                t.totalItems = l,
                t.needsPure = !1,
                (o = i) && (r[++h] = t = this.pool.acquire())
            }
            for (let e = 1, i = r.length; e < i; ++e)
                t = r[e],
                this.__tail.next = t,
                t.prev = this.__tail,
                this.__tail = t,
                t.dirty = !0,
                this.nIslands++;
            r.length = 0
        }
        logIslandByIds(t) {
            let e = this.entry
              , i = this.ssIdStart
              , s = ""
              , n = 0;
            for (; e; ) {
                let r = e.itemEntry;
                for (; r; ) {
                    if (-1 !== t.indexOf(r.idi - i) || -1 !== t.indexOf(r.idj - i)) {
                        s += e.toString() + "\n",
                        n++;
                        break
                    }
                    r = r.next
                }
                e = e.next
            }
            console.log("--- Island List:(" + n + ") ----------------"),
            console.log(s),
            console.log("/////////////////////////////////////")
        }
        logPenes() {
            let t = this.entry
              , e = r
              , i = 0;
            for (; t; ) {
                let s = t.itemEntry;
                for (; s; )
                    s.penetration < -e && (console.log("pene: " + s.penetration + "," + s.label),
                    i++),
                    s = s.next;
                t = t.next
            }
            console.log("pene in island: " + i)
        }
        log(t) {
            console.log("--- Island List:(" + this.nIslands + ") ----------------");
            let e = this.entry
              , i = this.ssIdStart;
            for (; e; )
                console.log("\t>" + e.toString()),
                e = e.next;
            let s = [];
            for (let t = 0, e = this.height; t !== e; ++t)
                0 !== this.ssIdCounter[t] && s.push(t + i + "(" + this.ssIdCounter[t] + ")");
            console.log("\tcounter: [" + s.join(",") + "]"),
            t && (console.log("\n"),
            this.pool.log()),
            console.log("/////////////////////////////////////")
        }
    }
}
, function(t, e, i) {
    const s = i(39)
      , n = (i(34),
    i(21))
      , r = i(85)
      , a = i(12)
      , o = ()=>{}
      , l = function(t) {
        let e, i, s = this.predictionCtx;
        if (s.impactOccured || t.bj.ground)
            return !1;
        t.idi === s._b1.uid ? (e = t.bi,
        i = t.bj) : (e = t.bj,
        i = t.bi),
        this.meshBody = this.simplifiedMeshBody,
        s.onImpact(t.isSS ? i : null);
        let n = this.balls;
        for (let t = 0, s = n.length; t !== s; ++t)
            n[t] != e && n[t] != i && this.inactivateBall(n[t]);
        return !0
    };
    class h {
        constructor() {
            this.p0 = new a(0,0,0),
            this.p1 = new a(0,0,0),
            this.cue = new a(0,0,0),
            this.cueVSq = 0,
            this.impactV1 = new a(0,0,0),
            this.targetNumber = 0,
            this.p2 = new a(0,0,0),
            this.target = new a(0,0,0),
            this.targetVSq = 0,
            this._b1 = null,
            this._b2 = null,
            this.impactOccured = !1,
            this.hasImpactTarget = !1
        }
        onPredictionStart(t) {
            this._b1 = t,
            this._b2 = null,
            this.impactOccured = !1,
            this.hasImpactTarget = !1,
            this.p0.copy(this._b1.position),
            this.cue.copy(this.p0)
        }
        onStepped() {
            let t = this.cue.distanceTo(this._b1.position);
            return this.cue.copy(this._b1.position),
            t
        }
        onImpact(t) {
            this.impactOccured = !0,
            this.p1.copy(this._b1.position),
            this._b1.collisionMask = 12,
            t && (this.hasImpactTarget = !0,
            this._b2 = t,
            this.p2.copy(t.position),
            t.collisionMask = 12,
            this.targetNumber = t.number)
        }
        onPredictionEnd() {
            this.cueVSq = this._b1.vSq,
            this._b1.collisionMask = 0,
            this._b1 = null,
            this._b2 && (this.target.copy(this._b2.position),
            this.targetVSq = this._b2.vSq,
            this._b2.collisionMask = 0,
            this._b2 = null)
        }
    }
    t.exports = class extends s {
        constructor() {
            super(),
            this.predictionCtx = new h,
            this.predictorSolver = r.sharedInstance,
            this._serialData = s.makeSerialData(),
            this.predictorCallback = l.bind(this),
            this.simplifiedMeshBody = null
        }
        setMeshBody(t) {
            super.setMeshBody(t),
            this.originMeshBody = t,
            this.simplifiedMeshBody = t.slice("ground")
        }
        emptyMeshBody() {
            this.simplifiedMeshBody = null,
            this.originMeshBody = null,
            super.emptyMeshBody()
        }
        save() {
            this.serialize(this._serialData)
        }
        restore(t) {
            this._environmentReady || this._rebuildEnvironment(),
            void 0 !== t && s.copySerialDataAToB(t, this._serialData),
            this.deserialize(this._serialData)
        }
        step(t) {
            let e = super.step(t)
              , i = this.balls
              , s = this.accumulator;
            s > this._stepSize && (s = 0);
            for (let t = 0, e = i.length; t !== e; ++t)
                i[t].syncStates(s);
            return e
        }
        predict(t, e, i) {
            let s = this.touchPresolveHandler
              , r = this.outOfBoundsHandler
              , a = this.predictionCtx
              , l = 0
              , h = 0;
            for (this.solver = this.predictorSolver,
            this.touchPresolveHandler = o,
            this.outOfBoundsHandler = o,
            this.useStrictMode = !1,
            this.predictorSolver.reset(this.predictorCallback),
            a.onPredictionStart(t),
            this.shoot(t, e),
            a.impactV1.copy(t.v); h < i && ++l < 70 && (this.predictorSolver.interrupt = !1,
            this.internalStep(),
            h += a.onStepped(),
            a.impactOccured || a.impactV1.copy(t.v),
            !(t.getMotion() < 1)); )
                ;
            return this.meshBody = this.originMeshBody,
            this.touchPresolveHandler = s,
            this.outOfBoundsHandler = r,
            this.predictorSolver.reset(null),
            this.solver = n.sharedInstance,
            this.useStrictMode = !0,
            a.onPredictionEnd(),
            this.restore(),
            a
        }
    }
}
, function(t, e) {
    t.exports = {
        default: {
            sceneId: "tigerClubSno",
            ballSet: [0, -1.04, -.145, 1, .915125, 0, 1, .960591333698683, -.026250000000000006, 1, .960591333698683, .026249999999999992, 1, 1.006057667397366, -.05250000000000001, 1, 1.006057667397366, -1.3877787807814457e-17, 1, 1.006057667397366, .052499999999999984, 1, 1.0515240010960492, -.07875000000000001, 1, 1.0515240010960492, -.026250000000000016, 1, 1.0515240010960492, .02624999999999998, 1, 1.0515240010960492, .07874999999999999, 1, 1.096990334794732, -.10500000000000002, 1, 1.096990334794732, -.052500000000000026, 1, 1.096990334794732, -2.7755575615628914e-17, 1, 1.096990334794732, .05249999999999997, 1, 1.096990334794732, .10499999999999997, 2, -1.04, -.29, 3, -1.04, .29, 4, -1.04, 0, 5, 0, 0, 6, .86, 0, 7, 1.42, 0],
            ballRadius: .02625,
            ballMass: 1.5,
            refId: "std-sno"
        }
    }
}
]]);
