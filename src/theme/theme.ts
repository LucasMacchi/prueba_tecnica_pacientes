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
            paper: "#35374B"
        },
        text:{
            primary: "#EEEEEE",
            
        }
    },
    typography: {
        
    }
})

export default theme;