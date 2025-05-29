const person = {
  x: 10,
  firstName: "Piyush",
  lastName: "Garg",
  hobbies: ["Coding", "Gym"],
  isMarried: false,
  hasGf: false,
  hadGf: false,
  hadCrush: Infinity,
  getFullName: function () {
    return "Piyush Garg";
  },
  address: {
    hNo: 1,
    street: 1,
    countryCode: "In",
    state: "PB",
  },
};
console.log(person.address.state);

const remote = {
  color: "Black",
  brand: "XYZ",
  dimentions: { height: 1, width: 1 },
  turnOff: function () {},
  volumeUp: function () {},
};
