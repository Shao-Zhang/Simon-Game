
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickPattern = [];

gameStart = false;



$(document).on("keypress", function (){
    if (!gameStart) {
        gameStart = true;
        $("h1").text("Level 0");
        nextSequence();
    }
});


$(".btn").click(function(event){
    if (!gameStart) {
        displayGameOver();
    }
    var userChosenColour = event.target.id;
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (checkGameOver(gamePattern, userClickPattern)){
        displayGameOver();
    }
    else {
        userClickPattern.length = [];
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
});


function startOver() {
    level = 0;
    gamePattern = [];

}

function displayGameOver() {
    $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        gameStart = false;
}


function checkGameOver(gamePattern, playerPattern) {
    var index = 0;
    while (index < gamePattern.length){
        if (gamePattern[index] != playerPattern[index]) {
            return true
        } 
        else {
            index += 1;
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