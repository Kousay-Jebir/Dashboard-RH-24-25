import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

const QRCodeDialog = ({ open, handleClose }) => {
  const qrValue = "https://example.com"; // Valeur du QR code

  const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontSize: "14px" , color: theme.palette.text.main }} align="center">
        Scan QR code to confirm your presence
      </DialogTitle>
      <DialogContent>
        <div style={{ textAlign: "center" }}>
          <QRCodeSVG value={qrValue} size={250} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            width: "100%",
            mb: 2,
            color: theme.palette.neutral.normal,
            borderColor: theme.palette.neutral.light,
            "&:hover": {
              backgroundColor: theme.palette.neutral.light,
              borderColor: theme.palette.neutral.light,
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRCodeDialog;
