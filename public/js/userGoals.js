
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/


/*DO NOT AUTOFORMAT THIS FILE FOR READABILITY SAKE*/

$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulma box containing the goals - ID should correspond
    var goalsList = $("#goalsList");
    var goals;

    $(document).on("click", "button.delete", handleGoalDelete);
    //$(document).on("click", "button.edit", handleGoalEdit);

    var userLoginData = {
        username: localStorage.getItem("username"),
        userID: localStorage.getItem("userID"),
        userImage: localStorage.getItem("userImage")
    }

    $.ajax("/userGoals", {
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

    //This is creating new HTML elements.
    //The "goal" being passed in at this stage are the JSON objects of the goals array
    function createNewRow(goal) {
          //use the correct Bulma elements
            // |
            // |
            // v
        var newGoalCard = $("<div>");
        newGoalCard.addClass("box newGoalBox");

        //Sindy be sure to change the CSS elements to reflect these added classes instead of the IDs
        var newGoalName = $("<p>");
        newGoalName.addClass("goalName");
        newGoalName.text(goal.name);

        var newGoalDescription = $("<p>");
        newGoalDescription.addClass("goalDescription");
        newGoalDescription.text(goal.description);

        var newGoalBreakBetweenDescriptionAndButtons = $("<br>");

        var newGoalButtonGroup = $("<div>");
        newGoalButtonGroup.addClass("field is-grouped");

            var newGoalSuccessButtonControlDiv = $("<div>");
            newGoalSuccessButtonControlDiv.addClass("control");

                var newGoalSuccessButton = $("<button>");
                newGoalSuccessButton.addClass("button is-success");

                var newGoalSuccessButtonText = $("<p>");
                newGoalSuccessButtonText.addClass("completeButtonText");
                newGoalSuccessButtonText.text("Goal Completed!");

            var newGoalDeleteButtonControlDiv = $("<div>");
            newGoalDeleteButtonControlDiv.addClass("control");

                var newGoalDeleteButton = $("<button>");
                newGoalDeleteButton.addClass("button is-danger");

                var newGoalDeleteButtonText = $("<p>");
                newGoalDeleteButtonText.addClass("deleteButtonText");
                newGoalDeleteButtonText.text("Goal deleted. That's unfortunate.");

//Next append all the created elements in order that they are nested.
            newGoalCard.append(newGoalName);
            newGoalCard.append(newGoalDescription);
            newGoalCard.append(newGoalBreakBetweenDescriptionAndButtons);
            newGoalCard.append(newGoalButtonGroup);

//then the buttons
            newGoalButtonGroup.append(newGoalSuccessButtonControlDiv);
            newGoalSuccessButtonControlDiv.append(newGoalSuccessButton);

            newGoalButtonGroup.append(newGoalDeleteButtonControlDiv);
            newGoalDeleteButtonControlDiv.append(newGoalDeleteButton);
            
    return newGoalCard;
    };


    function handleGoalDelete() {
        var currentGoal = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

});