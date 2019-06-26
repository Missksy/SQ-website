$(function () {

    var urlcontacts = "http://contactsqs2.apphb.com/Service.svc/rest/contacts";

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
        if (SourceName === "0") {
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
