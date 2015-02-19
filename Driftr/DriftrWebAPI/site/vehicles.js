$(document).ready(function()
{
	$("#car-add").validate({
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
			"car-add-make": {
				required: true,
				maxlength: 255
			},
			"car-add-model": {
				required: true,
				maxlength: 255
			},
			"car-add-color": {
				required: true,
				maxlength: 255
			},
			"car-add-year": {
				required: true,
				minlength: 4,
				maxlength: 4,
				digits: true
			}
		}
	});

	$("#car-edit").validate({
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
			"car-edit-make": {
				required: true,
				maxlength: 255
			},
			"car-edit-model": {
				required: true,
				maxlength: 255
			},
			"car-edit-color": {
				required: true,
				maxlength: 255
			},
			"car-edit-year": {
				required: true,
				minlength: 4,
				maxlength: 4,
				digits: true
			}
		}
	});

	Driftr.api("GET", "Login", null).done(function(user)
	{
		Driftr.api("GET", "Vehicle?email=" + user.email, null).done(function(cars)
		{
			for (var i = 0; i < cars.length; i += 1)
			{
				var car = cars[i];
				var html = "<tr>";
				html += "<td>" + car.make + "</td>";
				html += "<td>" + car.model + "</td>";
				html += "<td>" + car.color + "</td>";
				html += "<td>" + car.year + "</td>";
				html += "<td>" + car.description + "</td>";
				html += "<td>" + (car.active ? "Yes" : "No") + "</td>";
				html += "<td><button class='btn btn-sm btn-primary' onclick='editCar(" + car.id + ");'>Edit</button></td>"
				html += "</tr>";
				$(".table").append(html);
			}
		});
	});

	window.editCar = function(id)
	{
		window.editId = id;

		Driftr.api("GET", "Login", null).done(function(user)
		{
			Driftr.api("GET", "Vehicle?email=" + user.email, null).done(function(cars)
			{
				for (var i = 0; i < cars.length; i += 1)
				{
					var car = cars[i];
					if (car.id == id)
					{
						$("#car-edit-make").val(car.make);
						$("#car-edit-model").val(car.model);
						$("#car-edit-year").val(car.year);
						$("#car-edit-color").val(car.color);
						$("#car-edit-description").val(car.description);
						if (car.active)
						{
							$("#car-edit-active").attr("checked", "checked");
						}
						$("#edit-container").fadeIn();

						break;
					}
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
				active: true,
				make: $("#car-add-make").val(),
				model: $("#car-add-model").val(),
				year: $("#car-add-year").val(),
				color: $("#car-add-color").val(),
				description: $("#car-add-description").val()
			};

			Driftr.api("POST", "Vehicle", data).done(function()
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
				active: $("#car-edit-active").is(":checked"),
				make: $("#car-edit-make").val(),
				model: $("#car-edit-model").val(),
				year: $("#car-edit-year").val(),
				color: $("#car-edit-color").val(),
				description: $("#car-edit-description").val()
			};

			Driftr.api("PUT", "Vehicle/" + window.editId, data).done(function()
			{
				location.reload(true);
			});
		});
	};
});