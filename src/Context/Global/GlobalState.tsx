import { useReducer } from "react";
import { IAction, IGlobalState, IPropsChildren, TMenuOptions, IUser, IUserLogin, TtypeAlert, IAlert } from "../../Interfaces/interfaces";
import { GlobalContext } from "../Contexts";
import { JsonConverterUsers } from "../../utils/jsonConverter";
import { setToken, deleteToken, getToken } from "../../utils/tokenManager";
import actions from "../actions";

//Reducer para cambiar el estado de variables globales
const globalReducer = (state: IGlobalState, action: IAction): IGlobalState => {
    const {payload, type} = action
    switch(type){
        case actions.GLOBAL_MENU:
            return {...state, menu: payload}
        case actions.GLOBAL_ALERT:
            return {...state, alert: payload}
        case actions.GLOBAL_LOGIN:
            return {...state, isLogged: true, user: {username: payload.username, email: payload.email}}
        case actions.GLOBAL_LOGOUT:
            return {...state, isLogged: payload}
        default:
            return state
    }
}

//Estado Global
export default function GlobalState(props: IPropsChildren){
    //Acciones globales
    const changeMenu = (type: TMenuOptions) => {
        dispatch({
            type: actions.GLOBAL_MENU,
            payload: type
        })
    }

    //Esta funcion se encargara del login, si no encuentra un usuario que coincida devolvera falso
    // LA CONTRASEÑA DEBERIA ESTAR ENCRIPTADA SI SE USA UN SERVIDOR!!
    const login =  (userToLog: IUserLogin, remember: boolean): boolean => {
        console.log("USER EMAIL = ", userToLog.email + " | USER PASSWORD = ",userToLog.password)
        const userArray: IUser[] = JsonConverterUsers()
        let user: IUser = {username: "", email: ""}
        userArray.forEach(u => {
            if(u.email === userToLog.email && u.password === userToLog.password) user = {username: u.username, email: u.email}
        });

        if(user){
            const logUser: IUser = {username: user.username, email: user.email}
            dispatch({
                type: actions.GLOBAL_LOGIN,
                payload: logUser
            })
            if(remember){
                setToken(logUser.email)
            }
            return true
        }
        else return false
    }

    //Esta funcion detectara el token guardado en localstore, y con esa informacion logeara al usuario automaticamente
    const autoLogin = () => {
        const token = getToken()
        if(token){
            const users = JsonConverterUsers()
            users.forEach(u => {
                if(u.email === token){
                    dispatch({
                        type: actions.GLOBAL_LOGIN,
                        payload: {username: u.username, email: u.email}
                    })
                }
            });
        }
    }

    //Funcion para salir de la cuenta
    const logout = () => {
        deleteToken()
        dispatch({
            type: actions.GLOBAL_LOGOUT,
            payload: false
        })
    }

    //Funcion crea una alerta
    const setAlert = (status: boolean, msg: string, type: TtypeAlert): void => {
        const alert: IAlert = {
            alert_status: status,
            alert_msg: msg,
            alert_type: type
        }
        
        dispatch({
            type: actions.GLOBAL_ALERT,
            payload: alert
        })
    }


    //Estado inicial Global
    const initialState: IGlobalState = {
        menu: false,
        isLogged: false,
        alert: {alert_status: false, alert_msg: "", alert_type: "info"},
        user: {username: "", email: ""},
        changeMenu,
        login,
        logout,
        setAlert,
        autoLogin
    }
    const [state, dispatch] = useReducer(globalReducer, initialState)

    return(
        <GlobalContext.Provider value={state}>
            {props.children}
        </GlobalContext.Provider>
    )

}