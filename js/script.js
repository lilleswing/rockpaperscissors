// *************************** YOUR CODE BELOW *******************************
//******************TEST EARLY AND OFTEN USING console.log() ******************
//****************** SERIOUSLY TEST USING console.log()!!! ******************

//GLOBAL VARIABLES
/* global $ */

var VALID_MOVES = ['rock', 'paper', 'scissors'];

function getComputerMove() {
  var i = Math.random();
  if (i < 0.33) {
    return "rock";
  }
  if (i < 0.66) {
    return "paper";
  }
  return "scissors";
}

var OUTCOMES = [
  ['rock', 'rock', 'tie'],
  ['rock', 'paper', 'lose'],
  ['rock', 'scissors', 'win'],

  ['paper', 'rock', 'win'],
  ['paper', 'paper', 'tie'],
  ['paper', 'scissors', 'lose'],

  ['scissors', 'rock', 'lose'],
  ['scissors', 'paper', 'win'],
  ['scissors', 'scissors', 'tie'],
]

function getResultMessage(playerMove, computerMove) {
  for (var i=0; i < OUTCOMES.length; i++) {
    if (playerMove == OUTCOMES[i][0] && computerMove == OUTCOMES[i][1]) {
      outcome = OUTCOMES[i][2];
      return outcome;
    }
  }
  return "Don't know what happened Here";
}

function updateChoices(playerMove, computerMove) {
  $("#userChoice").append(playerMove + "<br>");
  $("#computerChoice").append(computerMove+"<br>");
}

$("button").click(function() {
  var playerMove = $("input").val();
  playerMove = playerMove.toLowerCase();
  if (!VALID_MOVES.includes(playerMove)) {
    alert(playerMove + " is not a valid action");
  }
  computerMove = getComputerMove();
  updateChoices(playerMove, computerMove);
  result = getResultMessage(playerMove, computerMove);
  $("#result").html(result);
});
