$(document).ready(function()
{
	Driftr.api("DELETE", "Login", null).done(function()
	{
		window.location = "index.html";
	});
});