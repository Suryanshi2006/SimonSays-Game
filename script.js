const buttonColors = ["red", "green", "blue", "yellow"];

let level = 0;
let isStarted = false;
let sequencePattern = [];
let userSequencePattern = [];

// Start the game when a key is pressed
document.addEventListener("keypress", () => {
    if (!isStarted) {
        document.getElementById("title").textContent = "Level " + level;
        isStarted = true;
        nextSequence();
    }
});

// Handle button clicks
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const userChosenColor = this.id;
        userSequencePattern.push(userChosenColor);
        playSound(userChosenColor);
        userPress(userChosenColor);
        buttonPressCheck(userSequencePattern.length - 1); // Check the last button pressed
    });
});

// Check if the user's sequence matches the game sequence
function buttonPressCheck(currentLevel) {
    if (sequencePattern[currentLevel] === userSequencePattern[currentLevel]) {
        if (userSequencePattern.length === sequencePattern.length) {
            setTimeout(() => {
                nextSequence(); // Go to the next sequence
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);
        document.getElementById("title").textContent = "Game Over, Press Any Key to Restart";
        startOver(); // Restart the game
    }
}

// Generate the next sequence in the game
function nextSequence() {
    userSequencePattern = []; // Reset the user's sequence
    level++;
    document.getElementById("title").textContent = "Level " + level;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = buttonColors[randomNumber];
    sequencePattern.push(randomColor);
    console.log(sequencePattern);
    
    // Animate the button by fading its opacity
    const button = document.getElementById(randomColor);
    button.style.transition = "opacity 0.5s ease";  // Add transition effect
    button.style.opacity = "0.4";  // Fade to 50% opacity
    playSound(randomColor);
    
    setTimeout(() => {
        button.style.opacity = "1"; 
    }, 1000);  
}


function playSound(colorName) {
    const audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function userPress(colorName) {
    const button = document.getElementById(colorName);
    button.classList.add("pressedButton");
    setTimeout(() => {
        button.classList.remove("pressedButton");
    }, 100);
}

// Restart the game
function startOver() {
    level = 0;
    sequencePattern = [];
    isStarted = false;
}
