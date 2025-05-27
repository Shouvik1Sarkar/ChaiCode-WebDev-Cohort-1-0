let numberOfGuests = 6;

let pizzaSize;
// small <= 2
// medium <= 5
// large > 5
if (numberOfGuests <= 2) {
  pizzaSize = "small";
} else if (numberOfGuests <= 5) {
  pizzaSize = "medium";
} else {
  pizzaSize = "large";
}

console.log(pizzaSize);
