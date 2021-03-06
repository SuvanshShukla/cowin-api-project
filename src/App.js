import React from "react";
import GetState from "./Components/GetStates/GetStates";
import Navbar from "./Components/Navbar/Navbar";
require ("dotenv").config()

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <GetState />
    </React.Fragment>
  );
}

export default App;
