export type TMenuOptions = "login" | false 
export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export interface IPaciente {
    nombre: string,
    apellido: string,
    dni: number,
    localidad: string,
    nacimiento: Date,
    antecedentes: string,
    edad: number,
    alergias: string
}

export interface IUser {
    username: string,
    email: string,
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
    isLogged: true | false,
    user: IUser
    changeMenu: (type: TMenuOptions) => void
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