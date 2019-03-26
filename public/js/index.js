// User create
$(".create-user").on("submit", function (event) {
  event.preventDefault();

  var newUser = {
    name: $("#name").val().trim(),
    username: $("#username-field").val().trim(),
    password: $("#password-field").val().trim(),
    imageURL: $("#user-image").val().trim()
  };

  $.ajax("/api/users", {
    type: "POST",
    data: newUser
  }).then(function () {
    // ?
  });
});

// User login
$(".log-in").on("submit", function (event) {
  event.preventDefault();

  var userLogin = {
    username: $("#username-field").val().trim(),
    password: $("#password-field").val().trim()
  };

  $.ajax("/api/users", {
    type: "POST",
    data: userLogin
  }).then(function () {
    // ?
  });
});

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