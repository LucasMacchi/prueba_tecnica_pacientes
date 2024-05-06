import { useReducer } from "react";
import { IAction, IGlobalState, IPropsChildren, TMenuOptions } from "../../Interfaces/interfaces";
import { GlobalContext } from "../Contexts";
import actions from "../actions";

//Reducer para cambiar el estado de variables globales
const globalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
    const {payload, type} = action
    switch(type){
        case actions.GLOBAL_MENU:
            return {...state, menu: payload}

        default:
            return state
    }
}

//Estado Global
export default function GlobalState(props: IPropsChildren){
    //Acciones globales
    const changeMenu = (type: TMenuOptions) => {
        console.log("chages")
        dispatch({
            type: actions.GLOBAL_MENU,
            payload: type
        })
    }






    //Estado inicial Global
    const initialState: IGlobalState = {
        menu: false,
        isLogged: true,
        user: {username: "Ricardo", email: ""},
        changeMenu
    }
    const [state, dispatch] = useReducer(globalReducer, initialState)

    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    )

}