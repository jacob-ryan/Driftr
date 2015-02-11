$(document).ready(function()
{
	Driftr.api("GET", "Login", null).done(function(user)
	{
		$("#profile-email").val(user.email);
		$("#profile-name").val(user.name);
	});

	$("form").on("submit", function(e)
	{
		e.preventDefault();

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
	});
});