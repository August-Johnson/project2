var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.send("index.html")
  });

  // // Load the user page based on the ID of the logged in user from local storage
  app.get("/userGoals", function (req, res) {
    var userID = localStorage.getItem("userID");

    db.Goal.findAll({
        where: {
          id: userID
        }
      }).then(function (userHTML) {
        res.send("../public/user.html", {
          example: dbExample
        });
      });
  });

  // // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
