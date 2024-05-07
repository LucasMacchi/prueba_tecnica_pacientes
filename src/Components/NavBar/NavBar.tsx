import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typeography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'

//Components
import Alerta from '../Others/Alert';

//Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import GroupsIcon from '@mui/icons-material/Groups';

//Transitions
import Zoom from '@mui/material/Zoom';
import Slide from '@mui/material/Slide';

//css
import "./NavBar.css"

import { useContext, useState } from 'react';
import { GlobalContext } from '../../Context/Contexts';

export default function NavBar () {

    const global = useContext(GlobalContext)

    const [page, changePage] = useState(0)

    //Buton para logearse a la pagina
    const loginBtn = () => {
        global?.changeMenu("login")
    }

    //Buton para deslogearse de la pagina
    const logoutBtn = () => {
        global?.changeMenu("logout")
    }

    //Crea alerta y en 8 segundos desaparece
    const alerta = () => {
        
        setTimeout(() => {
          global?.setAlert(false, "", "info")
        }, 8000);
        
        if(global?.alert.alert_status) return (<Alerta/>)
      }
    //Esta funcion mostrara o el boton para ingresar o informacion del usuario, dependiendo de si esta logeado o no
    const profile = () => {
        if (global?.isLogged){
            return (
                <Box sx={{display: "flex"}}>
                    <AccountBoxIcon fontSize='large' sx={{marginTop:"2px", display: {sm:"block", xs: "none"}}}/>
                    <Typeography sx={{ typography: { sm: 'h4', xs: 'body1' }, display: {sm:"block", xs: "none"} }} >{global.user.username}</Typeography>
                    <IconButton onClick={() => logoutBtn()} aria-label='logout'><LogoutIcon color='secondary' fontSize='medium'/></IconButton>
                </Box>
            )
        }
        else{
            return(
                <Box sx={{display: "flex"}}>
                    <Button variant="text" onClick={() => loginBtn()} startIcon={<LoginIcon fontSize='large' color='secondary' />}>{<Typeography color='secondary' variant='h6' >INGRESAR</Typeography>}</Button>
                </Box>
            )

        }
    }
    //Si no esta logeado mostrara texto diciendo que es requerido logearse
    const notLog = () => {
        if(!global?.isLogged){
            return(
                <Box sx={{textAlign: "center"}}>
                    <Zoom in={true} style={{transitionDelay: '200ms'}}>{<Typeography sx={{ typography: { sm: 'h2', xs: 'h6' } }}>Usted no ha Ingresado al Sistema.</Typeography>}</Zoom>
                    <Zoom in={true} style={{transitionDelay: '500ms'}}>{<Typeography sx={{ typography: { sm: 'h6', xs: 'body1' } }}>Porfavor, ingrese para ver los pacientes.</Typeography>}</Zoom>
                    <Slide direction="up" in={true} mountOnEnter unmountOnExit >{<img src='/icc_logo_extended.png' alt='icc' className='logo_navbar'/>}</Slide>
                    
                </Box>
            )
        }
    }
    //Una vez logeados, podran ir a la seccion de inicio o pacientes.
    const showNavigation = () => {
        if(global?.isLogged){
            return(
                <Box marginLeft={{sm:"50px", xs: "3px"}}>
                    <Button sx={{marginRight: {sm:"35px", xs: "5px"}}} color='secondary' variant='text' size='large'>
                        <Typeography sx={{ typography: { sm: 'h6', xs: 'body2' } }} gutterBottom>Inicio</Typeography>
                    </Button>
                    <Button color='secondary' variant='text' size='large' endIcon={<GroupsIcon fontSize='large'/>}>
                        <Typeography sx={{ typography: { sm: 'h6', xs: 'body2' } }} gutterBottom>Pacientes</Typeography>
                    </Button>
                </Box>
            )
        }
    }

    return(
        <Box>
            <AppBar position='static' color='primary'>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", textAlign: "center"}}>
                        <LocalHospitalIcon fontSize='large' sx={{marginRight: "5px", marginTop: "2px", display: {sm:"block",xs: "none"}}}/>
                        <Typeography sx={{ typography: { sm: 'h4', xs: 'h6' } }} gutterBottom>ICC</Typeography>
                        {showNavigation()}
                    </Box>
                    {profile()}
                </Toolbar>
            </AppBar>
            {alerta()}
            {notLog()}
            
        </Box>
    )
}