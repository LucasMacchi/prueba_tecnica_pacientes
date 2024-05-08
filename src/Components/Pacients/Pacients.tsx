

import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';

export default function Pacients () {
    const global = useContext(GlobalContext)
    const pacientCon = useContext(PacienteContext)
    useEffect(() => {
        console.log(pacientCon?.pacientes)
    },[])

    const edit = () => {
        pacientCon?.setDniEdit(40166091)
        global?.changeMenu("editPacient")
    }
    const deletePacient = () => {
        pacientCon?.getDeletePacient(42266143, pacientCon.pacientes)
    }
    return(
        <div>
            <button onClick={() => deletePacient()}>aca</button>
            <h1>Pacientes</h1>
        </div>
    )
}