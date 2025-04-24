import { GameBoard } from "./gameboard.js";
export class Player {
  constructor() {
    this.player = new GameBoard();
    this.computer = new GameBoard();
    this.currentPlayer = "player";
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === "player" ? "computer" : "player";
  }

  blockBoard() {
    const computerBlock = document.querySelectorAll(".computerBlock");
    if (this.currentPlayer === "player") {
      computerBlock.forEach((block) => {
        block.style.pointerEvents = "auto"; // allow clicking
      });
    } else {
      computerBlock.forEach((block) => {
        block.style.pointerEvents = "none"; // disable clicking
      });
    }
  }

  playerTurn() {
    const computerBlock = document.querySelectorAll(".computerBlock");
    computerBlock.forEach((block, i) => {
      block.addEventListener("click", (event) => {
        event.target.style.pointerEvents = "none"; //prevent clicking on samr block
        if (this.currentPlayer === "player") {
          let row = Math.floor(i / 10);
          let col = i % 10;
          const ship = this.computer.receiveAttack(row, col);
          if (typeof ship === "object") {
            event.target.innerHTML = "X";
            if (ship.sunk) {
              this.computer.revealShip(computerBlock, ship);
            }
          } else {
            event.target.innerHTML = "O";
            this.switchTurn();
            this.blockBoard();
          }
        }
      });
    });
  }

  computerTurn() {

  }
}
