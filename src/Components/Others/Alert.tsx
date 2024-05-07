import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';
import Box from '@mui/material/Box'

//Este componente creara una alerta, el mismo podra informar errores, exitos, informacion y advertencias


export default function Alerta() {
    
    const global = useContext(GlobalContext)
    return(
        <Box>
            <Alert variant="filled" severity={global?.alert.alert_type} >{global?.alert.alert_msg}</Alert>
        </Box>

    )
}

