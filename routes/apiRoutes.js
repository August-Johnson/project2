var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.post("/login", function (req, res) { //Route for login link
    db.User.findAll({
      where: { //SELECT * FROM db.User WHERE username = req.body.username AND password = req.body.password
        username: req.body.username,
        password: req.body.password
      },
      raw: true,
    }).then(function (userInfo) {
      var response = userInfo
      console.log(response);
      console.log(response[0]);
      console.log(response[0].id);

      //grab user id
      // var userId = userInfo;
      //write id to local storage


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
  })

  app.get("/newUser", function (req, res) {
    db.User.findOrCreate({
      where: {
        name: req.body.name,
        username: req.body.userName,
        password: req.body.password,
        imageURL: req.body.imageURL,
      }
    }).then(function (createdUser) {
      console.log(createdUser)
    });
  })
}

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

