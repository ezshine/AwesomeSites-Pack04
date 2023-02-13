;
(function($, window, document, undefined) {
    var pluginName = "personalization",
        settings = {
            personalizedComponentsSelector: '.js-personalized-component',
            cmsApiUrl: 'cmsext/personalization-component',
            jsFunction: 'initWidget',
            selectorPluginName: 'js-component',
            wrapperSelector: '#peerius-script',
            personalizedSelector: '.js-personalized-component',
            loadingClass: 'personalized-component--loading',
            hiddenClass: 'personalized-component--hidden',
            originalContent: '.js-original-content',
            dataID: 'component-id',
            ready: false,
            eventReady: 'Personalization.ready',
            components: {},
            dataFallback: 'fallback',
            fallback: false,
            fallbackDoNotTrackCookie: 'do_not_track',
            fallbackDoNotTrackId: '#episerverDoNotTrackOption',
            fallbackComponents: {},
            jsonDataFallback: []
        },
        methods = {
            init: function () {
                if (!settings.ready) {
                    var wrapper = $(settings.wrapperSelector);
                    if (!wrapper.length) {
                        helpers.checkFallback();
                        if (!settings.fallback) {
                            console.warn('Peerius not defined');
                            helpers.removeComponents();
                        } else {
                            console.log('Personalization fallback enabled due to missing ' + settings.wrapperSelector);
                            helpers.parseFallback(settings.jsonDataFallback);
                        }
                    }

                    var doNotTrack = helpers.readCookie(settings.fallbackDoNotTrackCookie) == '1' || $(settings.fallbackDoNotTrackId).length;

                    if (!settings.fallback && doNotTrack) {
                        helpers.checkFallback();
                        if (settings.fallback) {
                            console.log('Personalization fallback enabled with ' +
                                ($(settings.fallbackDoNotTrackId).length ? settings.fallbackDoNotTrackId : '"' + settings.fallbackDoNotTrackCookie + '" cookie')
                            );
                            helpers.parseFallback(settings.jsonDataFallback);
                        }
                    }

                    if (settings.fallback) {
                        console.log('Personalization fallback components:', settings.jsonDataFallback);
                    }

                    $(settings.personalizedComponentsSelector).each(function(index, component) {
                        helpers.registerComponent($(component));
                    });

                    settings.ready = true;
                    $(document).trigger(settings.eventReady);
                }
            },
            setting: function (settingName) {
                if (settings[settingName]) {
                    return settings[settingName]
                }
                console.log('Settings - ' + settingName + ' - does not exist')
            },
            parseResponse: function (jsonData) {
                if (!jsonData || jsonData.length === 0) {
                    console.warn('No response provided');
                    helpers.removeComponents();
                    return;
                }
                if (!settings.ready) {
                    $(document).on(settings.eventReady, function() {
                        helpers.initWidgets(jsonData);
                    });
                } else {
                    helpers.initWidgets(jsonData);
                }
            }
        },
        helpers = {
            checkFallback: function() {
                $(settings.personalizedComponentsSelector).each(function(index, component) {
                    if ($(component).data(settings.dataFallback) && $(component).data(settings.dataFallback).length) {
                        settings.fallback = true;
                        settings.fallbackComponents[$(component).data('position')] = $(component);
                        var recs = [],
                            widget = $(component).data(settings.dataFallback).split(','),
                            name = 'fallbackComponent_' + index;
                        recs = widget.map(function(id){
                            var recommendation = {
                                id: 'fallback_id_' + $.trim(id),
                                refCode: $.trim(id)
                            };
                            return recommendation;
                        });
                        var fallbackJson = {
                            widget: name + '_json',
                            alias: name + '_widget',
                            position: $(component).data('position'),
                            recs: recs
                        };
                        settings.jsonDataFallback.push(fallbackJson);
                    }
                });
            },
            parseFallback: function(jsonData) {
                $(document).on(settings.eventReady, function() {
                    helpers.initWidgets(jsonData);
                });
            },
            removeComponents: function() {
                if (!settings.ready) {
                    $(document).on(settings.eventReady, function() {
                        helpers.removeUnusedComponents();
                    });
                } else {
                    helpers.removeUnusedComponents();
                }
            },
            registerComponent: function($component) {
                var position = $component.data('position');
                if (!position) {
                    console.warn('Position missing for component');
                    helpers.removeUnusedComponent($component)
                } else {
                    settings.components[position] = settings.components[position] || [];
                    settings.components[position].push($component);
                }
            },
            initWidgets: function(jsonData) {
                if (settings.fallback && jsonData != settings.jsonDataFallback) {
                    return;
                }
                jsonData.forEach(function(widget) {
                    var position = widget['position'],
                        $components = settings.components[position],
                        jsComponent = undefined;
                    if(!$components) {
                        return;
                    }

                    $components.forEach(function ($component) {
                        if (!$component.data('personalized-inited')) {
                            jsComponent = $component.data(settings.selectorPluginName);

                            if (typeof $component[jsComponent] === "function") {
                                $component[jsComponent](settings.jsFunction, widget);
                                $component.data('personalized-inited', 'true');
                            }
                        }
                    });
                });
                helpers.removeUnusedComponents();
            },
            removeUnusedComponents: function() {
                var components = settings.components || {};

                $.each(components, function (position, $components) {
                    $.each($components, function (index, $component) {
                        helpers.removeUnusedComponent($component)
                    });
                })
            },
            removeUnusedComponent: function ($component) {
                if($component && !$component.data('personalized-inited')){
                    var jsComponent = $component.data(settings.selectorPluginName);
                    if(typeof $component[jsComponent] === "function") {
                        $component[jsComponent]('removeUnusedComponents', $component);
                    } else {
                        $component.remove();
                    }
                }
            },
            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            }
        };

    $.fn[pluginName] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jquery.' + pluginName);
        }
    };

})(jQuery, window, document);
