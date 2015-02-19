$(document).ready(function()
{
	$("form").validate({
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
			"event-theme": {
				required: true,
				minlength: 3,
				maxlength: 255
			},
			"event-location": {
				required: true
			},
			"event-date": {
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
			$("#event-location").append(html);
		}
	});

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
			html += "</tr>";
			$(".table").append(html);
		}
	});

	window.submitForm = function()
	{
		Driftr.api("GET", "Login", null).done(function(user)
		{
			var data = {
				userEmail: user.email,
				locationId: $("#event-location").val(),
				date: $("#event-date").val(),
				theme: $("#event-theme").val(),
				description: $("#event-description").val()
			};

			Driftr.api("POST", "Event", data).done(function()
			{
				location.reload(true);
			});
		});

	};
});