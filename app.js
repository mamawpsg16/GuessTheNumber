"use strict";
let retry = 0;
let score = 20;
let highestScore = 0;

let displayMessage = (id, message) => {
  document.getElementById(`${id}`).textContent = message;
};
let changeTextColor = (id, text) => {
  document.getElementById(`${id}`).style.color = text;
};
let changeBodyBgColor = (color) => {
  document.body.style.backgroundColor = color;
};
let updateCurrentScore = (id, score) => {
  document.getElementById(`${id}`).textContent = score;
};

let checkHighestScore = (highestScore, currentScore) => {
  highestScore =
    highestScore > score
      ? (document.getElementById("highestScore").textContent = highestScore)
      : (document.getElementById("highestScore").textContent = score);
};

let showCorrectGuessNumber = (id, number) => {
  document.getElementById(`${id}`).textContent = number;
};

let randomNumber = Math.floor(Math.random() * 20 + 1);

let updateDisableButton = (id, boolean) => {
  document.getElementById(`${id}`).disabled = boolean;
};

document.getElementById("check").addEventListener("click", function () {
  retry += 1;
  let guess = Number(document.getElementById("guess").value);
  if (!guess) {
    displayMessage("message", "No Number");
    changeTextColor("message", "red");
    changeBodyBgColor("rgba(0, 128, 0, 0.664)");
  } else if (guess > randomNumber) {
    score -= 1;
    updateCurrentScore("currentScore", score);
    displayMessage("message", "Lower");
    changeTextColor("message", "yellow");
    changeBodyBgColor("red");
  } else if (guess < randomNumber) {
    score -= 1;
    updateCurrentScore("currentScore", score);
    displayMessage("message", "Higher");
    changeTextColor("message", "yellow");
    changeBodyBgColor("red");
  } else if (guess === randomNumber) {
    console.log(highestScore, score);
    checkHighestScore(highestScore, score);
    showCorrectGuessNumber("number", randomNumber);
    randomNumber = Math.floor(Math.random() * 20 + 1);
    displayMessage("message", "Correct guess!");
    updateCurrentScore("currentScore", score);
    changeTextColor("again", "green");
    changeTextColor("message", "white");
    changeBodyBgColor("green");
    updateDisableButton("check", true);
  }
  if (score === 0) {
    updateDisableButton("check", true);
    changeTextColor("again", "green");
    changeTextColor("check", "red");
    showCorrectGuessNumber("number", randomNumber);
    displayMessage("message", "Game Over, Press Try Again");
  }
});

document.getElementById("again").addEventListener("click", () => {
  displayMessage("message", "Start guessing...");
  changeTextColor("message", "white");
  changeTextColor("again", "black");
  changeTextColor("check", "black");
  document.getElementById("guess").value = "";
  showCorrectGuessNumber("number", "?");
  updateCurrentScore("currentScore", 0);
  changeBodyBgColor("rgba(0, 0, 0, 0.712)");
  updateDisableButton("check", false);
  retry = 20;
  score = 20;
});
