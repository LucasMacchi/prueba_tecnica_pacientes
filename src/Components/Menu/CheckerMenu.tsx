import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typeography from '@mui/material/Typography'

import { TtypeAlert } from '../../Interfaces/interfaces';
import { useContext } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';


export default function CheckerMenu () {

    const global = useContext(GlobalContext);
    const pacientCon = useContext(PacienteContext);

    //Esta funcion generara una alerta dependiendo de la situacion
    const alertFn = (type: TtypeAlert, msg: string) => {
        global?.setAlert(true, msg, type);
    };

    //Este componente se encarga de doble preguntar para realizar una accion
    const accionBtn = () => {
        if(global?.menu === "logout") {
            global?.logout();
            document.location.reload();
        }
        else if(global?.menu === "deletePacient") {
            const result = pacientCon?.getDeletePacient(pacientCon.pacient_edit_dni, pacientCon.pacientes);
            if(result) {
                alertFn("success","Paciente eliminado exitosamente");
                global.changeMenu(false);
            }
            else {
                alertFn("error","Error al eliminar paciente")
                global.changeMenu(false)
            };
        };

    }
    //En caso de seleccionar no para eliminar el paciente, se deja en 0 el dni a editar y se cierra el menu
    const noBtn = () => {
        global?.changeMenu(false)
        if(global?.menu === "deletePacient") {
            pacientCon?.setDniEdit(0);
        };
    };

    const titleChanger = () => {
        if(global?.menu === "logout") return "¿Estas seguro que quieres salir?";
        else if(global?.menu === "deletePacient") return "¿Estas seguro que quieres eliminar el Paciente?";
        else return "No especify";
    };

    return(
        <Box textAlign={"center"} >
            <Typeography marginBottom={"50px"} variant='body1'>{titleChanger()}</Typeography>
            <Box display={"flex"} justifyContent={"space-evenly"} >
                <Button variant='outlined' onClick={() => noBtn()}>No</Button>
                <Button variant='outlined' onClick={() => accionBtn()}>Si</Button>
            </Box>
        </Box>
    );
};