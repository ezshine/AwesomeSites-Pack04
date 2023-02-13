;
(function($, window, document, undefined) {

    var pluginName = 'initPeeriusOwlCarousel',
        $body = $('body'),
        methods = {
            prepareCarousel: function(){
                var configurations = helpers.option('carouselConfiguration'),
                    notifyCallback = $body[pluginName]['notifyCallback'];
                configurations.selector = helpers.option('carouselSelector');
                configurations.afterInit = notifyCallback;
                configurations.afterMove = notifyCallback;
            },
            callPlugin: function($component) {
                if(!$.fn.carousels) {
                    console.error('Please configure custom carousel options');
                    return;
                }
                $body.carousels({
                    carousels: [helpers.option('carouselConfiguration')]
                });
            },
            afterInited: function () {
                $(helpers.settings('carouselSelector')).trigger(helpers.settings('carouselReady'));
            },
            initTrackEvents: function($productTile, recommendationId) {
                if (!helpers.settings('isFallback')) {
                    $productTile.on('click', function(e) {
                        var $clickTarget = $(e.target);
                        if ($clickTarget.hasClass(helpers.option('smartRecsSendClickClass'))) {
                            IGC.Peerius.smartRecsSendClick(recommendationId)
                        } else {
                            IGC.Peerius.smartRecsClick(recommendationId);
                        }
                    });
                }
            },
            allCarouselInited: function () {
                var allCarouselInited = true;
                $(helpers.settings('carouselSelector')).each(function (i, elem) {
                    var $elem = $(elem);
                    if(!$.trim($elem.html()) && !$elem.data('removed')) {
                        $elem.on('remove', function (e) {
                            var $targetElem = $(e.target);
                            $targetElem.data('removed', true);
                            methods.initCarousel();
                        });
                        allCarouselInited = false;
                        return false;
                    }
                });
                return allCarouselInited;
            },
            notifyPeeriusForRecommendationShown: function(context) {
                var recommendationIds = [];
                context.find('.owl-item.active').each(function (i, el) {
                    var recommendationId = helpers.settings('mapRefCodeToRecommendationId')['_' + $(el).find('.product-tile').attr('data-product-code')];
                    if (helpers.settings('recommendationNotified').indexOf(recommendationId) < 0) {
                        helpers.settings('recommendationNotified').push(recommendationId);
                        recommendationIds.push(recommendationId);
                    }
                });
                if (!helpers.settings('isFallback')) {
                    IGC.Peerius.sendAjax(recommendationIds);
                }
            }
        },
        helpers= {
            settings: function(settingName) {
                return $body.peeriusCarousel.carouselOptions.settings(settingName);
            },
            option: function(optionName) {
                var option = $body[pluginName][optionName];
                if(!option) {
                    console.error('Peerius: Option Name not found')
                } else if(typeof option === "function") {
                    return option.apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    return option;
                }
            }
        };

    $.fn[pluginName] = {
        initTrackEvents: methods.initTrackEvents,
        readyToInit: methods.allCarouselInited,
        carouselConfiguration: {
            rewindNav: false,
            navigation: true,
            pagination: true,
            navigationText: ['&#8249;', '&#8250;'],
            items: 4,
            itemsDesktop: false,
            itemsDesktopSmall: [1023, 3],
            itemsTablet: [639, 2],
            itemsMobile: [479, 1]
        },
        carouselSelector: helpers.settings('carouselSelector'),
        notifyCallback: methods.notifyPeeriusForRecommendationShown,
        prepareCarousel: methods.prepareCarousel,
        callPlugin: methods.callPlugin,
        afterCallPlugin: methods.afterInited,
        smartRecsSendClickClass: null
    };

})(jQuery, window, document);
