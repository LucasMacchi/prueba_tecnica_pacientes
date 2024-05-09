import Box from '@mui/material/Box';

//Transitions
import Slide from '@mui/material/Slide';

export default function HomeNotLog () {


    return(
        <Box sx={{textAlign: "center"}}>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit >{<img src='/icc_logo_extended.png' alt='icc' className='logo_navbar'/>}</Slide>
        </Box>
    );
};