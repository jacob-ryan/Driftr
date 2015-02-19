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
			"location-address": {
				required: true,
				minlength: 5,
				maxlength: 255
			},
			"location-city": {
				required: true
			},
			"location-state": {
				required: true,
				minlength: 2,
				maxlength: 2
			}
		}
	});

	Driftr.api("GET", "Location", null).done(function(locations)
	{
		for (var i = 0; i < locations.length; i += 1)
		{
			var location = locations[i];
			var html = "<tr>";
			html += "<td>" + location.address + "</td>";
			html += "<td>" + location.city + "</td>";
			html += "<td>" + location.state + "</td>";
			html += "<td>" + location.description + "</td>";
			html += "</tr>";
			$(".table").append(html);
		}
	});

	window.submitForm = function()
	{
		var data = {
			address: $("#location-address").val(),
			city: $("#location-city").val(),
			state: $("#location-state").val(),
			description: $("#location-description").val()
		};

		Driftr.api("POST", "Location", data).done(function()
		{
			location.reload(true);
		});
	};
});