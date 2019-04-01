$(document).ready(function () {
    localStorage.clear();

    // User Login form
    $("#loginAccount").on("click", function (event) {
        event.preventDefault();

        // Creating variables equal to the values of the login field values
        var username = $("#usernameLogin").val().trim();
        var password = $("#passwordLogin").val().trim();

        // Checking the username field - No username entered
        if (username === "" || username === undefined || username === null) {
            $("#usernameLogin").attr('class', 'input is-danger');
            $("#enterUserLogin").css('display', 'inline');
            $('#errorUserLogin').css('visibility', 'visible');
        }
        // Checking the password field - No password entered
        else if (password === "" || password === undefined || password === null) {
            $("#passwordLogin").attr('class', 'input is-danger');
            $("#enterPassLogin").css('display', 'inline');
            $('#errorIconPass').css('visibility', 'visible');
        }
        else {
            // If the login info is valid, create an object to send in the post request, containing the login data
            var userLoginData = {
                usernameData: username,
                passwordData: password
            }

            $.ajax("/login", {
                type: "POST",
                data: userLoginData
            }).then(function (data) {
                // console.log(data);

                if (data.userName === undefined) {
                    console.log("userName is undefined")
                    alert("Login FAILED")
                }
                else {
                    // Set returned data to local storage for future use. 
                    localStorage.setItem("username", data.userName);
                    localStorage.setItem("userID", data.userID);
                    localStorage.setItem("userImage", data.userImage);

                    location.replace("./user.html");
                };

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

        // Checking the username field - Enter Username (Blank field)
        if (username === "" || username === undefined || username === null) {
            $("#usernameCreate").attr('class', 'input is-danger');
            $("#enterNewUser").css('display', 'inline');
            $("#errorUserCreate").css('visibility', 'visible');
        }
        // Checking the username field - Username Length Error
        if (username.length > 20 || username.length < 5) {
            $("#usernameCreate").attr('class', 'input is-danger');
            $("#userNewLength").css('display', 'inline');
            $("#errorUserCreate").css('visibility', 'visible');
        }
        // Checking the password field - Enter Password (Blank field)
        else if (password === "" || password === undefined || password === null) {
            $("#passwordCreate").attr('class', 'input is-danger');
            $("#enterNewPass").css('display', 'inline');
            $("#passErrorCreate").css('visibility', 'visible');
        }
        // Checking the password field - Must be 5 characters
        else if (password.length < 5) {
            $("#passwordCreate").attr('class', 'input is-danger');
            $("#passNewLength").css('display', 'inline');
            $("#passErrorCreate").css('visibility', 'visible');
        }
        // Checking if the confirm password field matches the password field
        else if (password !== passwordConfirm) {
            $("#passwordConfirm").attr('class', 'input is-danger');
            $("#passNoMatch").css('display', 'inline');
            $("#passErrorCreate2").css('visibility', 'visible');
        }
        // Checking if the user provided an image link
        else if (userImage === "" || userImage === undefined || userImage === null) {
            $("#imageLinkCreate").attr('class', 'input is-danger');
            $("#imgNone").css('display', 'inline');
            $("#imgError").css('visibility', 'visible');
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

            // Posting to newUser with the create user form values
            $.ajax("/newUser", {
                type: "POST",
                data: userCreateData
            }).then(function (data) {
                // 'data' is what is being returned as an object created and defined in apiRoutes
                console.log(data);
                // If a new user was successfully created
                if (data.created) {

                    localStorage.setItem("username", data.userName);
                    localStorage.setItem("userID", data.userID);
                    localStorage.setItem("userImage", data.userImage);

                    location.replace("./user.html");
                }
                // If there is a user with that username already
                else {
                    alert("Username already exists!");
                }

            });
        }
    });

    //Message Board Posting
    // $("#postButton").on("click", function(event) {
    //     event.preventDefault();

    //     var usernamePost = 
    // })


});// End of document.ready