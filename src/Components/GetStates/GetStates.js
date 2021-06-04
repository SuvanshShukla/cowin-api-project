import React, { useState, useEffect } from "react";
import classes from "./GetStates.module.css";
import axios from "axios";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//import material-ui components
import {
  TextField,
  Button,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
} from "@material-ui/core";
import clsx from "clsx";



//you need to install dotenv using npm then import and configure like below
import dotenv from "dotenv";
import DistrictCentersDialog from "../DistrictCentersDialog/DistrictCentersDialog";
dotenv.config();
//console.log(process.env.REACT_APP_STATES_API); //the REACT_APP prefix is necessary for naming any env variable
//also remember that, whenever you add a new environment variable you need to restart npm start

/* 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  this-> i ultimately had to delete DistrictAccordion component and move the map method here.

  todo:
  * make all the functions for the API calls and show all obtained data
  
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
  const [districts, setDistricts] = useState([]);
  //the initial value of foundState is true so no error is shown when we start typing
  const [foundState, setFoundState] = useState(true); 
  const [field, setField] = useState("");
  const [stateDistrictsAccordion, setStateDistrictsAccordion] = useState(null);
  const [zipCodeCenter, setZipCodeCenter] = useState([]);
  // const [currentDate, setCurrentDate] = useState();
  // const [districtCenters, setDistrictCenters] = useState([]);

  //we use this to get state names the first time the component mounts
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
          // console.log(incomingData);
        } else {
          console.log("incoming Data is null");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  //what the below useEffect does is: it sets up stateDistrictsAccordion everytime districts gets updated!! so theres no lag!!!
  useEffect(() => {
    let v = districts.map((dist, i) => (
      <Accordion key={i}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            {dist.district_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DistrictCentersDialog d_id={dist.district_id} d_name={dist.district_name}/>
        </AccordionDetails>
      </Accordion>))
      setStateDistrictsAccordion(v)
  }, [districts])

  useEffect(() => {
    let insideData;
    if(districts.length>0){
    insideData = (
    <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Center Id</TableCell>
                  <TableCell>Center Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Min Age Limit</TableCell>
                  <TableCell>Pin Code</TableCell>
                  <TableCell>Fee Type</TableCell>
                  <TableCell>Vaccine</TableCell>
                </TableRow>
              </TableHead>
        {districts.map((center, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{center.center_id}</TableCell>
                <TableCell>{center.name}</TableCell>
                <TableCell>{center.address}</TableCell>
                <TableCell>{center.date}</TableCell>
                <TableCell>{center.min_age_limit}</TableCell>
                <TableCell>{center.pincode}</TableCell>
                <TableCell>{center.fee_type==="Paid"?(center.fee==0 ? "Free": center.fee):center.fee_type}</TableCell>
                <TableCell>{center.vaccine}</TableCell>
              </TableRow>
             ))}
             </Table>
      </TableContainer> )
    }
    else {
      insideData = null
    }
    setZipCodeCenter(insideData)
  }, [districts])

  //use this function to make a proper date string which can be used in the API call functions
 /*  const makeCurrentDate = () => {
    let current = new Date();
    let addOne = current.getMonth() + 1;
    setCurrentDate(
      current.getDate() + "-" + addOne + "-" + current.getFullYear()
    );
  }; */

  //use this function to get district's center's info for the next 7 days, it uses district_id and current date
  /* const getDistrictCenters = (a) => {
    console.log(a);
    makeCurrentDate();
    axios
      .get(
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
          a +
          "&date=" +
          currentDate
      )
      .then((res) => {
        console.log(res.data);
        setDistrictCenters(res.data.sessions)
      });
  }; */

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


  const findSessionByZip = (name) => {
    let current = new Date();
    let addOne = current.getMonth() + 1;
    var c = current.getDate() + "-" + addOne + "-" + current.getFullYear();
    axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+name+"&date="+c).then((res) => {
      let data = res.data.sessions
      setDistricts(data);
    })
  }

  const handleFieldChange = (event) => {
    setField(event.target.value);
    // console.log(field);
  };

  const setSearchFunction = (a) => {
    if (a === "State") {
      checkStateName(name);
      console.log("field is " + a);
    } else if (a === "Zip Code") {
      findSessionByZip(name);
      console.log("field is " + a);
    }
  };

  const getStateName = (e) => {
    let input = e.target.value;
    //the little bit of code here is used to automatically capitalize the first letter
    setName(input.charAt(0).toUpperCase() + input.slice(1));
    // console.log(name)
  };

  const checkStateName = (x) => {
    let temp;
    let match = "";
    //checks each state with the state name entered by the user
    for (let i = 0; i < states.length; i++) {
      if (states[i].state_name === x) {
        match = states[i].state_id;
      }
    }

    if (match !== "") {
      axios
        .get(
          "https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + match
        )
        .then((res) => {
          temp = res.data.districts;
          setDistricts(temp);
          setFoundState(true)
        });
    } else {
      setFoundState(false);
    }
  };

  const makeUrl = () => {
    x = Math.floor(Math.random() * bkgimgs.length);
    y = new URL(bkgimgs[x]);
    divbkg = {
      backgroundImage: "url(" + y + ")",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      minHeight: "120vh",
    };
  };


  const renderLoader = (field) => {
    let tempRender
    switch (field) {
      case "State":
         tempRender = stateDistrictsAccordion
        break;
      case "Zip Code":
        tempRender = zipCodeCenter
        break;
      default:
        tempRender = null
        break;
    }
    return tempRender
  }

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
                  onChange={(e) => handleFieldChange(e)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" disabled>
                    Select
                  </MenuItem>
                  <MenuItem value={"State"}>State</MenuItem>
                  {/* <MenuItem value={"District"}>District</MenuItem> */}
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
                  disabled={field === "" ? true : false}
                  variant="contained"
                  color="primary"
                  //you can't remove the arrow function because the function will run the moment the component loads
                  onClick={() => setSearchFunction(field)}
                >
                  Click Me!
                </Button>
              </span>
            </Tooltip>
            <hr />
            {/* {console.log(stateDistrictsAccordion)} */}
            {renderLoader(field)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetState;
