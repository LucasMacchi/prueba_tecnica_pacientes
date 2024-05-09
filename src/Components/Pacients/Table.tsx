import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableSortLabel from '@mui/material/TableSortLabel';

//Iconos
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoIcon from '@mui/icons-material/Info';
import Pagination from '@mui/material/Pagination';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

//Color
import { red, orange } from "@mui/material/colors";
 
//Contexto y interfaces
import { IPaciente } from '../../Interfaces/interfaces';
import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';
import { Paper } from '@mui/material';

export default function DataTable () {

    const global = useContext(GlobalContext);
    const pacientCon = useContext(PacienteContext);

    //Este estado maneja el paginado
    const [page, setPage] = useState(1);

    const tableColor = red[500];
    const allergyColor = orange[900];

    //Si un paciente tiene una alergia, le cambia el color
    const checkAllergy = (pacient: IPaciente): boolean => {
        if(pacient.alergias) return true
        else return false
    };
    //Este boton se encarga de abrir el menu para editar
    const editBtn = (dni: number) => {
        pacientCon?.setDniEdit(dni);
        global?.changeMenu("editPacient");
    };
    //Este boton se encarga de eliminar el paciente
    const deleteBtn = (dni: number) => {
        pacientCon?.setDniEdit(dni);
        global?.changeMenu("deletePacient");
    };
    //Este boton se encarga de abrir el menu ver los detalles
    const detailsBtn = (paciente: IPaciente) => {
        pacientCon?.getPacientDetails(paciente);
        global?.changeMenu("detailsPacient");
    };

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    //Esto se encarga de movernos una pagina anterior si la pagina actual se elimina
    useEffect(() => {
        if(!pacientCon?.paginated_pacients[page-1]) setPage(page-1);
    },[pacientCon?.paginated_pacients]);

    const orderIcon = () => {
        if(pacientCon?.pacient_order ==="asc") return "asc"
        else return "desc"
    };

    const changeOrd = () => {
        if(pacientCon?.pacient_order ==="asc") pacientCon.changeOrder("des", pacientCon.pacientes)
        else pacientCon?.changeOrder("asc", pacientCon.pacientes);
    };

    return(
        <Box>
            <TableContainer component={Paper} sx={{height: { sm: '500px', xs: '280px' }}} style={{backgroundColor: tableColor}}>
                <Table size='medium' sx={{ maxWidth: "1000px" }} padding={window.screen.width < 500 ? "none" : "normal"} aria-label="pacient-table" >
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={orderIcon()} align='left' sx={{display: { sm: 'flex', xs: 'block' }}}>
                                <Typography sx={{ typography: { sm: 'h6', xs: 'caption' } }}>Nombre</Typography>
                                <TableSortLabel color='secondary' direction={orderIcon()} onClick={() => changeOrd()} active={true}/>

                                </TableCell>
                            <TableCell align='left' ><Typography sx={{ typography: { sm: 'h6', xs: 'caption' } }}>Fecha de Nacimiento</Typography></TableCell>
                            <TableCell align='left'><Typography sx={{ typography: { sm: 'h6', xs: 'caption' } }}>DNI</Typography></TableCell>
                            <TableCell align='left'><Typography sx={{ typography: { sm: 'h6', xs: 'caption' } }}>Acciones</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{height: { sm: '350px', xs: '160px' }}}>
                        {pacientCon?.paginated_pacients[page-1]?.map((p) => (
                            <TableRow style={{backgroundColor: checkAllergy(p) ? allergyColor : tableColor}} key={p.dni}>
                                <TableCell><Typography sx={{ typography: { sm: 'body1', xs: 'caption' } }}>{p.apellido+", "+p.nombre}</Typography></TableCell>
                                <TableCell><Typography sx={{ typography: { sm: 'body1', xs: 'caption' } }}>{p.nacimiento}</Typography></TableCell>
                                <TableCell><Typography sx={{ typography: { sm: 'body1', xs: 'caption' } }}>{p.dni}</Typography></TableCell>
                                <TableCell>
                                    <Box display={'flex'}>
                                        <IconButton onClick={() => detailsBtn(p)}><InfoIcon/></IconButton>
                                        <IconButton onClick={() => editBtn(p.dni)}><EditNoteIcon/></IconButton>
                                        <IconButton onClick={() => deleteBtn(p.dni)}><DeleteIcon/></IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                            
                        ))}
                    </TableBody>
                </Table>
                <Box display={"flex"} justifyContent={"center"} >
                    <Pagination size='large' color='secondary' count={pacientCon?.paginated_pacients.length} 
                    page={page} onChange={(e, v) => changePage(e, v)}/>
                </Box>
            </TableContainer>    

                 
        </Box>


    );
};