window.onload = function () {
    document.getElementById("submitButton").onclick = submitClick();



};

function submitClick() {
    $.post({
        url: "/api/User",
        data: {
            email: "xyz",
            name: "blah"
        }
    });
};