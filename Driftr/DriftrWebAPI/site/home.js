$(document).ready(function()
{
	$(".form-signin").on("submit", function(e)
	{
		e.preventDefault();

		var data = {
			email: $("#inputEmail").val(),
			password: $("#inputPassword").val()
		};

		api("POST", "Login", data).done(function()
		{
			alert("Logged in!");
		});
	});

	var api = function(method, location, data)
	{
		var defer = $.Deferred();
		$.ajax({
			cache: false,
			contentType: "application/json",
			data: data ? JSON.stringify(data) : null,
			dataType: "json",
			type: method,
			url: "/api/" + location
		}).done(function(data)
		{
			defer.resolve(data);
		}).fail(function(error)
		{
			alert("API failed\n" + error.status + "\n" + error.statusText + "\n" + error.responseJSON);
		});
		return defer.promise();
	};
});