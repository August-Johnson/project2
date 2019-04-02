var db = require("../models");

module.exports = function (app) {

  //Route for login link
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

  //Route to create a new user
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



  //GET ROUTES

  //Wall of FAME
  // Get all Goals
  app.get("/api/fame", function (req, res) {
    db.User.findAll({ include: [db.Goal] }).then(function (dbUser) {
      var wallFame = [];
      for (var i = 0; i < dbUser.length; i++) {
        var famescore = dbUser[i].goalsMade / dbUser[i].goalsSucceeded;
        wallFame.push({
          id: dbUser[i].id,
          score: famescore
        })
      }
      res.json(wallFame);
    });
  });

  // Update goal
  app.put("/api/goal/:goalId", function (req, res) {
    db.Goal.update({
      goalMet: true
    }, {
        where: {
          id: req.params.goalId
        }
      }).then(function (data) {
        res.json(data);
      });
  });

  // Delete goal

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

  // New goal request to database
  app.post("/api/newGoal", function (req, res) {

    db.Goal.create({
      title: req.body.goalTitle,
      description: req.body.goalDescription,
      UserId: req.body.userID
    }).then(function (data) {

      addGoal(req.body.userID);

      res.json(data);
    });
  });


  function addGoal(userId) {
    db.User.update({ goalsMade: db.sequelize.literal('goalsMade + 1') }, { where: { id: userId } });
  }


} // module export close

//   //http://docs.sequelizejs.com/manual/models-usage.html#-code-findorcreate--code----search-for-a-specific-element-or-create-it-if-not-available

//   // Adds a new user to the table/database.
//   db.User.findOrCreate({
//     where: {
//       name: req.body.name,
//       username: req.body.userName,
//       password: req.body.password,
//       imageURL: req.body.imageURL,
//     }
//   }).then(function (user, created) {
//     console.log(user.get({
//       plain: true
//     }))
//     console.log(created)
//     //if statement: user created, return success & user ID
//     //else, return that username has already been created, redirect to login
//     res.json(created);
//   });

//   // Create a new example
//   app.post("/api/examples", function (req, res) {
//     db.Example.create(req.body).then(function (dbExample) {
//       res.json(dbExample);
//     });
//   });

//   // Delete an example by id
//   app.delete("/api/examples/:id", function (req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
//       res.json(dbExample);
//     });
//   });
// };

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
*/
