import { createTheme } from '@mui/material';
import { green, grey, purple } from '@mui/material/colors';

export const darkTheme = createTheme({
    palette: {
      ...{
        primary: green,
        divider: green[200],
        text: {
          secondary: grey[800],
        },
  
      }
      ,
    },
  });
  
  export const lightTheme = createTheme({
    palette: {
      ...{
        primary: purple,
        divider: purple[700],
        text: {
          secondary: grey[500],
        },
      }
      ,
    },
  });