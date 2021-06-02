import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
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
  const [currentDate, setCurrentDate] = useState();
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
    var c = current.getDate() + "-" + addOne + "-" + current.getFullYear()
    var url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +dID +"&date=" + c
    console.log(url)
    axios
    .get(
      url
    )
    .then((res) => {
      console.log(res.data);
      let r = res.data.sessions;
      setDistrictCenters(r);
      setFlag(true)
    });
  }

  console.log(flag);
  console.log(districtCenters);
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={() => {handleClickOpen()
      getCentersByDistrict()
    }}>
        Open full-screen dialog
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
            {districtCenters.length>0
            ? districtCenters.map((d, i) => (
                <ListItem>
                    <ListItemText>{d.name}</ListItemText>
                </ListItem>
            )):"nothing to show"}
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
        </List>
      </Dialog>
    </div>
  );
}





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