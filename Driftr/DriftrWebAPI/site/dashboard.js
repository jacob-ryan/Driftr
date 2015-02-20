$(document).ready(function()
{
	Driftr.api("GET", "Login", null).done(function(user)
	{
		$("#dashboard-name").text(user.name);
		$("#dashboard-email").text(user.email);

		Driftr.api("GET", "Vehicle?email=" + user.email, null).done(function(vehicles)
		{
			$("#dashboard-car-count").text(vehicles.length);
			for (var i = 0; i < vehicles.length; i += 1)
			{
				var vehicle = vehicles[i];
				$("#dashboard-cars").append("<li>" + vehicle.year + " " + vehicle.make + " " + vehicle.model + "</li>");
			}

			Driftr.api("GET", "Friend?email=" + user.email, null).done(function(friends)
			{
				$("#dashboard-friend-count").text(friends.length);
				for (var j = 0; j < friends.length; j += 1)
				{
					var friend = friends[j];
					$("#dashboard-friends").append("<li>" + friend.userEmailB + " - " + friend.relation + "</li>");
				}

				Driftr.api("GET", "Event?email=" + user.email, null).done(function(events)
				{
					$("#dashboard-event-count").text(events.length);
					for (var k = 0; k < events.length; k += 1)
					{
						var event = events[k];
						$("#dashboard-events").append("<li>" + new Date(event.date).toLocaleDateString() + " @ " + event.address + " - " + event.theme + " (" + event.description + ")</li>");
					}
				});
			});
		});
	});
});