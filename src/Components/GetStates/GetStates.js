import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const a = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    border: "solid 2px silver",
    minHeight: "100vh",
  },
}));

function GetState() {
  let incomingData;
  const classes = a();
  const [info, setInfo] = useState();
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState();
  const [foundState, setFoundState] = useState(true); //the initial value of foundState is true 

  //we use this to get state names the first time it the component mounts
  useEffect(() => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((res) => {
        incomingData = res.data.states;
        if (incomingData != null) {
          setInfo(incomingData);
          console.log(incomingData);
        } else {
          console.log("incoming Data is null");
        }
      });
  }, []);

  /* const getInfo = (a) => {
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=510&date=31-03-2021"
      )
      .then((res) => {
        let responseObj = res.data;
        console.log(responseObj.sessions[0]);
        setInfo((a = responseObj.sessions[0].name));
      });
  }; */

  const getStateName = (e) => {
    let stateName = e.target.value;
    //the little bit of code here is used to automatically capitalize the first letter
    setName(stateName.charAt(0).toUpperCase() + stateName.slice(1));
  };

  const checkStateName = (a) => {
    //checks each state with the state name entered by the user
    info.forEach((element) => {
      if (element.state_name === name) {
        console.log(name);
        //here if the state is found then the state will be set to true
        setFoundState(true)
        let district_id = element.state_id;
        axios
          .get(
            "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
              district_id
          )
          .then((res) => {
            a = res.data.districts;
            setDistricts(a);
            console.log(districts);
          });
      } 
    });
    if(foundState){setFoundState(false);}
    /* if(foundState){
      console.log('here!!');
      let tag = document.getElementById("standard-basic");
      if() 
    }*/
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h1>COWIN Check</h1>
        <form autoComplete="on">
          <TextField
            value={name}
            error={!foundState ? true : false}
            id="standard-basic"
            label="Enter Your State Name here"
            onChange={(e) => {
              getStateName(e);
            }}
          />
        </form>
        <Button
          variant="contained"
          color="primary"
          onClick={() => checkStateName(districts)}
        >
          Click Me!
        </Button>
        {districts != null
          ? districts.map((dist, i) => (
              <ul>
                <li key={i}>{dist.district_name}</li>
              </ul>
            ))
          : ""}
      </div>
    </>
  );
}

export default GetState;
