import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typeography from '@mui/material/Typography'

import { useContext } from 'react';
import { GlobalContext } from '../../Context/Contexts';


export default function LogoutMenu () {

    const global = useContext(GlobalContext)

    const logoutBtn = () => {
        global?.logout()
        document.location.reload()
    }

    return(
        <Box textAlign={"center"} >
            <Typeography marginBottom={"50px"} variant='body1'>¿Estas seguro que quieres salir?</Typeography>
            <Box display={"flex"} justifyContent={"space-evenly"} >
                <Button onClick={() => global?.changeMenu(false)}>No</Button>
                <Button onClick={() => logoutBtn()}>Si</Button>
            </Box>
        </Box>
    )
}