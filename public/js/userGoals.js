
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/


/*DO NOT AUTOFORMAT THIS FILE FOR READABILITY SAKE*/
$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulma box containing the goals - ID should correspond
    var goalsList = $("#userGoals"); // changed from #goalsList
    var goals;

    $(document).on("click", "button.delete", handleGoalDelete);
    //$(document).on("click", "button.edit", handleGoalEdit);

    var userLoginData = {
        // username: localStorage.getItem("username"),
        userID: localStorage.getItem("userID"),
        // userImage: localStorage.getItem("userImage")
    }

    //var userID = parseInt(localStorage.getItem("userID"))
    console.log(userLoginData);


    

    $.ajax("/api/goals/" + userLoginData.userID , {
        type: "GET",
        // data: userLoginData
    }).then(function (goalData) {
        console.log(goalData);
        goals = goalData;
        if (!goals || goals.length <= 0) {
            displayEmpty();
        }
        else {
            populateUserGoalsTable(goals);

        }
    
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

    //This is creating new HTML elements.
    //The "goal" being passed in at this stage are the JSON objects of the goals array
    function createNewRow(goal) {
        console.log(goal);  
        //use the correct Bulma elements
            // |
            // |
            // v
        var newGoalCard = $("<div>");
        newGoalCard.addClass("box newGoalBox");

        //Sindy be sure to change the CSS elements to reflect these added classes instead of the IDs
        var newGoalName = $("<p>");
        newGoalName.addClass("goalName");
        newGoalName.text(goal.title);

        var newGoalDescription = $("<p>");
        newGoalDescription.addClass("goalDescription");
        newGoalDescription.text(goal.description);

        var newGoalBreakBetweenDescriptionAndButtons = $("<br>");

        var newGoalButtonGroup = $("<div>");
        newGoalButtonGroup.addClass("field is-grouped");

            var newGoalSuccessButtonControlDiv = $("<div>");
            newGoalSuccessButtonControlDiv.addClass("control");

                var newGoalSuccessButton = $("<button>");

                newGoalSuccessButton.addClass("button is-success goalCompleteButton");
                newGoalSuccessButton.attr("goalId", goal.id);

                var newGoalSuccessButtonText = $("<p>");
                newGoalSuccessButtonText.addClass("completeButtonText");
                newGoalSuccessButtonText.text("Goal Completed!");

            var newGoalDeleteButtonControlDiv = $("<div>");
            newGoalDeleteButtonControlDiv.addClass("control");

                var newGoalDeleteButton = $("<button>");

                newGoalDeleteButton.addClass("button is-danger goalDeleteButton");
                newGoalDeleteButton.attr("goalId", goal.id);


                var newGoalDeleteButtonText = $("<p>");
                newGoalDeleteButtonText.addClass("deleteButtonText");
                newGoalDeleteButtonText.text("I give up.");

//Next append all the created elements in order that they are nested.
            newGoalCard.append(newGoalName);
            newGoalCard.append(newGoalDescription);
            newGoalCard.append(newGoalBreakBetweenDescriptionAndButtons);
            newGoalCard.append(newGoalButtonGroup);

//then the buttons
            newGoalButtonGroup.append(newGoalSuccessButtonControlDiv);
            newGoalSuccessButtonControlDiv.append(newGoalSuccessButton);
            newGoalSuccessButton.append(newGoalSuccessButtonText);

            newGoalButtonGroup.append(newGoalDeleteButtonControlDiv);
            newGoalDeleteButtonControlDiv.append(newGoalDeleteButton);
            newGoalDeleteButton.append(newGoalDeleteButtonText);
            
    return newGoalCard;
    
};


    function handleGoalDelete() {
        var currentGoal = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }



$("#logoutGo").on("click", function () {
    localStorage.clear();
}); 

// Add goal
$("#addGoal").on("click", function(event) {
    event.preventDefault();

    var goalTitle = $("#goalTitle").val().trim();
    var goalDescription = $("#goalDescriptionBox").val().trim();

    var userID = localStorage.getItem("userID");

    console.log("Title: " + goalTitle);
    console.log("Description: " + goalDescription);
    console.log("userID: " + userID);

    if (goalTitle === "" || goalTitle === undefined || goalTitle === null) {
        return alert("Goal title field is empty!");
    } 
    else if (goalDescription === "" || goalDescription === undefined || goalDescription === null) {
        return alert("Goal description field is empty!");
    }
    else {
        var newGoal = {
            goalTitle: goalTitle,
            goalDescription: goalDescription,
            userID: userID
        }
        console.log(newGoal);


        //THIS IS THE PARTS THAT'S LOADING WEIRD
        $.ajax("/api/newGoal", {
            type: "POST",
            data: newGoal
        }).then(function(goalData) {
            console.log(goalData);
        });
    }
});

// class for delete buttons = goalDeleteButton

// Update goal / mark as complete
$(document).on("click", "goalCompleteButton", function() {
    var goalId = $(this).attr();
    console.log(goalId);

    // ajax put request

});

});