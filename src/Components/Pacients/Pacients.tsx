import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './Table';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import { red } from "@mui/material/colors";
import { nameRegex, numbersNoLimitRegex } from '../../Interfaces/interfaces';

import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';

export default function Pacients () {

    const global = useContext(GlobalContext);

    const pacientCon = useContext(PacienteContext);

    const [search, setSearch] = useState("");

    const tableColor = red[500];

    const fabStyle = {
        position: 'absolute',
        bottom: 16,
        right: 16,
    };


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
        <Box>
            <Typography textAlign={"center"} style={{backgroundColor: tableColor}} color={"secondary"} variant='h4'>Buscar Pacientes</Typography>
            <Box display={"flex"} justifyContent={"center"} style={{backgroundColor: tableColor}}>
                <Box  padding={2} width={"500px"}>
                    <TextField color='secondary' label="Ingrese el nombre o DNI" fullWidth variant="outlined"
                    value={search} onChange={(e) => setSearch(e.target.value)}/>
                </Box>
            </Box>

            <Box display={"flex"} justifyContent={"center"}>
                <Box  maxWidth={{ sm: '800px', xs: '350px' }} marginTop={"10px"} >
                    {noPacients()}
                </Box>
                <Fab sx={fabStyle} onClick={() => addBtn()} color='primary' variant='extended'>
                    <AddIcon/>
                    Agregar Paciente
                </Fab>
            </Box>
        </Box>

    );
};