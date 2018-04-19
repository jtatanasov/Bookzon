function formToObject(form) {
    var obj = {};
    $.each(form.children('input'), function (index, input) {
        obj[$(input).attr('name')] = $(input).val();
    });

    return obj;
}

$(function () {
    $('#register').on('click', function (event) {
        event.preventDefault();
        var user = formToObject($('form').eq(0));

        // VALIDATION ...

        userService.register(user)
            .then(function(data) {
                location.replace("/");
            }, function(err) {
                console.log(err);
            });
    });


    // **********
    //just testing the new users
    $('#show').on('click', function (event) {
        userService.getUsers().then(function(users) {
            users.forEach(user => {
                $('#users').append(`<div id='${user._id}'> 
                <h3> <a href='#'> ${user.name} </a> </h3>     
                <img class='moliv' src='http://www.haotu.net/up/2463/256/pencil.png' width="30">          
                <button class='delete'> Delete </button>
            </div>`);
            });
        }, function(err) {
            console.log(err)
        });
    });

    $('#users').on('click', '.delete', function () {
        var id = $(this).closest('div').attr('id');
        var element = $(this);
        $.ajax({
            method: 'delete',
            url: 'http://localhost:3000/users/' + id
        }).done(function () {
            element.closest('div').remove();
        });
    });
});