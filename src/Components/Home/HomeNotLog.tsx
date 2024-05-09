import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

//Transitions
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';

//Si no esta logeado mostrara texto diciendo que es requerido logearse

export default function HomeNotLog () {


    return(
        <Box sx={{textAlign: "center"}}>
            <Zoom in={true} style={{transitionDelay: '200ms'}}>{<Typography sx={{ typography: { sm: 'h2', xs: 'h6' } }}>Usted no ha Ingresado al Sistema.</Typography>}</Zoom>
            <Zoom in={true} style={{transitionDelay: '500ms'}}>{<Typography sx={{ typography: { sm: 'h6', xs: 'body1' } }}>Por favor, ingrese para ver los pacientes.</Typography>}</Zoom>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit >{<img src='/icc_logo_extended.png' alt='icc' className='logo_navbar'/>}</Slide>
        </Box>
    );
};