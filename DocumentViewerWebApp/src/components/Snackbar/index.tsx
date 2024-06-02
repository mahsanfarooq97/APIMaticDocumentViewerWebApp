import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

// Define the prop types
interface PositionedSnackbarProps {
  message: string | null;
  open: boolean;
  handleClose: () => void;
}

// Define the state type
interface State {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const Toast: React.FC<PositionedSnackbarProps> = ({ message, open, handleClose }) => {
  const [state] = React.useState<State>({
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal } = state;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
}

export default Toast;
