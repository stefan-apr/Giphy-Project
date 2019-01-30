$(document).ready(function() {
    // Holds all potential gif topics
    var topics = [];

    // My API Key for querying the Giphy API
    var apiKey = "DXTxIfc2rT0npU9gprhYhsDBCzhiExWn";

    // Get the topics from storage or create a default list if no topics are there
    if(localStorage.getItem("topics") === null || localStorage.getItem("topics") === "") {
        topics = ["dog", "cat", "bear"];
        localStorage.setItem("topics", topics);
    } else {
        topics = localStorage.getItem("topics").split(",");
    }

    // Tracks whetehr or not the user pressed the "remove" button
    var removeClicked = false;
    
    // Populates page with buttons representing the available gif topics
    for(var i = 0; i < topics.length; i++) {
        var newButton = $("<button class='btn btn-dark'></button>").text(topics[i]);
        newButton.attr("value", topics[i]);
        newButton.attr("id", "button-" + (i + 1));
        $("#buttons").append(newButton);
    }   

    // Populates the dropdown for selecting how many GIFs the user wants to grab.
    for(var i = 1; i < 201; i++) {
        if(i === 10) {
            var newOption = $("<option value='"+i+"' selected>"+i+"</option>");
        } else {
            var newOption = $("<option value='"+i+"'>"+i+"</option>");
        }   
        $("#drop").append(newOption);
    }

    // Handles the user adding a new button
    $("#sub").click(function() {
        var form = document.getElementById("the-form");
        var buttonTerm = form.elements[0].value.trim();
        if(buttonTerm !== "" && topics.indexOf(buttonTerm) === -1 && buttonTerm.match(/^[A-Za-z\s]+$/)) {
            topics.push(buttonTerm);
            var newButton = $("<button class='btn btn-dark'></button>").text(buttonTerm);
            newButton.attr("value", buttonTerm);
            newButton.attr("id", "button-" + (topics.length));
            $("#buttons").append(newButton);
            newButton.click(function() {
                buttonClicked(newButton);
            });
            localStorage.setItem("topics", topics);
            $("#information").css("display", "none");
        } else {
            $("#information").css("display", "inline");
            $("#information").css("color", "darkred");
            $("#information").css("font-weight", "bold");
            $("#information").css("font-size", "14pt");
            $("#information").text("Please enter a new phrase without numbers or special characters to add it to the list of buttons.");
        }
    });

    // Handles the user pressing "remove"
    $("#remove").click(function() {
        removeClicked = true;
    });

    // Handles the user pressing "clear"
    $("#clear").click(function() {
        $("#gif-area").empty();
    });

    // Handles the user pressing any button in the topics list
    $("button[id^='button-']").click(function() {
        buttonClicked(this);
    });

    // Helper function for when the user chooses a topic
    function buttonClicked(btn) {
        // Remove the button if "remove" was just clicked
        if(removeClicked) {
            $(btn).css("display", "none");
            topics.splice(topics.indexOf($(btn).attr("value")), 1);
            localStorage.setItem("topics", topics);
            removeClicked = false;
        } 
        // Summon gifs if "remove" was not clicked
        else {
            var form = document.getElementById("the-form");
            var numGifs = form.elements[1].value;
            var isChecked = form.elements[2].checked;
            var indicesUsed = [];
            var val = $(btn).attr("value");
            val = val.replace(/ /g, '+');
            var queryURL = "http://api.giphy.com/v1/gifs/search?q="+val+"&api_key="+apiKey+"&limit=" + (1000);
            $.ajax({
                url: queryURL,
                method: "GET"
              })
            // Store all of the retrieved data inside of an object called "response"
            .then(function(response) {
                var gifArray = response.data;
                for(var i = 0; i < numGifs; i++) {
                    if(indicesUsed.length < gifArray.length) {
                        var newIndex = -1;
                        while(newIndex === -1 || indicesUsed.indexOf(newIndex) !== -1) {
                            newIndex = Math.floor(Math.random() * gifArray.length);
                        }
                        if(isChecked && gifArray[newIndex].rating === "r") {
                            
                        } else {
                            var newFig = $("<figure class='gif-figure' id='fig-"+i+"'></figure>");
                            var title = $("<div class='title' id='title-"+i+"'>Title: " + gifArray[newIndex].title +"</div>");
                            var image = $("<img class='gif' id='gif-"+i+"' src='" + gifArray[newIndex].images.fixed_height.url + "' alt='GIF'>");
                            var rate = $("<div class='title' id='title-"+i+"'>Maturity Rating: " + gifArray[newIndex].rating + "</div>");
                            $(title).css("text-align", "center");
                            $(rate).css("text-align", "center");
                            $(newFig).css("float", "left");
                            $(newFig).css("width", "auto");
                            $(newFig).css("margin-right", "5%");
                            $("#gif-area").append(newFig);
                            newFig.append(title);
                            newFig.append(image);
                            newFig.append(rate);
                        }
                        indicesUsed.push(newIndex);
                    } else {
                        break;
                    }
                }
            });
        }
    }
});