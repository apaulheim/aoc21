let input = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`;

let data = input.split("\n");

const part1 = () => {
  let err = 0;

  let del = new Set();

  for (let i = 0; i < data.length; i++) {
    let stash = [];
    for (let c = 0; c < data[i].length; c++) {
      switch (data[i][c]) {
        case "[":
          stash.push("[");
          break;
        case "(":
          stash.push("(");
          break;
        case "{":
          stash.push("{");
          break;
        case "<":
          stash.push("<");
          break;
      }
      if (data[i][c] == ")") {
        if (stash[stash.length - 1] == "(") stash.splice(stash.length - 1);
        else {
          err += 3;
          del.add(i);
          break;
        }
      } else if (data[i][c] == "]") {
        if (stash[stash.length - 1] == "[") stash.splice(stash.length - 1);
        else {
          err += 57;
          del.add(i);
          break;
        }
      } else if (data[i][c] == "}") {
        if (stash[stash.length - 1] == "{") stash.splice(stash.length - 1);
        else {
          err += 1197;
          del.add(i);
          break;
        }
      } else if (data[i][c] == ">") {
        if (stash[stash.length - 1] == "<") stash.splice(stash.length - 1);
        else {
          err += 25137;
          del.add(i);
          break;
        }
      }
    }
  }
  data = data.filter((_, i) => !del.has(i));
  return err;
};

const part2 = () => {
  let scores = [];
  let table = new Map();
  table.set("(", 1);
  table.set("[", 2);
  table.set("{", 3);
  table.set("<", 4);

  for (let line of data) {
    let stash = [];
    for (let c = 0; c < line.length; c++) {
      switch (line[c]) {
        case "[":
          stash.push("[");
          break;
        case "(":
          stash.push("(");
          break;
        case "{":
          stash.push("{");
          break;
        case "<":
          stash.push("<");
          break;
      }
      if (line[c] == ")") {
        if (stash[stash.length - 1] == "(") stash.splice(stash.length - 1);
      } else if (line[c] == "]") {
        if (stash[stash.length - 1] == "[") stash.splice(stash.length - 1);
      } else if (line[c] == "}") {
        if (stash[stash.length - 1] == "{") stash.splice(stash.length - 1);
      } else if (line[c] == ">") {
        if (stash[stash.length - 1] == "<") stash.splice(stash.length - 1);
      }
    }
    if (stash.length > 0) {
      let score = 0;
      for (let s = stash.length - 1; s >= 0; s--) {
        score *= 5;
        score += table.get(stash[s]);
      }
      scores.push(score);
    }
  }
  scores.sort((a, b) => (a < b ? -1 : a == b ? 0 : 1));
  console.log(scores);
  return scores[Math.floor(scores.length / 2)];
};

console.log(part1());
console.log(part2());
