import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Sidebar from "../Sidebar/Sidebar";
import AboutDialog from "../AboutDialog/AboutDialog";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


  function Navbar(){
    const classes = useStyles();
    const sidebar = <Sidebar/> 

  return (
    <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              {/* Note that i'm using a different component for the sidebar here but i've put it inside the IconButton tag thats why the icon is still the one for the menu */}
              {sidebar}
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Vaccine Check
            </Typography>
          <AboutDialog/>
          </Toolbar>
        </AppBar>
    </div>
  );
};

export default Navbar;
