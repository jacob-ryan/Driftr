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
				if (user.email == event.userEmail)
				{
					$("#eventDetail-add-preference").show();
				}
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
						html += "<td>";
						html += "<button class='btn btn-sm btn-primary' onclick='editParticipant(\"" + participant.userEmail + "\");'>Edit</button>";
						html += "&ensp;";
						html += "<button class='btn btn-sm btn-danger' onclick='deleteParticipant(\"" + participant.userEmail + "\");'>Remove</button>";
						html += "</td>";
					}
					else
					{
						html += "<td></td>";
					}
					html += "</tr>";
					$("#participants-table").append(html);
				}
			});

			Driftr.api("GET", "VehiclesAllowed/" + eventId + "?email=" + user.email).done(function(count)
			{
				$("#eventDetail-join-event span").text(count);
				if (count > 0)
				{
					$("#eventDetail-join-event button").show();
					$("#eventDetail-join-event button").on("click", function()
					{
						var data = {
							eventId: eventId,
							userEmail: user.email,
							placement: 0
						};
						Driftr.api("POST", "EventParticipant", data).done(function()
						{
							location.reload(true);
						});
					});
				}
			});
		});
	});

	window.deletePreference = function(field)
	{
		Driftr.api("DELETE", "Preference/" + eventId + "?field=" + field, null).done(function()
		{
			location.reload(true);
		});
	};

	window.deleteParticipant = function(email)
	{
		Driftr.api("DELETE", "EventParticipant/" + eventId + "?email=" + email, null).done(function()
		{
			location.reload(true);
		});
	};

	window.editParticipant = function(email)
	{
		Driftr.api("GET", "Login", null).done(function(user)
		{
			Driftr.api("GET", "EventParticipant/" + eventId, null).done(function(participants)
			{
				for (var i = 0; i < participants.length; i += 1)
				{
					var participant = participants[i];
					if (participant.userEmail == email)
					{
						$("#eventDetail-participant-placement").val(participant.placement);
						$("#eventDetail-participant-email").val(participant.userEmail);
						$("#edit-container").slideDown();
						break;
					}
				}
			});
		});
	};

	window.submitAdd = function()
	{
		var data = {
			eventId: eventId,
			field: $("#eventDetail-preference-field").val(),
			entries: $("#eventDetail-preference-values").val(),
			isWhitelist: $("#eventDetail-preference-kind") == "whitelist"
		};

		Driftr.api("POST", "Preference", data).done(function()
		{
			location.reload(true);
		});
	};

	window.submitEdit = function()
	{
		var data = {
			eventId: eventId,
			userEmail: $("#eventDetail-participant-email").val(),
			placement: $("#eventDetail-participant-placement").val()
		};

		Driftr.api("PUT", "EventParticipant", data).done(function()
		{
			location.reload(true);
		});
	};
});