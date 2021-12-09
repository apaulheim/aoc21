import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const data = input.split(",").map((n) => parseInt(n));

  const play = (days: number) => {
    // how many fish are on day 0, 1, 2, 3 ...
    let fishtimer = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let start of data) {
      fishtimer[start] += 1;
    }
    for (let d = 0; d < days; d++) {
      // how many fish are on day 0
      let newfish = fishtimer[0];
      fishtimer[0] = 0;
      for (let i = 1; i < 9; i++) {
        if (fishtimer[i] > 0) {
          fishtimer[i - 1] = fishtimer[i];
          fishtimer[i] = 0;
        }
      }
      fishtimer[6] += newfish;
      fishtimer[8] += newfish;
    }
    return fishtimer.reduce((acc, n) => acc + n);
  };

  const silver = play(80);
  const gold = play(256);

  const res: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(res);
};

export default httpTrigger;
