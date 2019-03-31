$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulba box containing the goals - ID should correspond
    var goalsList = $("#goalsList");
    var goals;

    $(document).on("click", "button.delete", handleGoalDelete);
    //$(document).on("click", "button.edit", handleGoalEdit);

    var userLoginData = {
        username: localStorage.getItem("username"),
        userID: localStorage.getItem("userID"),
        userImage: localStorage.getItem("userImage")
    }

    $.ajax("/api/userGoals", {
        type: "GET",
        data: userLoginData
    }).then(function (data) {
        goals = data;
        if (!goals || !goals.length) {
            displayEmpty();
        }
        else {
            populateUserGoalsTable();
        }
        $()

    });


    function displayEmpty() {
        goalsList.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("You've got not goals... sad.");
        goalsList.append(messageH2);
    }

    function createNewRow(goal) {

    };

    function populateUserGoalsTable() {
        goalsList.empty();
        var goalsToAdd = [];
        for (var i = 0; i < goals.length; i++) {
            goalsToAdd.push(createNewRow(goals[i]));
        }
        goalsList.append(goalsToAdd);
    }

    function createNewRow(post) {
        var newPostCard = $("<div>");
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
        newPostCategory.text(post.category);
        newPostCategory.css({
          float: "right",
          "font-weight": "700",
          "margin-top":
          "-15px"
        });
        var newPostCardBody = $("<div>");
        newPostCardBody.addClass("card-body");
        var newPostBody = $("<p>");
        newPostTitle.text(post.title + " ");
        newPostBody.text(post.body);
        var formattedDate = new Date(post.createdAt);
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
        newPostCard.data("post", post);
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