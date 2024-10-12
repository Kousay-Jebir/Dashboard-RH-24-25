import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const SnackBar = ({ open, message, onClose, severity }) => {
    const iconMapping = {
        success: <CheckIcon sx={{ color: 'success.text' }} />,
        error: <ErrorIcon sx={{ color: 'error.text' }} />,
        info: <InfoIcon sx={{ color: 'info.text' }} />,
        warning: <WarningIcon sx={{ color: 'warning.text' }} />,
      };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ backgroundColor: 'success.main', color: 'success.text' }} iconMapping={iconMapping}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
