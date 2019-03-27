// User create
$(".create-user").on("submit", function (event) {
  event.preventDefault();

  // Creating variables that hold the input field values
  var name = $("#name").val().trim();
  var username = $("#username-field").val().trim();
  var password = $("#password-field").val().trim();
  var userImage = $("#user-image").val().trim();

  // Checking if all of the fields have been filled out
  if (name !== "" && username !== "" && password !== "" && userImage !== "") {

    // If they have been filled out and pass the if statement, create an object called newUser and pass in the form data for its values
    var newUser = {
      name: name,
      username: username,
      password: password,
      imageURL: userImage
    };

    // ajax post with the newUser object data
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(function () {
      // ?
    });
  }
});
// More authentication (If the user didn't enter a name or username, etc.) Alert them somehow

// User login
$(".log-in").on("submit", function (event) {
  event.preventDefault();

  // Creating variables that hold the login info values
  var username = $("#username-field").val().trim();
  var password = $("#password-field").val().trim();

  // Checking if both fields have been filled out/not left blank
  if (username !== "" && password !== "") {

    // Creating an object to reference when we check the database for the user login credentials
    var userLogin = {
      username: username,
      password: password
    };

    // ajax post with the userLogin object data
    $.ajax("/api/users", {
      type: "POST",
      data: userLogin
    }).then(function () {
      // ?
    });
  }
});
// More authentication

// User create goal
$(".user-goals").on("submit", function (event) {
  event.preventDefault();
  // Tie the goals and data to the user making them. (id)?
  // Waiting for the form structure to intake data from the fields.
});

// User update / check off goal
// Setting the class to goal number to indicate it will be dynamic based on the goal being changed.
$(".goal-number").on("click", function (event) {
  event.preventDefault();

  $.ajax("/api/user/:id", {
    type: "PUT",
    // Not sure about the data being passed since we already know what we want to change.
    // Will change the goal to completed so we don't need a value. (I think)??
    data: ""
  }).then(function () {
    // ?
  });
});

// User delete goal