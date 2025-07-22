const a = 0;
const b = 0;
const c = 0;

if (a < 0 || b < 0 || c < 0 || a + b + c === 100) {
  console.log("нет");
}

if (a > b + c) {
  console.log("-1");
}

if (a + b + c < 0) {
  console.log(500);
}

if (a + b + c > 0) {
  console.log(0);
}
