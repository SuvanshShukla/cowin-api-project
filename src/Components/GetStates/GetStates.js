import React, { useState, useEffect } from "react";
import DistrictsAccordion from "../DistrictsAccordion/DistrictsAccordion";
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
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
  // Typography,
} from "@material-ui/core";
import clsx from "clsx";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//you need to install dotenv using npm then import and configure like below
import dotenv from "dotenv";
dotenv.config();
//console.log(process.env.REACT_APP_STATES_API); //the REACT_APP prefix is necessary for naming any env variable
//also remember that, whenever you add a new environment variable you need to restart npm start

/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  TODO 
    * You can either pre-load all the states and districts and send it to child components
    * Or you can find out a way to send the synchronously loaded district data to the child component
    * add an about page at the bottom of the side-drawer
    
  ! what i'm thinking is ...
    * i'll pre-load the list as a component everytime the page reloads
    * then when the user enters a state's name i'll send it to the component
    * and it'll load the district's info accordingly
  this tried the above already

  //i've tried to asynchronously run the DistrictsAccordion component and it still won't run properly so i will just map it here

  ? so heres how you can solve it:
  * you basically need to set the state only once
  * so instead of setting the state in the loop set it out side of the loop
  * do this by comparing the states in the list then if state gets found set a var equal to the returned val
  * then perform the API fetch
  * then set the state
  * then set the tag and render the component!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

var x, y, divbkg;
const bkgimgs = [
  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1502&q=80",
  "https://images.unsplash.com/photo-1589463349208-95817c91f971?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
  "https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1475&q=80",
];

function GetState() {
  const [states, setStates] = useState();
  const [name, setName] = useState("");
  const [districts, setDistricts] = useState();
  const [foundState, setFoundState] = useState(true); //the initial value of foundState is true
  const [field, setField] = useState("");
  const [accordionComponent, setComponent] = useState();

  //we use this to get state names the first time it the component mounts
  useEffect(() => {
    makeUrl();
    let incomingData;
    //we are loading the states as the page loads
    axios
      .get(process.env.REACT_APP_STATES_API)
      .then((res) => {
        incomingData = res.data.states;
        if (incomingData != null) {
          setStates(incomingData);
          console.log(incomingData);
        } else {
          console.log("incoming Data is null");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // setComponent(<DistrictsAccordion states={states}/>);
  }, []);

  /* useEffect(() => {
    setComponent(accordionComponent)
  }, [accordionComponent]) */

  /* const findByDistrict = (a) => {
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=510&date=31-03-2021"
      )
      .then((res) => {
        let responseObj = res.data;
        console.log(responseObj.sessions[0]);
        setStates((a = responseObj.sessions[0].name));
      });
  }; */

  const handleFieldChange = (event) => {
    setField(event.target.value);
    // console.log(field);
    setTimeout(field, 0);
    setSearchFunction()
    console.log(field);
  };

  const setSearchFunction = () => {
    if (field === "State") {
      // checkStateName(name);
      setField("Go")
    } else if (field === "District") {
      console.log("District");
    } else if (field === "Zip Code") {
      console.log("Zip Code");
    }
  };

  const getStateName = (e) => {
    let input = e.target.value;
    //the little bit of code here is used to automatically capitalize the first letter
    setName(input.charAt(0).toUpperCase() + input.slice(1));
  };

  const checkStateName = () => {
    let match = "";
    //checks each state with the state name entered by the user
    for(let i = 0; i<states.length; i++){
      if(i.state_name === name){
        match = i.state_id
      }
    }

    if(match!==""){
      axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + match).then((res) => {
        console.log(res.data.districts);
        setDistricts(res.data.districts)
        // setFoundState(true)
        //  setComponent(<DistrictsAccordion accdistricts={districts}/>)
      })
    } else{
      setFoundState(false);
    }
    setComponent(<DistrictsAccordion accdistricts={districts}/>)
  };

  const makeUrl = () => {
    x = Math.floor(Math.random() * bkgimgs.length);
    // console.log(x);
    y = new URL(bkgimgs[x]);
    // console.log(y);
    divbkg = {
      /*  webkitBackgroundSize: "cover",
      mozBackgroundSize: "cover",
      oBackgroundSize: "cover", */
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
                  label={"" + field + ""}
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
                  helperText={!foundState ? "Incorrect Entry" : ""}
                  onChange={(e) => {
                    getStateName(e);
                  }}
                />
              </Tooltip>
            </form>
            <br />
            <Tooltip
              title={field === "" ? "Please Select Field" : "Click to get Info"}
              arrow
            >
              <span>
                <Button
                  disabled={field === "Go" ? true : false}
                  variant="contained"
                  color="primary"
                  onClick={() => checkStateName(name)}
                >
                  Click Me!
                </Button>
              </span>
            </Tooltip>
            <hr />
           {/*  <ul>
              {districts != null
                ? districts.map((dist, i) => (
                    <li key={i}>{dist.district_name}</li>
                  ))
                : ""}
            </ul> */}
            {districts !== undefined ? accordionComponent : ""}
            {/* {console.log(districts)} */}
            {/* {showThings()} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetState;
