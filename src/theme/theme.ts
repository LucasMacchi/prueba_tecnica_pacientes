import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
 
const primary = red[500]
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: "#EEEEEE"
        },
        background:{
            paper: "#212121"
        },
        text:{
            primary: "#EEEEEE",
            
        }
    },
})

export default theme;