import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const a = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // flexWrap: 'wrap',
    border: "solid 2px silver",
    height: "100vh",
  },
}));

function GetState() {
    //we use this to get state names the first time it mounts
    useEffect(() => {
        let incomingData;
        axios
          .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
          .then((res) => {
            incomingData = res.data.states;
            console.log(incomingData);
          });
      }, []);

  const classes = a();

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

  const getStateName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const getStates = () => {
    //   incomingData.forEach(i => {
    //     i.state_name === name? console.log(true): console.log(false);
    //   });
  };

  

  return (
    <>
      <div className={classes.wrapper}>
        <h1>COWIN Check</h1>
        <form autoComplete="on">
          <TextField
            id="standard-basic"
            label="Enter Your State Name here"
            onChange={(e) => {
              getStateName(e);
            }}
          />
        </form>
        <Button variant="contained" color="primary" onClick={() => getStates()}>
          Click Me!
        </Button>
      </div>
    </>
  );
}

export default GetState;
