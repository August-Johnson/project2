var db = require("../models");

module.exports = function (app) {


  //GET ROUTES

  // Get all Users
  app.get("/api/Users", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Get all Goals
  app.get("/api/Goals", function (req, res) {
    db.Goal.findAll({}).then(function (dbGoals) {
      res.json(dbGoals);
    });
  });


  //POST ROUTES

  // Create a new User
  app.post("/api/newUser", function (req, res) {
    db.User.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      imageURL: req.body.imageURL
    }).then(function (dbNewUser) {
      res.json(dbNewUser);
    });
  });

  // Create a new Goal
  app.post("/api/newGoal", function (req, res) {
    db.Goal.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      goalMet: req.body.goalMet
    }).then(function (dbNewGoal) {
      res.json(dbNewGoal);
    });
  });


  //DELETE ROUTES

  // Delete a Goal
  app.delete("/api/Goals/:Goal", function (req, res) {
    db.Goal.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbDeleteGoal) {
      res.json(dbDeleteGoal);
    });
  });
};

// PUT ROUTES

//Update a goal with accomplishment
//Looks like this will be a stretch goal for now
app.put("/api/updateGoal", function (req, res) {

  // Update takes in an object describing the properties we want to update, and
  // we use where to describe which objects we want to update
  db.Goal.update({
    goalMet: req.body.goalMet
  }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbUpdateGoal) {
      res.json(dbUpdateGoal);
    })
    .catch(function (err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});
