$(function () {
    // convert 
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    var urlByGuid = "http://contactsqs2.apphb.com/Service.svc/rest/contact/byguid/";
    // get contact by guild
    var guid = getParameterByName("guid");

    // get contact details
    $.ajax({
        type: "GET",
        dataType: "json",
        data: { source: guid },
        url: urlByGuid + guid,
        success: function (item) {
            var info = $('#Details .informations');
            $("#Details .name").html(item.GivenName + " " + item.Surname);
            if (item.PhotoUrl != null) {


                var urlImage = "http://34.90.69.90/resize?width=225&height=225&force=true&url=" + item.PhotoUrl;
                $.ajax({
                    type: "GET",
                    url: urlImage,
                    cache: true
                }).always(function () {
                    $("#Details .avatar img").attr({ 'src': urlImage, 'alt': item.GivenName + " " + item.Surname, "title": item.Surname + " " + item.GivenName });
                });


            }
            if (item.Email != null) {
                info.find('.email').attr('href', 'mailto:' + item.Email).html(item.Email);
            } else {
                info.find('.email-col').hide();
            }
            if (item.Phone != null && item.Phone != "0") {
                info.find('.phone').attr('href', 'tel:' + item.Phone).html(item.Phone);
            } else {
                info.find('.phone-col').hide();
            }
            if (item.Birthday != null) {
                info.find('.birthday').html(item.Birthday);
            } else {
                info.find('.birth-col').hide();
            }
            if (item.StreetAddress != null) {
                info.find('.address').html(item.StreetAddress);
            } else {
                info.find('.address-col').hide();
            }
            if (item.City != null) {
                info.find('.city').html(item.City);
            } else {
                info.find('.city-col').hide();
            }
            if (item.Company != null) {
                info.find('.company').html(item.Company);
            } else {
                info.find('.company-col').hide();
            }

            if (item.Occupation != null) {
                info.find('.hobby').html(item.Occupation);
            } else {
                info.find('.hobby-col').hide();
            }

            if (item.Source != null) {
                info.find('.source').html(item.Source);
            } else {
                info.find('.source-col').hide();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#Details .infos__detail').html('<div class="alert alert-info">Ups, contacto inexistente!</div>');
        }

    });
});
