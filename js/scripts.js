function Player(letter) {
  this.letter = letter;
  active = false;
}

var player1 = new Player("X");
player1.active = true;
var player2 = new Player("O");

var gameboard =
  [0,1,2
  ,3,4,5,
  6,7,8];

const winCombos = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

function reInit(){
  player1 = new Player("X");
  player1.active = true;
  player2 = new Player("O");
  for(var i = 0;i<9;i++){
    gameboard[i]=i;
    $("."+i).text("");
    console.log(gameboard);
  }
  gameOver = false;
  $(".col-md-4").removeClass("white");
  count = 0;
  $("p").text("");
}
function swapActive() {
  if(player1.active === true) {
    player1.active = false;
    player2.active = true;
  } else {
    player1.active = true;
    player2.active = false;
  }
}

function activePlayer (){
  if(player1.active === true) {
    return player1;
  }
    return player2;
}

function checkAIWin(id) {
  var wins = winCombos;
  wins = wins.filter(function(arr) {
    if(arr.includes(parseInt(id))) {
      return true;
    } else {
      return false;
    }
  });

  var winner = -1;
   wins.forEach(function(arr) {
     var counter = 0;
      if(gameboard[arr[0]] === "O") {
        counter++;
      }
      if(gameboard[arr[1]] === "O") {
        counter++;
      }
      if(gameboard[arr[2]] === "O") {
        counter++;
      }
      if(counter === 2){
        winner = id;
      }
    })
    return winner;
}
function checkAIBlock(id) {
  var wins = winCombos;
  wins = wins.filter(function(arr) {
    if(arr.includes(parseInt(id))) {
      return true;
    } else {
      return false;
    }
  });

  var winner = -1;
   wins.forEach(function(arr) {
     var counter = 0;
      if(gameboard[arr[0]] === "X") {
        counter++;
      }
      if(gameboard[arr[1]] === "X") {
        counter++;
      }
      if(gameboard[arr[2]] === "X") {
        counter++;
      }
      if(counter === 2){
        winner = id;
      }
    })
    return winner;
}

function checkWin(id) {
  var wins = winCombos;
  wins = wins.filter(function(arr) {
    if(arr.includes(parseInt(id))) {
      return true;
    } else {
      return false;
    }
  });

  var winner = false;
   wins.forEach(function(arr) {
    if(gameboard[arr[0]] === gameboard[arr[1]] && gameboard[arr[0]] === gameboard[arr[2]]) {
      winner = true;
      for(var i=0; i<=2; i++){
      $("#" + arr[i]).addClass("white");
      }
    }
  })
  return winner;
}

var count = 0;
var gameOver = false;
function attachContactListeners() {
  $(".container").on("click", ".col-md-4", function() {
    var len = $("." + $(this).attr("id")).text().length;
    if(len < 1 && gameOver === false){
      count++;
      $("." + $(this).attr("id")).text(activePlayer().letter);
      gameboard[$(this).attr("id")] = activePlayer().letter;
      if(checkWin($(this).attr("id")) === true){
        $("p").text("Player " + activePlayer().letter + " Wins!");
        gameOver = true;
        var buttons = $("#buttons");
        buttons.append("<button class='restartButton'>RESTART GAME</button>");
        $("#buttons").append("<button class='aiButton'>RESTART GAME vs AI</button>");
      }else{
        if(count === 9){
          $("p").text("Nobody wins");
          gameOver = true;
          var buttons = $("#buttons");
          buttons.append("<button class='restartButton'>RESTART GAME</button>");
          $("#buttons").append("<button class='aiButton'>RESTART GAME vs AI</button>");
        }
      }
      swapActive();
      var remaining = gameboard.filter(function(arr){
        return !(isNaN(arr));
      })
      console.log(remaining);
      if(player2.ai === true){
        var move = -1;
        if(move === -1){
            remaining.forEach(function(ar){
              if(move === -1){
                move = checkAIWin(ar);
              }
            })
        }
        if(move === -1){
            remaining.forEach(function(ar){
              if(move === -1){
                move = checkAIBlock(ar);
              }
            })
        }if(move===-1){
          move = remaining[Math.floor(Math.random()*remaining.length)];
        }
        $("." + move).text("O");
        gameboard[move] = "O";
        if(checkWin(move)=== true){
          $("p").text("Player " + activePlayer().letter + " Wins!");
          gameOver = true;
          var buttons = $("#buttons");
          buttons.append("<button class='restartButton'>RESTART GAME</button>");
          $("#buttons").append("<button class='aiButton'>RESTART GAME vs AI</button>");
        }else{
        swapActive();
        count++;
        }
      }
    }
  });
  $("#buttons").on("click", ".restartButton", function() {
    $("#buttons").empty();
    reInit();
    player2.ai = false;
  });
  $("#buttons").on("click", ".aiButton", function() {
    $("#buttons").empty();
    reInit();
    player2.ai = true;
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("#buttons").append("<button class='aiButton'>RESTART GAME vs AI</button>");
})
