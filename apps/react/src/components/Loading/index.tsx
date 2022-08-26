import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export const Loading: React.FC = () => (
  <div>
    <Backdrop
      sx={{ zIndex: 2 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);

export const LoadingComponent: React.FC = () => (
  <div>
    <CircularProgress color="inherit" />
  </div>
);
