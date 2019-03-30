$(document).ready(function () {
    
    //This is a test to see if it's calling the site.js correctly
    //alert('Hey, this works!');

//goal arrays
var generalGoals = [
    "Start Reading a Book",
    "Call an old relative",
    "Visit a museum",
    "Try a new food",
    "Learn a new skill",
    "Exercise for 30 minutes",
    "Compliment someone",
    "Put $20 away into a Savings account",
    "Donate to a charity",
    "Attend a social event"
];

var fitnessGoals = [
    "Meal prep for the week",
    "Exercise for 30 minutes",
    "Take the stairs instead of the elevator",
    "In a day, be active for 10 minutes every hour",
    "Make a healthy home cooked meal",
    "Meditate for 30 minutes",
    "Stretch 3 times a day",
    "Take a 10 minute walk",
    "Join a gym",
    "Start a fitness class"
];

var moneyGoals = [
    "Create a reasonable budget",
    "Put away $50 your pay into a Savings account",
    "Make a payment towards the principal on a debt/loan",
    "Pack your own lunch for a week",
    "Cut down on a daily spending habit (buying coffee, cigarettes, lottery ticket, etc.)",
    "Meet with a financial advisor",
    "Start an emergency fund",
    "Pay your bills",
    "Put more money into a retirement plan",
    "Find a part time job (can be short term/small)"
];

var workGoals = [
    "Attend a seminar",
    "Update your resume",
    "Research your job duties & find ways to improve performance",
    "Have a balanced breakfast",
    "Volunteer to work late",
    "Talk to your direct about advancement",
    "Take on a new project",
    "Study something new that will benefit your career",
    "Meet with other industry professionals",
    "Apply for a higher position"
];

var socialGoals = [
    "Call a friend and chat",
    "Organize a social event",
    "Attend a social event",
    "Start a conversation with a coworker",
    "Volunteer at an organization",
    "Call a family member and chat",
    "Visit family",
    "Learn something new about a coworker/classmate/neighbor",
    "Introduce yourself to a coworker/classmate/neighbor you've never talked to before",
    "Practice a speech in front of the mirror"
];

var choreGoals = [
    "Wash the dishes",
    "Do a load of laundry",
    "Mop the floors",
    "Donate old/unused clothes",
    "Organize a messy area (closet, kid's room, bathroom, etc...)",
    "Clean the bathroom until it's spotless!",
    "Do yard work (mow the lawn, trim trees, pick up leaves, etc)",
    "Clean out the fridge",
    "Wash your car. If you don't own a car, wash someone elses!",
    "Shop for groceries"
];


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
            console.log("I ran");
            console.log(data);
            localStorage.setItem("username", data.userName);
            localStorage.setItem("userID", data.userID);
            localStorage.setItem("userImage", data.userImage);

            location.replace("./user.html");

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

        var url = "/api/users/" + userCreateData.usernameData;
        getMethod(url, userCreateData);
    }
});


function getMethod(url, userData) {
    $.get(url, function (data) {
        if (data.length > 0) {
            return alert("Username already exists! Try again");
        }
        else {
            postMethod("/api/newUser", userData);
        }
    });
}

function postMethod(url, newUser) {
    $.post(url, newUser, function (data) {
        console.log("New user was created " + data.username);
    });
}
//Message Board Posting
// $("#postButton").on("click", function(event) {
//     event.preventDefault();

//     var usernamePost = 
// })

// End of document.ready
});