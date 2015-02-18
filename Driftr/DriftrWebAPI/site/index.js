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
			"login-email": {
				required: true,
				email: true,
				maxlength: 255
			},
			"login-password": {
				required: true,
				maxlength: 255
			}
		}
	});

	Driftr.api("GET", "Login", null).done(function()
	{
		window.location = "dashboard.html";
	});
	
	window.submitForm = function()
	{
		var data = {
			email: $("#login-email").val(),
			password: $("#login-password").val()
		};

		Driftr.api("POST", "Login", data).done(function()
		{
			window.location = "dashboard.html";
		});
	};
});