$(function () {
    //push to top
    $('.btn-pushToTop').click(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });

    var urlcontacts = "http://contactsqs2.apphb.com/Service.svc/rest/contacts";

    //function checkValueNullOrEmpty(item) {
    //    return (item != undefined || item != null || item.length >= 0) ? true : "-";
    //}

    // create dinamic table
    //function table(items) {
    //    var table = $('#Contacts tbody');
    //    var html = "";
    //    table.html('');
    //    for (var i = 0; i < items.length; i++) {
    //        html += '<tr>';
    //        html += '<td>' + items[i].GivenName + '</td>';
    //        html += '<td>' + items[i].Surname + '</td>';
    //        html += '<td>' + items[i].Email + '</td>';
    //        html += '<td>' + items[i].Phone + '</td>';
    //        html += '<td>' + items[i].Source + '</td>';
    //        html += '<td class="text-center"><a href="details.html?guid=' + items[i].Guid + '" class="btn btn-outline-primary size--s12">ver mais</a></td>';
    //        html += '</tr>';
    //    }
    //    $(table).append(html);
    //}

    function table(data) {
        $('#Contacts').DataTable({
            data: data,
            "columns": [
                { "data": "GivenName" },
                { "data": "Surname" },
                { "data": "Email" },
                { "data": "Phone" },
                { "data": "Source" },
                {
                    "data": "Guid",
                    orderable: false,
                    render: function (data, type, row) {
                        return '<div class="text-center"><a href="details.html?guid=' + data + '" class="btn btn-outline-primary size--s12">ver mais</a></div>';
                    }
                }
            ]
        });
    }

    // Get all contacts
    function bindContacts() {
        $.ajax({
            type: "GET",
            dataType: "json",
            data: {},
            url: urlcontacts,
            success: function (data) {
                $('#Contacts').DataTable().clear().destroy();
                table(data);
            }
        });
    }

     //get contacts by Source
    var urlSource = "http://contactsqs2.apphb.com/Service.svc/rest/contacts/bysource/";

    $("#FilterBySource").change(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        var SourceName = $(this).find(':selected').val();
        if (SourceName == "0") {
            bindContacts();
        } else {
            $.ajax({
                type: "GET",
                dataType: "json",
                data: { source: SourceName },
                url: urlSource + SourceName,
                success: function (data) {
                    $('#Contacts').DataTable().clear().destroy();
                    table(data);
                }
            });
        }
    });


    bindContacts();
});
