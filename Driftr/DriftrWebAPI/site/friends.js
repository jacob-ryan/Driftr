$(document).ready(function ()
{
	$("form").validate({
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
			"addfriend-email": {
				required: true,
				email: true,
				maxlength: 255
			},
			"addfriend-relation": {
				required: true
			}
		}
	});

    Driftr.api("GET", "Login", null).done(function (curUser) {
        var email = curUser.email;
        Driftr.api("GET", "Friend?email="+email, null).done(function (friends) {
            populateFriends(friends);
        });
    });

    window.submitForm = function()
    {
        Driftr.api("GET", "Login", null).done(function (curUser) {
            var email = curUser.email;

            var data = {
                userEmailA: email,
                userEmailB: $("#addfriend-email").val(),
                relation: $("#addfriend-relation").val()
            };

            Driftr.api("POST", "Friend", data).done(function () {
                window.location = "friends.html";
            });
        });
    };
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