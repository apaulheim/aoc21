let input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

let lines = input.split("\n");
const width = lines[0].length;
// console.log("width", width);
let data = lines.reduce(
  (acc, line) => acc.concat(Array.from(line).map((n) => parseInt(n))),
  []
);
// console.log("data.length", data.length);
// console.log("data.length / width", data.length / width);
// console.log(data);

const res = [];
const res2 = [];

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

for (let y = 0; y < data.length / width; y++) {
  for (let x = 0; x < width; x++) {
    const n = data[y * width + x];
    // console.log(n);
    if (isLow(x, y)) {
      //   console.log(" ", data[top], " ");
      //   console.log(data[left], n, data[right]);
      //   console.log(" ", data[down], " ");
      //   console.log("\n");
      res.push(n);
      res2.push({ x, y });
    }
  }
}
// console.log(res);

console.log(res.reduce((acc, n) => acc + n + 1, 0));

// part 2

const isBasin = (x, y) => {
  if (y >= 0 && y < data.length / width && x >= 0 && x < width) {
    const n = data[y * width + x];
    if (n == 9) return false;
    const top = (y - 1) * width + x;
    const right = y * width + x + 1;
    const down = (y + 1) * width + x;
    const left = y * width + x - 1;
    // return top < 0 && x + 1 >= width && down >= data.length && x - 1 < 0;
    return true;
  }
  return false;
};

let data2 = new Array(data.length);
for (let y = 0; y < data.length; y++) {
  data2[y] = 0;
}

const checkAdjacent = (x, y) => {
  //   console.log("check", x, y);
  if (isBasin(x, y)) {
    data2[y * width + x] = 1;
    if (data2[(y - 1) * width + x] != 1) checkAdjacent(x, y - 1);
    if (data2[y * width + x + 1] != 1) checkAdjacent(x + 1, y);
    if (data2[(y + 1) * width + x] != 1) checkAdjacent(x, y + 1);
    if (data2[y * width + x - 1] != 1) checkAdjacent(x - 1, y);
  }
};

let basinSizes = [];
let total = 0;

for (let i = 0; i < res2.length; i++) {
  checkAdjacent(res2[i].x, res2[i].y);
  let newTotal = data2.reduce((acc, n) => acc + n, 0);
  basinSizes.push(newTotal - total);
  total = newTotal;
}

const print = (data) => {
  for (let y = 0; y < data.length / width; y++) {
    let l = "";
    for (let x = 0; x < width; x++) {
      l += data[y * width + x] + " ";
    }
    console.log(l);
  }
  console.log("\n");
};

print(data);
print(data2);

console.log(basinSizes);
console.log(
  basinSizes.sort((a, b) => {
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  })
);
console.log(basinSizes.slice(0, 3));
console.log(basinSizes.slice(0, 3).reduce((acc, n) => acc * n, 1));

// console.log(basinSizes.reduce((acc, n) => acc * n, 0));
