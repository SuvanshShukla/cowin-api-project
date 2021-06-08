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
  // * make all the functions for the API calls and show all obtained data
  * make a better way of showing district specific data, i.e. change the function and variable for its display 
  
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
  const [districtName, setDistrictName] = useState("");
  const [specificDistrict, setSpecificDistrict] = useState([])
  // const [currentDate, setCurrentDate] = useState();
  // const [districtCenters, setDistrictCenters] = useState([]);

  //we use this to get state names the first time the component mounts

  let current = new Date();
  let addOne = current.getMonth() + 1;
  var variableDate = current.getDate() + "-" + addOne + "-" + current.getFullYear();
  const [districtDate, setDistrictDate] = useState(variableDate);


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
      setFoundState(true)
    }
    else {
      insideData = null
    }
    setZipCodeCenter(insideData)
  }, [districts])


  //the below function is used to load the District specific results view
  useEffect(() => {
    let insideData;
    if(specificDistrict.length>0){
   /*  insideData = (
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
        {specificDistrict.map((center, i) => (
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
      </TableContainer> ) */

 insideData = (
    specificDistrict.map((center, key) => (
  <Accordion key={key}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography>
            Center Name: {center.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table>
            <TableHead>
              <TableCell>Center Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Block Name</TableCell>
              <TableCell>Pincode</TableCell>
              <TableCell>Fee Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Min. Age Limit</TableCell>
              <TableCell>Vaccine</TableCell>
              <TableCell>Slot Timigs</TableCell>
            </TableHead>
            <TableRow>
              <TableCell>{center.name}</TableCell>
              <TableCell>{center.address}</TableCell>
              <TableCell>{center.block_name}</TableCell>
              <TableCell>{center.pincode}</TableCell>
              <TableCell>{center.fee_type==="Paid"?(center.fee==0 ? "Free": center.fee):center.fee_type}</TableCell>
              <TableCell>{center.date}</TableCell>
              <TableCell>{center.min_age_limit}</TableCell>
              <TableCell>{center.vaccine}</TableCell>
              <TableCell>{center.slots.map((slot, i) => (
                <li key={i}>{slot}</li>
              ))}</TableCell>
            </TableRow>
          </Table>
          {/* <DistrictCentersDialog d_id={center.district_id} d_name={center.district_name}/> */}
        </AccordionDetails>
      </Accordion>
        ))
)

      setFoundState(true)
    }
    else {
      insideData = null
    }
    setZipCodeCenter(insideData)
  }, [specificDistrict])


  const findSessionByZip = (name) => {
    let current = new Date();
    let addOne = current.getMonth() + 1;
    var c = current.getDate() + "-" + addOne + "-" + current.getFullYear();
    axios.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+name+"&date="+c).then((res) => {
      let data = res.data.sessions
      setDistricts(data);
    }).catch((err) => {   //.this is how you catch errors
      setFoundState(false)
      console.log(err)
    })
  }


  const handleFieldChange = (event) => {
    setField(event.target.value);
    // console.log(field);
  };

  const setSearchFunction = (a) => {
    if (a === "State (today)") {
      checkStateName(name);
      // console.log("field is " + a);
    } else if (a === "Zip Code (today)") {
      findSessionByZip(name);
      console.log("field is " + a);
    } else if (a === "District (today)"){
      getDistrictByDate();
    }
  };

  const getStateName = (e) => {
    let input = e.target.value;
    //the little bit of code here is used to automatically capitalize the first letter
    setName(input.charAt(0).toUpperCase() + input.slice(1));
    console.log(name)
  };

  const getDistrictName = (e) => {
    let input = e.target.value;
    setDistrictName(input.charAt(0).toUpperCase() + input.slice(1));
    // console.log(districtName);
  };

  const getDistrictDate = (e) => {
    let input = e.target.value;
    let revInput = input.split("-").reverse().join("-")
    setDistrictDate(revInput);
    // console.log(districtDate)
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

  const getDistrictByDate = () => {
    //so this required some thinking...
    //i first loaded all the states as i do upon every refresh
    //then in states i iterated through all the states until a match was found
    //then used it to send a GET request for all the districts in the state
    //after that i filtered all the elements in the array until only the one with the user's district was found
    //then i sent another GET request for all the centers and their info
    let stateMatch, districtMatch, finalURL;

    stateMatch = states.filter(element => element.state_name === name);
    stateMatch = stateMatch[0].state_id

    
    axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + stateMatch).then((res) => {
      let data = res.data.districts;
      console.log(data)
      districtMatch = data.filter(element => element.district_name === districtName);
      if(districtMatch.length==1){
        let a = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="
          let c = "&date="
          let current = new Date();
          let addOne = current.getMonth() + 1;
          let d = current.getDate() + "-" + addOne + "-" + current.getFullYear();
          finalURL = a + districtMatch[0].district_id + c + d
          console.log(finalURL);
          axios.get(finalURL).then((res) => {
            setSpecificDistrict(res.data.sessions);
          })
      } else{
        setFoundState(false)
      }
    })
  };


  const renderLoader = (field) => {
    let tempRender
    switch (field) {
      case "State (today)":
         tempRender = stateDistrictsAccordion
        break;

      case "Zip Code (today)":
        tempRender = zipCodeCenter
        break;

      case "District (today)":
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
                    Select Field of Search
                  </MenuItem>
                  <MenuItem value={"State (today)"}>State (today)</MenuItem>
                  <MenuItem value={"District (today)"}>District (today)</MenuItem>
                  <MenuItem value={"Zip Code (today)"}>Zip Code (today)</MenuItem>
                  <MenuItem value={"District (7 days)"}>District (7 days)</MenuItem>
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
                  label="State" /* {"" + field==="District (today)"? "State" : field + ""} */
                  id="outlined-start-adornment"
                  style={{display: (field === "State (today)" || field === "District (today)" || field==="District (7 days)")? null : "none"}}
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
              &nbsp; &nbsp; &nbsp;
              <Tooltip
                title={"Enter " + field + " to find out more"}
                placement="right"
                arrow
              >
                <TextField
                  label="District"
                  style={{display: (field==="District (today)" || field==="District (7 days)") ? null : "none"}}
                  id="outlined-start-adornment-for-district-name"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  value={districtName}
                  error={!foundState}
                  helperText={!foundState ? "Incorrect Entry" : ""}
                  onChange={(e) => {
                    getDistrictName(e)                  
                  }}
                />
              </Tooltip>
              &nbsp; &nbsp; &nbsp;
              {/* //* textfield for zip code */}
              <Tooltip
                title={"Enter " + field + " to find out more"}
                placement="right"
                arrow
              >
                <TextField
                  label="Zip Code" /* {"" + field==="District (today)"? "State" : field + ""} */
                  id="outlined-start-adornment"
                  style={{display: (field === "Zip Code (today)")? null : "none"}}
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
              &nbsp; &nbsp;
              {/* //*date for district today */}
              {/* <Tooltip
                title={"Enter " + field + " to find out more"}
                placement="right"
                arrow
              >
                <TextField
                  // label="Date"
                  type="date"
                  style={{display: field==="District (today)" ? null : "none"}}
                  id="outlined-start-adornment"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  // value={name}
                  error={!foundState}
                  helperText={!foundState ? "Incorrect Entry" : ""}
                  onChange={(e) => {
                    getDistrictDate(e)
                  }}
                />
              </Tooltip> */}
              <Tooltip
                title={"Enter " + field + " to find out more"}
                placement="right"
                arrow
              >
                <TextField
                  // label="Date"
                  type="date"
                  style={{display: field==="District (7 days)" ? null : "none"}}
                  id="outlined-start-adornment"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  // value={name}
                  error={!foundState}
                  helperText={!foundState ? "Incorrect Entry" : ""}
                  onChange={(e) => {
                    getDistrictDate(e)
                  }}
                />
              </Tooltip>
            </form>
            <br />
            {/* //this is where the buttons start */}
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
            &nbsp;
            <Tooltip
              title={field === "" ? "Please Select Field" : "Click to get Info"}
              arrow
            >
              <span>
                <Button
                  style={{display: specificDistrict.length!=0 || districts.length!=0 ? null : "none"}}
                  variant="contained"
                  color="secondary"
                  //you can't remove the arrow function because the function will run the moment the component loads
                  onClick={() => {
                     setField("")
                     setDistricts([])
                     setName("")
                     setDistrictName("")
                     setSpecificDistrict([])
                    }}
                >
                  Clear
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
