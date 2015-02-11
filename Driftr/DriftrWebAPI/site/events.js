/* JavaScript file for events.html */

$(document).ready(function () {
    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Event", null).done(function (events) {
            console.log(events);
            for (var i = 0; i < events.length; i++) {
                var event = events[i].locationId + " / " + events[i].theme + " / "
                    + new Date(events[i].date).toDateString() + "  ";
                console.log(event);

                var li = document.createElement("li");
                li.innerHTML = event;
                document.getElementById("eventlist").appendChild(li);

                var button = document.createElement("button");
                button.innerHTML = "Join";
                li.appendChild(button);

                button.onclick = scopepreserver(events[i].id, curUser.email);

            }
        });
    });

    //http://www.howtocreate.co.uk/referencedvariables.html
    function scopepreserver(id,email) {
        return function () {
            console.log(id);

            var data = {
                userEmail: email,
                eventID: id,
                placement: 0
            };
            Driftr.api("POST", "EventParticipant", data).done(function () {
                window.location = "dashboard.html";
            });
        }
    }

    setupJoinButton = function (event, email) {
        console.log(event.id);

        var data = {
            userEmail: email,
            eventID: event.id,
            placement: 0
        };
        Driftr.api("POST", "EventParticipant", data).done(function () {
            window.location = "dashboard.html";
        });
    };


    $("form").on("submit", function (e) {
        e.preventDefault();
        console.log($("#addevent-date").val());

        Driftr.api("GET", "Login", null).done(function (curUser) {
            console.log(curUser.email);

            var data = {
                userEmail: curUser.email,
                locationId: parseInt($("#addevent-location").val()),
                date: $("#addevent-date").val(),
                theme: $("#addevent-theme").val(),
                description: $("#addevent-description").val()
            };

            Driftr.api("POST", "Event", data).done(function () {
                window.location = "events.html";
            });
        });

    });


});