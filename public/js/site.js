$(document).ready(function () {
    
    //This is a test to see if it's calling the site.js correctly
    //alert('Hey, this works!');

// User Login form
$("#loginAccount").on("click", function (event) {
    event.preventDefault();

    // Creating variables equal to the values of the login field values
    var username = $("#usernameLogin").val().trim();
    var password = $("#passwordLogin").val().trim();

    // Checking the username field
    if (username === "" || username === undefined || username === null) {
        return alert("Username field is empty!");
    }
    // Checking the password field
    else if (password === "" || password === undefined || password === null) {
        return alert("Password field is empty!");
    }
    else {
        // If the login info is valid, create an object to send in the post request, containing the login data.
        var userLoginData = {
            usernameData: username,
            passwordData: password
        }

        $.post("/login", { data: userLoginData }).then(function (results) {
            // 
        });
    }
});
// Create user form
$("#createAccount").on("click", function (event) {
    event.preventDefault();

    //
    var username = $("#usernameCreate").val().trim();
    var password = $("#passwordCreate").val().trim();
    var passwordConfirm = $("#passwordConfirm").val().trim();
    var userImage = $("#imageLinkCreate").val().trim();
    var goal = $("#goalCategory").val();

    // Checking the username field
    if (username === "" || username === undefined || username === null) {
        return alert("Please enter a username!");
    }
    // Checking the password field
    else if (password === "" || password === undefined || password === null) {
        return alert("Please enter a password!");
    }
    // Checking if the confirm password field matches the password field
    else if (password !== passwordConfirm) {
        return alert("Your passwords do not match!");
    }
    // Checking if the user provided an image link
    else if (userImage === "" || userImage === undefined || userImage === null) {
        return alert("Please provide an image URL!");
    }
    else {
        // If all of the fields are valid, creates an object that will be passed in the post request.
        // Object holds all of the user's create account info
        var userCreateData = {
            usernameData: username,
            passwordData: password,
            userImageData: userImage,
            goalData: goal
        }

        $.post("/newUser", { data: userCreateData }).then(function (results) {
            //
        });
    }
});

//Message Board Posting
// $("#postButton").on("click", function(event) {
//     event.preventDefault();

//     var usernamePost = 
// })

// End of document.ready
});