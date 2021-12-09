import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const lines = input.trim().split(";");

  const width = lines[0].length;
  let data = lines.reduce(
    (acc, line) => acc.concat(Array.from(line).map((n: string) => parseInt(n))),
    []
  );

  const isLow = (x, y) => {
    if (y >= 0 && y < data.length / width && x >= 0 && x < width) {
      const n = data[y * width + x];
      if (n == 9) return false;
      const top = (y - 1) * width + x;
      const right = y * width + x + 1;
      const down = (y + 1) * width + x;
      const left = y * width + x - 1;
      return (
        (top < 0 || (top >= 0 && data[top] > n)) &&
        (x + 1 >= width || (right < data.length && data[right] > n)) &&
        (down >= data.length || (down < data.length && data[down] > n)) &&
        (x - 1 < 0 || (left >= 0 && data[left] > n))
      );
    }
    return false;
  };

  const res1 = [];
  const res2 = [];

  for (let y = 0; y < data.length / width; y++) {
    for (let x = 0; x < width; x++) {
      const n = data[y * width + x];
      if (isLow(x, y)) {
        res1.push(n);
        res2.push({ x, y });
      }
    }
  }

  const silver = res1.reduce((acc, n) => acc + n + 1, 0);

  // part 2

  const isBasin = (x, y) => {
    if (y >= 0 && y < data.length / width && x >= 0 && x < width) {
      const n = data[y * width + x];
      return n != 9;
    }
    return false;
  };

  const checkAdjacent = (x, y) => {
    if (isBasin(x, y)) {
      data2[y * width + x] = 1;
      if (data2[(y - 1) * width + x] != 1) checkAdjacent(x, y - 1);
      if (data2[y * width + x + 1] != 1) checkAdjacent(x + 1, y);
      if (data2[(y + 1) * width + x] != 1) checkAdjacent(x, y + 1);
      if (data2[y * width + x - 1] != 1) checkAdjacent(x - 1, y);
    }
  };

  let data2 = new Array(data.length);
  for (let y = 0; y < data.length; y++) {
    data2[y] = 0;
  }

  let basinSizes = [];
  let total = 0;

  for (let i = 0; i < res2.length; i++) {
    checkAdjacent(res2[i].x, res2[i].y);
    let newTotal = data2.reduce((acc, n) => acc + n, 0);
    basinSizes.push(newTotal - total);
    total = newTotal;
  }

  basinSizes.sort((a, b) => {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  });
  const gold = basinSizes.slice(0, 3).reduce((acc, n) => acc * n, 1);

  const result: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(result);
};

export default httpTrigger;
