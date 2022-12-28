//Module to control the decisions for the flow of the game
const gameFlow = (() => {
  let _turn = 0;

  function playerMark() {
    //checks which mark turn it is
    _turn++;
    return _turn % 2 === 0 ? "O" : "X";
  }

  return {
    playerMark,
  };
})();

//Module to control what appears on the Game Board
const gameBoard = (() => {
  let _gameBoard = document.getElementById("gameBoard");

  bindBoardSquaresToEvent();

  function bindBoardSquaresToEvent() {
    //binds #gameBoard and all within it to a click event
    _gameBoard.addEventListener("click", addMark);
  }

  function addMark(event) {
    //gets the event Object of the click event,
    //then checks if the targetet square has been marked, if not, it calls render to mark it
    event.target.textContent === "X" || event.target.textContent === "O"
      ? alert("Choose another square")
      : render(event.target.id);
  }

  function render(target) {
    _gameBoard.children[target].textContent = gameFlow.playerMark();
  }

  return {
    addMark,
  };
})();
