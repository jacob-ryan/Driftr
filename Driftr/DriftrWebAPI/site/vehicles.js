$(document).ready(function () {
    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Vehicle?email=" + curUser.email, null).done(function (vehicles) {
            console.log(vehicles);
            for (var i = 0; i < vehicles.length; i++) {
                console.log(vehicles[i].year +" "+ vehicles[i].make+" "+vehicles[i].model);
            }
        });
    });


    $("form").on("submit", function (e) {
        e.preventDefault();

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            console.log(email);
            var data = {
                userEmail: email,
                active: 1,
                make: $("#addcar-make").val(),
                model: $("#addcar-model").val(),
                year: $("#addcar-year").val(),
                color: $("#addcar-color").val(),
                description: $("#addcar-description").val()
            };


            Driftr.api("POST", "Vehicle", data).done(function () {
                window.location = "dashboard.html";
            });
        });

    });
});