// initial fish creates (18-init) / 7 new fish
// new fish creates (18-start-2) / 7 new fish
// After -5 day:  8,
// After -4 day:  7,
// After -3 day:  6,
// After -2 day:  5,
// After -1 day:  4,
// Initial state: 3,
// After  1 day:  2,
// After  2 days: 1,
// After  3 days: 0,
// After  4 days: 6,8
// After  5 days: 5,7
// After  6 days: 4,6
// After  7 days: 3,5
// After  8 days: 2,4
// After  9 days: 1,3
// After 10 days: 0,2
// After 11 days: 6,1,8
// After 12 days: 5,0,7
// After 13 days: 4,6,6,8
// After 14 days: 3,5,5,7
// After 15 days: 2,4,4,6
// After 16 days: 1,3,3,5
// After 17 days: 0,2,2,4
// After 18 days: 6,1,1,3,8

let input = `3,4,3,1,2`;
input = `2,4,1,5,1,3,1,1,5,2,2,5,4,2,1,2,5,3,2,4,1,3,5,3,1,3,1,3,5,4,1,1,1,1,5,1,2,5,5,5,2,3,4,1,1,1,2,1,4,1,3,2,1,4,3,1,4,1,5,4,5,1,4,1,2,2,3,1,1,1,2,5,1,1,1,2,1,1,2,2,1,4,3,3,1,1,1,2,1,2,5,4,1,4,3,1,5,5,1,3,1,5,1,5,2,4,5,1,2,1,1,5,4,1,1,4,5,3,1,4,5,1,3,2,2,1,1,1,4,5,2,2,5,1,4,5,2,1,1,5,3,1,1,1,3,1,2,3,3,1,4,3,1,2,3,1,4,2,1,2,5,4,2,5,4,1,1,2,1,2,4,3,3,1,1,5,1,1,1,1,1,3,1,4,1,4,1,2,3,5,1,2,5,4,5,4,1,3,1,4,3,1,2,2,2,1,5,1,1,1,3,2,1,3,5,2,1,1,4,4,3,5,3,5,1,4,3,1,3,5,1,3,4,1,2,5,2,1,5,4,3,4,1,3,3,5,1,1,3,5,3,3,4,3,5,5,1,4,1,1,3,5,5,1,5,4,4,1,3,1,1,1,1,3,2,1,2,3,1,5,1,1,1,4,3,1,1,1,1,1,1,1,1,1,2,1,1,2,5,3`;
let data = input.split(",").map((n) => parseInt(n));

// how many fish are on day 0, 1, 2, 3 ...
let fishtimer = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let start of data) {
  fishtimer[start] += 1;
}
for (let d = 0; d < 256; d++) {
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
console.log(fishtimer.reduce((acc, n) => acc + n));

// console.log(Math.floor((18 - 4) / 7) + 1);

// const days = 256;
// const calc = (startDay) => {
//   //   console.log("calc(", startDay);
//   let start = startDay + 2;
//   let ret = 1;
//   for (let i = start + 7; i <= days; i += 7) {
//     ret += calc(i);
//   }
//   return ret;
// };
// // 3 -> -5 = -8 + 3
// // 4 -> -4 = -8 + 4
// // let ret = 0;
// // for (let j = 0; j < data.length; j++) {
// //   //   console.log("calc", data[j]);
// //   ret += calc(-8 + data[j]);
// // }

// console.log(calc(-8 + 2));
