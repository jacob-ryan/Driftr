$(document).ready(function()
{
	$("form").on("submit", function(e)
	{
		e.preventDefault();

		var data = {
			name: $("#register-name").val(),
			email: $("#register-email").val()
		};
		var password = $("#register-password").val();

		Driftr.api("POST", "User?password=" + password, data).done(function()
		{
			alert("Your account was created!");
			window.location = "login.html";
		});
	});
});