// A Queue class for queue-like functionality over JavaScript arrays.
class Queue {
    constructor() {
      this.items = [];
    }
    enqueue(obj) {
      this.items.push(obj);
    }
    dequeue() {
      return this.items.shift();
    }
    isEmpty() {
      return this.items.length === 0;
    }
  }
  
  // Class for storing a cell's data
  class Cell {
    constructor(x, y, dis = 0, previous = null) {
      this.x = x;
      this.y = y;
      this.dis = dis;
      this.previous = previous;
    }
  }
  
  function buildGameBoard() {
    let gameBoard = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        gameBoard.push([i, j]);
      }
    }
    return gameBoard;
  }
  
  const gameBoard = buildGameBoard();
  
  const knightSteps = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];
  
  function validMoves(cell) {
    let validMoves = [];
    knightSteps.forEach((move) => {
      let thisMove = new Cell(cell.x + move[0], cell.y + move[1]);
      gameBoard.forEach((square) => {
        if (thisMove.x == square[0] && thisMove.y == square[1]) {
          validMoves.push(thisMove);
        }
      });
    });
    return validMoves;
  }
  
  function printMoves(currentMove) {
    let moveList = [];
    while (currentMove !== null) {
      moveList.unshift(`[${currentMove.x},${currentMove.y}]`);
      currentMove = currentMove.previous;
    }
    return moveList;
  }
  
  function knightMoves(start, finish) {
    let queue = new Queue();
    queue.enqueue(new Cell(start[0], start[1]));
    while (!queue.isEmpty()) {
      let currentMove = queue.dequeue();
      if (currentMove.x == finish[0] && currentMove.y == finish[1]) {
        return `=> You made it in ${
          currentMove.dis
        } moves! Here's your path: ${printMoves(currentMove)}`;
      }
      validMoves(currentMove).forEach((move) => {
        if (move.previous == null) {
          move.previous = currentMove;
          move.dis = currentMove.dis + 1;
          queue.enqueue(move);
        }
      });
    }
  }
