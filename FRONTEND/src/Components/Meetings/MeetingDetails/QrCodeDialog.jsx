import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { QRCode } from 'qrcode.react';

const QRCodeDialog = ({ open, handleClose }) => {
  const qrValue = 'https://example.com'; // Valeur du QR code

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Scan QR code to confirm your presence</DialogTitle>
      <DialogContent>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
          Please scan this QR code to confirm your presence.
        </Typography>
        <div style={{ textAlign: 'center' }}>
          <QRCode value={qrValue} size={256} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRCodeDialog;
