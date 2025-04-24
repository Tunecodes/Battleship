import { Ship } from "./ship.js";
export class GameBoard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }

  placeShip(x, y, length, direction = "horizontal") {
    for (let i = 0; i < length; i++) {
      let xi = x + (direction === "vertical" ? i : 0);
      let yi = y + (direction === "horizontal" ? i : 0);

      if (
        xi >= this.board.length ||
        yi >= this.board[0].length ||
        this.board[xi][yi] !== null
      ) {
        throw new Error("invalid ship placement");
      }
    }

    const ship = new Ship(length);
    ship.positions = []

    for (let i = 0; i < length; i++) {
      let xi = x + (direction === "vertical" ? i : 0);
      let yi = y + (direction === "horizontal" ? i : 0);
      this.board[xi][yi] = ship;
      ship.positions.push({row: xi, col: yi})
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (x > 10 || y > 10) throw new Error("out of bounds");
    if (typeof this.board[x][y] === "object" && this.board[x][y] !== null) {
      const ship = this.board[x][y];
    //  this.board[x][y] = "hit";
      ship.shipHit();
      ship.isSunk();
      return this.board[x][y]
    }
  }

  renderGameBoard(gameboard, className, containerName) {
    const container = document.querySelector(`.${containerName}`);
    gameboard.forEach((item) => {
      item.forEach(() => {
        const block = document.createElement("div");
        block.className = className;
        container.appendChild(block);
      });
    });
  }

  revealShip(blocks, ship) {
    ship.positions.forEach((position) => {
      const index = Math.floor(position.row * 10) + position.col;
      const targetBlock = blocks[index];
      targetBlock.style.backgroundColor = "red";
    });
  }

  allShipSunk(){
    return this.ships.every(ship => ship.sunk)
  }

  getShip(x, y) {
    return 
  }
  



}
