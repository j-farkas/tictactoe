function Player(letter) {
  this.letter = letter;
  active = false;
  id = 0;
}

var player1 = new Player("X");
player1.active = true;
var player2 = new Player("O");


var gameboard =
  [0,0,0
  ,0,0,0,
  0,0,0];

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


function swapActive(){
  if(player1.active === true)
  {
    player1.active = false;
    player2.active = true;
  }else{
    player1.active = true;
    player2.active = false;
  }
}

function activePlayer (){
  if(player1.active === true){
    return player1;
  }
  return player2;
}




function checkWin(id){
  return winCombos.filter(function(arr){
    if(arr.includes(id)){
      return true;
    }else{return false;}
  });
}

function attachContactListeners() {
  $(".container").on("click", ".col-md-4", function() {
    console.log($(this).attr("id"));
    var len = $("." + $(this).attr("id")).text().length;
    if(len < 1){
    $("." + $(this).attr("id")).text(activePlayer().letter);
    console.log(checkWin($(this).attr("id")));
    swapActive();
    }
  });
};

$(document).ready(function() {
  attachContactListeners();
})
