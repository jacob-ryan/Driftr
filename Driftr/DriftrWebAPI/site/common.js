Driftr = {};
Driftr.api = function(method, location, data)
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
		if (error.status != 401)
		{
			$(".error").remove();
			$("body").append("<div class='error'><button class='btn btn-xs btn-danger pull-right' onclick='$(\".error\").remove();'>&times;</button><strong>API call failed:</strong><br>" + error.status + " - " + error.statusText + "<br>" + JSON.stringify(error.responseJSON) + "</div>");
		}
		defer.reject(error);
	});

	return defer.promise();
};