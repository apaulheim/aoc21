import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const data = input.trim().split(";");

  let x = 0;
  let y = 0;
  for (let line of data) {
    const [cmd, n] = line.split(" ");
    const dir = parseInt(n);
    switch (cmd) {
      case "forward":
        x += dir;
        break;
      case "up":
        y -= dir;
        break;
      case "down":
        y += dir;
        break;
    }
  }
  const silver = x * y;

  let aim = 0;
  let pos = 0;
  let depth = 0;
  for (let line of data) {
    const [cmd, n] = line.split(" ");
    const dir = parseInt(n);
    switch (cmd) {
      case "forward":
        depth = aim > 0 ? depth + dir * aim : depth;
        pos += dir;
        break;
      case "up":
        aim -= dir;
        break;
      case "down":
        aim += dir;
        break;
    }
  }
  const gold = pos * depth;

  const res: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(res);
};

export default httpTrigger;
