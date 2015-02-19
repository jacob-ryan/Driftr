$(document).ready(function()
{
	var eventId = +(location.search.substring(location.search.indexOf("id=") + 3));

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
			"eventDetail-preference-values": {
				required: true
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
			"eventDetail-participant-placement": {
				required: true,
				digits: true
			}
		}
	});

	Driftr.api("GET", "Login", null).done(function(user)
	{
		Driftr.api("GET", "Event/" + eventId, null).done(function(event)
		{
			var html = "<tr>";
			html += "<td>" + event.theme + "</td>";
			html += "<td>" + event.userEmail + "</td>";
			html += "<td>" + event.address + "</td>";
			html += "<td>" + new Date(event.date).toLocaleDateString() + "</td>";
			html += "<td>" + event.description + "</td>";
			html += "<td>" + (event.wasBusted ? "Yes" : "No") + "</td>";
			html += "</tr>";
			$("#event-table").append(html);

			Driftr.api("GET", "Preference/" + eventId, null).done(function(preferences)
			{
				for (var i = 0; i < preferences.length; i += 1)
				{
					var preference = preferences[i];
					var html = "<tr>";
					html += "<td>" + preference.field + "</td>";
					html += "<td>" + preference.entries + "</td>";
					html += "<td>" + (preference.isWhitelist ? "White-list" : "Black-list") + "</td>";
					if (user.email == event.userEmail)
					{
						html += "<td><button class='btn btn-sm btn-danger' onclick='deletePreference(\"" + preference.field + "\");'>Remove</button></td>";
					}
					else
					{
						html += "<td></td>";
					}
					html += "</tr>";
					$("#preferences-table").append(html);
				}
			});

			Driftr.api("GET", "EventParticipant/" + eventId, null).done(function(participants)
			{
				for (var i = 0; i < participants.length; i += 1)
				{
					var participant = participants[i];
					var html = "<tr>";
					html += "<td>" + participant.placement + "</td>";
					html += "<td>" + participant.userEmail + "</td>";
					if (user.email == event.userEmail)
					{
						html += "<td><button class='btn btn-sm btn-danger' onclick='deleteParticipant(\"\");'>Remove</button></td>";
					}
					else
					{
						html += "<td></td>";
					}
					html += "</tr>";
					$("#participants-table").append(html);
				}
			});
		});
	});

	window.deletePreference = function(field)
	{
		var data = {
			eventId: eventId,
			field: field
		};
		Driftr.api("DELETE", "Preference", data).done(function()
		{
			location.reload(true);
		});
	};

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