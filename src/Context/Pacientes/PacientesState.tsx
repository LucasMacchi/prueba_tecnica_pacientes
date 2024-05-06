import { useReducer } from "react";
import { IPacientesState, IPaciente, IAction, IPropsChildren } from "../../Interfaces/interfaces";
import { PacienteContext } from "../Contexts";
import actions from "../actions";

//Este reducer cambiaria el estado de pacientes
const pacientsReducer = (state: IPacientesState, action: IAction): IPacientesState => {
    const {payload, type} = action
    switch(type){
        case actions.GET_ALL_PACIENTS:
            return state

        default:
            return state
    }
}


//Estado de Pacientes
export default function PacientesState(props: IPropsChildren ) {
    //Acciones del estado de Paciente
    const getAllPacients = (): IPaciente[] => {
        return []
    }
    const getDeletePacient = (dni: number): boolean => {
        return false
    }
    const getAddPacient = (): boolean => {
        return false
    }
    const getEditPacient = (dni: number) => {}

    //Estado Inicial del Estado
    const initialState: IPacientesState = {
        pacientes: [],
        getAllPacients,
        getDeletePacient,
        getAddPacient,
        getEditPacient
    }

    const [state, dispatch] = useReducer(pacientsReducer, initialState)

    return (
        <PacienteContext.Provider value={state}>
            {props.children}
        </PacienteContext.Provider>
    );
}