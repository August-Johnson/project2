
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/
/*WARNING*//*WARNING*//*WARNING*/
/*WARNING*/

/*DO NOT AUTOFORMAT THIS FILE FOR READABILITY SAKE*/
$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulma boxes containing the champions and slackers by the box ID
    var championsList = $("#championUsersBoxes"); // changed from #goalsList
    var slackersList = $("#slackerUsersBoxes");
    var champions;
    var slackers;
    
    var championUserID;
    var slackerUserId;

    // $(document).on("click", "button.delete", handleGoalDelete);
    // $(document).on("click", "button.edit", handleGoalEdit);

    var userLoginData = {
        // username: localStorage.getItem("username"),
        userID: localStorage.getItem("userID"),
        // userImage: localStorage.getItem("userImage")
    }

    //var userID = parseInt(localStorage.getItem("userID"))
    console.log(userLoginData);
    
    // Calling function that gets the users goals and displays them
    getUserGoals(userLoginData.userID);


    //removed redundancy by making this function work for either the champions list of the slackers list
    function displayEmpty(list) {
        list.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No one even made goals to begin with!");
        list.append(messageH2);
    }

//two arguments, one for the list (by jQuery) being populated and one for the users (an array) that are getting loaded in
    function populateListWithUsers(list, users) {
        list.empty();
        var usersToAdd = [];
        for (var i = 0; i < users.length; i++) {
            usersToAdd.push(createNewRow(users[i]));
        }
        list.append(usersToAdd);
    }

    //This is creating new HTML elements.
    //The "goal" being passed in at this stage are the JSON objects of the goals array
    function createNewRow(user) {
        console.log(user);  
        //use the correct Bulma elements
            // |
            // |
            // v
        var newUserBox = $("<div>");
        newUserBox.addClass("box");

        var newUserArticle =$("<article>");
        newUserArticle.addClass("media");

        var newUserFigure =$("<figure>");
        newUserFigure.addClass("media-left");

        var newUserP = $("<p>");
        newUserP.addClass("image is-64x64");

        //not 100% sure about this
        //Sindy you also have an ID on this called poster profile?? What do
        var newUserImage = $("<image>");
        newUserImage.addAttr("src", user.imageURL);

        var newUsernameDiv = $("<div>");
        newUsernameDiv.addClass("media-content");

        var newUsernameContentDiv = $("<div>");
        newUsernameContentDiv.addClass("content");

        var newUsernameP = $("<p>");
        var newUsernameStrong = $("<strong>");
        

        

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

// Logout button
$("#logoutGo").on("click", function () {
    localStorage.clear();
}); 

// Add goal
$("#addGoal").on("click", function(event) {
    event.preventDefault();

    var goalTitle = $("#goalTitle").val().trim();
    var goalDescription = $("#goalDescriptionBox").val().trim();

    userID = localStorage.getItem("userID");

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
            getUserGoals(userID);
        });
    }
});

// Function for getting and displaying all goals belonging to the user that is logged in
// Passing an arguement that will be the userID for the database to reference
function getUserGoals(userID) {
    $.ajax("/api/goals/" + userID , {
        type: "GET"
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
}

// DYNAMICALLY CREATED BUTTON CLICK EVENTS

// Delete goal button event
$(document).on("click", ".goalDeleteButton", function() {
    goalId = $(this).attr("goalId");

    userID = localStorage.getItem("userID");

    var userData = {
        userID: userID
    }

    // ajax delete request
    $.ajax("/api/deleteGoal/" + goalId, {
        type: "DELETE",
        data: userData
    }).then(function(data) {
        getUserGoals(userID);
    });
});

// Update goal / mark as complete
$(document).on("click", ".goalCompleteButton", function() {
    goalId = $(this).attr("goalId");

    userID = localStorage.getItem("userID");

    // Passing userID in the PUT request for the database to reference
    var userData = {
        userID: userID
    }

    // ajax put request
    $.ajax("/api/completeGoal/" + goalId, {
        type: "PUT",
        data: userData
    }).then(function(data) {
        // Run function to reprint all non-completed goals to the user
        getUserGoals(userID);
    });
});

}); // End of document.ready()