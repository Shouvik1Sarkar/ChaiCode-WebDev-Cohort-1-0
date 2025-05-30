// let fName = "Hitesh";
// let fName2 = fName;

const { json } = require("express");

// console.log(fName);
// fName2 = "Piyush";
// console.log(fName);

let p1 = {
  fName: "Hitesh",
  lName: "Chaudhury",
  address: { house: 1 },
};
// when we write ob1 = ob2 we don't actually copy the object rather we copy the reference of that object.
// let p2 = p1;
// p2.fNmae = "Piyush";

// console.log(p1);
// console.log(p2);

// *************** method 1: ***************

// let p2 = {
//   fName: p1.fNmae,
//   lName: p1.lName,
//   address: p1.address
// };
// p2.fName = "Piyush";
// console.log(p1);
// console.log(p2);
// But what if there 100 properties? Nobody's frede anough to copy 1000 values

// *************** method 2: Spread Operators ***************

// let p2 = {
//   ...p1,
// };
// p2.fName = "Piyush";

// console.log(p1);
// console.log(p2);

// Problem with method 2: nested Objects are dhallow copied

// p2.address.house = 2;
// console.log(p1);
// console.log(p2);

// solution for that

// let p2 = {
//   ...p1,
//   address: { ...p1.address },
// };
// p2.address.house = 2;
// console.log(p1);
// console.log(p2);
// Problem : How many times will I do it?

// solution: convert into a string and then copy it then change it to object

//*************** method 3: Convert into a string ***************

let p1String = JSON.stringify(p1);
let p2 = JSON.parse(p1String);
p2.address.house = 2;
console.log(p1);
console.log(p2);

function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Create a function to copy an object deep copy

let x1 = { x: 1, y: 2, z: 3 };
let x2 = copyObject(x1);

x2.x = "12";
console.log(x1);
console.log(x2);
