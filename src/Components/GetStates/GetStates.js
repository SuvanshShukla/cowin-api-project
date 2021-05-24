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
    border: "solid 2px silver",
    height: "100vh",
  },
}));

function GetState() {
  let incomingData;
  const classes = a();

  const [info, setInfo] = useState();
  const [name, setName] = useState("");

  //we use this to get state names the first time it the component mounts
  useEffect(() => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((res) => {
        incomingData = res.data.states;
        setInfo(incomingData);
        console.log(incomingData);
      });
  }, []);

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
  };

  const checkStateName = () => {
    info.forEach((element) => {
      if (element.state_name === name) {
        console.log(name);
        let district_id = element.state_id;
        axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + district_id).then((res) => {
            let incomingDistricts = res.data;
            console.log(incomingDistricts);
        })
      }
    });
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
        <Button
          variant="contained"
          color="primary"
          value={name}
          onClick={() => checkStateName()}
        >
          Click Me!
        </Button>
      </div>
    </>
  );
}

export default GetState;
