import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { StarResult } from "../shared/data";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const input = req.query.input || (req.body && req.body.input);
  const data = input.trim().split(";");

  let res = 0;
  for (let line of data) {
    const [inputStr, outputStr] = line.split(" | ");
    const input = inputStr.split(" ");
    const output = outputStr.split(" ");
    for (let o of output) {
      if (o.length == 2 || o.length == 4 || o.length == 3 || o.length == 7)
        res += 1;
    }
  }
  const silver = res;

  let numbers = new Map();
  numbers.set("abcefg", "0");
  numbers.set("cf", "1");
  numbers.set("acdeg", "2");
  numbers.set("acdfg", "3");
  numbers.set("bcdf", "4");
  numbers.set("abdfg", "5");
  numbers.set("abdefg", "6");
  numbers.set("acf", "7");
  numbers.set("abcdefg", "8");
  numbers.set("abcdfg", "9");

  let gold = 0;
  for (let line of data) {
    const [inputStr, outputStr] = line.split(" | ");
    const input = inputStr.split(" ");
    const mapping = new Map();
    // 1 len(2)
    const one = Array.from(input.find((s) => s.length == 2));
    // 4 len(4)
    const four = Array.from(input.find((s) => s.length == 4));
    // 7 len(3)
    const seven = Array.from(input.find((s) => s.length == 3));
    // 0, 6, 9 len(6)
    const zerosixnine = input
      .filter((s) => s.length == 6)
      .map((s) => Array.from(s));
    // a = in 7 but not in 1                 a
    mapping.set(
      seven.find((a) => one.indexOf(a) == -1),
      "a"
    );
    // f = in 1 and in all three of 069      c, f
    mapping.set(
      one.find(
        (f) =>
          zerosixnine[0].indexOf(f) > -1 &&
          zerosixnine[1].indexOf(f) > -1 &&
          zerosixnine[2].indexOf(f) > -1
      ),
      "f"
    );
    // c = in 1 and not f
    mapping.set(
      one.find((c) => !mapping.has(c)),
      "c"
    );
    // b = in 4 and in all three of 069      b,d
    mapping.set(
      four.find(
        (b) =>
          !mapping.has(b) &&
          zerosixnine[0].indexOf(b) > -1 &&
          zerosixnine[1].indexOf(b) > -1 &&
          zerosixnine[2].indexOf(b) > -1
      ),
      "b"
    );
    // d = in 4 and not b
    mapping.set(
      four.find((d) => !mapping.has(d)),
      "d"
    );
    // g = in all of 069 (last unknown)       g
    mapping.set(
      zerosixnine[0].find(
        (g) =>
          !mapping.has(g) &&
          zerosixnine[1].indexOf(g) > -1 &&
          zerosixnine[2].indexOf(g) > -1
      ),
      "g"
    );
    // e = last unknown
    mapping.set(
      ["a", "b", "c", "d", "e", "f", "g"].find((e) => !mapping.has(e)),
      "e"
    );

    const output = outputStr
      .split(" ")
      .map((s) => Array.from(s))
      .map((a) => a.map((c) => mapping.get(c)))
      .map((b) => {
        b.sort();
        return numbers.get(b.reduce((acc, n) => acc + n));
      })
      .reduce((acc, n) => acc + n);
    gold += parseInt(output);
  }

  const result: StarResult = {
    silver: silver.toString(),
    gold: gold.toString(),
  };

  context.res.json(result);
};

export default httpTrigger;
