import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useTheme,
} from "@mui/material";
import { GoAlertFill } from "react-icons/go";

const AddMemberPopup = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ padding: 2 }}
      >
        <GoAlertFill style={{ marginTop: 10, marginInline: "auto", fontSize: 50 }} />
        <DialogTitle
          id="alert-dialog-title"
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            justifyContent: "center",
          }}
        >
          Are you sure you want to add this member to your team?
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            style={{
              fontSize: "12px",
              textAlign: 'center'
            }}
            id="alert-dialog-description"
          >
            Confirming this action will grant the member access to team
            resources and responsibilities. Please ensure you have reviewed
            their qualifications and suitability for the role.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: 2 }}>
          <Button
            onClick={onClose}
            variant="text"
            sx={{
              border: 2,
              borderRadius: 2,
              borderColor: theme.palette.neutral.light,
              width: "25%",
              color: theme.palette.neutral.normal,
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              onConfirm(); // Call the confirm handler
              onClose(); // Close the dialog
            }}
            variant="contained"
            sx={{
              border: 2,
              borderRadius: 2,
              borderColor: theme.palette.primary.main,
              width: "75%",
            }}
          >
            Yes I am
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMemberPopup;
