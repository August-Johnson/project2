$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulma box containing the goals - ID should correspond
    var goalsList = $("#userGoals");
    var goals;

    $(document).on("click", "button.delete", handleGoalDelete);
    //$(document).on("click", "button.edit", handleGoalEdit);

    var userLoginData = {
        // username: localStorage.getItem("username"),
        userID: localStorage.getItem("userID"),
        // userImage: localStorage.getItem("userImage")
    }

    var userID = parseInt(localStorage.getItem("userID"))
    console.log(userLoginData);

    $.ajax("/api/goals/" + userID, {
        type: "GET"

    }).then(function (goalData) {
        console.log(goalData);
        goals = goalData;
        if (!goals || goals.length <= 0) {
            displayEmpty();
        }
        else {
            //populateUserGoalsTable(goals);
            for (i = 0; i < goalData.length; i++) {
                var goalHTML = "";
                goalHTML = $("<h1>Goal #" + (i + 1) + "</h1><hr>");
                goalHTML.append($("<h2>Title: " + goals[i].title + "</h2>"));
                goalHTML.append($("<p>Description: " + goals[i].description + "<p>"));
                goalHTML.append($("<h3>Category: " + goals[i].category + "</h3><br />"));
                goalsList.append(goalHTML);
            }
        }
        $()
    });

    function displayEmpty() {
        goalsList.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("You've got no goals... sad.");
        goalsList.append(messageH2);
    }

    function createNewRow(goal) {

    };

    function populateUserGoalsTable(goals) {
        goalsList.empty();
        var goalsToAdd = [];
        for (var i = 0; i < goals.length; i++) {
            goalsToAdd.push(createNewRow(goals[i]));
        }
        goalsList.append(goalsToAdd);
    }

    //This is creating new HTML elements... can use jQuery to create the Bulma elements instead?
    function createNewRow(goal) {
        var newPostCard = $("<div>");
        //use the correct Bulma elements
        // |
        // |
        // v
        newPostCard.addClass("card");
        var newPostCardHeading = $("<div>");
        newPostCardHeading.addClass("card-header");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-default");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostCategory = $("<h5>");
        newPostCategory.text(goal.category);
        newPostCategory.css({
            float: "right",
            "font-weight": "700",
            "margin-top":
                "-15px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(goal.title + " ");
        newPostBody.text(goal.body);
        var formattedDate = new Date(goal.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        newPostDate.text(formattedDate);
        newPostTitle.append(newPostDate);
        newPostCardHeading.append(deleteBtn);
        newPostCardHeading.append(editBtn);
        newPostCardHeading.append(newPostTitle);
        newPostCardHeading.append(newPostCategory);
        newPostCardBody.append(newPostBody);
        newPostCard.append(newPostCardHeading);
        newPostCard.append(newPostCardBody);
        newPostCard.data("post", goal);
        return newPostCard;
    }


    function handleGoalDelete() {
        var currentGoal = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

});

$("#logoutGo").on("click", function () {
    localStorage.clear();
}); 