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
			"register-name": {
				required: true,
				maxlength: 255
			},
			"register-email": {
				required: true,
				email: true,
				maxlength: 255
			},
			"register-password": {
				required: true,
				maxlength: 255
			}
		}
	});

	window.submitForm = function()
	{
		var data = {
			name: $("#register-name").val(),
			email: $("#register-email").val()
		};
		var password = $("#register-password").val();

		Driftr.api("POST", "User?password=" + password, data).done(function()
		{
			alert("Your account was created!");
			window.location = "index.html";
		});
	};
});