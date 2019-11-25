// *************************** YOUR CODE BELOW *******************************
//******************TEST EARLY AND OFTEN USING console.log() ******************
//****************** SERIOUSLY TEST USING console.log()!!! ******************

//GLOBAL VARIABLES
/* global $ */

var VALID_MOVES = ['rock', 'paper', 'scissors'];
var USER_WINS = 0;
var COMPUTER_WINS = 0;
var TIES = 0;

var TRANSITIONS = {};
function initializeTransitions() {
  for (var i=0; i < VALID_MOVES.length; i++) {
    for (var j=0;j < VALID_MOVES.length; j++) {
      var key = VALID_MOVES[i] + "," + VALID_MOVES[j];
      TRANSITIONS[key] = 0;
    }
  }
}
initializeTransitions();

var LAST_MOVE = "";

function randomMove() {
  var i = Math.random();
  if (i < 0.33) {
    return "rock";
  }
  if (i < 0.66) {
    return "paper";
  }
  return "scissors";
}

function winningAgainst(move) {
  for (var i=0; i < OUTCOMES.length; i++) {
    var outcome = OUTCOMES[i];
    if (outcome[0] != move) {
      continue;
    }
    if (outcome[2] == 'lose') {
      return outcome[1];
    }
  }
  return "Don't know what happened here";
}

function getComputerMove() {
  if (LAST_MOVE === "") {
    return randomMove();
  }

  var maxTransition = -1;
  var predictedPlayerMove = "";
  for (var i=0; i < VALID_MOVES.length; i++) {
    var key = LAST_MOVE + "," + VALID_MOVES[i];
    var seen = TRANSITIONS[key];
    if (seen > maxTransition) {
      predictedPlayerMove = VALID_MOVES[i];
      maxTransition = seen;
    }
  }

  computerMove = winningAgainst(predictedPlayerMove);
  return computerMove;
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
];

function getResultMessage(playerMove, computerMove) {
  for (var i=0; i < OUTCOMES.length; i++) {
    if (playerMove == OUTCOMES[i][0] && computerMove == OUTCOMES[i][1]) {
      outcome = OUTCOMES[i][2];
      if (outcome === 'win') {
        USER_WINS += 1;
      }
      if (outcome === 'tie') {
        TIES += 1;
      }
      if (outcome === 'lose') {
        COMPUTER_WINS += 1
      }
      return outcome;
    }
  }
  return "Don't know what happened Here";
}

function updateChoices(playerMove, computerMove) {
  $("#userChoice").append(playerMove + "<br>");
  $("#computerChoice").append(computerMove+"<br>");
}

function updateScoreBoard() {
  $("#winScoreboard").html(USER_WINS);
  $("#lossScoreboard").html(COMPUTER_WINS);
  $("#tieScoreboard").html(TIES);
}

function updateTransitions(playerMove) {
  if (LAST_MOVE === "") {
    LAST_MOVE = playerMove;
    return;
  }
  var key = LAST_MOVE + "," + playerMove;
  TRANSITIONS[key] += 1;
  LAST_MOVE = playerMove;
}

function playGame(playerMove) {
  computerMove = getComputerMove();
  updateChoices(playerMove, computerMove);
  result = getResultMessage(playerMove, computerMove);
  $("#result").html(result);
  updateTransitions(playerMove);
  updateScoreBoard();
  console.log("Computer will throw " + getComputerMove() + " next");
}


$("#rockButton").click(function() {
  playGame('rock');
});

$("#paperButton").click(function() {
  playGame('paper');
});

$("#scissorsButton").click(function() {
  playGame('scissors');
});
