import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';

export const Alert = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity={severity} variant="filled" elevation={6}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};