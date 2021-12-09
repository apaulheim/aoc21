import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  let data = input
    .trim()
    .split(";")
    .filter((line) => line.length > 0);

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

  const numberPos = (board, n): [boolean, number, number] => {
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
            return countUnmarked(boards[j], markedBoards[j]) * numbers[i];
          }
        }
      }
    }
  };

  const silver = play();
  const gold = play2();

  const res: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(res);
};

export default httpTrigger;
