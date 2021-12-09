import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const data = input
    .trim()
    .split(",")
    .map((n) => parseInt(n));
  let max = data.reduce((acc, n) => Math.max(acc, n));

  const play = (gold: boolean) => {
    let ret = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < max; i++) {
      let cost = 0;
      for (let j = 0; j < data.length; j++) {
        let fuel = Math.abs(i - data[j]);
        if (gold) cost += (fuel * (fuel + 1)) / 2;
        else cost += fuel;
      }
      ret = cost < ret ? cost : ret;
    }
    return ret;
  };

  const silver = play(false);
  const gold = play(true);

  const result: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(result);
};

export default httpTrigger;
