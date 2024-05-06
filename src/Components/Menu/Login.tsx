import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typeography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton';

//icons
import LoginIcon from '@mui/icons-material/Login';


//Interfaces
import { IUser, emailRegex } from '../../Interfaces/interfaces';

//Context
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../Context/Contexts';

export default function LoginMenu () {
    
    const global = useContext(GlobalContext)

    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    })
    const [formsError, setError] = useState({
        emailError: false,
        emailMsg: ""
    })

    //ERRORS HANDLERS
    const errorHandlerEmail = () => {
        if(userLogin.email === "") setError({...formsError, emailError: true, emailMsg: "Email incorrecto" || "error"})
        else if(!emailRegex.test(userLogin.email)) setError({...formsError, emailError: true, emailMsg: "Email incorrecto" || "error"})
        else setError({...formsError, emailError: false, emailMsg: ""})
    }

    
    useEffect(errorHandlerEmail,[userLogin.email])

    const handleUser = (prop: string, payload: string) => {
        setUserLogin({
            ...userLogin,
            [prop]: payload
        })
    }

    //Desactivar boton si hay errores
    const disableBtn = () => {
        if(formsError.emailError || !userLogin.password){
            return true
        }
        else return false
    }

    return(
        <Box component={"form"}>
            <Box display={ 'flex'} justifyContent={"space-between"}>
                <Typography sx={{marginLeft: "20px"}} color={"secondary"} variant='h6'>INGRESAR</Typography> 
                
            </Box>
            <Box>
            <Box>
                <Box>
                    <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={"Email"} color="secondary" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)}/>
                </Box>
                <Box sx={{marginTop: 2}}>
                    <TextField type="password" fullWidth id="password" size="small" variant="filled" label={"Contraseña"} color="secondary" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)}/>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                    <Button size="small" color="primary" variant="contained" startIcon={<LoginIcon/>} disabled={disableBtn()}>
                        <Typeography sx={{marginLeft: "20px"}} color={"secondary"} variant='body1'>INGRESAR</Typeography> 
                    </Button>
                </Box>
           </Box> 
            </Box>
        </Box>
    )

}