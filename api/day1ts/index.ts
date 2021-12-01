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
    .map((n) => parseInt(n));

  const res: StarResult = {
    silver: data.reduce(
      (acc, n, i, arr) => (n > arr[i - 1] ? acc + 1 : acc),
      0
    ),
    gold: data.reduce((acc, n, i, arr) => (n > arr[i - 3] ? acc + 1 : acc), 0),
  };

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: res,
  };
};

export default httpTrigger;
