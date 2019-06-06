$(function () {

    var urlcontacts = "http://contactsqs2.apphb.com/Service.svc/rest/contacts";

    // create dinamic table
    function table(items) {
        var table = $('#Contacts tbody');
        table.html('');
        for (var i = 0; i < items.length; i++) {
            table.append('<tr>');
            table.append('<td>' + items[i].GivenName + '</td>');
            table.append('<td>' + items[i].Surname + '</td>');
            table.append('<td>' + items[i].Email + '</td>');
            table.append('<td>' + items[i].Phone + '</td>');
            table.append('<td>' + items[i].Source + '</td>');
            table.append('</tr>');
        }
    }

    // Get all contacts
    function bindContacts() {
        $.ajax({
            type: "GET",
            dataType: "json",
            data: {},
            url: urlcontacts,
            success: function (data) {
                table(data);
            }
        });
    }


    bindContacts();
});
