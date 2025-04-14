import { Ship } from "./ship.js";
export class GameBoard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.ships = [];
  }

  placeShip(x, y, length, direction = "horizontal") {
    const ship = new Ship(length);

    for (let i = 0; i < length; i++) {
      let xi = x + (direction === "horizontal" ? i : 0);
      let yi = y + (direction === "vertical" ? i : 0);

      if (
        xi > this.board.length ||
        yi > this.board[0].length ||
        this.board[xi][yi] !== null
      ) {
        throw new Error("invalid ship placement");
      }
    }

    for (let i = 0; i < length; i++) {
      let xi = x + (direction === "horizontal" ? i : 0);
      let yi = y + (direction === "vertical" ? i : 0);
      this.board[xi][yi] = ship;
    }

    this.ships.push(ship);
  }

  receiveAttack(x, y) {
    if (x > 10 || y > 10) throw new Error("out of bounds");
    if (typeof this.board[x][y] === "object" && this.board[x][y] !== null) {
      const ship = this.board[x][y];
      this.board[x][y] = "hit";
      ship.shipHit();
      ship.isSunk();
    } else {
      this.board[x][y] = "missed";
    }

    
  }



}
