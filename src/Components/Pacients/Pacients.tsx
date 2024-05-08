import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './Table';
import Typography from '@mui/material/Typography'



import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';

export default function Pacients () {
    const global = useContext(GlobalContext)
    const pacientCon = useContext(PacienteContext)

    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };

    const addBtn = () => {
        global?.changeMenu("addPacient")
    }
    
    const noPacients = () => {
        if(!pacientCon?.paginated_pacients || pacientCon?.paginated_pacients[0].length < 1) return(<Typography sx={{typography: { sm: 'h2', xs: 'body1' }}}>No tienes pacientes.</Typography>)
        else return (<DataTable/>)
    }

    return(
        <Box display={"flex"} justifyContent={"center"}>
            <Box display={"flex"} justifyContent={"center"} maxWidth={{ sm: '800px', xs: '350px' }} marginTop={"20px"} >
                {noPacients()}
            </Box>
            <Fab sx={fabStyle} onClick={() => addBtn()} color='primary'>
                <AddIcon/>
            </Fab>
        </Box>
    )
}