$(function () {
    //push to top
    $('.btn-pushToTop').click(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });


});
