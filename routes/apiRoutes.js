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

db.User.findAll({
  where: {
    username: req.body.userName
  }
}).then(function (results) {
  // look for password match
});

// Adds a new user to the table/database.
db.User.create({
  name: req.body.name,
  username: req.body.userName,
  password: req.body.password,
  imageURL: req.body.imgageURL,
}).then(function (results) {
  res.json(results);
});

// Updating a goal to complete. ??(still deciding if it should ne deleted afterwards)??
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