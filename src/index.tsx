import * as React from "react";
import { render } from "react-dom";

import DisplayedGraph from "./containers/DisplayedGraph";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "1rem",
          backgroundColor: "black",
          zIndex: 100
        }}
      ></div>
      <DisplayedGraph key={"displayed-graph"} />
      <footer>
        <a style={{ color: "white" }} href="https://linkedin.com/in/kris-gano/">
          @Kris Gano
        </a>
      </footer>
    </div>
  );
}
const rootElement = document.getElementById("root");
render(<App />, rootElement);
