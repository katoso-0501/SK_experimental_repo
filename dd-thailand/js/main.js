'use strict';

let loadState = 0;
// Set loadState to 1 when the page has been loaded
$(window).on('load',function(){
    loadState = 1;
});

// Add a class "animated" to the element that has a class "e-fadeTop" when the scroll has reached to it
$(window).on('scroll',function(){
    let scrollPos = $(window).scrollTop();
    $(".e-fadeTop").each(function(){
        let targetPos = $(this).offset().top;
        if(scrollPos >= targetPos - $(window).height() * 0.5 && loadState === 1){
            $(this).addClass("animated");
            loadState = 1;
        }
    });
});

// Testing Area Above

{
    // Add a background to header when screen passes away the hero content.
    if($('html, body').scrollTop()>=64){
        $("header").removeClass('header--ontop');
    }else{
        $("header").addClass('header--ontop');
    }
    
    $(window).on('scroll', function(){
        if($('html, body').scrollTop() >= 64){
            $("header").removeClass('header--ontop');
        }else{
            $("header").addClass('header--ontop');
        }
    });

    $(window).on('resize', function() {
        //Resize expanded classes when width is more than 1025px
        if($(this).innerWidth()>=1025){
            $('.sp_navigation, header, .sp_navigation__link, .header_spmenu__bar, .header--ontop').removeClass('expanded');
        }
    });

    // Expand / Retract smartphone menu
    $('.header_spmenu__anchor').on('click', function () {
        $('.sp_navigation, header, .sp_navigation__link, .header_spmenu__bar, .header--ontop').toggleClass('expanded');
        return false;
    });
}
