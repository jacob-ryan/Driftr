var map = null;
var geocoder = null;
//the position of the user
var pos = null;
//the marker for the new location
var newMarker = null;
//list of every marker
var markerList = [];
$(document).ready(function() {
	initalize();
	$("#addMarkerBtn").click(addLocationButton);
	getLocations();

	//*****All functions bellow this marker are being tested, delete on final release
	//getLocationByAddr("terre haute", printFAddrAndLatLng);
	
});



var initalize = function(){
	//set the initial options of the map
	var mapOptions = {
		zoom: 12
	};

	map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
	geocoder = new google.maps.Geocoder();

	//Try to find geolocation
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(centerMap, function() {
			handleNoGeolocation(true);
		});
	} else {
		//Browser doesn't support Geolocation or denied service
		handleNoGeolocation(false);
	}
};

var centerMap = function (position) {
	pos = new google.maps.LatLng(position.coords.latitude,
									 position.coords.longitude);
	map.setCenter(pos);
}

function handleNoGeolocation(errorFlag) {
	if (errorFlag) {
		var content = 'Error: The Geolocation service failed.';
	} else {
		var content = 'Error: Your browser doesn\'t support geolocation.';
	}

	var options = {
		map: map,
		position: new google.maps.LatLng(60, 105),
		content: content
	};

	var infowindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

function showAddress(address) {
      if (geocoder) {
        geocoder.getLatLng(
          address,
          function(point) {
            if (!point) {
              alert(address + " not found");
            } else {
              map.setCenter(point, 15);
              var marker = new GMarker(point, {draggable: true});
              map.addOverlay(marker);
              GEvent.addListener(marker, "dragend", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
              GEvent.addListener(marker, "click", function() {
                marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
              });
	      GEvent.trigger(marker, "click");
            }
          }
        );
      }
    }
function codeAddress(address) {

	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			//In this case it creates a marker, but you can get the lat and lng from the location.LatLng
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map, 
				position: results[0].geometry.location
			});
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});

}

