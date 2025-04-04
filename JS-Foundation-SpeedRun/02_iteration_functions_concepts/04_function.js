function greet(name) {
  console.log(`Hello ${name}`);
}

greet("Hitesh");
greet("Piyush");

let globalVar = "I am global";

function modifyGlobal() {
  globalVar = "I am modified";
  let blockScopedVar = "I am blocked-scoped";
  console.log(blockScopedVar);
}
modifyGlobal();

// closure

// ##### IIFE-Immediately Invoked Function Expression #####
let config = (function () {})();
(() => {})();
// implementation
let config2 = (function () {
  let settings = {
    theme: "dark",
  };
  return settings;
})();

let person1 = {
  name: "ravi",
  greet: function () {
    console.log(`Hello ${this.name}`);
  },
};

let person2 = {
  name: "hitesh",
};

// let bind_greet = person1.greet.bind(person2);

// bind_greet();
console.log("ttt");

person1.greet.call(person2);
person1.greet.call({ name: "mukul" });

// call bind
