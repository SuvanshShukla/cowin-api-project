import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InfoIcon from '@material-ui/icons/Info';

export default function AboutDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="purple" onClick={handleClickOpen}>
          <InfoIcon/> &nbsp;
        About
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"About This Website"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          This Website was made as a practice project and not meant to infringe upon any copyright or break any law.
        <br />
        API's used here are from the <a href="https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2#/">API setu</a> webpage. <br />
        All images used in the background are from Unsplash. <br />
        The UI was made with the help of material-ui. <br /> 
        <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