//function that will take in an address and function and will execute the function if
//a location object is made
//NOTE: the function passed in should only take one parameter
var getLocationByAddr = function(address, func) {
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			//console.log(results[0].formatted_address);
			func(results);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

//example function to be passed into the above function
var printFAddrAndLatLng = function(locations) {
	for(var i=0; i<locations.length; i++) {
		console.log("Formatted address: "+locations[i].formatted_address);
		console.log("latitude: "+locations[i].geometry.location.k);
		console.log("longitude: "+locations[i].geometry.location.D);
	}
}

var addLocationButton = function() {
	var location = $("#markerLocation").val();

	if(location === "") {
		if(pos !== null) {
			location = (pos.k+" "+pos.D);
		} else {
			location = "Rose-Hulman";
		}
	}
	getLocationByAddr(location, addMovableMarker);
}

var addMovableMarker = function(location) {

	//define the race flag image
	var image = {
		url: 'http://www.iconsfind.com/wp-content/uploads/2013/11/20131114_528447a22433c.png',
		size: new google.maps.Size(32,32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,32)
	};

	//can add a var shape that takes in an array coords and type: 'poly' do define
	//clickable region but I'm not going to do that now

	//this will remove the marker from the map if it is already set
	//by doing this you can make it seem like you just moved the marker.
	if(newMarker!==null) {
		newMarker.setMap(null);
	}

	var markerLatLng = new google.maps.LatLng(location[0].geometry.location.k, 
											  location[0].geometry.location.D);

	//might want to make this marker a global variable and make it dragable
	newMarker = new google.maps.Marker({
		position: markerLatLng,
		map: map,
		icon: image,
		draggable: true,
		animation: google.maps.Animation.DROP
	});
	map.setCenter(markerLatLng);
	google.maps.event.addListener(newMarker, 'click', toggleBounce);
	addAddLocationBTN();
}

var addAddLocationBTN = function() {

	var addLocationButton = document.createElement("button");
	addLocationButton.setAttribute("type", "button");
	addLocationButton.className = "btn btn-primary";
	addLocationButton.innerHTML = "Submit New Location";
	addLocationButton.onclick = submitNewLocationButton;
	var descriptionTextArea = document.createElement("textarea");
	descriptionTextArea.className = "form-control";
	descriptionTextArea.setAttribute("id", "setDescription");
	descriptionTextArea.setAttribute("rows", "3");
	descriptionTextArea.setAttribute("placeholder", "Description");
	
	$("#confirmLocation").empty();

	$("#confirmLocation").append(descriptionTextArea);
	$("#confirmLocation").append(addLocationButton);
}

var submitNewLocationButton = function() {

	var locationPos = newMarker.position.k + " " + newMarker.position.D;
	getLocationByAddr(locationPos, addLocationToDB);
}

//function that inserts the new location into the database and refreshes
var addLocationToDB = function (location) {
	var addr = location[0].formatted_address.toString();
	var lat = location[0].geometry.location.k.toString();
	var lng = location[0].geometry.location.D.toString();

	var desc = $("#setDescription").val();
	if(desc === ""){
		desc = "N/A";
	}

	var data = {
		address: addr,
		description: desc,
		latitude: lat,
		longitude: lng
	};
	Driftr.api("POST", "Location", data).done(function (val) {
            window.location = "locations.html";
        });
}

//function that gets entire list of locations including all values
var getLocations = function() {
	Driftr.api("GET", "Location", null).done(function (locations) {
		//console.log(locations);
		//function that will take locations and build locations table
		buildLocationsTable(locations);
		//function that will take locations and add markers for each location
		loadMapMarkers(locations);
	});
}


var buildLocationsTable = function(locations) {
	//Create the base for the table
    var table = document.createElement("table");
    table.className = "table";

    //create empty tbody
    var tbody = document.createElement("tbody");

    //fill tbody with rows
    for(var i=0; i<locations.length; i++) {

    	//build body row and its columns
    	var bodyTr = document.createElement("tr");
    	var bodyAddress = document.createElement("td");
    	var bodyView = document.createElement("td");

    	//*****SPECIAL FOR VIEW BUTTON*****
    	//create button
    	var buttonView = document.createElement("button");
    	buttonView.setAttribute("type", "button");
    	buttonView.className = "btn btn-success";
    	buttonView.innerHTML = "View";
    	//set onClick action for the view button
    	
    	buttonView.onclick = (function() {
    		var curI = i;
    		return function() {
    			viewLocation(locations[curI]);
    		}	
    	})();
    	//**********************************

    	//populate the columns
    	bodyAddress.innerHTML = locations[i]['address'];
    	bodyView.appendChild(buttonView);

    	//append all columns into row
    	bodyTr.appendChild(bodyAddress);
    	bodyTr.appendChild(bodyView);

    	//append row into body of table
    	tbody.appendChild(bodyTr);
    }
    //append tbody into table
    table.appendChild(tbody);
    //append table into panel
    $("#locationTable").append(table)
}

//function that opens a modal with the info provided by location
var viewLocation = function(location) {

	console.log(location);
	$('#viewContainer').remove();
	var container = document.createElement("div");
	container.setAttribute("id", "viewContainer");

	var address = document.createElement("p");
	var latitude = document.createElement("p");
	var longitude = document.createElement("p");
	var description = document.createElement("textarea");

	address.innerHTML = "Address: "+location['address'];
	latitude.innerHTML = "latitude: "+location['latitude'];
	longitude.innerHTML = "longitude: "+location['longitude'];
	description.value = location['description'];

	description.setAttribute("id", "newDesc");

	container.appendChild(address);
	container.appendChild(latitude);
	container.appendChild(longitude);
	container.appendChild(description);

	$('#viewbody').append(container);

	//set the functions of delete and save buttons
	$("#DeleteLocationbtn").click(function(){deleteLocation(location['id'])});
	$("#saveChangesbtn").click(function(){updateDesc(location['id'])});

	//at the end toggle the modal
	$('#viewModal').modal('show');
}

var closeView = function() {
	$('#viewModal').modal('hide');
	$('#viewModal').on('hidden.bs.modal', function() {
		$('#viewContainer').remove();
	});
	$("#DeleteLocationbtn").unbind("click");
	$("#saveChangesbtn").unbind("click");
}

//delete the location with id
var deleteLocation = function(id) {
	console.log("id: "+id);

	Driftr.api("DELETE", "Location?id="+id, null).done( function (rows) {
			if(rows < 1) {

				$("#viewContainer").append("<div class='alert alert-danger' role='alert'><strong>Cannot Delete Location:</strong> location used in an event</div>");
			} else {
				window.location = "locations.html";	
			}
			 
		});

}

//update location with id to be $('#newDesc').val()
var updateDesc = function(id) {
	var desc = $('#newDesc').val();
	if(desc === "") {
		desc="N/A";
	}

	Driftr.api("PUT", "Location?id="+id+"&description="+desc, null).done(function () {
		window.location = "locations.html";
	});
}

var loadMapMarkers = function(locations) {

	var image = {
		url: 'http://icons.iconarchive.com/icons/iconshock/super-vista-business/32/checkered-flag-icon.png',
		size: new google.maps.Size(32,32),
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,32)
	};

	for(var i=0; i<locations.length; i++) {
		console.log(locations[i]);
		var loc = locations[i];
		console.log(loc.latitude);
		var newLatLng = new google.maps.LatLng(loc.latitude, loc.longitude);
		var marker = new google.maps.Marker({
		position: newLatLng,
		map: map,
		icon: image,
		animation: google.maps.Animation.DROP
		});
		markerList.push(marker);
	}
	console.log(markerList);
}

function toggleBounce() {
	//weird error where moving marker while animation is playing will cause glitch
	if (newMarker.getAnimation() != null) {
		newMarker.setAnimation(null);
	} else {
		newMarker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

//function that will tear down raceway editor and rebuild map
