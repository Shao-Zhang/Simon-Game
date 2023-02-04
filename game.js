
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickPattern = [];




$("body").on("keypress", function (){
    $("h1").text("Level 0");
    $("body").off("keypress");
    nextSequence();
});


$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (userClickPattern.length === gamePattern.length) {
        if (checkGameOver(gamePattern, userClickPattern)){
            alert("game over");
        }
        else {
            userClickPattern.length = 0;
            playPreviousSequence(gamePattern);
            nextSequence();
        }
        // end game
    } 
    else {
        playPreviousSequence();
        nextSequence();
    }
});


function playPreviousSequence(gamePattern) {
    for (color in gamePattern) {
        var button = $("#"+color);
        button.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(button);
        level += 1;
        $("h1").text("Level " + level);
    }
}

function checkGameOver(gamePattern, playerPattern) {
    var index = 0;
    while (index < gamePattern.length){
        if (gamePattern[index] != playerPattern[index]) {
            return true
        } 
        else {
            i += 1;
        }
    }
    return false
}


function nextSequence(){
    var ranNum = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[ranNum];
    gamePattern.push(randomChosenColour);
    var chosenButton = $("#"+randomChosenColour);
    chosenButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("Level " + level);

}

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}