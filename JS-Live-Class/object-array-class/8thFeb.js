// This is Just a revision for last class (JS conditionals and Loops)

// Problem:Create an arra containing different types of teas

const teas = [
  "Green Tea",
  "Black Tea",
  "Oolong Tea",
  "White Tea",
  "Herbal Tea",
];

// Problem: Add "Chamomile Tea" to the existing of teas
teas.push("Chamomile Tea");
// Problem: Remove "Oolong tea"
if (teas.indexOf("Oolong Tea") > -1) {
  teas.splice(teas.indexOf("Oolong Tea"), 1);
}
// Problem: filter the list with teas which are caffinated
const caffeinatedTea = teas.filter((tea) => tea !== "Herbal Tea");
// console.log(caffeinatedTea);

// Problem: sort in alphabetical order

teas.sort();

const test = ["🥚", "🐓"];
test.sort();

// Problem: Use for loop to pring each array

for (let i = 0; i < teas.length; i++) {
  //   console.log(teas[i]);
}

// Problem: count the number of caffeinated teas
let count = 0;
for (let i = 0; i < teas.length; i++) {
  if (teas[i] !== "Herbal Tea") {
    count += 1;
  }
}
console.log(count); // 4 bcz oolong teas was removed and one was added
// Problem: create a new array with all the teas with uppercase

let newArr = [];

for (let i = 0; i < teas.length; i++) {
  newArr.push(teas[i].toUpperCase());
}
console.log(newArr);

// Problem: longest tea name
let teaName = "";

for (let i = 0; i < teas.length; i++) {
  if (teas[i].length > teaName.length) {
    teaName = teas[i];
  }
}
console.log(teaName);

// Problem: create a new array with reversed order

let reveresedTeas = [];
for (let i = 0; i < teas.length; i++) {
  reveresedTeas.unshift(teas[i]);
}
console.log(reveresedTeas);
