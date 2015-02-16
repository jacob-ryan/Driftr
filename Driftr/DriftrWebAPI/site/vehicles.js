$(document).ready(function () {
    Driftr.api("GET", "Login", null).done(function (curUser) {

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;
            Driftr.api("GET", "Vehicle?email=" + email, null).done(function (vehicles) {
                populateVehicles(vehicles);
            });
        });
    });


    $("form").on("submit", function (e) {
        e.preventDefault();

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            console.log(email);

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
                window.location = "dashboard.html";
            });
        });

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

        //********SPECIAL FOR DELETE BUTTON*********
        //create button
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.className = "btn btn-danger";
        buttonDelete.innerHTML = "DELETE"
        buttonDelete.setAttribute("value", vehicles[i]['id']);
        //set onClick action for delete button
        buttonDelete.onclick = deleteFriend;
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

var deleteFriend = function () {
    var id = this.getAttribute("value");

    Driftr.api("GET", "Login", null).done(function (curUser) {
        var email = curUser.email;
 
		 Driftr.api("DELETE", "Vehicle?id="+id, null).done(function(){
			 window.location = "vehicles.html";
		 });
		 
    });
};