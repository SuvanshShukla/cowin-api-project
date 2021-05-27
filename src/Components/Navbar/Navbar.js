import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Sidebar from "../Sidebar/Sidebar";


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
              <Sidebar/> 
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cowin Check
            </Typography>
            <Button color="inherit" href="https://github.com/SuvanshShukla" target="_blank">My GitHub</Button>
          </Toolbar>
        </AppBar>
    </div>
  );
};

export default Navbar;
