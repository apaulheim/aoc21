import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { promises as fs } from "fs";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const day = parseInt(req.query.day || (req.body && req.body.day));
  let data;
  if (day && day >= 1 && day <= 25) {
    try {
      data = await fs.readFile(`aocinput/day${day}.txt`, "utf8");
    } catch (e) {}
    context.res = {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: { text: data },
    };
    context.done();
  }
};

export default httpTrigger;
