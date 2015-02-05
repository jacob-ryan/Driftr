$(document).ready(function()
{
	$("form").on("submit", function(e)
	{
		e.preventDefault();

		var data = {
			email: $("#login-email").val(),
			password: $("#login-password").val()
		};

		Driftr.api("POST", "Login", data).done(function()
		{
			window.location = "dashboard.html";
		});
	});
});