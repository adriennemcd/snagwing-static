// $(document).ready(function(){
// });

// $(window).resize(function(){
// });

// Toggle hamburger button and nav menu
$( ".hamburger" ).click(function() {
    $( '#nav-toggle' ).toggleClass( "active" );
    if($('#nav-toggle').attr('class') == 'active') {
        $('header').animate({width: '290px'});
        // $('.social').animate({width: '95%'});
        $('.social').css({'width':'95%','text-align':'right'});
        $('.social > a > i').css('padding-left','15px');
    } else {
        $('header').animate({width: '60px'});
        $('.social').css({'width':'22px','text-align':'none'});
        $('.social > a > i').animate({'padding-left':'0px'});
    }
    return false;
});

// if user starts scrolling, close nav bar
$(window).scroll(function() {
    if($(this).scrollTop() >0 && $('#nav-toggle').is('.active')) {
        $( '#nav-toggle' ).toggleClass( "active" );
        $('header').animate({width: '60px'});
        $('.social').css({'width':'22px','text-align':'none'});
        $('.social > a > i').animate({'padding-left':'0px'});
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
