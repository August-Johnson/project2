var db = require("../models");

module.exports = function (app) {


  //=======================================================================================

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

  //Get a specific thing
  //Get a specific user
  app.get("/api/Users", function (req, res) {
    db.User.findAll({
      where: {
        username: req.body.userName
      }
    }).then(function (dbUser) {
      res.json(dbUser);

      // look for password match

    });

    //Get a specific goal
    app.get("/api/Goals", function (req, res) {
      db.Goal.findAll({
        where: {
          title: req.body.title
        }
      }).then(function (dbGoal) {
        res.json(dbGoal);

      });
    });

    //=======================================================================================
    //POST ROUTES

    // Create a new User
    app.post("/api/newUser", function (req, res) {
      db.User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        imageURL: req.body.imageURL
        //the goal completion values are created by default

      }).then(function (dbNewUser) {
        res.json(dbNewUser);
      });
    });

    // Create a new Goal
    app.post("/api/newGoal", function (req, res) {
      db.Goal.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
        //goal met is defaulted to false at this point

      }).then(function (dbNewGoal) {
        res.json(dbNewGoal);
      });
    });

    //=======================================================================================
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


    //=======================================================================================
    // PUT ROUTES

    //Update a User with new goal?
    app.put("/api/updateUser", function (req, res) {
      db.User.update({
        goalsSucceeded: goalsSucceeded + 1
      }, {
          where: {
            id: req.body.id
          }
        }).then(function (dbUpdateUser) {
          res.json(dbUpdateUser);
        })
        .catch(function (err) {
          res.json(err);
        });

    });


    //Update a goal with accomplishment boolean
    app.put("/api/updateGoal", function (req, res) {
      db.Goal.update({
        goalMet: req.body.goalMet
        //goalMet: true
      }, {
          where: {
            id: req.body.id
          }
        }).then(function (dbUpdateGoal) {
          res.json(dbUpdateGoal);
        })
        .catch(function (err) {
          res.json(err);
        });

      //should the goal be deleted at this point? What else can we do to it?

    });


    //Gus's copypasta Sequelize methods

    // Sequelize function that are not specified yet. Just coding them out for reference.


    // User completing a goal to complete and then it is deleted
    db.User.update({
      goalsSucceeded: goalsSucceeded + 1
    }).then(function (results) {
      // delete the goal?
    });

    // Additional notes: 
    // Maybe have it check for if a goal's boolean value is true-

    // it runs a function that adds one to the user's goalsSucceeded value and then deletes the goal???

  });
}
