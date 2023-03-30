import * as React from "react";
import { render } from "react-dom";

import DisplayedGraph from "./containers/DisplayedGraph";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "absolute",
          zIndex: 999999,
          left: "1rem",
          top: "1rem",
        }}
      >
        <a style={{ color: "white" }} href="https://linkedin.com/in/kris-gano/">
          @Kris Gano
        </a>
      </div>
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "1rem",
          backgroundColor: "black",
          zIndex: 100,
        }}
      ></div>
      <DisplayedGraph key={"displayed-graph"} />
    </div>
  );
}
const rootElement = document.getElementById("root");
render(<App />, rootElement);
