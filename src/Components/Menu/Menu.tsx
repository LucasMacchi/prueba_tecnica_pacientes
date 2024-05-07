import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'


//Components
import LoginMenu from './Login';
import LogoutMenu from './Logout';

//icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CloseIcon from '@mui/icons-material/Close';


//Context
import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';


export default function Menu () {

    const global = useContext(GlobalContext)


    const closeBtn = () => {
        global?.changeMenu(false)
    }
    //Mostrara el tipo de menu correspondiente
    const typeOfMenu = () => {
        if(global?.menu === "login") return (<LoginMenu/>)
        else if (global?.menu === "logout") return (<LogoutMenu/>)
    }
    //Funcion que devuelve un boleano que cierra o abre el menu
    const menuOpener = () => {
        if(global?.menu) return true
        else return false
    }


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
                <Box width={300} padding={1}>
                    {typeOfMenu()}
                </Box>
            </Paper>
        </Backdrop>
    )

}