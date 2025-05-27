let myArray = [1, 4, 2, 3, 5, 6];

function sum(a) {
  let sums = 0;
  for (let i = 0; i < a.length; i++) {
    sums += a[i];
  }
  return sums;
}

console.log(sum(myArray));

let anotherResult = sum([3, 2, 4, 5]);
console.log(`My result is ${anotherResult}`);
