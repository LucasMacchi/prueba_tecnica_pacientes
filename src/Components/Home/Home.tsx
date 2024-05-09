import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import {useNavigate} from 'react-router-dom';

//icons
import GroupsIcon from '@mui/icons-material/Groups';
import LogoutIcon from '@mui/icons-material/Logout';

//Transitions
import Zoom from '@mui/material/Zoom';


import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';

import "./Home.css";

//Pagina de inicio, se puede o navegar a pacientes o salir de sesion con una "cartas" interactivas

export default function Home () {

    const navigation = useNavigate();

    const global = useContext(GlobalContext);

    //Funcion para salir de sesion
    const logout = () => {
        global?.changeMenu("logout");
    };
    //Funcion para ir a pacientes
    const pacientNav = () => {
        navigation("/pacients");
    };

    return(
        <Box  >
            <Box display={{ sm: 'flex', xs: 'block' }} justifyContent={"center"}>
                <Box marginTop={"40px"} marginLeft={{ sm: '10px', xs: '3px' }} textAlign={{ sm: 'left', xs: 'center' }}>
                    <Typography sx={{typography: { sm: 'h2', xs: 'h6' }}}>{"Bienvenido, "+global?.user.username+"."}</Typography>
                    <Typography sx={{typography: { sm: 'h5', xs: 'caption' }}}>{"Chequee su correo, "+global?.user.email+", para nuevos turnos con sus pacientes y comunicados del hospital."}</Typography>
                    <Box marginTop={{ sm: '100px', xs: '20px' }} display={"flex"} justifyContent={"space-evenly"}>
                        
                        <Zoom in={true} style={{transitionDelay: '200ms'}}>
                            <Card variant="outlined" sx={{maxWidth: { sm: '400px', xs: '220px' }}}>
                                <CardContent>
                                    <Typography sx={{typography: { sm: 'h6', xs: 'body1' }}}>Pacientes <GroupsIcon/> </Typography>
                                    <Divider sx={{backgroundColor: "#fafafa"}}/>
                                    <Typography sx={{typography: { sm: 'body1', xs: 'caption' }}}>
                                        {"Aquí podrá administrar, añadir,\neditar y eliminar los perfiles de sus pacientes. "}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" color='primary' onClick={() => pacientNav()}>Administrar</Button>
                                </CardActions>
                            </Card>
                        </Zoom>


                        <Zoom in={true} style={{transitionDelay: '400ms'}}>
                            <Card variant="outlined" sx={{maxWidth: { sm: '400px', xs: '220px' }, marginLeft: { sm: '30px', xs: '5px' }}}>
                                <CardContent>
                                    <Typography sx={{typography: { sm: 'h6', xs: 'body1' }}}>Cerrar Sesion <LogoutIcon/> </Typography>
                                    <Divider sx={{backgroundColor: "#fafafa"}}/>
                                    <Typography sx={{typography: { sm: 'body1', xs: 'caption' }}}>
                                        {"Si cierra sesión en este dispositvo, deberá ingresar sus datos nuevamente. "}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="outlined" color='primary' onClick={() => logout()}>Cerrar</Button>
                                </CardActions>
                            </Card>
                        </Zoom>

                    </Box>
                </Box>
                <Box></Box>
            </Box> 
        </Box>
    );
};