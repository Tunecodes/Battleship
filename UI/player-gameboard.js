import { Player } from "../src/player.js";
document.addEventListener("DOMContentLoaded", () => {


  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  createContainer("playerBoard");
  createContainer("computerBoard");

  newGame() 
});

export function newGame() {
  const game = new Player();
  const player = game.player;
  const computer = game.computer;

  player.renderGameBoard(player.board, "playBlock", "playerBoard");
  computer.renderGameBoard(computer.board, "computerBlock", "computerBoard");


  randomlyPlaceShip(player, 5)
  randomlyPlaceShip(player, 4)
  randomlyPlaceShip(player, 3)
  randomlyPlaceShip(player, 3)
  randomlyPlaceShip(player, 2)


  randomlyPlaceShip(computer, 5)
  randomlyPlaceShip(computer, 4)
  randomlyPlaceShip(computer, 3)
  randomlyPlaceShip(computer, 3)
  randomlyPlaceShip(computer, 2)

  player.showShips();
  game.playerTurn();
}

function createContainer(name) {
  const mainContainer = document.querySelector(".container");
  const container = document.createElement("div");
  container.className = name;
  mainContainer.appendChild(container);
}


function getRandomDirection() {
  return Math.random() < 0.5 ? "horizontal" : "vertical";
}

function getRandomStart(length, direction, boardSize) {
  const row = direction === "vertical"
    ? Math.floor(Math.random() * (boardSize - length + 1))
    : Math.floor(Math.random() * boardSize);

  const col = direction === "horizontal"
    ? Math.floor(Math.random() * (boardSize - length + 1))
    : Math.floor(Math.random() * boardSize);

  return { row, col };
}

function randomlyPlaceShip(computer, length) {
  const boardSize = computer.board.length;

  while (true) {
    const direction = getRandomDirection();
    const { row, col } = getRandomStart(length, direction, boardSize);

    try {
      computer.placeShip(row, col, length, direction);
      break; // success
    } catch (e) {
      // retry on invalid placement
    }
  }
}

