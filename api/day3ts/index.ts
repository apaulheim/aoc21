import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  let data = input.trim().split(";");

  let numCols = data[0].length;
  const numRows = data.length;
  const numOnes = [];
  for (let x = 0; x < numCols; x++) {
    let ones = 0;
    for (let y = 0; y < numRows; y++) {
      if (data[y][x] == "1") ones++;
    }
    numOnes.push(ones);
  }
  let bin = "";
  let bin2 = "";
  for (let o of numOnes) {
    if (o > numRows / 2) {
      bin += "1";
      bin2 += "0";
    } else {
      bin += "0";
      bin2 += "1";
    }
  }
  const silver = parseInt(bin, 2) * parseInt(bin2, 2);

  let bin3 = "";
  numCols = data[0].length;
  for (let x = 0; x < numCols && data.length > 1; x++) {
    const numRows = data.length;
    let ones = 0;
    for (let y = 0; y < numRows; y++) {
      if (data[y][x] == "1") ones++;
    }
    if (ones >= numRows / 2) {
      bin3 += "1";
    } else {
      bin3 += "0";
    }
    data = data.filter((entry) => entry.startsWith(bin3));
  }
  const oxygen = data[0];
  let bin4 = "";
  data = input.trim().split(";");
  numCols = data[0].length;
  for (let x = 0; x < numCols && data.length > 1; x++) {
    const numRows = data.length;
    let ones = 0;
    for (let y = 0; y < numRows; y++) {
      if (data[y][x] == "1") ones++;
    }
    if (ones >= numRows / 2) {
      bin4 += "0";
    } else {
      bin4 += "1";
    }
    data = data.filter((entry) => entry.startsWith(bin4));
  }
  const gold = parseInt(oxygen, 2) * parseInt(data[0], 2);

  const res: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(res);
};

export default httpTrigger;
