let input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

let data = input.split("\n").filter((line) => line.length > 0);
// console.log(data);
let numbers = data[0].split(",");
data.splice(0, 1);
let boards = [];
let markedBoards = [];
for (let i = 0; i < data.length / 5; i++) {
  let board = [];
  let markedBoard = [];
  for (let j = 0; j < 5; j++) {
    let row = data[i * 5 + j]
      .split(" ")
      .filter((line) => line.length > 0)
      .map((n) => parseInt(n));
    board.push(row);
    let marked = [false, false, false, false, false];
    markedBoard.push(marked);
  }
  boards.push(board);
  markedBoards.push(markedBoard);
}
// console.log(boards);

const numberPos = (board, n) => {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] == n) return [true, x, y];
    }
  }
  return [false, 0, 0];
};

const findBingo = (board, x, y) => {
  let f = true;
  for (let i = 0; i < 5; i++) {
    f = f && board[y][i];
  }
  if (f) return true;
  f = true;
  for (let i = 0; i < 5; i++) {
    f = f && board[i][x];
  }
  return f;
};

const countUnmarked = (board, markedBoard) => {
  let ret = 0;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (!markedBoard[y][x]) ret += board[y][x];
    }
  }
  return ret;
};

let wonBoards = [];
let numWon = 0;
for (let j = 0; j < boards.length; j++) {
  wonBoards.push(false);
}

const play2 = () => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      if (!wonBoards[j]) {
        const [contain, x, y] = numberPos(boards[j], numbers[i]);
        if (contain) {
          markedBoards[j][y][x] = true;
          const found = findBingo(markedBoards[j], x, y);
          if (found) {
            wonBoards[j] = true;
            numWon++;
            if (numWon == boards.length) {
              console.log(boards[j]);
              console.log(markedBoards[j]);
              console.log(
                countUnmarked(boards[j], markedBoards[j]),
                numbers[i]
              );
              return countUnmarked(boards[j], markedBoards[j]) * numbers[i];
            }
          }
        }
      }
    }
    // console.log(numbers[i]);
    // console.log(markedBoards);
  }
};

const play = () => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < boards.length; j++) {
      const [contain, x, y] = numberPos(boards[j], numbers[i]);
      if (contain) {
        markedBoards[j][y][x] = true;
        const found = findBingo(markedBoards[j], x, y);
        if (found) {
          //   console.log(countUnmarked(boards[j], markedBoards[j]), numbers[i]);
          return countUnmarked(boards[j], markedBoards[j]) * numbers[i];
        }
      }
    }
    // console.log(numbers[i]);
    // console.log(markedBoards);
  }
};

console.log(play());
console.log(play2());
