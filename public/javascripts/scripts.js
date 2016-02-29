$(document).ready(function () {

    $(document).on("scroll", onScroll);

    smoothScrollAfterClick('.contact-me');
    smoothScrollAfterClick('nav a');
});

function smoothScrollAfterClick(link) {
    $(link).click(function (event) {

        event.preventDefault();

        $(document).off("scroll");

        if (link === 'nav a') {
            $(link).parent().removeClass('active');
            $(this).parent().addClass('active');
        }

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 85 + 'px'
                }, 1200, 'swing', function () {
                    $(document).on("scroll", onScroll);
                });
                return false;
            }
        }
    });
}

function onScroll() {

        var scrollPos = $(document).scrollTop() + 85;
        $('.nav a').each(function (e) {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (refElement.position().top <= scrollPos && refElement.position().top - 85 + refElement.height() > scrollPos) {
                $('.nav ul li').removeClass("active");
                currLink.parent().addClass("active");
                console.log('a');
            }
            else {
                currLink.parent().removeClass("active");
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
        success: function(response, data, status) {
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