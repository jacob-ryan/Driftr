$(document).ready(function()
{
    document.getElementById('editcar').style.display = "none";

	$("#addCarForm").validate({
		errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
		errorElement: 'div',
		errorPlacement: function(error, e)
		{
			e.parents('.form-group').append(error);
		},
		highlight: function(e)
		{
			$(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
			$(e).closest('.help-block').remove();
		},
		success: function(e)
		{
			e.closest('.form-group').removeClass('has-success has-error');
			e.closest('.form-group').find('.help-block').remove();
		},
		rules: {
			"addcar-make": {
				required: true,
				maxlength: 255
			},
			"addcar-model": {
				required: true,
				maxlength: 255
			},
			"addcar-color": {
				required: true,
				maxlength: 255
			},
			"addcar-year": {
				required: true,
				minlength: 4,
				maxlength: 4,
				digits: true
			}
		}
	});

    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;
            Driftr.api("GET", "Vehicle?email=" + email, null).done(function (vehicles) {
                populateVehicles(vehicles);
            });
        });
    });


    window.submitFormAddCar = function()
    {
        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            var data = {
                userEmail: email,
                active: 1,
                make: $("#addcar-make").val(),
                model: $("#addcar-model").val(),
                year: parseInt($("#addcar-year").val()),
                color: $("#addcar-color").val(),
                description: $("#addcar-description").val()
            };

            Driftr.api("POST", "Vehicle", data).done(function () {
                window.location = "vehicles.html";
            });
        });
    };

    $('#editCarForm').submit(function () {
        var vehicleID = $('#editcar-id').val();
        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;
            var data = {
                userEmail: email,

                active: document.getElementById("editcar-active").checked,
                make: $("#editcar-make").val(),
                model: $("#editcar-model").val(),
                color: $("#editcar-color").val(),
                year: parseInt($("#editcar-year").val()),
                description: $("#editcar-description").val()
            };

            Driftr.api("PUT", "Vehicle?id=" + vehicleID, data).done(function () {
                window.location = "vehicles.html";
            });
        });
        return false;
    });

});

var populateVehicles = function (vehicles) {
    //Create the base for the table
    var table = document.createElement("table");
    table.className = "table";

    //build the headdings for the table
    var thead = document.createElement("thead");
    var headTr = document.createElement("tr");
    var headYear = document.createElement("th");
    var headVehicle = document.createElement("th");
    var headMake = document.createElement("th");
    var headColor = document.createElement("th");
    var headDescription = document.createElement("th");
    var headDelete = document.createElement("th");

    //set text of each head
    headYear.innerHTML = "Year";
    headVehicle.innerHTML = "Model";
    headMake.innerHTML = "Make";
    headColor.innerHTML = "Color";
    headDescription.innerHTML = "Description";
    
    headDelete.innerHTML = "";
    //append headding stuff together
    headTr.appendChild(headYear);
    headTr.appendChild(headVehicle);
    headTr.appendChild(headMake);
    headTr.appendChild(headColor);
    headTr.appendChild(headDescription);
    headTr.appendChild(headDelete);
    thead.appendChild(headTr);
    //append thead into table
    table.appendChild(thead);

    //create tbody to add rows to
    var tbody = document.createElement("tbody");

    for (var i = 0; i < vehicles.length; i++) {
        //build row and its columns
        var bodyTr = document.createElement("tr");
        var bodyYear = document.createElement("td");
        var bodyVehicle = document.createElement("td");
        var bodyMake = document.createElement("td");
        var bodyColor = document.createElement("td");
        var bodyDescription = document.createElement("td");
        var bodyDelete = document.createElement("td");

        //********SPECIAL FOR EDIT BUTTON*********
        //create button
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.className = "btn btn-default";
        buttonDelete.innerHTML = "<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit"
        buttonDelete.setAttribute("value", vehicles[i]['id']);
        //set vehicle data as attributes of edit button
        buttonDelete.setAttribute("year", vehicles[i]['year']);
        buttonDelete.setAttribute("model", vehicles[i]['model']);
        buttonDelete.setAttribute("make", vehicles[i]['make']);
        buttonDelete.setAttribute("color", vehicles[i]['color']);
        buttonDelete.setAttribute("description", vehicles[i]['description']);
        buttonDelete.setAttribute("active", vehicles[i]['active']);

        //set onClick action for delete button
        buttonDelete.onclick = editVehicle;
        //******************************************

        //populate the columns
        bodyYear.innerHTML = vehicles[i]['year'];
        bodyVehicle.innerHTML = vehicles[i]['model'];
        bodyMake.innerHTML = vehicles[i]["make"];
        bodyColor.innerHTML = vehicles[i]['color'];
        bodyDescription.innerHTML = vehicles[i]['description'];
        bodyDelete.appendChild(buttonDelete);

        //append all columns into row
        bodyTr.appendChild(bodyYear);
        bodyTr.appendChild(bodyVehicle);
        bodyTr.appendChild(bodyMake);
        bodyTr.appendChild(bodyColor);
        bodyTr.appendChild(bodyDescription);
        bodyTr.appendChild(bodyDelete);

        //append row into body of table
        tbody.appendChild(bodyTr);
    }
    //append tbody into table
    table.appendChild(tbody);
    //append table into doc
    $("#carlist").append(table);
};

var editVehicle = function () {
    var vehicleID = this.getAttribute("value");
    var make = this.getAttribute("make");
    var model = this.getAttribute("model");
    var color = this.getAttribute("color");
    var year = this.getAttribute("year");
    var description = this.getAttribute("description");
    var active = this.getAttribute("active");

    //set values in edit box to the vehicle data
    Driftr.api("GET", "Login", null).done(function (curUser) {
        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;
            Driftr.api("GET", "Vehicle?email=" + email, null).done(function (vehicles) {
                for(var i=0; i<vehicles.length; i++) {
                    if (vehicles[i].id == vehicleID) {
                        document.getElementById('editcar').style.display = "initial";
                        document.getElementById('editcar-id').value = vehicleID;
                        document.getElementById('editcar-id').style.display = "none";
                        document.getElementById('editcar-make').value = make;
                        document.getElementById('editcar-model').value = model;
                        document.getElementById('editcar-color').value = color;
                        document.getElementById('editcar-year').value = year;
                        document.getElementById('editcar-description').value = description;
                        document.getElementById('editcar-active').checked = active;
                    }
                }
            });
        });
    });  
}
