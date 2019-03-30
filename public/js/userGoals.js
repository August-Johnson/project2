$(document).ready(function () {
    
    alert("I ran first!");

    var goalsList = $("#goalsList");


    $.ajax("/userGoals", {
        type: "GET",
        data: userLoginData
    }).then(function (data) {
        $()

    });


    function createNewRow(post) {

    };

    function populateUserGoalsTable() {
        goalsList.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
          postsToAdd.push(createNewRow(posts[i]));
        }
        goalsList.append(postsToAdd);
      }

    function getGoals(user) {
        var categoryString = user || "";
        if (categoryString) {
          categoryString = "/category/" + categoryString;
        }
        $.get("/api/userGoals", function(data) {
          console.log(data);
          posts = data;
          if (!posts || !posts.length) {
            displayEmpty();
          }
          else {
            populateUserGoalsTable();
          }
        });
      }

});