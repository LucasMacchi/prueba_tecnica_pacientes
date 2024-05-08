import { useReducer } from "react";
import { IPacientesState, IPaciente, IAction, IPropsChildren } from "../../Interfaces/interfaces";
import { PacienteContext } from "../Contexts";
import { JsonConverterPacients } from "../../utils/jsonConverter";
import actions from "../actions";

//Este reducer cambiaria el estado de pacientes
const pacientsReducer = (state: IPacientesState, action: IAction): IPacientesState => {
    const {payload, type} = action
    switch(type){
        case actions.GET_ALL_PACIENTS:
            return {...state, pacientes: payload}
        case actions.PACIENT_ADD:
            return {...state, pacientes: payload}
        case actions.DNI_EDIT_PACIENT:
            return {...state, pacient_edit_dni: payload}
        case actions.PACIENT_EDIT:
            return{...state, pacient_edit_dni: 0, pacientes: payload}
        default:
            return state
    }
}


//Estado de Pacientes
export default function PacientesState(props: IPropsChildren ) {
    //Acciones del estado de Paciente

    //Trae todos los pacientes del pacients.json
    const getAllPacients = () => {
        const pacientesArray = JsonConverterPacients()
        dispatch({
            type: actions.GET_ALL_PACIENTS,
            payload: pacientesArray
        })
    }
    //Elimina pacientes
    const getDeletePacient = (dni: number): boolean => {
        return false
    }
    //Añade pacientes
    const getAddPacient = (pacient: IPaciente, pacientTotal: IPaciente[]): boolean => {
        try {
            pacientTotal.push(pacient)
            dispatch({
                type: actions.PACIENT_ADD,
                payload: pacientTotal
            })
            return true
        } catch (error) {
            return false
        }
    }
    //Edita pacientes
    const getEditPacient = (pacient: IPaciente, pacientTotal: IPaciente[]): boolean => {
        try {
            const newArray = pacientTotal.map((p) => {
                if(p.dni === pacient.dni){
                    p = pacient
                }
                return p
            })
            dispatch({
                type: actions.PACIENT_EDIT,
                payload: newArray
            })
            return true
        } catch (error) {
            return false
        }
    }
    //Traer un paciente usando un dni
    const getPacient = (dni: number, pacientTotal: IPaciente[]): IPaciente | void => {
        console.log(pacientTotal)
        const pacient = pacientTotal.filter(p => p.dni === dni)[0]
        if(pacient) return pacient
        
    }
    
    //Esta funcion setea un dni para poder modificar ese paciente
    const setDniEdit = (dni: number) => {
        dispatch({
            type: actions.DNI_EDIT_PACIENT,
            payload: dni
        })
    }

    //Estado Inicial del Estado
    const initialState: IPacientesState = {
        pacientes: [],
        pacient_edit_dni: 0,
        getAllPacients,
        getDeletePacient,
        getAddPacient,
        getEditPacient,
        getPacient,
        setDniEdit
    }

    const [state, dispatch] = useReducer(pacientsReducer, initialState)

    return (
        <PacienteContext.Provider value={state}>
            {props.children}
        </PacienteContext.Provider>
    );
}