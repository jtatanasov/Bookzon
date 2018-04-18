$(function () {
    //testing some things
    
    // $.get('/books')
    // .then(function(books) {
    //     books.forEach(b => {
    //         $(`<div> <h3> ${b.volumeInfo.title} </h3> 
    //                 <p> ${b.volumeInfo.category} </p>
    //         </div>`).appendTo($('main'));
    //     });
    // });

    // $.get('/books')
    //     .then(function (data) {
    //         console.log(data);
    //     })
    // $.post('/books')
    // $.get('/users')
    //     .then(function (data) {
    //         data.forEach(user => {
    //             $(`<div id=${user._id}> 
    //             <h3> ${user.username} </h3>
    //             <p> ${user.email} </p>
    //             <button class='delete-user'> Delete </button>
    //         </div>`).appendTo($('main'));
    //         });

    //         $('.delete-user').on('click', function () {
    //             var id = $(this).closest('div').attr('id');
    //             var element = $(this);
    //             $.ajax({
    //                 method: 'delete',
    //                 url: '/users/' + id
    //             }).done(function () {
    //                 element.closest('div').remove();
    //             });
    //         });
    //     });

    // $('#add-user').on('click', function (event) {
    //     event.preventDefault();

    //     var user = {
    //         //validation
    //         username: $('#username').val(),
    //         password: $('#password').val(),
    //         email: $('#email').val()
    //     };

    //     $.post('/users', user)
    //     .then(function(data) {
    //         console.log(data);
    //     });
    // });
});