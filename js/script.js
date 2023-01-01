//Module to select what will be used for the gameBoard
const gameFlow = (() => {
  //---Private---
  let _turn = 0; //turn sequence reference
  let _gameBoard = document.getElementById("gameBoard"); //gameBoard reference
  //Alligned squares needed to win Tic-Tac-Toe
  let _firstRow = _gameBoard.querySelectorAll("#gameBoard :nth-child(-n+3)");
  let _secondRow = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(n+4):nth-child(-n+6)"
  );
  let _thirdRow = _gameBoard.querySelectorAll("#gameBoard :nth-child(n+7)");
  let _firstColumn = _gameBoard.querySelectorAll("#gameBoard :nth-child(3n+1)");
  let _secondColumn = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(3n+2)"
  );
  let _thirdColumn = _gameBoard.querySelectorAll("#gameBoard :nth-child(3n+3)");
  let _firstDiagonal = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(4n+1)"
  );
  let _secondDiagonal = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(2n+3)"
  );
  _secondDiagonal = Array.from(_secondDiagonal);
  _secondDiagonal.pop();
  //Array to contain the squares needed to win Tic-Tac-Toe
  let _threeSquaresToWin = [];
  let _winner = 0; //flag for win condition

  fillArrayOfSquaresToWin();

  function fillArrayOfSquaresToWin() {
    //self explanatory
    _threeSquaresToWin.push(_firstRow);
    _threeSquaresToWin.push(_secondRow);
    _threeSquaresToWin.push(_thirdRow);
    _threeSquaresToWin.push(_firstColumn);
    _threeSquaresToWin.push(_secondColumn);
    _threeSquaresToWin.push(_thirdColumn);
    _threeSquaresToWin.push(_firstDiagonal);
    _threeSquaresToWin.push(_secondDiagonal);
  }

  function playerMark() {
    //checks which mark turn it is
    _turn++;
    return _turn % 2 === 0 ? "O" : "X";
  }

  function gameOver() {
    //checks for a gameOver condition
    for (let condition of _threeSquaresToWin) {
      _winner = 0;
      for (let gameSquares of condition) {
        if (gameSquares.textContent === "X") {
          _winner += 1;
          if (_winner === 3) {
            return "X";
          }
        } else if (gameSquares.textContent === "O") {
          _winner -= 1;
          if (_winner === -3) {
            return "O";
          }
        } else {
          continue;
        }
      }
    }
    if (_turn === 9) {
      return "tie";
    }
  }

  function cleanBoard() {
    _winner = 0;
    _turn = 0;
    for (let i = 0; i < _gameBoard.childElementCount; i++) {
      _gameBoard.children[i].textContent = "";
    }
  }

  return {
    playerMark,
    gameOver,
    cleanBoard,
  };
})();

//Module to control what appears on the Game Board
const gameBoard = (() => {
  let _gameBoard = document.getElementById("gameBoard");
  let _restart = document.querySelector(".restartButton");
  let _gameOver;

  bindEvents();

  function bindEvents() {
    //binds #gameBoard and all within it to a "click event"
    _gameBoard.addEventListener("click", _addMark);
    _restart.addEventListener("click", _resetBoard);
  }

  function _addMark(event) {
    //gets the event Object of the "click event",
    //then checks if the targeted square has been marked, if not, it calls render to mark it
    event.target.textContent === "X" || event.target.textContent === "O"
      ? alert("Choose another square")
      : _render(event.target.id);
  }

  function _render(target) {
    //renders the targeted square with the player mark and checks for game over condition
    _gameBoard.children[target].textContent = gameFlow.playerMark();
    _printIfGameOver();
  }

  function _printIfGameOver() {
    //if the game over condition is met, prints the result
    _gameOver = gameFlow.gameOver();
    if (_gameOver === "X") {
      alert("X wins");
      _resetBoard();
    } else if (_gameOver === "O") {
      alert("O wins");
      _resetBoard();
    } else if (_gameOver === "tie") {
      alert("It's a Tie!");
      _resetBoard();
    }
  }

  function _resetBoard() {
    gameFlow.cleanBoard();
  }

  return { _resetBoard };
})();

const Player = (name) => {
  function getName() {
    return name;
  }
};
