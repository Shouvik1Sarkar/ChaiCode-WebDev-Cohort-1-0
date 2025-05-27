import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
const Chai = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.cost),
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Chai variations by Chai code 2"),
    React.createElement(Chai, { name: "Masala chai", cost: "1000" }),
    React.createElement(Chai, { name: "Ginger chai", cost: "1000" }),
    React.createElement(Chai, { name: "Lemon Tea", cost: "1000" }),
    React.createElement(Chai, { name: "Ice chai", cost: "1000" }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
// export default App;
