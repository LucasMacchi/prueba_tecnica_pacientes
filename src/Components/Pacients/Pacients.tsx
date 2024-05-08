

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
    return(
        <div>
            <button onClick={() => edit()}>aca</button>
            <h1>Pacientes</h1>
        </div>
    )
}