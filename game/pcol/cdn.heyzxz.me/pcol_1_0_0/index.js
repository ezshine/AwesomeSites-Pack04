!function(e) {
    function n(n) {
        for (var o, i, t = n[0], s = n[1], a = 0, d = []; a < t.length; a++)
            i = t[a],
            r[i] && d.push(r[i][0]),
            r[i] = 0;
        for (o in s)
            Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
        for (l && l(n); d.length; )
            d.shift()()
    }
    var o = {}
      , r = {
        2: 0
    };
    function i(n) {
        if (o[n])
            return o[n].exports;
        var r = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, i),
        r.l = !0,
        r.exports
    }
    i.e = function(e) {
        var n = []
          , o = r[e];
        if (0 !== o)
            if (o)
                n.push(o[2]);
            else {
                var t = new Promise(function(n, i) {
                    o = r[e] = [n, i]
                }
                );
                n.push(o[2] = t);
                var s, a = document.getElementsByTagName("head")[0], l = document.createElement("script");
                l.charset = "utf-8",
                l.timeout = 120,
                i.nc && l.setAttribute("nonce", i.nc),
                l.src = function(e) {
                    return i.p + "pcol_1_0_0/" + ({}[e] || e) + ".chunk.js"
                }(e),
                s = function(n) {
                    l.onerror = l.onload = null,
                    clearTimeout(d);
                    var o = r[e];
                    if (0 !== o) {
                        if (o) {
                            var i = n && ("load" === n.type ? "missing" : n.type)
                              , t = n && n.target && n.target.src
                              , s = new Error("Loading chunk " + e + " failed.\n(" + i + ": " + t + ")");
                            s.type = i,
                            s.request = t,
                            o[1](s)
                        }
                        r[e] = void 0
                    }
                }
                ;
                var d = setTimeout(function() {
                    s({
                        type: "timeout",
                        target: l
                    })
                }, 12e4);
                l.onerror = l.onload = s,
                a.appendChild(l)
            }
        return Promise.all(n)
    }
    ,
    i.m = e,
    i.c = o,
    i.d = function(e, n, o) {
        i.o(e, n) || Object.defineProperty(e, n, {
            enumerable: !0,
            get: o
        })
    }
    ,
    i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    i.t = function(e, n) {
        if (1 & n && (e = i(e)),
        8 & n)
            return e;
        if (4 & n && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (i.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & n && "string" != typeof e)
            for (var r in e)
                i.d(o, r, function(n) {
                    return e[n]
                }
                .bind(null, r));
        return o
    }
    ,
    i.n = function(e) {
        var n = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return i.d(n, "a", n),
        n
    }
    ,
    i.o = function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n)
    }
    ,
    i.p = "cdn.heyzxz.me/",
    i.oe = function(e) {
        throw console.error(e),
        e
    }
    ;
    var t = window.webpackJsonp = window.webpackJsonp || []
      , s = t.push.bind(t);
    t.push = n,
    t = t.slice();
    for (var a = 0; a < t.length; a++)
        n(t[a]);
    var l = s;
    i(i.s = 9)
}([function(e, n, o) {
    var r;
    r = function() {
        var e = !0;
        function n(n) {
            function o(e) {
                var o = n.match(e);
                return o && o.length > 1 && o[1] || ""
            }
            function r(e) {
                var o = n.match(e);
                return o && o.length > 1 && o[2] || ""
            }
            var i, t = o(/(ipod|iphone|ipad)/i).toLowerCase(), s = !/like android/i.test(n) && /android/i.test(n), a = /nexus\s*[0-6]\s*/i.test(n), l = !a && /nexus\s*[0-9]+/i.test(n), d = /CrOS/.test(n), c = /silk/i.test(n), u = /sailfish/i.test(n), m = /tizen/i.test(n), p = /(web|hpw)os/i.test(n), f = /windows phone/i.test(n), v = (/SamsungBrowser/i.test(n),
            !f && /windows/i.test(n)), b = !t && !c && /macintosh/i.test(n), h = !s && !u && !m && !p && /linux/i.test(n), g = r(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), w = o(/version\/(\d+(\.\d+)?)/i), E = /tablet/i.test(n) && !/tablet pc/i.test(n), S = !E && /[^-]mobi/i.test(n), y = /xbox/i.test(n);
            /opera/i.test(n) ? i = {
                name: "Opera",
                opera: e,
                version: w || o(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
            } : /opr\/|opios/i.test(n) ? i = {
                name: "Opera",
                opera: e,
                version: o(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || w
            } : /SamsungBrowser/i.test(n) ? i = {
                name: "Samsung Internet for Android",
                samsungBrowser: e,
                version: w || o(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /coast/i.test(n) ? i = {
                name: "Opera Coast",
                coast: e,
                version: w || o(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
            } : /yabrowser/i.test(n) ? i = {
                name: "Yandex Browser",
                yandexbrowser: e,
                version: w || o(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
            } : /ucbrowser/i.test(n) ? i = {
                name: "UC Browser",
                ucbrowser: e,
                version: o(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
            } : /mxios/i.test(n) ? i = {
                name: "Maxthon",
                maxthon: e,
                version: o(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
            } : /epiphany/i.test(n) ? i = {
                name: "Epiphany",
                epiphany: e,
                version: o(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
            } : /puffin/i.test(n) ? i = {
                name: "Puffin",
                puffin: e,
                version: o(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
            } : /sleipnir/i.test(n) ? i = {
                name: "Sleipnir",
                sleipnir: e,
                version: o(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
            } : /k-meleon/i.test(n) ? i = {
                name: "K-Meleon",
                kMeleon: e,
                version: o(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
            } : f ? (i = {
                name: "Windows Phone",
                osname: "Windows Phone",
                windowsphone: e
            },
            g ? (i.msedge = e,
            i.version = g) : (i.msie = e,
            i.version = o(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(n) ? i = {
                name: "Internet Explorer",
                msie: e,
                version: o(/(?:msie |rv:)(\d+(\.\d+)?)/i)
            } : d ? i = {
                name: "Chrome",
                osname: "Chrome OS",
                chromeos: e,
                chromeBook: e,
                chrome: e,
                version: o(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : /edg([ea]|ios)/i.test(n) ? i = {
                name: "Microsoft Edge",
                msedge: e,
                version: g
            } : /vivaldi/i.test(n) ? i = {
                name: "Vivaldi",
                vivaldi: e,
                version: o(/vivaldi\/(\d+(\.\d+)?)/i) || w
            } : u ? i = {
                name: "Sailfish",
                osname: "Sailfish OS",
                sailfish: e,
                version: o(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
            } : /seamonkey\//i.test(n) ? i = {
                name: "SeaMonkey",
                seamonkey: e,
                version: o(/seamonkey\/(\d+(\.\d+)?)/i)
            } : /firefox|iceweasel|fxios/i.test(n) ? (i = {
                name: "Firefox",
                firefox: e,
                version: o(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
            },
            /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(n) && (i.firefoxos = e,
            i.osname = "Firefox OS")) : c ? i = {
                name: "Amazon Silk",
                silk: e,
                version: o(/silk\/(\d+(\.\d+)?)/i)
            } : /phantom/i.test(n) ? i = {
                name: "PhantomJS",
                phantom: e,
                version: o(/phantomjs\/(\d+(\.\d+)?)/i)
            } : /slimerjs/i.test(n) ? i = {
                name: "SlimerJS",
                slimer: e,
                version: o(/slimerjs\/(\d+(\.\d+)?)/i)
            } : /blackberry|\bbb\d+/i.test(n) || /rim\stablet/i.test(n) ? i = {
                name: "BlackBerry",
                osname: "BlackBerry OS",
                blackberry: e,
                version: w || o(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
            } : p ? (i = {
                name: "WebOS",
                osname: "WebOS",
                webos: e,
                version: w || o(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
            },
            /touchpad\//i.test(n) && (i.touchpad = e)) : /bada/i.test(n) ? i = {
                name: "Bada",
                osname: "Bada",
                bada: e,
                version: o(/dolfin\/(\d+(\.\d+)?)/i)
            } : m ? i = {
                name: "Tizen",
                osname: "Tizen",
                tizen: e,
                version: o(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || w
            } : /qupzilla/i.test(n) ? i = {
                name: "QupZilla",
                qupzilla: e,
                version: o(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || w
            } : /chromium/i.test(n) ? i = {
                name: "Chromium",
                chromium: e,
                version: o(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || w
            } : /chrome|crios|crmo/i.test(n) ? i = {
                name: "Chrome",
                chrome: e,
                version: o(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
            } : s ? i = {
                name: "Android",
                version: w
            } : /safari|applewebkit/i.test(n) ? (i = {
                name: "Safari",
                safari: e
            },
            w && (i.version = w)) : t ? (i = {
                name: "iphone" == t ? "iPhone" : "ipad" == t ? "iPad" : "iPod"
            },
            w && (i.version = w)) : i = /googlebot/i.test(n) ? {
                name: "Googlebot",
                googlebot: e,
                version: o(/googlebot\/(\d+(\.\d+))/i) || w
            } : {
                name: o(/^(.*)\/(.*) /),
                version: r(/^(.*)\/(.*) /)
            },
            !i.msedge && /(apple)?webkit/i.test(n) ? (/(apple)?webkit\/537\.36/i.test(n) ? (i.name = i.name || "Blink",
            i.blink = e) : (i.name = i.name || "Webkit",
            i.webkit = e),
            !i.version && w && (i.version = w)) : !i.opera && /gecko\//i.test(n) && (i.name = i.name || "Gecko",
            i.gecko = e,
            i.version = i.version || o(/gecko\/(\d+(\.\d+)?)/i)),
            i.windowsphone || !s && !i.silk ? !i.windowsphone && t ? (i[t] = e,
            i.ios = e,
            i.osname = "iOS") : b ? (i.mac = e,
            i.osname = "macOS") : y ? (i.xbox = e,
            i.osname = "Xbox") : v ? (i.windows = e,
            i.osname = "Windows") : h && (i.linux = e,
            i.osname = "Linux") : (i.android = e,
            i.osname = "Android");
            var O = "";
            i.windows ? O = function(e) {
                switch (e) {
                case "NT":
                    return "NT";
                case "XP":
                    return "XP";
                case "NT 5.0":
                    return "2000";
                case "NT 5.1":
                    return "XP";
                case "NT 5.2":
                    return "2003";
                case "NT 6.0":
                    return "Vista";
                case "NT 6.1":
                    return "7";
                case "NT 6.2":
                    return "8";
                case "NT 6.3":
                    return "8.1";
                case "NT 10.0":
                    return "10";
                default:
                    return
                }
            }(o(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : i.windowsphone ? O = o(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : i.mac ? O = (O = o(/Mac OS X (\d+([_\.\s]\d+)*)/i)).replace(/[_\s]/g, ".") : t ? O = (O = o(/os (\d+([_\s]\d+)*) like mac os x/i)).replace(/[_\s]/g, ".") : s ? O = o(/android[ \/-](\d+(\.\d+)*)/i) : i.webos ? O = o(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : i.blackberry ? O = o(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : i.bada ? O = o(/bada\/(\d+(\.\d+)*)/i) : i.tizen && (O = o(/tizen[\/\s](\d+(\.\d+)*)/i)),
            O && (i.osversion = O);
            var T = !i.windows && O.split(".")[0];
            return E || l || "ipad" == t || s && (3 == T || T >= 4 && !S) || i.silk ? i.tablet = e : (S || "iphone" == t || "ipod" == t || s || a || i.blackberry || i.webos || i.bada) && (i.mobile = e),
            i.msedge || i.msie && i.version >= 10 || i.yandexbrowser && i.version >= 15 || i.vivaldi && i.version >= 1 || i.chrome && i.version >= 20 || i.samsungBrowser && i.version >= 4 || i.firefox && i.version >= 20 || i.safari && i.version >= 6 || i.opera && i.version >= 10 || i.ios && i.osversion && i.osversion.split(".")[0] >= 6 || i.blackberry && i.version >= 10.1 || i.chromium && i.version >= 20 ? i.a = e : i.msie && i.version < 10 || i.chrome && i.version < 20 || i.firefox && i.version < 20 || i.safari && i.version < 6 || i.opera && i.version < 10 || i.ios && i.osversion && i.osversion.split(".")[0] < 6 || i.chromium && i.version < 20 ? i.c = e : i.x = e,
            i
        }
        var o = n("undefined" != typeof navigator && navigator.userAgent || "");
        function r(e) {
            return e.split(".").length
        }
        function i(e, n) {
            var o, r = [];
            if (Array.prototype.map)
                return Array.prototype.map.call(e, n);
            for (o = 0; o < e.length; o++)
                r.push(n(e[o]));
            return r
        }
        function t(e) {
            for (var n = Math.max(r(e[0]), r(e[1])), o = i(e, function(e) {
                var o = n - r(e);
                return i((e += new Array(o + 1).join(".0")).split("."), function(e) {
                    return new Array(20 - e.length).join("0") + e
                }).reverse()
            }); --n >= 0; ) {
                if (o[0][n] > o[1][n])
                    return 1;
                if (o[0][n] !== o[1][n])
                    return -1;
                if (0 === n)
                    return 0
            }
        }
        function s(e, r, i) {
            var s = o;
            "string" == typeof r && (i = r,
            r = void 0),
            void 0 === r && (r = !1),
            i && (s = n(i));
            var a = "" + s.version;
            for (var l in e)
                if (e.hasOwnProperty(l) && s[l]) {
                    if ("string" != typeof e[l])
                        throw new Error("Browser version in the minVersion map should be a string: " + l + ": " + String(e));
                    return t([a, e[l]]) < 0
                }
            return r
        }
        return o.test = function(e) {
            for (var n = 0; n < e.length; ++n) {
                var r = e[n];
                if ("string" == typeof r && r in o)
                    return !0
            }
            return !1
        }
        ,
        o.isUnsupportedBrowser = s,
        o.compareVersions = t,
        o.check = function(e, n, o) {
            return !s(e, n, o)
        }
        ,
        o._detect = n,
        o.detect = n,
        o
    }
    ,
    void 0 !== e && e.exports ? e.exports = r() : o(2)("bowser", r)
}
, function(e, n, o) {
    e.exports = o.p + "pcol_1_0_0/71d7e9a206dbcc1777cadd7484cc700e.jpg"
}
, function(e, n) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}
, function(e, n) {
    /*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-webgl-setclasses !*/
    !function(e, n, o) {
        function r(e, n) {
            return typeof e === n
        }
        function i() {
            return "function" != typeof n.createElement ? n.createElement(arguments[0]) : c ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
        }
        var t = []
          , s = []
          , a = {
            _version: "3.6.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(e, n) {
                var o = this;
                setTimeout(function() {
                    n(o[e])
                }, 0)
            },
            addTest: function(e, n, o) {
                s.push({
                    name: e,
                    fn: n,
                    options: o
                })
            },
            addAsyncTest: function(e) {
                s.push({
                    name: null,
                    fn: e
                })
            }
        }
          , l = function() {};
        l.prototype = a,
        l = new l;
        var d = n.documentElement
          , c = "svg" === d.nodeName.toLowerCase();
        l.addTest("webgl", function() {
            var n = i("canvas")
              , o = "probablySupportsContext"in n ? "probablySupportsContext" : "supportsContext";
            return o in n ? n[o]("webgl") || n[o]("experimental-webgl") : "WebGLRenderingContext"in e
        }),
        function() {
            var e, n, o, i, a, d;
            for (var c in s)
                if (s.hasOwnProperty(c)) {
                    if (e = [],
                    (n = s[c]).name && (e.push(n.name.toLowerCase()),
                    n.options && n.options.aliases && n.options.aliases.length))
                        for (o = 0; o < n.options.aliases.length; o++)
                            e.push(n.options.aliases[o].toLowerCase());
                    for (i = r(n.fn, "function") ? n.fn() : n.fn,
                    a = 0; a < e.length; a++)
                        1 === (d = e[a].split(".")).length ? l[d[0]] = i : (!l[d[0]] || l[d[0]]instanceof Boolean || (l[d[0]] = new Boolean(l[d[0]])),
                        l[d[0]][d[1]] = i),
                        t.push((i ? "" : "no-") + d.join("-"))
                }
        }(),
        function(e) {
            var n = d.className
              , o = l._config.classPrefix || "";
            if (c && (n = n.baseVal),
            l._config.enableJSClass) {
                var r = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");
                n = n.replace(r, "$1" + o + "js$2")
            }
            l._config.enableClasses && (n += " " + o + e.join(" " + o),
            c ? d.className.baseVal = n : d.className = n)
        }(t),
        delete a.addTest,
        delete a.addAsyncTest;
        for (var u = 0; u < l._q.length; u++)
            l._q[u]();
        e.Modernizr = l
    }(window, document)
}
, , function(e, n, o) {}
, , , function(e, n, o) {}
, function(e, n, o) {
    "use strict";
    o.r(n);
    o(8),
    o(5),
    o(3);
    var r = o(0)
      , i = o.n(r);
    const t = window.gtag;
    function s(e, n, r) {
        let i = document.getElementById("intro")
          , t = i.querySelector("h2")
          , s = i.querySelector("p");
        t.innerHTML = e,
        s.innerHTML = n,
        i.style.visibility = "visible";
        let a = o(1);
        if (i.style.backgroundImage = "url(" + a + ")",
        r) {
            i.querySelector(".browsers").innerHTML = '<img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.8.0/firefox/firefox_64x64.png"><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.8.0/chrome/chrome_64x64.png"><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.8.0/safari/safari_64x64.png"><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.8.0/edge/edge_64x64.png">'
        }
    }
    i.a.mobile || i.a.tablet ? (s("UNSUPPORTED DEVICE...", "MOBILE DEVICES ARE TEMPORARILY NOT SUPPORTED. PLEASE VISIT THIS SITE ON DESKTOP, AND USE ONE OF THE LATEST MODERN BROWSERS TO PLAY THIS GAME.", !0),
    t("event", "startup", {
        event_category: "game_page",
        event_label: "mobile",
        value: 0
    })) : i.a.msie ? (s("UNSUPPORTED BROWSER...", "YOUR CURRENT BROWSER IS NOT SUPPORTED. PLEASE USE ONE OF THE FOLLOWING SUPPORTED BROWSERS AND TRY AGAIN.", !0),
    t("event", "startup", {
        event_category: "game_page",
        event_label: "ie",
        value: 0
    })) : Modernizr.webgl ? Promise.all([o.e(0), o.e(1)]).then(o.bind(null, 10)).then(function(e) {
        document.getElementById("intro").remove(),
        t("event", "startup", {
            event_category: "game_page",
            event_label: "success",
            value: 1
        }),
        (new (0,
        e.default)).launch({
            first_name: "PLAYER 1",
            id: "user",
            picture: {
                data: {
                    url: "xxx"
                }
            }
        })
    }).catch(function(e) {
        s("LAUNCH ERROR...", "AN ERROR OCCURRED WHEN LAUNCHING THE GAME, PLEASE TRY AGAIN LATER...", !1),
        t("event", "startup", {
            event_category: "game_page",
            event_label: "launch_error",
            value: 0
        })
    }) : (s("UNSUPPORTED BROWSER...", "IT LOOKS THAT THE CURRENT BROWSER DOES NOT SUPPORT WEBGL. PLEASE CHANGE TO ANOTHER WEBGL SUPPORTED BROWSER TO PLAY THIS GAME. ( SUCH AS BELOW, LATEST FIREFOX IS RECOMMENDED )", !0),
    t("event", "startup", {
        event_category: "game_page",
        event_label: "no_webgl",
        value: 0
    }))
}
]);
