import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const data = input
    .trim()
    .split(";")
    .map((row) => {
      let [tuple1, tuple2] = row.split(" -> ");
      let [x1, y1] = tuple1.split(",").map((n) => parseInt(n));
      let [x2, y2] = tuple2.split(",").map((n) => parseInt(n));
      return [x1, y1, x2, y2];
    });

  const gridsize = 1000;

  const play = (gold: boolean) => {
    let grid = [];
    for (let y = 0; y < gridsize; y++) {
      let row = [];
      for (let x = 0; x < gridsize; x++) row.push(0);
      grid.push(row);
    }

    for (let i = 0; i < data.length; i++) {
      const [x1, y1, x2, y2] = data[i];
      if (x1 == x2) {
        const l1 = y1 < y2 ? y1 : y2;
        const l2 = y1 < y2 ? y2 : y1;
        for (let y = l1; y <= l2; y++) {
          grid[y][x1] = grid[y][x1] + 1;
        }
      } else if (y1 == y2) {
        const l1 = x1 < x2 ? x1 : x2;
        const l2 = x1 < x2 ? x2 : x1;
        for (let x = l1; x <= l2; x++) {
          grid[y1][x] = grid[y1][x] + 1;
        }
      } else if (gold) {
        let xp = x1 < x2 ? 1 : -1;
        let yp = y1 < y2 ? 1 : -1;
        let x = x1;
        let y = y1;
        while ((xp == 1 && x <= x2) || (xp == -1 && x >= x2)) {
          grid[y][x] = grid[y][x] + 1;
          x += xp;
          y += yp;
        }
      }
    }

    let counter = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] > 1) counter++;
      }
    }
    return counter;
  };
  const silver = play(false);
  const gold = play(true);

  const res: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(res);
};

export default httpTrigger;
