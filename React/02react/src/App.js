import React from "https://esm.sh/react@19.1.0";
import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
const Chai = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Masala chai"),
    React.createElement("p", {}, "Ginger chai"),
  ]);
};
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Chai variations by Chai code"),
    React.createElement(Chai),
    React.createElement(Chai),
    React.createElement(Chai),
    React.createElement(Chai),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
// export default App;
