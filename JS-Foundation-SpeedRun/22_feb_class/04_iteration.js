let salesData = [
  { product: "Laptop", price: 1200 },
  { product: "smartphone", price: 800 },
  { product: "Headphones", price: 150 },
  { product: "Keyboard", price: 80 },
];

// let sum = 0;

// salesData.forEach((element) => {
//   sum += element.price;
// });

// console.log(sum);

let ans = salesData.reduce((acc, curdata) => {
  return (acc += curdata.price);
}, 0);

console.log(ans);

let lowStrock = salesData.filter((element) => element.price < 100);

console.log(lowStrock);

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
