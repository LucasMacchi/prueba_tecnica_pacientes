import { createTheme } from "@mui/material";
 
const primary = "#001f45"
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: "#EEEEEE"
        },
        background:{
            paper: "#fafafa"
        },
        text:{
            primary: "#212121",
            secondary: "#EEEEE"
            
        }
    },
});

export default theme;