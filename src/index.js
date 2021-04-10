import React from "react";
import { render } from "react-dom";
import { Header } from "./header";

const dateSelected = (date) => {
  console.log(`${date.toString()} is the selected date`);
}

const App = () => (
  <Header dateSelected={dateSelected} />
);

render(<App />, document.querySelector("#app-container"));
