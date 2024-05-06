import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton'


//Components
import LoginMenu from './Login';

//icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CloseIcon from '@mui/icons-material/Close';


//Context
import { useContext, useState } from 'react';
import { GlobalContext } from '../../Context/Contexts';


export default function Menu () {

    const global = useContext(GlobalContext)


    const closeBtn = () => {global?.changeMenu(false)}


    return(
        <Backdrop open={global?.menu ? true : false}>
            <Paper>
                <Box display={ 'flex'} justifyContent={"space-between"}>
                    <Box sx={{display: "flex"}}>
                            <LocalHospitalIcon sx={{marginRight: "5px", marginTop: "2px"}}/>
                            <Typography variant='h6' gutterBottom>ICC</Typography>
                    </Box>
                    <IconButton onClick={() => closeBtn()} aria-label='close'><CloseIcon color='primary'/></IconButton>
                </Box>
                <Box width={350} padding={4}>
                    <LoginMenu/>
                </Box>
            </Paper>
        </Backdrop>
    )

}