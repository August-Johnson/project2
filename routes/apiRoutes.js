var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};

/*

// Sequelize function that are not specified yet. Just coding them out for reference.
// Looks for a user with the username entered.

app.get("/login", function(req, res){
  db.User.findAll({ //SELECT * FROM db.User WHERE username = X AND password = y
    where: {
      username: req.body.userName
      password: req.body.password 
    }
  }).then(function (results) {
    console.log(results)
    //code to return just the user ID of the selected user
    //code to write user ID to local storage for later use
  });

})

//http://docs.sequelizejs.com/manual/models-usage.html#-code-findorcreate--code----search-for-a-specific-element-or-create-it-if-not-available

// Adds a new user to the table/database.
db.User.findOrCreate({
  where: {
    name: req.body.name,
    username: req.body.userName,
    password: req.body.password,
    imageURL: req.body.imgageURL,
  }
}).then(function (user, created) {
  console.log(user.get({
    plain:true
  }))
  console.log(created)
  //if statement: user created, return success & user ID
  //else, return that username has already been created, redirect to login
  res.json(created);
});

// Updating a goal to complete. ??(still deciding if it should be deleted afterwards)??
db.Goal.update({
  goalMet: true
}).then(function (results) {
  res.json(results);
});

// User completing a goal to complete and then it is deleted
db.User.update({
  goalsSucceeded: goalsSucceeded + 1
}).then(function (results) {
  // delete the goal?
});

// Additional notes: 
// Maybe have it check for if a goal's boolean value is true-
// it runs a function that adds one to the user's goalsSucceeded value and then deletes the goal???

*/