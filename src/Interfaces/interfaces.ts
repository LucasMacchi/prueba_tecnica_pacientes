export type TMenuOptions = "login" | "logout" | "addPacient" | "editPacient" | "deletePacient" | "detailsPacient" | false ;
export type TtypeAlert = "success" | "info" | "error" | "warning";
export type TNavigate = "home" | "pacients";
export type Torder = "asc" | "des";

export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRegex: RegExp= /^[A-Za-z ñ]+$/;
export const numbersRegex: RegExp = /^[0-9]{8}$/;
export const numbersNoLimitRegex: RegExp = /^[0-9]{1,8}$/;
export const daysMonthsRegex: RegExp = /^(?!0)[0-9]{1,2}$/;
export const yearsRegex: RegExp = /^[0-9]{4}$/;

export interface IPaciente {
    nombre: string,
    apellido: string,
    dni: number,
    localidad: string,
    nacimiento: string,
    alergias: string
};
export interface IPacienteCreate {
    nombre: string,
    apellido: string,
    dni: string,
    localidad: string,
    nacimiento: string,
    alergias: string
};

export interface IUser {
    username: string,
    email: string,
    password?: string
};

export interface IUserLogin {
    email: string,
    password: string
};

export interface IPacientesState{
    pacientes: IPaciente[],
    paginated_pacients: Array<IPaciente[]>,
    pacient_edit_dni: number,
    pacient_Detail: IPaciente,
    pacient_order: Torder
    getAllPacients: () => void,
    getDeletePacient: (dni: number, pacientTotal: IPaciente[]) => boolean,
    getAddPacient: (pacient: IPaciente, pacientTotal: IPaciente[]) => boolean,
    getEditPacient: (pacient: IPaciente, pacientTotal: IPaciente[]) => boolean,
    getPacient: (dni: number, pacientTotal: IPaciente[]) => IPaciente | void,
    getPacientDetails: (pacient: IPaciente) => void,
    setDniEdit: (dni: number) => void,
    setPagination: (pacientTotal: IPaciente[]) =>void,
    changeOrder: (order: Torder, pacientTotal: IPaciente[]) => void,
    filter: (pacientTotal: IPaciente[], isNumber: boolean, search: string) => void
};

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
};

export interface IAction{
    type: string,
    payload: any
};

export interface IPropsChildren {
    children: React.ReactNode | JSX.Element | JSX.Element[]
};

export interface IMenuSelection {
    type: "login"
};

export interface IAlert {
    alert_status : boolean,
    alert_msg : string,
    alert_type: TtypeAlert
};