var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.send("index.html")
  });


  // Get all Goals for a specific user to create HTML from
  app.get("/userGoals", function (req, res) {

    //Calling this from local storage at the userGoals.js level and passing it in as the req
    //var userID = localStorage.getItem("userID");

    db.Goal.findAll({
      where: {
        id: req.body.userID
      },
      raw: true,
    }).then(function (userGoals) {
      //this should be an array?
      console.log(userGoals);
      res.json(userGoals);
    });
  });

}

// // Load example page and pass in an example by id
// app.get("/example/:id", function (req, res) {
//   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
//     res.render("example", {
//       example: dbExample
//     });
//   });
// });

// Render 404 page for any unmatched routes
app.get("*", function (req, res) {
  res.render("404");
});
};
