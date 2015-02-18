$(document).ready(function()
{
	$("form").validate({
		errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
		errorElement: 'div',
		errorPlacement: function(error, e)
		{
			e.parents('.form-group').append(error);
		},
		highlight: function(e)
		{
			$(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
			$(e).closest('.help-block').remove();
		},
		success: function(e)
		{
			e.closest('.form-group').removeClass('has-success has-error');
			e.closest('.form-group').find('.help-block').remove();
		},
		rules: {
			"addevent-theme": {
				required: true,
				minlength: 3,
				maxlength: 255
			},
			"addevent-location": {
				required: true
			},
			"addevent-date": {
				required: true,
				date: true
			}
		}
	});

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
                button.className = "btn btn-sm btn-success";
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

    window.submitForm = function()
    {
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

    };
});