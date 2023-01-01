//Module to change between Settings and Game Interfaces
const interfaces = (() => {
  const _settingsInterface = document.getElementById("settingsInterface");
  const _startButton = document.querySelector(".startButton");
  const _gameInterface = document.getElementById("gameInterface");
  const _settingsButton = document.querySelector(".settingsButton");

  _bindEvents();

  function _bindEvents() {
    _startButton.addEventListener("click", _displayGameInterface);
    _settingsButton.addEventListener("click", _displaySettingsInterface);
  }

  function _displayGameInterface() {
    _settingsInterface.style.display = "none";
    _gameInterface.style.display = "block";
  }

  function _displaySettingsInterface() {
    _gameInterface.style.display = "none";
    _settingsInterface.style.display = "block";
  }
})();

//Module to select what will be used for the gameBoard
const gameFlow = (() => {
  let _turn = 0; //turn sequence reference
  const _gameBoard = document.getElementById("gameBoard"); //gameBoard reference
  //Alligned squares needed to win Tic-Tac-Toe
  const _firstRow = _gameBoard.querySelectorAll("#gameBoard :nth-child(-n+3)");
  const _secondRow = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(n+4):nth-child(-n+6)"
  );
  const _thirdRow = _gameBoard.querySelectorAll("#gameBoard :nth-child(n+7)");
  const _firstColumn = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(3n+1)"
  );
  const _secondColumn = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(3n+2)"
  );
  const _thirdColumn = _gameBoard.querySelectorAll(
    "#gameBoard :nth-child(3n+3)"
  );
  const _firstDiagonal = _gameBoard.querySelectorAll(
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
  const _gameBoard = document.getElementById("gameBoard");
  const _restart = document.querySelector(".restartButton");
  let _gameOver;
  const _gameOverMessage = document.getElementById("gameOverMessage");
  const _overlay = document.getElementById("overlay");

  _bindEvents();

  function _bindEvents() {
    //Binds all events
    _gameBoard.addEventListener("click", _addMark); //binds #gameBoard and all within it to a "click event"
    _restart.addEventListener("click", _resetBoard);
    _overlay.addEventListener("click", _hideMessage);
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
      _displayMessage("X wins!");
      _resetBoard();
    } else if (_gameOver === "O") {
      _displayMessage("O wins!");
      _resetBoard();
    } else if (_gameOver === "tie") {
      _displayMessage("It's a tie!");
      _resetBoard();
    }
  }

  function _resetBoard() {
    gameFlow.cleanBoard();
  }

  function _displayMessage(message) {
    _gameOverMessage.children[0].textContent = message;
    _gameOverMessage.style.display = "flex";
    _overlay.style.display = "block";
  }

  function _hideMessage() {
    _gameOverMessage.style.display = "none";
    _overlay.style.display = "none";
  }

  return {};
})();

const Player = (name) => {
  function getName() {
    return name;
  }

  return {};
};
