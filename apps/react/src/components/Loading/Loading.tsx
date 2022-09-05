import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

import styles from './Loading.module.css';

interface Props {

  /** Set whether loading is backdrop and center or not. */
  readonly isBackdropLoading?: boolean;
}

export const Loading: FC<Props> = ({ isBackdropLoading = true }) => {
  const LoadingComponent = <CircularProgress color="inherit" />;
  if (!isBackdropLoading) {
    return <div className={styles['loading']}>{LoadingComponent}</div>;
  }
  return (
    <Backdrop
      sx={{ zIndex: 2 /** ZIndex 1 is being used for header. */ }}
      open={true}
    >
      {LoadingComponent}
    </Backdrop>
  );
};
