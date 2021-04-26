$(function () {
    $(".nav__btn").on("click", function () {
        $(".nav__list").toggleClass("nav__list--active");
        $(".header").toggleClass("header--active");
    });

    $(".topForm__discr").slideUp()
    $(".topForm__discr__title").on("click", function () {
        $(".topForm__angle").toggleClass("topForm__angle--active");
        $(".topForm__discr").slideToggle();
    });

    $(".slider__inner").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1086,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 751,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    });

    $(".topSlider__inner").slick({
        fade:true,
        dots: true,
    });


    $(".topForm__main").slick({
        asNavFor: ".topForm__sub",
        draggable: false,
        arrows: false,
        fade: true,
    });

    $(".topForm__sub").slick({
        asNavFor: ".topForm__main",
        focusOnSelect: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: false,
    });

});