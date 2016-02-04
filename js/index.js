$(document).ready(function(){
    $("#cslide-slides").cslide();
    checkSize();
});

$(window).resize(function(){
    // document.location.reload(false);
    $("#cslide-slides").cslide();
    checkSize();
});

//Check whether the window is tablet or mobile based on nav icon visibility
//Allows nav to be visible when window is resized large, even with toggling on smaller screens
function checkSize(){
    if ($(".fa-bars").css('display') == 'none'){
      $('.navi > ul').css('display', 'inline');
    } else {
      $('.navi > ul').css('display', 'none');
    }
}

// Toggle menu in mobile site
$('.fa-bars').click(function(){
  $('.navi > ul').slideToggle();
});

// Add masonry for news items
var $grid = $('.news-masonry').masonry({
  'itemSelector': '.news-item',
  'transitionDuration': '1.0s'
});

// Refresh masonry when images are loaded
$('.news-masonry').imagesLoaded( function() {
  $grid.masonry('layout');
});

// Hide/show highlight section content area
$('.fa-angle-right, .fa-angle-left').click(function(){
  var $ref = $(this);
    if( $('.HL-image').css('left') == '0px') {
        $('.HL-image').animate({left: '247px'}, 800, function(){
          $ref.toggleClass('fa-angle-right fa-angle-left');
        });
    } else {
        $('.HL-image').css({'left': '247', 'width': '270px'}).animate({left: '0px'}, 800, function(){
          $ref.toggleClass('fa-angle-right fa-angle-left');
        });
    }
});

// scroll down when highlight section arrow is clicked
$('a').click(function(){
    $('html, body').animate({
        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
    }, 500);
    return false;
});

// horizonal responsive scrolling slides
// modified from http://callmenick.com/post/responsive-content-slider for media query compatibility
(function($) {

    $.fn.cslide = function() {

        this.each(function() {

            var slidesContainerId = "#"+($(this).attr("id"));

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
                var slideLeft = "-"+n*100+"%";
                var slideLeftAbs = n*100+"%";

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
