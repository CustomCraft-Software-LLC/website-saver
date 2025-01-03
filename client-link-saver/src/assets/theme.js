import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF8C00',
    },
    background: {
      default: '#F0F4F8',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212529',
      secondary: '#495057',
    },
    action: {
      hover: '#FFD580',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#003366',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#003366',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#FF8C00',
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      color: '#495057',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#495057',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          backgroundColor: '#003366',
          '&:hover': {
            backgroundColor: '#002244',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#003366',
          color: '#FFFFFF',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
        },
      },
    },
  },
});

export default theme;