$(document).ready(function(){
    $("#cslide-slides").cslide();
    // checkSize();
});

$(window).resize(function(){
    // document.location.reload(false);
    $("#cslide-slides").cslide();
    // checkSize();
});

// Toggle hamburger button and nav menu
$( ".hamburger" ).click(function() {
    $( '#nav-toggle' ).toggleClass( "active" );
    if($('#nav-toggle').attr('class') == 'active') {
        $('nav').animate({width: '290px'});
        // $('.social').animate({width: '95%'});
        $('.social').css({'width':'95%','text-align':'right'});
        $('.social > i').css('padding-left','15px');
    } else {
        $('nav').animate({width: '60px'});
        $('.social').css({'width':'22px','text-align':'none'});
        $('.social > i').animate({'padding-left':'0px'});
    }
    return false;
});

// if user starts scrolling, close nav bar
$(window).scroll(function() {
    if($(this).scrollTop() >0 && $('#nav-toggle').is('.active')) {
        $( '#nav-toggle' ).toggleClass( "active" );
        $('nav').animate({width: '60px'});
        $('.social').css({'width':'22px','text-align':'none'});
        $('.social > i').animate({'padding-left':'0px'});
    }

    if ($(this).scrollTop() > 300) {
        $('.social').animate({'bottom':'50px'});
        $('.goUp').fadeIn();
    } else {
        $('.goUp').fadeOut();
    }
});

// scroll up button
$('.goUp').click(function() {
    $("html, body").animate({ scrollTop: 0}, 600);
    return false;
});

// toggle content of list items (song lyrics and other details) and rotate from '+' to 'x'
$('.list-title').click(function() {
    $(this).siblings('.list-content').slideToggle();
    $(this).toggleClass( "active" );
    return false;
});

//Check whether the window is tablet or mobile based on nav icon visibility
//Allows nav to be visible when window is resized large, even with toggling on smaller screens
// function checkSize(){
//     if ($(".fa-bars").css('display') == 'none'){
//       $('.navi > ul').css('display', 'inline');
//     } else {
//       $('.navi > ul').css('display', 'none');
//     }
// }

