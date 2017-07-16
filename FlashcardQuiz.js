var basicList = require("./basic.json");
var clozeList = require("./cloze.json");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require('inquirer');

var basicArray = [];
var clozeArray = [];

// Gets user input to pick which type of card to use
function chooseMode() {
  inquirer.prompt([
    {
      type: "list",
      name: "answer",
      message: "Which type of flashcards would you like to use?",
      choices: ["Basic", "Cloze-Deleted"]
    }
  ]).then(function (answers) {
    if (answers.answer === "Basic") {
      basicQuestions();
    }
    else if (answers.answer === "Cloze-Deleted") {
      clozeQuestions();
    }
  });
}

chooseMode();

// Fills array with BasicCards
basicList.forEach(function(q) {
  basicArray.push(new BasicCard(q.front, q.back));
});

// Fills array with ClozeCards
clozeList.forEach(function(q) {
  clozeArray.push(new ClozeCard(q.text, q.cloze));
});

var count = 0;
var score = 0;

// Questions using basic cards
function basicQuestions() {
  if (count < basicArray.length) {
    inquirer.prompt([
      {
        type: "input",
        name: "answer",
        message: basicArray[count].front
      }
    ]).then(function (answers) {
      if (answers.answer.toLowerCase() === basicArray[count].back.toLowerCase()) {
        console.log("Correct!");
        score++;
      }
      else {
        console.log("Incorrect! The correct answer is " + basicArray[count].back);
      }
      count++;
      basicQuestions();
    });
  }
  else {
    endGame();
  }
}

// Questions using cloze cards
function clozeQuestions() {
  if (count < clozeArray.length) {
    inquirer.prompt([
      {
        type: "input",
        name: "answer",
        message: clozeArray[count].partial
      }
    ]).then(function (answers) {
      if (answers.answer.toLowerCase() === clozeArray[count].cloze.toLowerCase()) {
        console.log("Correct!");
        score++;
      }
      else {
        console.log("Incorrect! The correct answer is " + clozeArray[count].cloze);
      }
      count++;
      clozeQuestions();
    });
  }
  else {
    endGame();
  }
}

// Tell user score and ask if they want to play again
function endGame() {
  var str = "Game Over! You got " + score + "/" + count;
  if (score === 1) {
    str += " answer correct.";
  }
  else {
    str += " answers correct.";
  }
  console.log(str);
  inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Would you like to play again?"
    }
  ]).then(function (answers) {
    if (answers.confirm) {
      count = 0;
      score = 0;
      chooseMode();
    }
    else {
      console.log("See you next time!");
    }
  });
}
