import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import "./App.css";
import axios from "axios";

function App() {
  const [info, setInfo] = useState();
  const [name, setName] = useState("");
  const getInfo = (a) => {
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=510&date=31-03-2021"
      )
      .then((res) => {
        let responseObj = res.data;
        console.log(responseObj.sessions[0]);
        setInfo((a = responseObj.sessions[0].name));
      });
  };

  const getDistrictName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const getStates = () => {
    axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((res) => {
      console.log(res.data)
    })
  }

  return (
    <div>
        <Navbar />
      <body className="App-header">
        <div>
          <h1>COWIN Check</h1>
        </div>
      
        <div>
          <span className="text"> Enter your State Below</span>
          <input type="text" placeholder="Enter Your State" id="paperInputs1" onChange={(e) => getDistrictName(e)} value={name}/>
        </div>
        <button onClick={() => getStates()} >
          Click Me!
        </button>
      </body>
    </div>
  );
}

export default App;
