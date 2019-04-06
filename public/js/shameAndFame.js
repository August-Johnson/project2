
$(document).ready(function () {

    // Calling the get messages function to print them all to the page
    getMessages();

    // Targeting the Bulma boxes containing the champions and slackers by the box ID
    var championsList = $("#championUsersBoxes"); // changed from #goalsList
    var slackersList = $("#slackerUsersBoxes");
    var messagesList = $("#messagesBoxes");

    var userLoginData = {
        userID: localStorage.getItem("userID")
    }

    // var userID = parseInt(localStorage.getItem("userID"));
    console.log(userLoginData);

    // Removed redundancy by making this function work for either the champions list of the slackers list
    function displayEmpty(list) {
        list.empty();
        var messageH2 = $("<h2>");
        messageH2.css({ "text-align": "center", "margin-top": "50px" });
        messageH2.html("No one even made goals to begin with!");
        list.append(messageH2);
    }

    // FUNCTIONS FOR POPULATING WALL OF FAME AND SHAME WITH USERS

    // Two arguments, one for the list (by jQuery) being populated and one for the users (an array) that are getting loaded in
    function populateListWithUsers(list, users) {
        list.empty();
        var usersToAdd = [];
        for (var i = 0; i < users.length; i++) {
            usersToAdd.push(createNewRow(users[i]));
        }
        list.append(usersToAdd);
    }

    // This is creating new HTML elements.
    // The "goal" being passed in at this stage are the JSON objects of the goals array
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

        var newUserImage = $("<img>");
        newUserImage.attr("src", user.imageUrl);

        var newUsernameDiv = $("<div>");
        newUsernameDiv.addClass("media-content");

        var newUsernameContentDiv = $("<div>");
        newUsernameContentDiv.addClass("content");

        var newUsernameP = $("<p>");
        var newUsernameStrong = $("<strong>");
        newUsernameStrong.text(user.userName);


        // Next append all the created elements in order that they are nested.
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

    // FUNCTIONS FOR POPULATING THE MESSAGE BOARD

    // Populate message board function (pretty much copy of 'populateListWithUsers' function)
    function populateMessageBoard(list, messages) {
        list.empty();
        var messagesToAdd = [];
        for (var i = 0; i < messages.length; i++) {
            messagesToAdd.push(createMessageRow(messages[i]));
        }
        list.append(messagesToAdd);
    }

    // Create a message row function (pretty much copy of 'createNewRow' function)
    function createMessageRow(message) {
        console.log("CREATE NEW ROW: " + message.name);
        // use the correct Bulma elements
        // |
        // |
        // v
        var newMessageBox = $("<div>");
        newMessageBox.addClass("box");

        var newMessageNameDiv = $("<div>");
        newMessageNameDiv.addClass("media-content");

        var newMessageNameContentDiv = $("<div>");
        newMessageNameContentDiv.addClass("content");

        var newMessageName = $("<h3>");
        newMessageName.text(message.name);

        var newMessageBody = $("<p>");
        newMessageBody.text(message.body);

        newMessageBox.append(newMessageNameDiv);

        // Next append all the created elements in order that they are nested.
        newMessageNameDiv.append(newMessageNameContentDiv);
        newMessageNameContentDiv.append(newMessageName);
        newMessageNameContentDiv.append(newMessageBody);

        return newMessageBox;
    };

    // Function for printing all messages
    function getMessages() {
        $.ajax("/api/messages", {
            type: "GET"
        }).then(function (data) {

            populateMessageBoard(messagesList, data);

        });
    }

    // Logout button click event
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

    // Create new message (button click event)
    $("#postButton").on("click", function (event) {
        event.preventDefault();

        var messageName = $("#postName").val().trim();
        var messageBody = $("#postBody").val().trim();
        userID = localStorage.getItem("userID");

        // Checking if any input fields are empty or invalid
        if (messageName === "" || messageName === undefined || messageName === null) {
            return alert("You did not enter a name!");
        }
        else if (messageBody === "" || messageBody === undefined || messageBody === null) {
            return alert("You do not have anything in your post body!");
        }
        else if (messageName.length <= 1) {
            return alert("Name field is too short!");
        }
        else if (messageBody.length <= 1) {
            return alert("Message field is too short!");
        }

        var messageData = {
            messageName: messageName,
            messageBody: messageBody,
            userID: userID
        }

        // ajax POST request
        $.ajax("/api/newMessage", {
            type: "POST",
            data: messageData
        }).then(function (data) {

            $("#postName").val('');
            $("#postBody").val('');
            // Print messages function call (pass 'userID as argument to function)
            getMessages();
        });

    });

}); // End of document.ready()