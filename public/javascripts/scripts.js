$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 + 'px'
                }, 1000);
                return false;
            }
        }
    });
});

$(document).ready(function() {
    $('nav a').click(function () {
        $('nav a').parent().removeClass('active');
        $(this).parent().addClass('active');
    });
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.nav a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2 -80+"px"
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });

    $("form[ajax=true]").submit(function(e) {

        e.preventDefault();

        var form_data = $(this).serialize();
        var form_url = $(this).attr("action");
        var form_method = $(this).attr("method").toUpperCase();

        $.ajax({
            url: form_url,
            type: form_method,
            data: form_data,
            cache: false,
            success: function(response, data, status){

                $('textarea[name="message"]').val('');
                $('input[name="name"]', 'form').val('');
                $('input[name="email"]', 'form').val('');
                $(".submit-field").append("<span class='info'>Tank you for a message!</span>");

                setTimeout(function(){
                    $('span.info').remove();
                }, 5000);
            },
            error: function(response, data, status){

                $('textarea[name="message"]').val('');
                $('input[name="name"]', 'form').val('');
                $('input[name="email"]', 'form').val('');
                $(".submit-field").append("<span class='info'>Something were wrong :( </span>");

                setTimeout(function(){
                    $('span.info').remove();
                }, 5000);
            }
        });

    });

});

function onScroll(event){
    var scrollPos = $(document).scrollTop() + 85;
    $('.nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));

        if (refElement.position().top <= scrollPos  && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav ul li').removeClass("active");
            currLink.parent().addClass("active");
        }
        else{
            currLink.parent().removeClass("active");
        }
    });
}