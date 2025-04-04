let expense = [
  { description: "Groceries", amount: 50, category: "Food" },
  { description: "Electricity Bill", amount: 100, category: "Utilities" },
  { description: "Dinner", amount: 30, category: "Food" },
  { description: "Internet Bill", amount: 50, category: "Utilities" },
];

// total amount in each category

let total_expense = expense.reduce((acc, currVal) => {
  acc[currVal.category] = (acc[currVal.category] || 0) + currVal.amount;
  return acc;
}, {});
console.log(total_expense);

let tasks = [
  { description: "Write report", completed: false, priority: 2 },
  { description: "send email", completed: true, priority: 3 },
  { description: "DPrepare presentation", completed: false, priority: 1 },
];
// incomplete task and sort by priority

let incomplete_task = tasks
  .filter((task) => !task.completed)
  .sort((a, b) => a.priority - b.priority);

console.log(incomplete_task);

let movieRatings = [
  { title: "Movie A", ratings: [4, 5, 3] },
  { title: "Movie B", ratings: [5, 5, 4] },
  { title: "Movie C", ratings: [3, 4, 2] },
];

// return movie and avg ratings

let avg_rating = movieRatings.map((movie) => {
  let total_rating = movie.ratings.reduce((acc, currVal) => (acc += currVal));
  let avg = (total_rating / movie.ratings.length).toFixed(2);
  //   console.log(avg_rating);
  return { title: movie.title, ratings: movie.ratings, average_rating: avg };
  //   return avg;
});

console.log(avg_rating);
