import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import LinearProgress from '@material-ui/core/LinearProgress';
import List from "@material-ui/core/List";
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DistrictCentersDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dID] = useState(props.d_id);
  // const [currentDate, setCurrentDate] = useState();
  const [districtCenters, setDistrictCenters] = useState([]);
  const [flag, setFlag] = useState(false);
  // const [currentdate, setCurrentDate] = useState();

  // console.log("dID is ")
  // console.log(dID)
  // dID.current = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  /* const makeCurrentDate = () => {
    let current = new Date();
    let addOne = current.getMonth() + 1;
    var c = current.getDate() + "-" + addOne + "-" + current.getFullYear()
    setCurrentDate(c);
    console.log(current.getDate() + "-" + addOne + "-" + current.getFullYear())
    console.log(currentDate);
  }; */

  const getCentersByDistrict = () => {
    let current = new Date();
    let addOne = current.getMonth() + 1;
    var c = current.getDate() + "-" + addOne + "-" + current.getFullYear();
    var url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
      dID +
      "&date=" +
      c;
    console.log(url);
    axios.get(url).then((res) => {
      console.log(res.data);
      let r = res.data.sessions;
      setDistrictCenters(r);
      setFlag(true);
    });
  };

  console.log(flag);
  console.log(districtCenters);
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          handleClickOpen();
          getCentersByDistrict();
        }}
      >
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {props.d_name}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => window.print()}>
              save
            </Button>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <List>
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
              {districtCenters.length > 0
                ? districtCenters.map((center, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{center.center_id}</TableCell>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.address}</TableCell>
                      <TableCell>{center.date}</TableCell>
                      <TableCell>{center.min_age_limit}</TableCell>
                      <TableCell>{center.pincode}</TableCell>
                      <TableCell>{center.fee_type}</TableCell>
                      <TableCell>{center.vaccine}</TableCell>
                    </TableRow>
                  ))
                : <LinearProgress style={{width: "100%"}}/>}
            </Table>
          </TableContainer>
          
          {/* <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider /> */}
        </List>
      </Dialog>
    </div>
  );
}



/* {center.slots.map((slot, i) => (
  <ul>
    <li>{slot}</li>
  </ul>
))} */



/* <TableCell>
                        <div style={{height: '50px', overflowX: 'auto'}}>
                          <Button variant="contained" onClick={handleTimingOpenClose}>Timings</Button>
                              {center.slots.map((slot, i) =>(
                                <MenuItem onClick={handleTimingOpenClose}>{slot}</MenuItem>
                              ))}
                        </div>
                      </TableCell>
 */




// {/* <Accordion key={i} onChange={() =>
//     getDistrictCenters(dist.district_id)
//   }>
//     <AccordionSummary
//       expandIcon={<ExpandMoreIcon />}
//       aria-controls="panel1a-content"
//       id="panel1a-header"

//     >
//       <Typography /* className={classes.heading} */>
//         {dist.district_name}
//       </Typography>
//     </AccordionSummary>
//     <AccordionDetails>
//       <Typography>
//           <TableContainer>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Center Id</TableCell>
//                 <TableCell>Center Name</TableCell>
//                 <TableCell>Address</TableCell>
//                 <TableCell>Date</TableCell>
//                 <TableCell>Min Age Limit</TableCell>
//                 <TableCell>Pin Code</TableCell>
//                 <TableCell>Fee Type</TableCell>
//                 <TableCell>Vaccine</TableCell>
//                 <TableCell>Sessions</TableCell>
//               </TableRow>
//             </TableHead>
//        {districtCenters.length>0 ? districtCenters.map((center, i) => (
//          <TableRow key={i}>
//            <TableCell>{center.center_id}</TableCell>
//            <TableCell>{center.name}</TableCell>
//            <TableCell>{center.address}</TableCell>
//            <TableCell>{center.date}</TableCell>
//            <TableCell>{center.min_age_limit}</TableCell>
//            <TableCell>{center.pincode}</TableCell>
//            <TableCell>{center.fee_type}</TableCell>
//            <TableCell>{center.vaccine}</TableCell>
//            {/* <TableCell>{center.sessions[i]}</TableCell> */}
//          </TableRow>
//          )): "No Sessions Available"}
//           </TableContainer>
//       </Typography>
//     </AccordionDetails>
//   </Accordion> */}
