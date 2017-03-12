var br = (function ($) {

    var $html , $body;

    var viewports = {
        'break0': '1920',
        'break1': '1600',
        'break2': '1200',
        'break3': '1024',
        'break4': '1023',
        'break5': '768',
        'break6': '767',
        'break7': '600',
        'break8': '400'
    };

    function globalMobileMainNavigation() {
        $('nav#navigation-main').on('click',function(e) {
            $html.removeClass('active-navigation-main');
            $('nav#navigation-main').removeClass('active');
            $('nav#navigation-fast a.trigger-navigation-main').removeClass('triggered');

            e.preventDefault();
        });

        $('nav#navigation-main div.wrapper *').on('click',function(e) {
            e.stopPropagation();
        });

        $html.on('click','a.trigger-navigation-main',function() {
            document.ontouchmove = function() {
                return true;
            }

            if($html.hasClass('active-navigation-main')) {
                document.ontouchmove = function(e){
                    e.preventDefault();
                }
            }
        });
    }

    function initmobileMainNavigation() {
        $('nav#navigation-mobile').on('click','a.trigger-navigation-main',function() {
            $html.toggleClass('active-navigation-main');
            $('nav#navigation-main').toggleClass('active');
            $(this).toggleClass('triggered');
        });

        globalMobileMainNavigation();
    }

    function initNavigationFast() {
        var initialPosition = 0;
        const $navigationFast = $('nav#navigation-fast');
        const $navigationFastHeight = $navigationFast.outerHeight();

        $navigationFast.css('margin-top',-$navigationFastHeight);

        $(window).scroll(function(){
            const scrollTopCurrent = $(this).scrollTop();
            const $headerHeight =  $('header#header-main').outerHeight()*10;

            if (scrollTopCurrent > initialPosition){
                if ($navigationFast.hasClass('active')) {
                    $navigationFast.removeClass('active');
                    $navigationFast.css('margin-top',-$navigationFastHeight);
                }
            } else {
                if (!$navigationFast.hasClass('active')) {
                    $navigationFast.addClass('active');
                    $navigationFast.css({
                        'margin-top': '0',
                        'background-color': 'rgba(255,255,255,0.5)'
                    });
                }
            }

            initialPosition = scrollTopCurrent;

            if( $(window).scrollTop() < $headerHeight ) {
                $('nav#navigation-fast').removeClass('active');
                $navigationFast.css({
                        'margin-top': -$navigationFastHeight,
                        'background-color': 'rgba(255,255,255,0)'
                });
            }
        });


        $('nav#navigation-fast').on('click','a.trigger-navigation-main',function(e) {
            $html.toggleClass('active-navigation-main');
            $('nav#navigation-main').toggleClass('active');

            $(this).toggleClass('triggered');

            e.preventDefault();
        });

        globalMobileMainNavigation();
    }


    function initDribbble() {
        $('nav#navigation-main').on('click','a.trigger-dribbble',function() {
            $html.addClass('active-dribbble');
        });

        $('section#layer-dribbble').on('click','a.trigger-dribbble-close',function() {
            $html.removeClass('active-dribbble');
        });

        $('nav#navigation-main,section#layer-dribbble').on('click',function(e) {
            e.stopPropagation();
        });

        $body.on('click',function() {
            $html.removeClass('active-dribbble');
        });
    }


    function initEnquire() {

        function handlerFactory(match, unmatch) {
            return {
                match: function () {
                    $body.attr('data-screen', match);
                },
                unmatch: function () {
                    $body.attr('data-screen', unmatch);
                }
            };
        }

        function removeLayers() {
            return {
                match: function () {},
                unmatch: function () {
                    $html.removeClass('active-navigation-main');
                    $('nav#navigation-fast').removeAttr('style');
                }
            };
        }

        enquire
            .register("screen and (max-width : " + viewports.break1 + "px)", handlerFactory("screen-" + viewports.break1 + "", "default"))
            .register("screen and (max-width : " + viewports.break2 + "px)", handlerFactory("screen-" + viewports.break2 + "", "screen-" + viewports.break1 + ""))
            .register("screen and (max-width : " + viewports.break3 + "px)", handlerFactory("screen-" + viewports.break3 + "", "screen-" + viewports.break2 + ""))
            .register("screen and (max-width : " + viewports.break4 + "px)", handlerFactory("screen-" + viewports.break4 + "", "screen-" + viewports.break3 + ""))
            .register("screen and (max-width : " + viewports.break5 + "px)", handlerFactory("screen-" + viewports.break5 + "", "screen-" + viewports.break4 + ""))
            .register("screen and (max-width : " + viewports.break6 + "px)", handlerFactory("screen-" + viewports.break6 + "", "screen-" + viewports.break5 + ""))
            .register("screen and (max-width : " + viewports.break7 + "px)", handlerFactory("screen-" + viewports.break7 + "", "screen-" + viewports.break6 + ""))
            .register("screen and (min-width : " + viewports.break0 + "px)", handlerFactory("default", "screen-" + viewports.break1 + ""))
            .register("screen and (max-width : " + viewports.break7 + "px)", removeLayers())
    }

    function initDribbbleStream() {
        $.jribbble.setToken('74d8c12b39672eeb9210054fbe2f6010b9ac3b3ff9943b428da5cef831dd1c18');
        $.jribbble.users('benjaminroth').shots({per_page: 24}).then(function(shots) {
            var html = [];

            shots.forEach(function(shot) {

                var date_created = $.format.date(shot.created_at, "d.MMMM yyyy");

                html.push('<li>');
                html.push('<div class="field-image"><a href="' + shot.html_url + '" target="_blank" title="'+shot.title+'"><img src="' + shot.images.teaser + '"></a></div>');
                html.push('<div class="field-description"><h6><a href="' + shot.html_url + '" target="_blank" title="'+shot.title+'">'+shot.title+'</a></h6><p>' + date_created + '</p></div>');
                html.push('</li>');
            });

            $('section#layer-dribbble ul.list-shots').html(html.join(''));
        });
    }

    function initFixedHeader() {
        var $headerHeight =  $('header#header-main').outerHeight();

        $(window).scroll(function() {
            var scrollPoint = $(window).scrollTop();

            if (scrollPoint >= $headerHeight) {
                $('header#header-main').addClass('fixed');
            } else {
                $("header#header-main").removeClass('fixed');
            }
        });
    }

    function fadeInImages() {
        $('img.fade').css('opacity', 0);

        $('img.fade').waypoint(function() {
            $(this.element).css('opacity', 1);
        },
        {
            offset: '80%'
        });
    }


    $(document).ready(function () {

        $html = $('html');
        $body = $('body');

        initmobileMainNavigation();
        initNavigationFast();
        initDribbble();
        initEnquire();
        initDribbbleStream();
        initFixedHeader();
        fadeInImages();

    });

}(jQuery));