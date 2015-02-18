$(document).ready(function()
{
	/*$("form").validate({
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
	});*/

    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Event", null).done(function (events) {
            //console.log(events);
            populateEvents(events, curUser);
        });
    });

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

//gets the location from the event's location id and adds it 
//  to the innerHTML of the location cell in the table.
var getLocation = function (event, bodyLocation) {
    Driftr.api("GET", "Location/" + event.locationId, null).done(function (location) {
        bodyLocation.innerHTML = location.address;
    });
};

//http://www.howtocreate.co.uk/referencedvariables.html
function scopepreserver(id, email) {
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

var populateEvents = function (events, curUser) {
    //Create the base for the table
    var table = document.createElement("table");
    table.className = "table";

    //build the headdings for the table
    var thead = document.createElement("thead");
    var headTr = document.createElement("tr");
    var headTheme = document.createElement("th");
    var headDate = document.createElement("th");
    var headLocation = document.createElement("th");
    var headDescription = document.createElement("th");
    var headDelete = document.createElement("th");

    //set text of each head
    headTheme.innerHTML = "Theme";
    headDate.innerHTML = "Date";
    headLocation.innerHTML = "Location";
    headDescription.innerHTML = "Description";

    headDelete.innerHTML = "";
    //append headding stuff together
    headTr.appendChild(headTheme);
    headTr.appendChild(headDate);
    headTr.appendChild(headLocation);
    headTr.appendChild(headDescription);
    headTr.appendChild(headDelete);
    thead.appendChild(headTr);
    //append thead into table
    table.appendChild(thead);

    //create tbody to add rows to
    var tbody = document.createElement("tbody");

    for (var i = 0; i < events.length; i++) {
        //build row and its columns
        var bodyTr = document.createElement("tr");
        var bodyTheme = document.createElement("td");
        var bodyDate = document.createElement("td");
        var bodyLocation = document.createElement("td");
        var bodyDescription = document.createElement("td");
        var bodyDelete = document.createElement("td");

        //********SPECIAL FOR DELETE BUTTON*********
        //create button
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.className = "btn btn-sm btn-success";
        buttonDelete.innerHTML = "JOIN"
        buttonDelete.setAttribute("value", events[i]['id']);
        //set onClick action for delete button
        buttonDelete.onclick = scopepreserver(events[i].id, curUser.email);
        //******************************************

        //populate the columns
        bodyTheme.innerHTML = events[i]['theme'];
        bodyDate.innerHTML = new Date(events[i]['date']).toDateString();
        var curEvent = events[i];
        getLocation(curEvent, bodyLocation); //add location address
        bodyDescription.innerHTML = events[i]['description'];
        bodyDelete.appendChild(buttonDelete);

        //append all columns into row
        bodyTr.appendChild(bodyTheme);
        bodyTr.appendChild(bodyDate);
        bodyTr.appendChild(bodyLocation);
        bodyTr.appendChild(bodyDescription);
        bodyTr.appendChild(bodyDelete);

        //append row into body of table
        tbody.appendChild(bodyTr);
    }
    //append tbody into table
    table.appendChild(tbody);
    //append table into doc
    $("#eventlist").append(table);
};