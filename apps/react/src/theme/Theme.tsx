import { createTheme, ThemeProvider } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

const theme = createTheme({
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
        },
      },
    },
  },
});

type Props = PropsWithChildren;
export const AppTheme: FC<Props> = ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;