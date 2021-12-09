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
    .map((n: string) => parseInt(n));

  const res: StarResult = {
    silver: data.reduce(
      (acc: number, n: number, i: number, arr: number[]) =>
        n > arr[i - 1] ? acc + 1 : acc,
      0
    ),
    gold: data.reduce(
      (acc: number, n: number, i: number, arr: number[]) =>
        n > arr[i - 3] ? acc + 1 : acc,
      0
    ),
  };

  context.res.json(res);
};

export default httpTrigger;
