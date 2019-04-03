var db = require("../models");

module.exports = function (app) {

  //GET ROUTES

  // Get all Users
  app.get("/api/Users", function (req, res) {
    db.User.findAll({ include: [db.Goal, db.Message] }).then(function (dbUsers) {
      res.json(dbUsers);

    });
  });

  // Get all Goals
  app.get("/api/Goals", function (req, res) {
    db.Goal.findAll({ include: [db.User] }).then(function (dbGoals) {
      res.json(dbGoals);
    });
  });

  // Get all Messages
  app.get("/api/Messages", function (req, res) {
    db.Goal.findAll({ include: [db.User] }).then(function (dbMessages) {
      res.json(dbMessages);
    });
  })

  // Get all Goals for a specific user
  app.get("/api/userGoals", function (req, res) {
    console.log(req.body);

    db.Goal.findAll({
      where: {
        UserId: req.body.userID
      }
    }).then(function (userGoals) {
      // res.json(userGoals);
      console.log(userGoals);
      res.json(userGoals);
    });
  });

  // Get route for retrieving all post from a user
  app.get("/api/goals/:UserId", function (req, res) {
    db.Goal.findAll({
      where: {
        UserId: req.params.UserId,
        goalMet: false
      }
    }).then(function (dbGoals) {
      var dbGoalsArray = [];
      for (var i = 0; i < dbGoals.length; i++) {
        dbGoalsArray.push({
          id: dbGoals[i].id,
          title: dbGoals[i].title,
          description: dbGoals[i].description,
          category: dbGoals[i].category
        })
      };
      res.json(dbGoalsArray)
    });
  });

  //Wall of FAME
  app.get("/api/fame", function (req, res) {
    db.User.findAll({ include: [db.Goal] }).then(function (dbUser) {
      var wallFame = [];
      for (var i = 0; i < dbUser.length; i++) {
        var famescore = (dbUser[i].goalsMade / dbUser[i].goalsSucceeded).toFixed(1);
        wallFame.push({
          id: dbUser[i].id,
          score: famescore
        });
      }
      wallFame.sort(function (a, b) {
        return parseFloat(a.score - b.score)
      });
      res.json(wallFame);
      //for loop to send top five only
    });
  });


  //Wall of SHAME
  app.get("/api/shame", function (req, res) {
    db.User.findAll({ include: [db.Goal] }).then(function (dbUser) {
      var wallShame = [];
      for (var i = 0; i < dbUser.length; i++) {
        var shamescore = (dbUser[i].goalsMade / dbUser[i].goalsSucceeded).toFixed(1);
        wallShame.push({
          id: dbUser[i].id,
          score: shamescore
        })
      }
      wallShame.sort(function (a, b) {
        return parseFloat(b.score - a.score)
      });
      res.json(wallShame);
    });
  });

  // POST ROUTES

  // Route for login link
  app.post("/login", function (req, res) {
    db.User.findAll({
      where: { //SELECT * FROM db.User WHERE username = req.body.username AND password = req.body.password
        username: req.body.usernameData,
        password: req.body.passwordData
      },
      raw: true,
    }).then(function (userInfo) {
      if (userInfo.length === 0) {
        console.log("User info is undefined");
        res.json({ userName: undefined });
      }
      else {
        console.log(userInfo[0]);
        var loggedUser = {//Create an object of properties to return to client 
          "userID": userInfo[0].id,
          "userName": userInfo[0].username,
          "userImage": userInfo[0].imageURL
        };
        console.log("\nUser logged in with ID of: " + userInfo[0].id); //console log on server side
        res.json(loggedUser); //send array back to browser for use
      }
    });
  });

  // Route to create a new user
  app.post("/newUser", function (req, res) {
    // Finds or creates a user with the username being posted
    db.User.findOrCreate({
      // defaults are the values being assigned to the new user if they are being created. (username does not need to be included in defaults)
      defaults: {
        password: req.body.passwordData,
        imageURL: req.body.userImageData
      },
      where: {
        username: req.body.usernameData
      }
    }).then(function ([user, created]) {
      // user is the object created or the the object that was found
      // Created is a boolean. True = it created a new user because one didn't exist with the name. False = user already existed.

      // console logging the data in a layout that only shows the relevant data
      console.log(user.get({
        plain: true
      }));

      // Will console log true if a new user object is created, or false if one already exists with that username
      console.log(created);

      // If a new user was created, return an object holding the data we need for local storage.
      // A new value called created will tell the front end if the user was created or not.
      if (created) {
        var createdUser = {
          "userID": user.id,
          "userName": user.username,
          "userImage": user.imageURL,
          "created": true
        }
        res.json(createdUser);
      }
      // If a new user was not created, return an object holding only a created value of false.
      // Don't need to pass any additional information since it wouldn't matter.
      else {
        var existingUser = {
          "created": false
        }
        res.json(existingUser);
      }

    });
  });

  // New goal request to database
  app.post("/api/newGoal", function (req, res) {

    db.Goal.create({
      title: req.body.goalTitle,
      description: req.body.goalDescription,
      UserId: req.body.userID
    }).then(function (data) {

      // Calling function to increment user's goalsMade value
      addGoal(req.body.userID);

      res.json(data);
    });
  });

  // PUT ROUTES

  // Goal completed
  app.put("/api/completeGoal/:goalId", function (req, res) {

    db.Goal.update({
      goalMet: true
    },
      {
        where: {
          id: req.params.goalId
        }
      }).then(function (data) {
        console.log(data);

        // Calling function to increment the user's goalsSucceeded value
        goalMet(req.body.userID);

        res.json(data);
      });
  });

  // DELETE ROUTES

  // Goal deleted
  app.delete("/api/deleteGoal/:goalId", function (req, res) {
    db.Goal.destroy({
      where: {
        id: req.params.goalId
      }
    }).then(function (data) {

      // Calling function to increment user's goalsDeleted value
      goalDeleted(req.body.userID);

      res.json(data);
    });
  });

  // FUNCTIONS FOR INCREMENTING USER GOAL-COUNTING VALUES

  // Increment goalsMade by one for user
  function addGoal(userId) {
    db.User.update({ goalsMade: db.sequelize.literal('goalsMade + 1') }, { where: { id: userId } });
  }

  // Increments goalsSucceeded by one for the user
  function goalMet(userId) {
    db.User.update({ goalsSucceeded: db.sequelize.literal('goalsSucceeded + 1') }, { where: { id: userId } });
  }

  // Increment goalsDeleted by one for user
  function goalDeleted(userId) {
    db.User.update({ goalsDeleted: db.sequelize.literal('goalsDeleted + 1') }, { where: { id: userId } });
  }

} // module export close