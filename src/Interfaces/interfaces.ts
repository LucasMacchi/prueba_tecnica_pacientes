export type TMenuOptions = "login" | "logout" | false 
export type TtypeAlert = "success" | "info" | "error" | "warning"

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export interface IPaciente {
    nombre: string,
    apellido: string,
    dni: number,
    localidad: string,
    nacimiento: string,
    antecedentes: string,
    alergias: string
}

export interface IUser {
    username: string,
    email: string,
    password?: string
}

export interface IUserLogin {
    email: string,
    password: string
}

export interface IPacientesState{
    pacientes: IPaciente[],
    getAllPacients: () => IPaciente[],
    getDeletePacient: (dni: number) => boolean,
    getAddPacient: () => boolean,
    getEditPacient: (dni: number) => void
}

export interface IGlobalState {
    menu: TMenuOptions
    isLogged: boolean,
    user: IUser,
    alert: IAlert,
    setAlert: (status: boolean, msg: string, type: TtypeAlert) => void
    changeMenu: (type: TMenuOptions) => void,
    login: (user: IUserLogin, remember: boolean) => boolean,
    autoLogin: () => void
    logout: () => void
}

export interface IAction{
    type: string,
    payload: any
}

export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
}

export interface IMenuSelection {
    type: "login"
}

export interface IAlert {
    alert_status : boolean,
    alert_msg : string,
    alert_type: TtypeAlert
}