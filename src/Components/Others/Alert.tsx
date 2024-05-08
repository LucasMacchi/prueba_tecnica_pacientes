import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar';
import { TtypeAlert } from '../../Interfaces/interfaces';
//Este componente creara una alerta, el mismo podra informar errores, exitos, informacion y advertencias


export default function Alerta() {
    
    const global = useContext(GlobalContext)

    const disableAlert = () => {
        global?.setAlert(false, global?.alert.alert_msg, global?.alert.alert_type)
    }
    return(
        <Snackbar open={global?.alert.alert_status} autoHideDuration={5000} onClose={() => disableAlert()}>
            <Alert variant="filled" severity={global?.alert.alert_type} >{global?.alert.alert_msg}</Alert>
        </Snackbar>

    )
}

