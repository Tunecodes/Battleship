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
        event.target.style.pointerEvents = "none"; //prevent clicking on same block
        if (this.currentPlayer === "player") {
          let row = Math.floor(i / 10);
          let col = i % 10;
          const ship = this.computer.receiveAttack(row, col);
          console.log(ship)
          if (typeof ship === "object") {
            event.target.innerHTML = "X";
            if (ship.sunk) {
              this.computer.revealShip(computerBlock, ship);
            }
            if(this.computer.allShipSunk()){
              alert("computer win")
            }          } else {
            event.target.innerHTML = "O";
            this.switchTurn();
            this.blockBoard();
            setTimeout(() => this.computerTurn(), 1000);
          }
        }
      });
    });
  }

  computerTurn() {
    const playerBlocks = document.querySelectorAll(".playBlock");
    const computerChoice = Math.floor(Math.random() * 100);
    const x = Math.floor(computerChoice / 10);
    const y = computerChoice % 10;
    const ship = this.player.receiveAttack(x, y);

    if (typeof ship === "object") {
      playerBlocks[computerChoice].innerHTML = "X";
      if (ship.sunk) {
        this.player.revealShip(playerBlocks, ship);
      }

      if(this.player.allShipSunk()){
        alert("computer win")
      }
    } else {
      playerBlocks[computerChoice].innerHTML = "O";
      this.switchTurn();
      this.blockBoard();
    }
  }
}
