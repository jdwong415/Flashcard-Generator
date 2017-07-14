var questions = require("./basic.json");
var BasicCard = require("./BasicCard.js");
var inquirer = require('inquirer');

var cardArray = [];

questions.forEach(function(q) {
  cardArray.push(new BasicCard(q.front, q.back));
});

console.log(cardArray);

var count = 0;
var score = 0;

function askQuestions() {
  if (count < cardArray.length) {
    inquirer.prompt([
      {
        type: "input",
        name: "answer",
        message: cardArray[0].front
      }
    ]).then(function (answers) {
      if (answers.answer.toLowerCase() === cardArray[count].back.toLowerCase()) {
        console.log("Correct!");
        score++;
      }
      else {
        console.log("Incorrect! The correct answer is " + cardArray[count].back);
      }
      count++;
      askQuestions();
    });
  }
  else {
    endGame();
  }
}

askQuestions();

function endGame() {
  console.log("Your got " + score + " correct!");
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
      askQuestions();
    }
    else {
      console.log("See you next time!");
    }
  });
}
