import React from "react";

import "./App.css";

function App() {
  return (
    <>
      <h1>Mark Wilson</h1>
      <h2>Software Engineer &amp; Engineering Lead</h2>

      <button onClick={() => alert("TODO")}>Message me</button>

      <h3>Projects</h3>
      <ul>
        <li>
          <a href="https://weighttracking.app">Weight Tracking app</a>
        </li>
      </ul>
    </>
  );
}

export default App;
