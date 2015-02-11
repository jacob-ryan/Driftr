/* JavaScript file for events.html */

$(document).ready(function () {
    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Event", null).done(function (events) {
            console.log(events);
            for (var i = 0; i < events.length; i++) {
                var event = events[i].locationId + " / " + events[i].theme + " / "
                    + new Date(events[i].date).toDateString();

                var li = document.createElement("li");
                li.innerHTML = event;
                document.getElementById("eventlist").appendChild(li);
            }

            document.getElementById("joinbutton").onclick = function () {
                console.log(events[0]);
                
                var data = {
                    userEmail: curUser.email,
                    eventID: 1,
                    placement: 0
                };

                Driftr.api("POST", "EventParticipant", data).done(function () {
                    window.location = "dashboard.html";
                });

            }
        });
    });


    $("form").on("submit", function (e) {
        e.preventDefault();

        Driftr.api("GET", "Login", null).done(function (curUser) {
            console.log(curUser.email);

            var data = {
                userEmail: curUser.email,
                locationId: parseInt($("#addevent-location").val()),
                date: new Date($("#addevent-date").val()),
                theme: $("#addevent-theme").val(),
                description: $("#addevent-description").val()
            };

            Driftr.api("POST", "Event", data).done(function () {
                window.location = "events.html";
            });
        });

    });


});