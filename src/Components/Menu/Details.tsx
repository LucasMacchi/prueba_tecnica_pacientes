import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import ageConverter from '../../utils/ageConverter';
import Button from '@mui/material/Button';

//icons
import EditNoteIcon from '@mui/icons-material/EditNote';

import { useContext, useState } from 'react';
import { PacienteContext, GlobalContext } from '../../Context/Contexts';


export default function DetailsMenu() {
    
    const global = useContext(GlobalContext)
    const pacientCon = useContext(PacienteContext)
    const paciente = pacientCon?.pacient_Detail

    const age = () => {
        return ageConverter(paciente?.nacimiento ? paciente.nacimiento : "1/1/2000")
    }

    const editBtn = (dni: number) => {
        pacientCon?.setDniEdit(dni)
        global?.changeMenu("editPacient")
    }
    
    
    return(
        <Box>
            <Box>
                <Typography textAlign="center" variant='h5'>{"Paciente "+paciente?.apellido}</Typography>
            </Box>
            <Divider sx={{backgroundColor: "#fafafa"}}/>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>Nombre Completo</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{paciente?.nombre+" "+paciente?.apellido}</Typography>
            </Box>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>DNI</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{paciente?.dni}</Typography>
            </Box>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>Fecha de Nacimiento</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{paciente?.nacimiento}</Typography>
            </Box>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>Edad</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{age()}</Typography>
            </Box>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>Localidad</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{"Corrientes, "+paciente?.localidad}</Typography>
            </Box>
            <Box marginTop={"10px"}>
                <Typography variant='h6'>Alergias</Typography>
                <Divider sx={{backgroundColor: "#fafafa"}}/>
                <Typography variant='body1'>{paciente?.alergias ? paciente?.alergias : "No tiene alergias."}</Typography>
            </Box>
            <Box display={"flex"} justifyContent={"center"} marginTop={"10px"}>
                <Button onClick={() => paciente ? editBtn(paciente.dni) : ""} variant="contained" endIcon={<EditNoteIcon/>}>Editar</Button>
            </Box>
        </Box>
    )
}