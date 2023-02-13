;
(function($, window, document, undefined) {
    var pluginName = 'initPeeriusJCarousel',
        $body = $('body'),
        methods = {
            prepareCarousel: function($component) {
                var $carousel = $component.find(helpers.settings('carouselSelector')),
                    id = helpers.uniqueId($component.attr('data-position'));

                $component.attr(helpers.option('carouselSelector'), id);
                $carousel.addClass("carousel-product-holder clearfix");
                $carousel.children().wrapAll("<ul id=\""+ id +"\" class=\"jcarousel-skin-picks clearfix\" data-visible=\"4\">");
                $carousel.prepend("<div class=\"jcarousel-control btn-carouseleditor-prev\"></div>");
                $carousel.append("<div class=\"jcarousel-control btn-carouseleditor-next\"></div>");
                $carousel.append("<div class=\"paginatore_btn catalog-pager\">\n" +
                    "            \t<a href=\"#\" class=\"btn_prev disable\"></a>\n" +
                    "                <ul class=\"carousel-pager pull-left\"></ul> \n" +
                    "                <a href=\"#\" class=\"btn_next disable\"></a>\n" +
                    "            </div>");

                var $carouselList = $carousel.find('#' + id);
                $.each($carouselList.children(), function (i, tile) {
                    var $tile = $(tile),
                        $children = $tile.children('div'),
                        productCodeAttribute = helpers.settings('productCodeAttribute');
                    $children.attr(productCodeAttribute, $tile.attr(productCodeAttribute));
                    $children.unwrap().wrap('<li>');
                });
            },
            callPlugin: function($component){
                if(!$.fn.jcarousel) {
                    console.error('Please configure custom carousel options');
                    return;
                }
                var id = $component.attr(helpers.option('carouselSelector'));
                $('#'+id).jcarousel(helpers.option('carouselConfiguration'));
            },
            afterCall: function($component) {
                var id = $component.attr(helpers.option('carouselSelector')),
                    jcarousel = $component.find('#' + id).data('jcarousel');

                if (jcarousel) {
                    methods.notifyPeeriusForRecommendationAfterInit(jcarousel.list, jcarousel.first);
                    jcarousel.options.itemVisibleInCallback = $body[pluginName]['notifyCallback'];
                    $component.trigger(helpers.settings('carouselReady'));
                } else {
                    $component.remove();
                }
            },
            initTrackEvents: function ($productTile, recommendationId) {
                if (!helpers.settings('isFallback')) {
                    $.each($productTile, function (index, element) {
                        var $element = $(element).children('div');
                        if ($element.length) {
                            $element.on('click', function (e) {
                                var $clickTarget = $(e.target);
                                if ($clickTarget.closest('ul').hasClass('prodpanel-action')) {
                                    IGC.Peerius.smartRecsSendClick(recommendationId);
                                } else {
                                    IGC.Peerius.smartRecsClick(recommendationId);
                                }
                            });
                        }
                    });
                }
            },
            notifyPeeriusForRecommendationShown: function(jcarousel, carouselItem, indexItem) {
                var recommendationIds = [];
                $(carouselItem || jcarousel).map(function (index, element) {
                    var dataProductCode = '_' + $(element).children('div').attr(helpers.settings('productCodeAttribute')),
                        recommendationId = helpers.settings('mapRefCodeToRecommendationId')[dataProductCode];
                    if (helpers.settings('recommendationNotified').indexOf(recommendationId) < 0) {
                        helpers.settings('recommendationNotified').push(recommendationId);
                        recommendationIds.push(recommendationId);
                    }
                });
                if (!helpers.settings('isFallback')) {
                    IGC.Peerius.sendAjax(recommendationIds);
                }
            },
            notifyPeeriusForRecommendationAfterInit: function (listItems, indexFirst) {
                var indexLast = indexFirst + parseInt(listItems.attr('data-visible')),
                    jcarouselelements = [];

                while(indexFirst < indexLast) {
                    jcarouselelements.push(listItems.find("[jcarouselindex='"+ indexFirst++ +"']"));
                }
                methods.notifyPeeriusForRecommendationShown(jcarouselelements);
            }
        },
        helpers = {
            settings: function(settingName) {
                return $.fn.peeriusCarousel.carouselOptions.settings(settingName);
            },
            uniqueId: function (prefix) {
                return prefix + '_' + $("[id^="+ prefix +"]").length;
            },
            option: function(optionName) {
                var option = $body[pluginName][optionName];
                if(!option) {
                    console.error('Peerius: Option Name ' + optionName + ' not found')
                } else if(typeof option === "function") {
                    return option.apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    return option;
                }
            }
        };

    $.fn[pluginName] = {
        initTrackEvents: methods.initTrackEvents,
        readyToInit: true,
        carouselConfiguration: {
            scroll: 1,
            initCallback: null,
            itemFirstInCallback: null,
            itemLastInCallback: null,
            buttonNextCallback: null,
            buttonPrevCallback: null,
            buttonNextHTML: null,
            buttonPrevHTML: null
        },
        carouselSelector: 'data-id-carousel',
        notifyCallback: methods.notifyPeeriusForRecommendationShown,
        prepareCarousel: methods.prepareCarousel,
        callPlugin: methods.callPlugin,
        afterCallPlugin: methods.afterCall,
        smartRecsSendClickClass: null
    };


})(jQuery, window, document);
