window.onload = function () {
    document.getElementById("submitButton").onclick = submitClick;
};

function submitClick()
{
	var api = function(method, location, data, defaultError)
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
			alert("Done");
		});
		return defer.promise();
	};

	var data = {
		email: $("#emailArea").val(),
		name: $("#nameArea").val()
	};
	alert(JSON.stringify(data));
	api("POST", "User", data, false);
};