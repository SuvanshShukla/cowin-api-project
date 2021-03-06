import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import HealingIcon from '@material-ui/icons/Healing';
import GitHubIcon from '@material-ui/icons/GitHub';
import MouseIcon from '@material-ui/icons/Mouse';

/* 

* you need to add an about link on the side-drawer

*/

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  bottomItem: {
    position: 'fixed',
    bottom: '1px',
    width: 250
  },
});

export default function Sidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem>Menu</ListItem>
      <Divider />
      <List>
        {/*  {['Covid Numbers', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{text === "Covid Numbers" ? <DataUsageIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <Button href="https://www.mohfw.gov.in/" target="_blank">
          <ListItemIcon>
            <DataUsageIcon />
          </ListItemIcon>{" "}
          Covid Numbers
        </Button>
        <Button href="https://selfregistration.cowin.gov.in/" target="_blank">
          <ListItemIcon>
            <HealingIcon />
          </ListItemIcon>{" "}
          Register at Cowin
        </Button>
        <Button href="https://www.cowin.gov.in/" target="_blank">
          <ListItemIcon>
            <MouseIcon />
          </ListItemIcon>{" "}
          COWIN Website
        </Button>
      </List>
      <Divider />
      <div className={classes.bottomItem}>
      <Divider />
      <Button color="inherit" href="https://github.com/SuvanshShukla" target="_blank"> <GitHubIcon/> &nbsp; My GitHub</Button>

      </div>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
            
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
