function prepareChai(type) {
  if (type) {
    if (type.toLowerCase().trim() === "masala chai") {
      console.log("Add some spices to the chai.");
    } else if (type.toLowerCase().trim() === "regular chai") {
      console.log("Prepare regular chai.");
    } else {
      console.log("masala chai || regular chai");
    }
  } else {
    console.log("Prepare regular chai.");
  }
}

prepareChai("masala chai");

/* In a store if a customer buys products worth more than 1000rs, then gets 10% discount. Else full payment  */

function calculateTotal(price) {
  //Parameter
  let amount = Number(price);
  console.log("Total amount: ", amount);

  //   if (typeof amount == "number" && !isNaN(amount)) {
  //     if (amount >= 1000) {
  //       console.log(`Pay ${amount * 0.9}`);
  //     } else {
  //       console.log(`Pay ${amount}`);
  //     }
  //   } else {
  //     console.log("Enter a valid Number");
  //   }

  // 1 line if else

  amount >= 1000
    ? console.log(`Pay ${amount * 0.9}`)
    : console.log(`Pay ${amount}`);
}
calculateTotal("1200"); // Argument

/* Traffic light system: Red(Stop) Yellow(Slow Down) Green(Go) */

function traffic_system(color) {
  let light = String(color);
  //   if (light.toLowerCase().trim() === "red") {
  //     console.log("Stop");
  //   } else if (light.toLowerCase().trim() === "yellow") {
  //     console.log("Slow Down");
  //   } else if (light.toLowerCase().trim() === "green") {
  //     console.log("Go");
  //   } else {
  //     console.log("Enter Red || Green || Yellow");
  //   }

  switch (light) {
    case "red":
      console.log("Stop");
      break;
    case "yellow":
      console.log("yellow");
      break;
    case "green":
      console.log("go");
      break;
    default:
      console.log("enter proper light");
  }
}

traffic_system("red");

function check_truthy_value(value) {
  if (value) {
    return "truthy";
  } else {
    return "falsy";
  }
}
console.log("[]: ", check_truthy_value([]));

console.log("[1, 2, 3]: ", check_truthy_value([1, 2, 3]));

console.log("1: ", check_truthy_value(1));

console.log("0: ", check_truthy_value(0));

console.log("-1: ", check_truthy_value(-1));

console.log("Hello: ", check_truthy_value("Hello"));

console.log('"": ', check_truthy_value(""));

console.log("null: ", check_truthy_value(null));

console.log("undefined: ", check_truthy_value(undefined));

console.log("true: ", check_truthy_value(true));

console.log("false: ", check_truthy_value(false));

function login(user_name, password, loginIp) {
  if (user_name === "admin" && (password == 1234 || loginIp == "127")) {
    console.log("Logged In");
  } else {
    console.log("Logg In failed");
  }
}

login("admin", "", "127");
