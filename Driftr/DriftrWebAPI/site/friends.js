$(document).ready(function () {


    Driftr.api("GET", "Login", null).done(function (curUser) {
        var email = curUser.email;
        Driftr.api("GET", "Friend?email="+email, null).done(function (friends) {
            console.log(friends);
        });
    });

    $("form").on("submit", function (e) {
        e.preventDefault();

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            console.log(email);
            var data = {
                userEmailA: email,
                userEmailB: $("#addfriend-email").val(),
                relation: $("#addfriend-relation").val()
            };

            console.log(data);


            Driftr.api("POST", "Friend", data).done(function () {
                window.location = "friends.html";
            });
        });

    });
});