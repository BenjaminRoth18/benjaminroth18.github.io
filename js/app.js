var br = (function ($) {

    var $html , $body;

    var viewports = {
        'break0': '1600',
        'break1': '1200',
        'break2': '1024',
        'break3': '1023',
        'break4': '960',
        'break5': '768',
        'break6': '767',
        'break7': '600'
    };

    function initmobileMainNavigation() {
        $('nav#navigation-mobile').on('click','a.trigger_navigation-main',function() {
            $html.toggleClass('active_navigation-main');
        });
    }

    function initDribbble() {
        $('nav#navigation-main').on('click','a.trigger_dribbble',function() {
            $html.addClass('active_dribbble');
        });

        $('section#layer_dribbble').on('click','a.trigger_dribbble-close',function() {
            $html.removeClass('active_dribbble');
        });

        $('nav#navigation-main,section#layer_dribbble').on('click',function(e) {
            e.stopPropagation();
        });

        $body.on('click',function() {
            $html.removeClass('active_dribbble');
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
                    $html.removeClass('active_navigation-main');
                }
            };
        }

        function moveFooterMain() {
            return {
                match: function () {
                    $('footer#footer-main').appendTo('nav#navigation-main > div.wrapper');
                },
                unmatch: function () {
                    $('footer#footer-main').appendTo($body);
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
            .register("screen and (max-width : " + viewports.break6 + "px)", removeLayers())
            .register("screen and (max-width : " + viewports.break6 + "px)", moveFooterMain())
    }

    function initDribbbleStream() {
        $.jribbble.setToken('74d8c12b39672eeb9210054fbe2f6010b9ac3b3ff9943b428da5cef831dd1c18');




        $.jribbble.users('benjaminroth').shots({per_page: 24}).then(function(shots) {
            var html = [];

            shots.forEach(function(shot) {

                var date_created = $.format.date(shot.created_at, "d.MMMM yyyy");

                html.push('<li>');
                html.push('<div class="field_image"><a href="' + shot.html_url + '" target="_blank" title="'+shot.title+'"><img src="' + shot.images.normal + '"></a></div>');
                html.push('<div class="field_description"><h6><a href="' + shot.html_url + '" target="_blank" title="'+shot.title+'">'+shot.title+'</a></h6><p>' + date_created + '</p></div>');
                html.push('</li>');
            });

            $('section#layer_dribbble ul.list_shots').html(html.join(''));
        });
    }

    $(document).ready(function () {

        $html = $('html');
        $body = $('body');

        initmobileMainNavigation();
        initDribbble();
        initEnquire();
        initDribbbleStream();
    });

}(jQuery));