$(document).ready(function () {
    alert("I ran first!");

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

});