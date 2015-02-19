$(document).ready(function()
{
	$("#event-add").validate({
		errorClass: 'help-block animation-slideDown',
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
			"event-add-theme": {
				required: true,
				minlength: 3,
				maxlength: 255
			},
			"event-add-location": {
				required: true
			},
			"event-add-date": {
				required: true,
				date: true
			}
		}
	});

	$("#event-edit").validate({
		errorClass: 'help-block animation-slideDown',
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
			"event-edit-theme": {
				required: true,
				minlength: 3,
				maxlength: 255
			},
			"event-edit-location": {
				required: true
			},
			"event-edit-date": {
				required: true,
				date: true
			}
		}
	});

	Driftr.api("GET", "Location", null).done(function(locations)
	{
		for (var i = 0; i < locations.length; i += 1)
		{
			var location = locations[i];
			var html = "<option value='" + location.id + "'>" + location.address + " - " + location.city + ", " + location.state + "</option>";
			$("#event-add-location").append(html);
			$("#event-edit-location").append(html);
		}
	});

	Driftr.api("GET", "Login", null).done(function(user)
	{
		Driftr.api("GET", "Event", null).done(function(events)
		{
			for (var i = 0; i < events.length; i += 1)
			{
				var event = events[i];
				var html = "<tr>";
				html += "<td>" + event.theme + "</td>";
				html += "<td>" + event.userEmail + "</td>";
				html += "<td>" + event.location + "</td>";
				html += "<td>" + new Date(event.date).toLocaleDateString() + "</td>";
				html += "<td>" + event.description + "</td>";
				html += "<td>" + (event.wasBusted ? "Yes" : "No") + "</td>";
				if (event.userEmail == user.email)
				{
					html += "<td><button class='btn btn-sm btn-primary' onclick='editEvent(" + event.id + ");'>Edit</button></td>";
				}
				else
				{
					html += "<td></td>";
				}
				html += "</tr>";
				$(".table").append(html);
			}
		});
	});

	window.editEvent = function(id)
	{
		window.editId = id;

		Driftr.api("GET", "Login", null).done(function(user)
		{
			Driftr.api("GET", "Event/" + id, null).done(function(event)
			{
				$("#event-edit-theme").val(event.theme);
				$("#event-edit-location").val(event.locationId);
				$("#event-edit-date").val(new Date(event.date).toLocaleDateString());
				$("#event-edit-description").val(event.description);
				if (event.wasBusted)
				{
					$("#event-edit-wasBusted").attr("checked", "checked");
				}
				$("#edit-container").fadeIn();
			});

			Driftr.api("GET", "EventParticipant/" + id, null).done(function(participants)
			{
				for (var i = 0; i < participants.length; i += 1)
				{
					var participant = participants[i];
					var html = "<li><input type='number'>&ensp;" + participant.userEmail + "</li>";
					$("#event-edit-participants").append(html);
				}
			});
		});
	};

	window.submitAdd = function()
	{
		Driftr.api("GET", "Login", null).done(function(user)
		{
			var data = {
				userEmail: user.email,
				locationId: $("#event-add-location").val(),
				date: $("#event-add-date").val(),
				theme: $("#event-add-theme").val(),
				description: $("#event-add-description").val(),
				wasBusted: false
			};

			Driftr.api("POST", "Event", data).done(function()
			{
				location.reload(true);
			});
		});
	};

	window.submitEdit = function()
	{
		Driftr.api("GET", "Login", null).done(function(user)
		{
			var data = {
				userEmail: user.email,
				locationId: $("#event-edit-location").val(),
				date: $("#event-edit-date").val(),
				theme: $("#event-edit-theme").val(),
				description: $("#event-edit-description").val(),
				wasBusted: $("#event-edit-wasBusted").is(":checked")
			};

			Driftr.api("PUT", "Event/" + window.editId, data).done(function()
			{
				location.reload(true);
			});
		});
	};
});