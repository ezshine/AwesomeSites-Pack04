;
(function($, window, document, undefined) {

    var pluginName = "peeriusCarousel",
        $body = $('body'),
        settings = {
            carouselSelector: '.js-peerius-carousel',
            cmsApiUrl: 'cmsext/product-tile',
            productCodeAttribute: 'data-product-code',
            carouselReady: 'Carousel.inited',
            defaultMaxProducts: 10,
            recommendationNotified: [],
            mapRefCodeToRecommendationId: [],
            mapRecommendationIdOrder: [],
            mapRecommendationIdToProductTile: [],
            isFallback: false
        },
        methods = {
            init: function() {
                $body.personalization();
            },
            initWidget: function(widget) {
                var widgetName = widget['widget'] || 'not-specified',
                    position = widget['position'],
                    recommendations = widget['recs'] || [],
                    $component = this,
                    promises = [];

                if (!recommendations || !recommendations.length) {
                    return helpers.removeComponent($component);
                }

                settings.isFallback = helpers.isFallback($component);

                console.log((settings.isFallback ? 'Personalization fallback' : 'Peerius') + ': Got ' + recommendations.length + ' recommendations, ' + 'for ' + position + ' position');

                if(!$body[pluginName].carouselOptions.pluginCarousel) {
                    if (!$.fn.peeriusCarouselInitOptions) {
                        console.error('Peerius: Please configure the Custom Plugin Carousel');
                        return;
                    }
                    $.fn[pluginName].carouselOptions.pluginCarousel = $body.peeriusCarouselInitOptions();
                }

                $component.addClass(helpers.setting('loadingClass'));
                $component.removeClass(helpers.setting('hiddenClass'));
                console.log('' + (settings.isFallback ? 'Personalization fallback' : 'Peerius') + ': Loading widget ' + widgetName + ' in position ' + position);


                var maxProducts = $component.data('max-products') || settings.defaultMaxProducts;
                recommendations = recommendations.slice(0, maxProducts);

                settings.mapRecommendationIdOrder[position] = [];
                recommendations.forEach(function(recommendation, index) {
                    promises.push(helpers.prepareRecommendation(position, recommendation));
                });

                $.when.apply($, promises).then(function() {
                    helpers.renderComponent($component, position);
                    $component.on(settings.carouselReady, function() {
                        $component.removeClass(helpers.setting('loadingClass'));
                        $component.find('img[data-src]').unveil();
                    });
                    helpers.initCarousel($component);
                }).fail(function () {
                    helpers.removeComponent($component);
                });
            },
            removeUnusedComponents: function($component) {
                if (!($component.data('personalized-inited'))) {
                    $component.remove();
                }
            }
        },
        helpers = {
            setting: function (settingName) {
                if(settings[settingName]) {
                    return settings[settingName]
                }
                return $body.personalization('setting', settingName)
            },
            prepareRecommendation: function(position, recommendation) {
                var recommendationHybrisCode = recommendation['refCode'];
                var recommendationPeeriusId = recommendation['id'];
                settings.mapRecommendationIdOrder[position].push(recommendationPeeriusId);
                settings.mapRefCodeToRecommendationId['_' + recommendationHybrisCode] = recommendationPeeriusId;
                return $.ajax({
                    url: IGC.Peerius.getAjaxUrl(helpers.setting('cmsApiUrl')) + '?id=' + recommendationHybrisCode,
                    success: function(productTile) {
                        if(productTile.length) {
                            var $productTile = $(productTile);
                            helpers.option('initTrackEvents', $productTile, recommendationPeeriusId);
                            settings.mapRecommendationIdToProductTile[recommendationPeeriusId] = $productTile;
                        } else {
                            console.warn('Peerius: Failed to retrieve product tile for productCode ' + recommendationHybrisCode + ', skipping this recommendation');
                        }
                    },
                    error: function() {
                        console.error('Peerius: product tile error for productCode ' + recommendationHybrisCode);
                    }
                });
            },
            renderComponent: function($component, position) {
                var $carousel = $component.find(settings.carouselSelector);

                settings.mapRecommendationIdOrder[position].forEach(function(orderedId) {
                    var productTile = settings.mapRecommendationIdToProductTile[orderedId];
                    if(productTile && $(productTile).attr(settings.productCodeAttribute)) {
                        $carousel.append(productTile.clone(true));
                    }
                })
            },
            initCarousel: function($component) {
                if (helpers.option('readyToInit')) {
                    helpers.option('prepareCarousel', $component);
                    helpers.option('callPlugin', $component);
                    helpers.option('afterCallPlugin', $component);

                }
            },
            removeComponent: function ($component) {
                $component.data('personalized-inited', false);
                methods.removeUnusedComponents($component);
            },
            option: function(optionName) {
                var option = $body[pluginName].carouselOptions.pluginCarousel[optionName];
                if(!option) {
                    console.error('Peerius: Option Name ' + optionName + ' not found')
                } else if(typeof option === "function") {
                    return option.apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    return option;
                }
            },
            isFallback: function ($component) {
                const fallbackComponents = $body.personalization('setting', 'fallbackComponents');
                return $component.data('position') in fallbackComponents ? true : false;
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

    $.fn[pluginName].carouselOptions = {
        pluginCarousel: undefined,
        settings: function (settingName) {
            return settings[settingName];
        }
    };


})(jQuery, window, document);
