import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'


//Components
import LoginMenu from './Login';
import CheckerMenu from './CheckerMenu';
import AddMenu from './Add';
import DetailsMenu from './Details';

//icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CloseIcon from '@mui/icons-material/Close';


//Context
import { useContext } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';


export default function Menu () {

    const global = useContext(GlobalContext);
    const pacientCon = useContext(PacienteContext);

    //Boton que cierra el menu, pone en 0 el dni para editar
    const closeBtn = () => {
        global?.changeMenu(false);
        pacientCon?.setDniEdit(0);
    };
    //Mostrara el tipo de menu correspondiente
    const typeOfMenu = () => {
        if(global?.menu === "login") return (<LoginMenu/>)
        else if (global?.menu === "logout" || global?.menu === "deletePacient") return (<CheckerMenu/>)
        else if (global?.menu === "addPacient" || global?.menu === "editPacient") return(<AddMenu/>)
        else if( global?.menu === "detailsPacient") return(<DetailsMenu/>)
    };
    //Funcion que devuelve un boleano que cierra o abre el menu
    const menuOpener = () => {
        if(global?.menu) return true
        else return false
    };
    return(
        <Backdrop open={menuOpener()}>
            <Paper>
                <Box display={ 'flex'} justifyContent={"space-between"}>
                    <Box sx={{display: "flex"}}>
                            <LocalHospitalIcon sx={{marginRight: "5px", marginTop: "2px"}}/>
                            <Typography variant='h6' gutterBottom>ICC</Typography>
                    </Box>
                    <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary'/></IconButton>
                </Box>
                <Box width={320} padding={1}>
                    {typeOfMenu()}
                </Box>
            </Paper>
        </Backdrop>
    );
};