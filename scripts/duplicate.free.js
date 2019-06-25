$(function () {
    //push to top
    $('.btn-pushToTop').click(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });

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

                var deletedContacts = [];

                if (localStorage.getItem("deletedContactsSize") !== null) {
                    for (var i = 0; i < parseInt(localStorage.getItem("deletedContactsSize")); i++) {
                        deletedContacts.push(localStorage.getItem("deletedContacts" + i));
                    }
                }

                var newData = [];

                data.forEach(function (element) {
                    if (deletedContacts.indexOf(element.Guid) === -1) {
                        newData.push(element);
                    }
                });

                table(newData);
            }
        });
    }

    bindContacts();
});
