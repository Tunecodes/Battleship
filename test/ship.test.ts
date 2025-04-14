import { describe, expect, test } from "@jest/globals";
import { Ship } from "../src/ship.js";
import { GameBoard } from "../src/gameboard.js";

describe("test Ship class", () => {
  test("test the init state of ship", () => {
    const ship = new Ship(6);
    expect(ship).toEqual({ length: 6, sunk: false, hit: 0 });
  });

  test("hit method should incrment hit property", () => {
    const ship = new Ship(3);
    ship.shipHit();
    ship.shipHit();
    expect(ship.hit).toEqual(2);
  });
});

describe("test gameboard", () => {
  test("test placeship horizontally", () => {
    const testBoard = Array.from({ length: 10 }, () => Array(10).fill(null));

    const realBoard = new GameBoard();
    realBoard.placeShip(1, 1, 3, "horizontal");
    testBoard[1][1] = realBoard.ships[0];
    testBoard[2][1] = realBoard.ships[0];
    testBoard[3][1] = realBoard.ships[0];

    expect(realBoard.board).toEqual(testBoard);
  });

  test("test placeship vertically", () => {
    const testBoard = Array.from({ length: 10 }, () => Array(10).fill(null));

    const realBoard = new GameBoard();
    realBoard.placeShip(4, 4, 3, "vertical");
    testBoard[4][4] = realBoard.ships[0];
    testBoard[4][5] = realBoard.ships[0];
    testBoard[4][6] = realBoard.ships[0];

    expect(realBoard.board).toEqual(testBoard);
  });

  test("test placeship out of bound", () => {
    const realBoard = new GameBoard();

    expect(() => realBoard.placeShip(4, 10, 3, "vertical")).toThrow(
      "invalid ship placement"
    );
  });

  test("ship hit", () => {
    const newGame = new GameBoard();
    newGame.placeShip(1, 1, 2, "horizontal");
    newGame.receiveAttack(1, 1)
    newGame.receiveAttack(2, 1)
    expect(newGame.ships[0].hit).toEqual(2)
  })

  test("ship sunk", () => {
    const newGame = new GameBoard();
    newGame.placeShip(1, 1, 2, "horizontal");
    newGame.receiveAttack(1, 1)
    newGame.receiveAttack(2, 1)
    expect(newGame.ships[0].sunk).toEqual(true)
  })

  test("ship missed", () => {
    const newGame = new GameBoard();
    newGame.placeShip(1, 1, 2, "horizontal");
    newGame.receiveAttack(4, 4)
    expect(newGame.board[4][4]).toMatch("missed")
  })
});

