/* ############## Array ############## */

let chaiTypes = ["Masala Chai", "Ginger Chai", "Green Tea", "Lemon chai"];

// console.log(chaiTypes[2]);

// console.log(chaiTypes.length); // prints the length of an array

chaiTypes.push("Herbal Tea"); // adds value at the end of the array

// console.log(chaiTypes.pop()); // removes the last element from the array and returns the value

let index = chaiTypes.indexOf("Green Tea"); //index of an element

if (index !== -1) {
  chaiTypes.splice(index, 1); //
}

// console.log(chaiTypes);

/* ############## Loops on Array ############## */

chaiTypes.forEach((chai, index, array) => {
  console.log("chai:", chai); //element of the array
  console.log("chai:", index); // index of the array
  console.log("chai:", array); //the array itself, why would anyone use it?🙂
});

let moreChaiTypes = ["Oolong tea", "White Tea"];

/* **** Add Two Arrays **** */

// ---- spread operator ---

let allChaiTypes = [...chaiTypes, ...moreChaiTypes];

console.log(allChaiTypes);

// ---- concat method ---

console.log(chaiTypes.concat(moreChaiTypes));

/* #### Objects #### */

let chaiRecipe = {
  name: "Masala Chai",
  ingredients: {
    teaLeaves: "Assam Tea",
    milk: "Full Cream Milk",
    sugar: "Brown sugar",
    spices: ["Daalchini", "Ginger"],
  },
  instructions: "Boil water, add tea leaves, milk sugar and spices",
};

console.log(chaiRecipe);
console.log(chaiRecipe.ingredients.spices);
