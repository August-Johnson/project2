
$(document).ready(function () {

    // alert("I ran first!");

    //targeting the Bulma boxes containing the champions and slackers by the box ID
    var championsList = $("#championUsersBoxes"); // changed from #goalsList
    var slackersList = $("#slackerUsersBoxes");
    var messagesList = $("messagesBoxes");
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

    // // Calling function that gets the users goals and displays them
    // getUserGoals(userLoginData.userID);


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
        console.log("CREATE NEW ROW: " + user.userName);
        //use the correct Bulma elements
        // |
        // |
        // v
        var newUserBox = $("<div>");
        newUserBox.addClass("box");

        var newUserArticle = $("<article>");
        newUserArticle.addClass("media");

        var newUserFigure = $("<figure>");
        newUserFigure.addClass("media-left");

        var newUserP = $("<p>");
        newUserP.addClass("image is-64x64");

        //not 100% sure about this
        //Sindy you also have an ID on this called poster profile?? What do
        var newUserImage = $("<img>");
        newUserImage.attr("src", user.imageUrl);

        var newUsernameDiv = $("<div>");
        newUsernameDiv.addClass("media-content");

        var newUsernameContentDiv = $("<div>");
        newUsernameContentDiv.addClass("content");

        var newUsernameP = $("<p>");
        var newUsernameStrong = $("<strong>");
        newUsernameStrong.text(user.userName);


        //Next append all the created elements in order that they are nested.
        newUserBox.append(newUserArticle);

        newUserArticle.append(newUserFigure);
        newUserFigure.append(newUserP);
        newUserP.append(newUserImage);

        newUserArticle.append(newUsernameDiv);
        newUsernameDiv.append(newUsernameContentDiv);
        newUsernameContentDiv.append(newUsernameP);
        newUsernameP.append(newUsernameStrong);

        return newUserBox;
    };

    // Logout button
    $("#logoutGo").on("click", function () {
        localStorage.clear();
    });

    // Getting users for the wall of fame (80% goal success rate or higher)
    $.ajax("/api/fame", {
        type: "GET",
    }).then(function (data) {

        var users = data;

        // If there are no results or if the GET request returns an empty array
        if (!users || users.length <= 0) {
            displayEmpty(championsList);
        }
        else {
            populateListWithUsers(championsList, users);
        }
    });

    // Getting users for the wall of shame (60% goal success rate or lower or 40% failure rate)
    // 60% success rate counting goals deleted, not goals that are still in progress
    $.ajax("/api/shame", {
        type: "GET",
    }).then(function (data) {

        var users = data;
        // If there are no results or the GET request returns an empty array
        if (!users || users.length <= 0) {
            displayEmpty(slackersList);
        }
        else {
            populateListWithUsers(slackersList, users);
        }
    });

    // MESSAGES (NOT COMPLETED)
    
    // $.ajax("/api/messages",{
    //     type: "GET",
    // }).then(function(data){
    //     console.log(data);
    //     var users = data;
    //     if (users) {
    //         displayEmpty();
    //     }
    //     else {
    //         populateListWithUsers(messagesList, users);
    //     }
    // })
}); // End of document.ready()