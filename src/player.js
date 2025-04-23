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

  playerTurn() {
    const computerBlock = document.querySelectorAll(".computerBlock");
    computerBlock.forEach((block, i) => {
      block.addEventListener("click", (event) => {
        if (this.currentPlayer === "player") {
          let row = Math.floor(i / 10);
          let col = i % 10;
          const result = this.computer.receiveAttack(row, col)
          if (result === "hit") {
            event.target.innerHTML = "X";
          } else {
            event.target.innerHTML = "O";
          }
          this.switchTurn();
        }
      });
    });
  }

  computerTurn() {
    const playerBlock = document.querySelectorAll(".playBlock")
    playerBlock.forEach((block, i) => {
      block.addEventListener("click", (event) => {
        if (this.currentPlayer === "computer") {
          let row = Math.floor(i / 10);
          let col = i % 10;
          if (this.computer.receiveAttack(row, col) === "hit") {
            event.target.innerHTML = "X";
          } else {
            event.target.innerHTML = "O";
          }
          this.switchTurn();
        }
      });
    });
  }
}
