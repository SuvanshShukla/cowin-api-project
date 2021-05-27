import React, { useState, useEffect } from "react";
import classes from './GetStates.module.css';
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

//you need to install dotenv using npm then import and configure like below
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.REACT_APP_STATES_API); //the REACT_APP prefix is necessary for naming any env variable
//also remember whenever you add a new environment variable you need to restart npm start

const bkgimgs = [
  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80",
  "https://images.unsplash.com/photo-1584271854089-9bb3e5168e32?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1519998994457-43c1f2c8460b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1438&q=80",
  "https://images.unsplash.com/photo-1512228585554-7c665ed88f80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
]

function GetState() {
  const [info, setInfo] = useState();
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState();
  const [foundState, setFoundState] = useState(true); //the initial value of foundState is true

  //we use this to get state names the first time it the component mounts
  useEffect(() => {
    let incomingData;
    axios.get(process.env.REACT_APP_STATES_API).then((res) => {
      incomingData = res.data.states;
      if (incomingData != null) {
        setInfo(incomingData);
        console.log(incomingData);
      } else {
        console.log("incoming Data is null");
      }
    });

  /*   var v = document.getElementsByClassName("backgroundDiv")
    console.log(v);
    v.style.backgroundImage = `url(`+bkgimgs[Math.floor(Math.random() * bkgimgs.length)]+`)` */
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
        setFoundState(true);
        let district_id = element.state_id;
        axios
          .get(
            "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" +
              district_id
          )
          .then((res) => {
            a = res.data.districts;
            setDistricts(a);
            // console.log(districts);
          });
      }
    });
    // if(foundState){setFoundState(true);} else{setFoundState(false)}
    /* if(foundState){
      console.log('here!!');
      let tag = document.getElementById("standard-basic");
      if() 
    }*/
  };

  return (
    <React.Fragment>
      <div className={classes.backgroundDiv}>
        &nbsp;
        <div className={classes.wrapper}>
          <h1>COWIN Check</h1>
          <div className={classes.formDiv}>
            <form autoComplete="on">
              <TextField
                value={name}
                error={!foundState}
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
            </div>
          <ul>
            {districts != null
              ? districts.map((dist, i) => <li key={i}>{dist.district_name}</li>)
              : ""}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default GetState;
