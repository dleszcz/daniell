$(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('a[href^="#"]').on('click', function (e) {
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
            'scrollTop': $target.offset().top - 80
        }, 300, 'swing', function () {
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop() + 80;
    $('nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('nav ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}

$("#contact form").submit(function (event) {

    $('button', 'form').prop('disabled', true);
    $('button', 'form').html('Sending...');

    event.preventDefault();

    var form_data = $(this).serialize(),
        form_url = $(this).attr("action"),
        form_method = $(this).attr("method").toUpperCase();

    $.ajax({
        url: form_url,
        type: form_method,
        data: form_data,
        cache: false,
        success: function (response, data, status) {
            $('textarea[name="message"]', 'form').val('');
            $('input[name="name"]', 'form').val('');
            $('input[name="email"]', 'form').val('');
            $('button', 'form').prop('disabled', false);
            $('button', 'form').html('Send');
            $(".submit-field").append("<span class='info'>Tank you for a message!</span>");

            setTimeout(function(){
                $('span.info').remove();
            }, 500);
        },
        error: function(response, data, status){

            $('textarea[name="message"]', 'form').val('');
            $('input[name="name"]', 'form').val('');
            $('input[name="email"]', 'form').val('');
            $('button', 'form').prop('disabled', false);
            $('button', 'form').html('Send');
            $(".submit-field").append("<span class='info'>Something were wrong :( </span>");

            setTimeout(function(){
                $('span.info').remove();
            }, 5000);
        }
    });
});