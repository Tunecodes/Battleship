import { Player } from "../src/player.js";
document.addEventListener("DOMContentLoaded", () => {
  const game = new Player();
  const player = game.player;
  const computer = game.computer;

  const container = document.createElement("div");
  container.className = "container";
  document.body.appendChild(container);

  createContainer("playerBoard");
  createContainer("computerBoard");

  player.renderGameBoard(player.board, "playBlock", "playerBoard");
  computer.renderGameBoard(computer.board, "computerBlock", "computerBoard");


  const computerBlocks = document.querySelectorAll(".computerBlock");
  player.placeShip(1, 1, 5, "vertical");
  computer.placeShip(1, 1, 5, "vertical");


  game.playerTurn();
  game.computerTurn();



});

function createContainer(name) {
  const mainContainer = document.querySelector(".container");
  const container = document.createElement("div");
  container.className = name;
  mainContainer.appendChild(container);
}
