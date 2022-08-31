import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

export const Loading: FC = () => (
  <div>
    <Backdrop
      sx={{ zIndex: 2 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  </div>
);

export const LoadingComponent: FC = () => (
  <div>
    <CircularProgress color="inherit" />
  </div>
);
