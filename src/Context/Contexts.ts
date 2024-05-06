import { IPacientesState, IGlobalState } from "../Interfaces/interfaces";
import {createContext} from "react"
export const PacienteContext = createContext<IPacientesState | null>(null);
export const GlobalContext = createContext<IGlobalState | null>(null);