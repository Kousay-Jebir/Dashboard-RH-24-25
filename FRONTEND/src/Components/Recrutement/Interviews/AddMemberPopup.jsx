import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const AddMemberPopup = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // Add member logic here
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Member
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <WarningIcon sx={{m:2 , marginInline:"auto"}} />
        <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center' }}>
          Are you sure you want to add this member to your team?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirming this action will grant the member access to team resources and responsibilities. Please ensure you have reviewed their qualifications and suitability for the role.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
          <Button onClick={handleConfirm} color="warning" variant="contained">
            Yes I am
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMemberPopup;