// horizonal responsive scrolling slides
// modified from http://callmenick.com/post/responsive-content-slider for media query compatibility
(function($) {

    $.fn.cslide = function() {

        this.each(function() {

            var slidesContainerId = "#"+($(this).attr("id"));           // #cslide-slides
            var len = $(slidesContainerId+" .cslide-slide").size();     // get number of slides
            var slidesContainerWidth = len*100+"%";                     // get width of the slide container
            var slidesContainerWidth50 = (len/2)*100+"%";
            var slidesContainerWidth33 = (len/3)*100+"%";
            var slideWidth = (100/len)+"%";                             // get width of the slides
            var responSlidesContainerWidth;

            // set slide width
            $(".cslide-slide").css({
                width : slideWidth
            });

            // set slide container width
            if (window.matchMedia("(max-width: 549px)").matches) {
                $(slidesContainerId+" .cslide-slides-container").css({
                    width : slidesContainerWidth,
                    visibility : "visible"
                });
                responSlidesContainerWidth = slidesContainerWidth;

            } else if (window.matchMedia("(min-width: 550px) and (max-width: 849px)").matches) {
                $(slidesContainerId+" .cslide-slides-container").css({
                    width : slidesContainerWidth50,
                    visibility : "visible"
                });
                responSlidesContainerWidth = slidesContainerWidth50;

            } else if (window.matchMedia("(min-width: 850px)").matches) {
                $(slidesContainerId+" .cslide-slides-container").css({
                    width : slidesContainerWidth33,
                    visibility : "visible"
                });
                responSlidesContainerWidth = slidesContainerWidth33;
            }
            console.log("responsive slide container width: " + responSlidesContainerWidth);

            $(window).resize(function(){
                duringResize();
            });

            function duringResize() {
              console.log("responsive slide container width: " + responSlidesContainerWidth);
              var i = $(slidesContainerId+" .cslide-slide.cslide-active").index();
              var n = i+1;
              console.log("n: " + n);
            }

            // add correct classes to first and last slide
            $(slidesContainerId+" .cslide-slides-container .cslide-slide").last().addClass("cslide-last");
            $(slidesContainerId+" .cslide-slides-container .cslide-slide").first().addClass("cslide-first cslide-active");

            // initially disable the previous arrow cuz we start on the first slide
            $(slidesContainerId+" .cslide-prev").addClass("cslide-disabled");

            // if first slide is last slide, hide the prev-next navigation
            if (!$(slidesContainerId+" .cslide-slide.cslide-active.cslide-first").hasClass("cslide-last")) {
                $(slidesContainerId+" .cslide-prev-next").css({
                    display : "block"
                });
            }

            // handle the next clicking functionality
            $(slidesContainerId+" .cslide-next").click(function(){
                var i = $(slidesContainerId+" .cslide-slide.cslide-active").index();
                var n = i+1;
                console.log("n: " + n);
                var slideLeft = "-"+n*100+"%";
                console.log("slideLeft: " + slideLeft);
                var slideLeftAbs = n*100+"%";
                console.log("responSlidesContainerWidth: " + responSlidesContainerWidth);

                $(slidesContainerId+" .cslide-slide.cslide-active").removeClass("cslide-active").next(".cslide-slide").addClass("cslide-active");
                // check whether you are at the last slide and should slide back to the beginning, or continue to slide left
                if (slideLeftAbs === responSlidesContainerWidth) {
                    $(slidesContainerId+" .cslide-slides-container").animate({
                        marginLeft : 0
                    },300);
                    $(slidesContainerId+" .cslide-slide.cslide-active").removeClass("cslide-active");
                    $(slidesContainerId+" .cslide-slides-container .cslide-slide").first().addClass("cslide-active");
                    $(slidesContainerId+" .cslide-prev").addClass("cslide-disabled");
                } else {
                    $(slidesContainerId+" .cslide-slides-container").animate({
                        marginLeft : slideLeft
                    },250);
                }

                if ((!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) && $(".cslide-prev").hasClass("cslide-disabled")) {
                    $(slidesContainerId+" .cslide-prev").removeClass("cslide-disabled");
                }
            });

            // handle the prev clicking functionality
            $(slidesContainerId+" .cslide-prev").click(function(){
                var i = $(slidesContainerId+" .cslide-slide.cslide-active").index();
                var n = i-1;
                var slideRight = "-"+n*100+"%";
                if (!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) {
                    $(slidesContainerId+" .cslide-slide.cslide-active").removeClass("cslide-active").prev(".cslide-slide").addClass("cslide-active");
                    $(slidesContainerId+" .cslide-slides-container").animate({
                        marginLeft : slideRight
                    },250);
                    if ($(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) {
                        $(slidesContainerId+" .cslide-prev").addClass("cslide-disabled");
                    }
                }
                if ((!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-last")) && $(".cslide-next").hasClass("cslide-disabled")) {
                    $(slidesContainerId+" .cslide-next").removeClass("cslide-disabled");
                }
            });

        });

        // return this for chainability
        return this;

    }

}(jQuery));

// to check visibility of elements
(function($){

    /**
     * Copyright 2012, Digital Fusion
     * Licensed under the MIT license.
     * http://teamdf.com/jquery-plugins/license/
     *
     * @author Sam Sehnert
     * @desc A small plugin that checks whether elements are within
     *       the user visible viewport of a web browser.
     *       only accounts for vertical position, not horizontal.
     */
    var $w = $(window);
    $.fn.visible = function(partial,hidden,direction){

        if (this.length < 1)
            return;

        var $t        = this.length > 1 ? this.eq(0) : this,
            t         = $t.get(0),
            vpWidth   = $w.width(),
            vpHeight  = $w.height(),
            direction = (direction) ? direction : 'both',
            clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

        if (typeof t.getBoundingClientRect === 'function'){

            // Use this native browser method, if available.
            var rec = t.getBoundingClientRect(),
                tViz = rec.top    >= 0 && rec.top    <  vpHeight,
                bViz = rec.bottom >  0 && rec.bottom <= vpHeight,
                lViz = rec.left   >= 0 && rec.left   <  vpWidth,
                rViz = rec.right  >  0 && rec.right  <= vpWidth,
                vVisible   = partial ? tViz || bViz : tViz && bViz,
                hVisible   = partial ? lViz || rViz : lViz && rViz;

            if(direction === 'both')
                return clientSize && vVisible && hVisible;
            else if(direction === 'vertical')
                return clientSize && vVisible;
            else if(direction === 'horizontal')
                return clientSize && hVisible;
        } else {

            var viewTop         = $w.scrollTop(),
                viewBottom      = viewTop + vpHeight,
                viewLeft        = $w.scrollLeft(),
                viewRight       = viewLeft + vpWidth,
                offset          = $t.offset(),
                _top            = offset.top,
                _bottom         = _top + $t.height(),
                _left           = offset.left,
                _right          = _left + $t.width(),
                compareTop      = partial === true ? _bottom : _top,
                compareBottom   = partial === true ? _top : _bottom,
                compareLeft     = partial === true ? _right : _left,
                compareRight    = partial === true ? _left : _right;

            if(direction === 'both')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
            else if(direction === 'vertical')
                return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
            else if(direction === 'horizontal')
                return !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
        }
    };

})(jQuery);
