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
			"profile-email": {
				required: true,
				email: true,
				maxlength: 255
			},
			"profile-name": {
				required: true,
				maxlength: 255
			},
			"profile-password": {
				required: true,
				maxlength: 255
			},
			"profile-password-confirm": {
				required: true,
				equalTo: "#profile-password"
			}
		}
	});

	Driftr.api("GET", "Login", null).done(function(user)
	{
		$("#profile-email").val(user.email);
		$("#profile-name").val(user.name);
	});

	window.submitForm = function()
	{
		var data = {
			email: $("#profile-email").val(),
			name: $("#profile-name").val()
		};
		var password = $("#profile-password").val();

		if (password !== $("#profile-password-confirm").val())
		{
			alert("Passwords do not match");
		}
		else if (password.length < 3)
		{
			alert("Your password must be at least 3 characters long");
		}
		else
		{
			Driftr.api("PUT", "User?password=" + password, data).done(function()
			{
				alert("Your information was updated");
				window.location = "profile.html";
			});
		}
	};
});