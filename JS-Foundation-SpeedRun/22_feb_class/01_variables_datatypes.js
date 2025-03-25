let num1 = 12;
const pi = 3.14;

// ####### Data Types #######

let number = 12; // Number

let name = "Shouvik"; // String

let isTrue = true; //Boolean

let nullValue = null; // Object

let undefinedValue = undefined; // undefined

let symbolVal = Symbol(); // Symbol

let student = {
  name: "Shouvik",
  age: 23,
  isStudent: true,
};

// ###########   Convert data types   ###########

// ----- Convert string to Number ------

// let num = "q23a";
let num = "23";

// ***1st way***

// let convertedNum = Number(num);  // recommended

// ***2nd way***

let convertedNum = parseInt(num);

// NaN is also a type of number

// ***3rd way***

// let convertedNum = +num;

console.log(convertedNum);
console.log(typeof convertedNum);

// ----- Convert Number to String ------

let str = 123;

// ***1st way***

// let convertedStr = String(str);

// ***2nd way***

let convertedStr = JSON.stringify(str); // not recomended, computation load

console.log(convertedStr);
console.log(typeof convertedStr);

// --------------Mathermatical operations --------------

let a = 10;
let b = 3;

let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
let remainder = a % b;
let power = a ** b;

console.log(quotient);

// ########### Comaprison ###########

let x = 5;
let y = 10;
console.log(x == y); // equal to
console.log(x != y); // not equal to
console.log(x < y); // greater than
console.log(x > y); // less than
console.log(x <= y); // greater than equal
console.log(x >= y); // less than equal

// ######### Math ##########

console.log(typeof Math);

console.log(Math.max(x, y));
console.log(Math.min(x, y));
console.log(Math.random());

/*
++++++ random number in a Range ++++++

let v = Math.random();
console.log(`random number: ${v}`);
console.log(`random number * 6: ${v * 6}`);
console.log(`random number Math dot Floor: ${Math.floor(v * 6)}`);
console.log(`random number Math dot Floor: ${Math.floor(v * 6 + 1)} `);
*/

// ########### String ############

let first_name = "Shouvik";
let last_name = "Sarkar";

// -------- concat -------

// let full_name = first_name.concat(" ", last_name);

// -------- + -------

let full_name = first_name + " " + last_name;

console.log(full_name);

// ----- properties and methods  -----

let message = "Hello World!";

// ********** Lenth *********

console.log(message.length);

// ********** toUpperCase *********

console.log(message.toUpperCase());

// ********** toLowerCase *********

console.log(message.toLowerCase());

// ********** indexOf *********

console.log(message.indexOf("W"));

// ********** Slice *********

console.log(message.slice(2, 8));

// ********** Template Lliterals *********

console.log(`Hello. ${first_name} How are you?`);
