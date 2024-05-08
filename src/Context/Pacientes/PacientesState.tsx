import { useReducer } from "react";
import { IPacientesState, IPaciente, IAction, IPropsChildren, Torder } from "../../Interfaces/interfaces";
import { PacienteContext } from "../Contexts";
import { JsonConverterPacients } from "../../utils/jsonConverter";
import pacientSort from "../../utils/pacientSort";
import actions from "../actions";

const emptyPacient: IPaciente = {nombre: "", apellido: "", nacimiento: "", localidad:"", alergias: "", dni: 0}
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
        case actions.PACIENT_DELETE:
            return {...state,pacient_edit_dni: 0, pacientes: payload}
        case actions.DETAILS_PACIENT:
            return {...state, pacient_Detail: payload}
        case actions.ORDER_PACIENTS:
            return {...state, pacient_order: payload.order, pacientes: payload.sorted}
        case actions.PAGINATED_PACIENTS:
            return {...state, paginated_pacients: payload}
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
            payload: pacientSort(pacientesArray, state.pacient_order)
        })
    }
    //Elimina pacientes
    const getDeletePacient = (dni: number, pacientTotal: IPaciente[]): boolean => {
        try {
            const newArray = pacientTotal.filter(p => p.dni !== dni)
            
            dispatch({
                type: actions.PACIENT_DELETE,
                payload: pacientSort(newArray, state.pacient_order)
            })
            setPagination(newArray)
            return true
        } catch (error) {
            return false
        }
    }
    //Añade pacientes
    const getAddPacient = (pacient: IPaciente, pacientTotal: IPaciente[]): boolean => {
        try {
            pacientTotal.push(pacient)
            const newArray = pacientSort(pacientTotal, state.pacient_order)
            dispatch({
                type: actions.PACIENT_ADD,
                payload: newArray
            })
            setPagination(newArray)
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

    //Esta funcion setea un dni para poder modificar o eliminar ese paciente
    const setDniEdit = (dni: number) => {
        dispatch({
            type: actions.DNI_EDIT_PACIENT,
            payload: dni
        })
    }

    //Esta funcion consigue todos los datos para mostrar en detalle
    const getPacientDetails = (pacient: IPaciente | false) => {
        if(pacient){
            dispatch({
                type: actions.DETAILS_PACIENT,
                payload: pacient
            })
        }
        else {
            dispatch({
                type: actions.DETAILS_PACIENT,
                payload: emptyPacient
            })
        }
    }

    //Esta funcion dividira el array de pacientes en otros para el paginado
    const setPagination = (pacientTotal: IPaciente[]) => {
        const pacientTotalSorted = pacientSort(pacientTotal, state.pacient_order)
        const number_pacients_array = 4
        let selected_array = 0
        let paginated: Array<IPaciente[]> = [[]]
        for (let index = 0; index < pacientTotalSorted.length; index++) {
            if(paginated[selected_array].length < number_pacients_array) paginated[selected_array].push(pacientTotal[index])
            if(paginated[selected_array].length === number_pacients_array) {
                paginated.push([])
                selected_array++
            }
            
        }
        if(paginated.length > 1 && paginated[paginated.length-1].length < 1) paginated.pop()
        dispatch({
            type: actions.PAGINATED_PACIENTS,
            payload: paginated
        })
    }
    //Cambia el orden alfabetico
    const changeOrder = (order: Torder, pacientTotal: IPaciente[]) => {
        const sorted = pacientSort(pacientTotal, order)
        dispatch({
            type: actions.ORDER_PACIENTS,
            payload: {order, sorted}
        })
        setPagination(state.pacientes)
    }
    //Filtro 
    const filter = (pacientTotal: IPaciente[], isNumber: boolean, search: string) => {
        
        if(isNumber){
            const filteredArray = pacientTotal.filter(p => (p.dni).toString().includes(search))
            if(filteredArray){
                setPagination(filteredArray)
            }
        }
        else{
            const filteredArray = pacientTotal.filter(p => p.apellido.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || p.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            setPagination(filteredArray)
            if(filteredArray){
                setPagination(filteredArray)
            }
        }
    }

    //Estado Inicial del Estado
    const initialState: IPacientesState = {
        pacientes: [],
        pacient_edit_dni: 0,
        pacient_Detail: emptyPacient,
        paginated_pacients: [],
        pacient_order: "des",
        getAllPacients,
        getDeletePacient,
        getAddPacient,
        getEditPacient,
        getPacient,
        setDniEdit,
        getPacientDetails,
        setPagination,
        changeOrder,
        filter
    }

    const [state, dispatch] = useReducer(pacientsReducer, initialState)

    return (
        <PacienteContext.Provider value={state}>
            {props.children}
        </PacienteContext.Provider>
    );
}