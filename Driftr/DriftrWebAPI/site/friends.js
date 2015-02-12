/// <reference path="friends.html" />
/// <reference path="friends.html" />
/// <reference path="friends.html" />
$(document).ready(function ()
{
    Driftr.api("GET", "Login", null).done(function (curUser) {
        var email = curUser.email;
        Driftr.api("GET", "Friend?email="+email, null).done(function (friends) {
            populateFriends(friends);
        });
    });

    $("form").on("submit", function (e) {
        e.preventDefault();

        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            //console.log(email);
            var data = {
                userEmailA: email,
                userEmailB: $("#addfriend-email").val(),
                relation: $("#addfriend-relation").val()
            };

            //console.log(data);


            Driftr.api("POST", "Friend", data).done(function () {
                window.location = "friends.html";
            });
        });

    });
});

var populateFriends = function(friends) {
    //Create the base for the table
    var table = document.createElement("table");
    table.className = "table";

    //build the headdings for the table
    var thead = document.createElement("thead");
    var headTr = document.createElement("tr");
    var headFriend = document.createElement("th");
    var headRelation = document.createElement("th");
    var headDelete = document.createElement("th");
    //set text of each head
    headFriend.innerHTML = "Friends";
    headRelation.innerHTML = "Relation";
    headDelete.innerHTML = "";
    //append headding stuff together
    headTr.appendChild(headFriend);
    headTr.appendChild(headRelation);
    headTr.appendChild(headDelete);
    thead.appendChild(headTr);
    //append thead into table
    table.appendChild(thead);

    //create tbody to add rows to
    var tbody = document.createElement("tbody");

    for(var i=0; i<friends.length; i++) {
        //build row and its columns
        var bodyTr = document.createElement("tr");
        var bodyFriend = document.createElement("td");
        var bodyRelation = document.createElement("td");
        var bodyDelete = document.createElement("td");

        //********SPECIAL FOR DELETE BUTTON*********
        //create button
        var buttonDelete = document.createElement("button");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.className = "btn btn-danger";
        buttonDelete.innerHTML = "DELETE"
        buttonDelete.setAttribute("value", friends[i]['userEmailB']);
        //set onClick action for delete button
        buttonDelete.onclick = deleteFriend;
        //******************************************

        //populate the columns
        bodyFriend.innerHTML = friends[i]['userEmailB'];
        bodyRelation.innerHTML = friends[i]["relation"];
        bodyDelete.appendChild(buttonDelete);

        //append all columns into row
        bodyTr.appendChild(bodyFriend);
        bodyTr.appendChild(bodyRelation);
        bodyTr.appendChild(bodyDelete);

        //append row into body of table
        tbody.appendChild(bodyTr);
    }
    //append tbody into table
    table.appendChild(tbody);
    //append table into doc
    $("#friendTable").append(table);
};

var deleteFriend = function()
{
	var emailB = this.getAttribute("value");

	Driftr.api("GET", "Login", null).done(function(curUser)
	{
		 var email = curUser.email;
 
		 Driftr.api("DELETE", "Friend?email="+email+"&otherEmail="+emailB, null).done(function(){
			 window.location = "friends.html";
		 });
		 
	});
};