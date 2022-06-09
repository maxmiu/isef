import { createTheme } from "@mui/material";
import { blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3771FF',
        },
        secondary: {
            main: '#829095',
        },
        error: {
            main: '#FB3640'
        },
        warning: {
            main: '#FFCA3A'
        },
        info: {
            main: blue.A200
        },
        success: {
            main: '#4C9F70',
        }
    },
});

export default theme;