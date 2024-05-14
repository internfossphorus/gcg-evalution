$(document).ready(function () {
    $('.recent__project__slider').slick({
        centerMode: true,
        slidesToShow: 1,
        centerPadding:'500px',
        dots:true,
        autoplay: true,
        autoplaySpeed: 2000,
        
    });

    function updateClasses() {

        $('.recent__project__slider .slick-slide').removeClass('previous-element next-element');
        $('.recent__project__slider .slick-slide').css('padding','0px');
        const $center = $('.recent__project__slider .slick-center');
        $center.css('width', '903px'); 
        // Add classes to the new previous and next elements
        $('.recent__project__slider .slick-center').prev().addClass('previous-element position-relative ');
        $('.recent__project__slider .slick-center').next().addClass('next-element position-relative ');

        // $('.recent__project__slider .slick-center').prev().css('padding-right','40px');
        // $('.recent__project__slider .slick-center').next().css('padding-left','40px');
    
     
    }

    // Initial class update
    updateClasses();

    // Update classes after each slide change
    $('.recent__project__slider').on('afterChange', function(event, slick, currentSlide) {
        updateClasses();
   

    });
    
    // $('.slick-current').addClass('px-6')
    $('.slick-dots button').text('')
  
});
