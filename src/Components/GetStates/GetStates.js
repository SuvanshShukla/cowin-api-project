import React, { useState, useEffect } from "react";
import classes from "./GetStates.module.css";
import axios from "axios";
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import clsx from "clsx";

//you need to install dotenv using npm then import and configure like below
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.REACT_APP_STATES_API); //the REACT_APP prefix is necessary for naming any env variable
//also remember whenever you add a new environment variable you need to restart npm start
var x, y, divbkg;
const bkgimgs = [
  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1589463349208-95817c91f971?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1475&q=80",
];

function GetState() {
  const [info, setInfo] = useState();
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState();
  const [foundState, setFoundState] = useState(true); //the initial value of foundState is true
  const [field, setField] = useState('');

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
    makeUrl();
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

  const handleFieldChange = (event) => {
    setField(event.target.value);
    console.log(field);
  };

  const setSearchFunction = () => {
    if(field === 'State'){
      checkStateName(name)
    }
    else if( field === 'District'){
      console.log("District");
    }
    else if(field === 'Zip Code') {
      console.log("Zip Code");
    }
  }

  const getStateName = (e) => {
    let stateName = e.target.value;
    //the little bit of code here is used to automatically capitalize the first letter
    setName(stateName.charAt(0).toUpperCase() + stateName.slice(1));
  };

  const checkStateName = (a) => {
    //checks each state with the state name entered by the user
    setFoundState(false);
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

  const makeUrl = () => {
    x = Math.floor(Math.random() * bkgimgs.length);
    console.log(x);
    y = new URL(bkgimgs[x]);
    console.log(y);
    divbkg = {
      webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover",
      backgroundImage: "url(" + y + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "120vh",
      // overflow: "visible"
    };
  };

  return (
    <div>
      <div style={divbkg}>
        <div className={classes.wrapper}>
          <div className={classes.formDiv}>
            <h1>
              <u>Vaccine Check</u>
            </h1>
            <form autoComplete="on">
              <FormControl>
                <Select
                  value={field}
                  onChange={handleFieldChange}
                  displayEmpty
                  // className={classes.selectEmpty}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"State"}>State</MenuItem>
                  <MenuItem value={"District"}>District</MenuItem>
                  <MenuItem value={"Zip Code"}>Zip Code</MenuItem>
                </Select>
                <FormHelperText>Enter Field of Search</FormHelperText>
              </FormControl>
              &nbsp; &nbsp; &nbsp;
              <Tooltip
                title={"Enter " + field + " to find out more"}
                placement="right"
                arrow
              >
                <TextField
                  label={""+field+""}
                  id="outlined-start-adornment"
                  className={clsx(classes.margin, classes.textField)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  value={name}
                  error={!foundState}
                  helperText={!foundState?"Incorrect Entry":""}
                  onChange={(e) => {
                    getStateName(e);
                  }}
                />
              </Tooltip>
            </form>
            <br />
            <Tooltip title="Click to get Info" arrow>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSearchFunction(name)}
              >
                Click Me!
              </Button>
            </Tooltip>
            <ul>
              {districts != null
                ? districts.map((dist, i) => (
                    <li key={i}>{dist.district_name}</li>
                  ))
                : ""}
            </ul>
          <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetState;
