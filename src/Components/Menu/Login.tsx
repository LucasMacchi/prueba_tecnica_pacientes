import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import {useNavigate} from 'react-router-dom';

//icons
import LoginIcon from '@mui/icons-material/Login';


//Interfaces
import { emailRegex } from '../../Interfaces/interfaces';

//Context
import { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../Context/Contexts';

export default function LoginMenu () {
    
    const global = useContext(GlobalContext)

    const navigation = useNavigate();

    //Cuando se ingresa, aparecera brevemente un circulo de progreso, este estado controla eso
    const [loading, setLoading] = useState(false)

    //Controla cuando se selecciona el "recuerdame"
    const [check, setCheck] = useState(true)

    //Controla los datos del usuario a ingresar
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });
    //Controla los errores que se muestran
    const [formsError, setError] = useState({
        emailError: false,
        emailMsg: "",
        contra: false
    });

    //ERRORS HANDLERS, controla cuando se crean los errores
    const errorHandlerEmail = () => {
        if(userLogin.email === "") setError({...formsError, emailError: true, emailMsg: "Email incorrecto" || "error"})
        else if(!emailRegex.test(userLogin.email)) setError({...formsError, emailError: true, emailMsg: "Email incorrecto" || "error"})
        else setError({...formsError, emailError: false, emailMsg: ""})
    };
    const errorHandlerPassword = () => {
        if(userLogin.password === "") setError({...formsError, contra: true})
        else setError({...formsError, contra: false})
    } 
    //Controla dinamicamente los errores
    useEffect(errorHandlerEmail,[userLogin.email]);

    //Va añadiendo los datos al estado de userlogin
    const handleUser = (prop: string, payload: string) => {
        setUserLogin({
            ...userLogin,
            [prop]: payload
        });
    };

    //boton para hacer login
    const login = () => {
        if(disableBtn()){
            errorHandlerEmail()
            errorHandlerPassword()
        }
        else {
            const result = global?.login(userLogin, check);
            setLoading(true);
            navigation("/home");
            setTimeout(() => {
                setLoading(false);
                if(result){
                    global?.setAlert(true, "HA INGRESADO EXITOSAMENTE", "success");
                    global?.changeMenu(false);
                }
                else {
                    global?.setAlert(true, "ERROR AL INGRESAR, CHEQUEE SUS DATOS", "error");
                    setUserLogin({email: "", password: ""});
                }
            }, 2000);
        }

    };

    //Desactivar boton si hay errores
    const disableBtn = () => {
        if(formsError.emailError || !userLogin.password){
            return true;
        }
        else return false;
    };
    //Cuando se aprete en ingresar, un circulo de carga aparecera
    const loadingBtn = () => {
        if(loading){
            return(
                <CircularProgress/>
            );
        }
        else return(
            <Button onClick={() => login()} size="small" color="primary" variant="contained" startIcon={<LoginIcon/>}>
                <Typography sx={{marginLeft: "20px"}} color={"secondary"} variant='body1'>INGRESAR</Typography> 
            </Button>
        );
    };
    //Cambiar de valor al seleccionar "recuerdame"
    const rememberUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheck(event.target.checked);
    };

    return(
        <Box component={"form"}>
            <Box display={ 'flex'} justifyContent={"space-between"}>
                <Typography sx={{marginLeft: "20px"}} color={"text.primary"} variant='h6'>INGRESAR</Typography> 
            </Box>
            <Divider sx={{backgroundColor: "#fafafa"}}/>
            <Box marginTop={"10px"}>
            <Box>
                <Box>
                    <TextField error={formsError.emailError} helperText={formsError.emailMsg} fullWidth id="email" size="small" variant="filled" label={"Email"} color="primary" value={userLogin.email} onChange={(e) => handleUser("email", e.target.value)}/>
                </Box>
                <Box sx={{marginTop: 2}}>
                    <TextField type="password" fullWidth id="password" error={formsError.contra} size="small" variant="filled" label={"Contraseña"} color="primary" value={userLogin.password} onChange={(e) => handleUser("password", e.target.value)}/>
                </Box>
                <Box display={'flex'}>
                    <FormControlLabel control={<Checkbox checked={check} onChange={(e) => rememberUser(e)}/>} label="Recuerdame"/>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} marginTop={"20px"}>
                    {loadingBtn()}
                </Box>
           </Box> 
            </Box>
        </Box>
    );
};