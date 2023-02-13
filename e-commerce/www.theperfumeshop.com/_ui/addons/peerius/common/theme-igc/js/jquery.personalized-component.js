;
(function($, window, document, undefined) {

    var pluginName = "personalizedComponent",
        settings = {
            positoinsMapRefCodeToRecommendationId: []
        },
        methods = {
            init: function() {
                $('body').personalization();
            },
            initWidget: function(widget) {
                var widgetName = widget['widget'] || 'not-specified',
                    position = widget['position'],
                    recommendations = widget['recs'] || [],
                    $component = this,
                    refCodes = [],
                    mapRefCodeToId = [];

                if (!recommendations || !recommendations.length) {
                    return helpers.clearComponent($component);
                }

                console.log('Got ' + recommendations.length + ' recommendations from Peerius, ' + 'for ' + position + ' position');
                refCodes = recommendations.map(function (recommendation) {
                    mapRefCodeToId[recommendation['refCode']] = recommendation['id'];
                    return recommendation['refCode'];
                });

                helpers.prepareRecommendation(refCodes.join(), $component, mapRefCodeToId);

            },
            removeUnusedComponents: function() {
                helpers.clearComponent(this);
            }
        },
        helpers = {
            setting: function (settingName) {
                if(settings[settingName]) {
                    return settings[settingName]
                }
                return $('body').personalization('setting', settingName)
            },
            prepareRecommendation: function(refCodes, $component, mapRefCodeToId) {
                $.ajax({
                    url: IGC.Peerius.getAjaxUrl(helpers.setting('cmsApiUrl')) + '?ids=' + refCodes + '&type=' + $component.data('type') + '&position=' + $component.data('position'),
                    success: function(personalizedComponent) {
                        var $personalizedComponent = $(personalizedComponent),
                            personalizationCode = $personalizedComponent.data('personalization-code'),
                            recommendationPeeriusId;

                        if($personalizedComponent.length) {
                            $component.replaceWith($personalizedComponent);
                            $personalizedComponent.data('position', $component.data('position'));
                            recommendationPeeriusId = mapRefCodeToId[personalizationCode];
                            helpers.initTrackEvents($personalizedComponent, recommendationPeeriusId);
                            settings.positoinsMapRefCodeToRecommendationId[$component.data('position') + '_' + personalizationCode] = recommendationPeeriusId;
                            helpers.notifyPeeriusForRecommendationShown($personalizedComponent);
                            helpers.clearComponent($personalizedComponent);
                            console.log('Peerius: content found ' + personalizationCode + ' , ' + $component.data('position'));
                        } else {
                            console.log('Peerius: content not found');
                            helpers.clearComponent($component);
                        }
                    },
                    error: function() {
                        console.warn('Failed to retrieve product tile for productsCode ' + refCodes + ', skipping this recommendation');
                    }
                });
            },
            notifyPeeriusForRecommendationShown: function(context) {
                var recommendationId = settings.positoinsMapRefCodeToRecommendationId[context.data('position')+'_'+context.data('personalization-code')];

                if(recommendationId) {
                    IGC.Peerius.sendAjax([recommendationId]);
                }
            },
            initTrackEvents: function($component, recommendationId) {
                if (window.Peerius) {
                    var $element = $component;
                    if($component.data('wrapper')) {
                        $element = $component.children();
                    }
                    $element.on('click', function(e) {
                        IGC.Peerius.smartRecsClick(recommendationId);
                    });
                }
            },
            clearComponent: function ($component) {
                var originalContent = $component.find(helpers.setting('originalContent')),
                    componentId;
                if(originalContent.length) {
                    $component.html(originalContent.html());
                }
                if($component.data('wrapper')) {
                    $component.children().unwrap();
                }
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