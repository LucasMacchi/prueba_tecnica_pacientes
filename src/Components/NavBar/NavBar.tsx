import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton'
import {useNavigate} from 'react-router-dom';
//Components
import Alerta from '../Others/Alert';

//Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import GroupsIcon from '@mui/icons-material/Groups';

//css
import "./NavBar.css"

import { useContext, useState } from 'react';
import { GlobalContext } from '../../Context/Contexts';

export default function NavBar () {

    const global = useContext(GlobalContext)

    const navigation = useNavigate()

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
                    <Typography sx={{ typography: { sm: 'h4', xs: 'body1' }, display: {sm:"block", xs: "none"} }} >{global.user.username}</Typography>
                    <IconButton onClick={() => logoutBtn()} aria-label='logout'><LogoutIcon color='secondary' fontSize='medium'/></IconButton>
                </Box>
            )
        }
        else{
            return(
                <Box sx={{display: "flex"}}>
                    <Button variant="text" onClick={() => loginBtn()} startIcon={<LoginIcon fontSize='large' color='secondary' />}>{<Typography color='secondary' variant='h6' >INGRESAR</Typography>}</Button>
                </Box>
            )

        }
    }

    //Una vez logeados, podran ir a la seccion de inicio o pacientes.
    const showNavigation = () => {
        if(global?.isLogged){
            return(
                <Box marginLeft={{sm:"50px", xs: "3px"}}>
                    <Button onClick={() => navigation("/home")} sx={{marginRight: {sm:"35px", xs: "5px"}}} color='secondary' variant='text' size='large'>
                        <Typography sx={{ typography: { sm: 'h6', xs: 'body2' } }} gutterBottom>Inicio</Typography>
                    </Button>
                    <Button onClick={() => navigation("/pacients")} color='secondary' variant='text' size='large' endIcon={<GroupsIcon fontSize='large'/>}>
                        <Typography sx={{ typography: { sm: 'h6', xs: 'body2' } }} gutterBottom>Pacientes</Typography>
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
                        <Typography sx={{ typography: { sm: 'h4', xs: 'h6' } }} gutterBottom>ICC</Typography>
                        {showNavigation()}
                    </Box>
                    {profile()}
                </Toolbar>
            </AppBar>
            {alerta()}
            
        </Box>
    )
}