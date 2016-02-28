function onScroll(event){
    console.log('działam!');
    event.preventDefault();

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

$(document).ready(function () {


    $('nav a').click(function () {
        $(document).off("scroll");

        $('nav a').parent().removeClass('active');
        $(this).parent().addClass('active');

        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 + 'px'
                }, 1000);
                return false;
            }
        }
    });

});

$(document).on("scroll", onScroll);


$("#contact form").submit(function (event) {

    event.preventDefault();

    var form_data = $(this).serialize(),
        form_url = $(this).attr("action"),
        form_method = $(this).attr("method").toUpperCase();

    $.ajax({
        url: form_url,
        type: form_method,
        data: form_data,
        cache: false,
        success: function(response, data, status){
            $('textarea[name="message"]', 'form').val('');
            $('input[name="name"]', 'form').val('');
            $('input[name="email"]', 'form').val('');
            $(".submit-field").append("<span class='info'>Tank you for a message!</span>");

            setTimeout(function(){
                $('span.info').remove();
            }, 5000);
        },
        error: function(response, data, status){

            $('textarea[name="message"]', 'form').val('');
            $('input[name="name"]', 'form').val('');
            $('input[name="email"]', 'form').val('');
            $(".submit-field").append("<span class='info'>Something were wrong :( </span>");

            setTimeout(function(){
                $('span.info').remove();
            }, 5000);
        }
    });
});