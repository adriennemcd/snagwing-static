$(document).ready(function(){
    $("#cslide-slides").cslide();
    // checkSize();
});

$(window).resize(function(){
    // document.location.reload(false);
    $("#cslide-slides").cslide();
    // checkSize();
});

$( ".hamburger" ).on( "click", function() {
  $( '#nav-toggle' ).toggleClass( "active" );
});

// hide navigation bar when scrolling down
// var senseSpeed = 3;
// var previousScroll = 0;
// $(window).scroll(function(event){
//     var scroller = $(this).scrollTop();
//     if (scroller-senseSpeed > previousScroll){
//         $("nav").filter(':not(:animated)').slideUp();
//         if($('.navi > ul').css('display','block')) {
//             $('.navi > ul').slideUp();
//         }
//     } else if (scroller+senseSpeed < previousScroll) {
//         $("nav").filter(':not(:animated)').slideDown();
//     }
//     if($('.highlight').visible(true)) {
//         $("nav").css('background-color','none');
//     } else {
//         $("nav").css({'background-color':'#222831','box-shadow':'0 0 15px rgba(0,0,0,0.2)'});
//     }
//     previousScroll = scroller;
// });

//Check whether the window is tablet or mobile based on nav icon visibility
//Allows nav to be visible when window is resized large, even with toggling on smaller screens
// function checkSize(){
//     if ($(".fa-bars").css('display') == 'none'){
//       $('.navi > ul').css('display', 'inline');
//     } else {
//       $('.navi > ul').css('display', 'none');
//     }
// }

// Toggle menu in mobile site
$('.hamburger').click(function(){
  $('.navi > ul').slideToggle();
});

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
            if (window.matchMedia("(max-width: 400px)").matches) {
                $(slidesContainerId+" .cslide-slides-container").css({
                    width : slidesContainerWidth,
                    visibility : "visible"
                });
                responSlidesContainerWidth = slidesContainerWidth;

            } else if (window.matchMedia("(min-width: 401px) and (max-width: 699px)").matches) {
                $(slidesContainerId+" .cslide-slides-container").css({
                    width : slidesContainerWidth50,
                    visibility : "visible"
                });
                responSlidesContainerWidth = slidesContainerWidth50;

            } else if (window.matchMedia("(min-width: 700px)").matches) {
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
