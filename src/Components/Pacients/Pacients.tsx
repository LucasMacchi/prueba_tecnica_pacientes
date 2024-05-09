import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './Table';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { nameRegex, numbersNoLimitRegex } from '../../Interfaces/interfaces';

import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';

export default function Pacients () {

    const global = useContext(GlobalContext);

    const pacientCon = useContext(PacienteContext);

    const [search, setSearch] = useState("");

    const addBtn = () => {
        global?.changeMenu("addPacient");
    };

    useEffect(() => {
        if(!search) pacientCon?.setPagination(pacientCon.pacientes);
        if(numbersNoLimitRegex.test(search)){
            pacientCon?.filter(pacientCon.pacientes, true, search);
        }
        else if(nameRegex.test(search)) {
            pacientCon?.filter(pacientCon.pacientes, false, search);

        }

    },[search]);
    //Cuando no se encuentran pacientes, se muestra un texto que lo comunica
    const noPacients = () => {
        if(!pacientCon?.paginated_pacients || pacientCon?.paginated_pacients[0].length < 1) return(<Typography sx={{typography: { sm: 'h2', xs: 'body1' }}}>No se han encontrado pacientes.</Typography>);
        else return (<DataTable/>);
    };

    return(
        <Box marginTop={"8px"}>
            <Typography textAlign={"center"} color={"text.primary"} variant='h4'>Buscar Pacientes</Typography>
            <Box display={"flex"} justifyContent={"center"} >
                <Box  padding={2} width={"500px"}>
                    <TextField color='primary' label="Ingrese el nombre o DNI" fullWidth variant="outlined"
                    value={search} onChange={(e) => setSearch(e.target.value)}/>
                </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Button variant="contained" color='primary' onClick={() => addBtn()} endIcon={<AddIcon/>}>Agregar Pacientes</Button>
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Box  maxWidth={{ sm: '800px', xs: '350px' }} marginTop={"10px"} >
                    {noPacients()}
                </Box>

            </Box>
        </Box>

    );
};