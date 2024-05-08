import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
 
const primary = red[500]
const paper = red[100]
const theme = createTheme({
    palette: {
        primary: {
            main: primary
        },
        secondary: {
            main: "#EEEEEE"
        },
        background:{
            paper: "#35374B"
        },
        text:{
            primary: "#EEEEEE",
            
        }
    },
})

export default theme;