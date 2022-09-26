import { createTheme, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 50,
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#1363df',
      light: '#47b5ff',
      dark: '#36537e',
    },
    secondary: {
      main: '#06283d',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'visible',
        },
      },
    },

    MuiModal: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },
  },
});

type Props = PropsWithChildren;
export const AppTheme: FC<Props> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
