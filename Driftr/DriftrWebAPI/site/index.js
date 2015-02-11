$(document).ready(function()
{
	Driftr.api("GET", "Login", null).done(function()
	{
		window.location = "dashboard.html";
	});

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