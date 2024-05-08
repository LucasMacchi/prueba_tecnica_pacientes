import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

//icons
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';

//Transitions
import Zoom from '@mui/material/Zoom';


import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';

import "./Home.css"

export default function Home () {

    const navigation = useNavigate()

    const global = useContext(GlobalContext)

    const logout = () => {
        global?.changeMenu("logout")
    }
    const pacientNav = () => {
        navigation("/pacients")
    }

    return(
        <Box  >
            <Box display={{ sm: 'flex', xs: 'block' }}>
                <Box marginTop={"40px"} marginLeft={"20px"} textAlign={{ sm: 'left', xs: 'center' }}>
                    <img src='/Hospital.jpg' alt='hopital_img' className='home_img'/>
                </Box>
                <Box marginTop={"40px"} marginLeft={{ sm: '10px', xs: '3px' }} textAlign={{ sm: 'left', xs: 'center' }}>
                    <Typography sx={{typography: { sm: 'h2', xs: 'h6' }}}>{"Bienvenido "+global?.user.username}</Typography>
                    <Typography sx={{typography: { sm: 'body1', xs: 'caption' }}}>{"Chequee su correo, "+global?.user.email+", para nuevos turnos con sus pacientes y comunicados del hospital."}</Typography>
                    <Box marginTop={{ sm: '100px', xs: '20px' }} display={"flex"} justifyContent={"space-evenly"}>
                        
                        <Zoom in={true} style={{transitionDelay: '200ms'}}>
                            <Card sx={{maxWidth: "220px"}}>
                                <CardContent>
                                    <Typography sx={{typography: { sm: 'h6', xs: 'body1' }}}>Pacientes <GroupsIcon/> </Typography>
                                    <Divider/>
                                    <Typography sx={{typography: { sm: 'body1', xs: 'caption' }}}>
                                        {"Aqui podras administrar tus pacientes como añadir nuevos,\neditar los existentes y eliminarlos. "}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" color='secondary' onClick={() => pacientNav()}>Administrar</Button>
                                </CardActions>
                            </Card>
                        </Zoom>


                        <Zoom in={true} style={{transitionDelay: '400ms'}}>
                            <Card sx={{maxWidth: "220px", marginLeft: { sm: '30px', xs: '5px' }}}>
                                <CardContent>
                                    <Typography sx={{typography: { sm: 'h6', xs: 'body1' }}}>Cerrar Sesion <LogoutIcon/> </Typography>
                                    <Divider/>
                                    <Typography sx={{typography: { sm: 'body1', xs: 'caption' }}}>
                                        {"Cerrar la sesion en este dispositivo, tendra que ingresar sus datos devuelta. "}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" color='secondary' onClick={() => logout()}>Cerrar</Button>
                                </CardActions>
                            </Card>
                        </Zoom>

                    </Box>
                </Box>
            </Box> 
        </Box>
    )
}