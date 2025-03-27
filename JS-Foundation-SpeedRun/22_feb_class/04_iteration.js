// Iterations on array

let salesData = [
  { product: "Laptop", price: 1200 },
  { product: "smartphone", price: 800 },
  { product: "Headphones", price: 150 },
  { product: "Keyboard", price: 80 },
];

// ***** ForEach Loop *****

// ### Q: Using forEach, print the sum of the price. ###

// let sum = 0;

// salesData.forEach((element) => {
//   sum += element.price;
// });

// console.log(sum);

// ***** Reduce *****

// ### Q: Using reduce, print the sum of the price. ###

let ans = salesData.reduce((acc, curdata) => {
  return (acc += curdata.price);
}, 0);

console.log(ans);

// ***** filter *****

// ### Q: using "filter" find object with stocks less than 50 ###

let stockProducts = [
  { product: "Laptop", stock: 1200 },
  { product: "smartphone", stock: 73 },
  { product: "Headphones", stock: 150 },
  { product: "Keyboard", stock: 45 },
];

let lowStrock = stockProducts.filter((element) => element.stock < 50);

console.log(lowStrock);

// ***** reduce 2.0 *****

// ### Q: with reduce find out the object with least activity count. ###

let UserActivity = [
  { user: "Alice", activityCount: 45 },
  { user: "Bob", activityCount: 72 },
  { user: "Charlie", activityCount: 33 },
];

let activeUser = UserActivity.reduce((acc, currVal) => {
  return acc.activityCount > currVal.activityCount ? acc : currVal;
});
// let activeUser = UserActivity.reduce((acc, currVal) => {
//   if (acc.activityCount < currVal.activityCount) {
//     return currVal;
//   } else {
//     return acc;
//   }
// });

console.log(activeUser);
