import { IPaciente, Torder } from "../Interfaces/interfaces";

//Funcion que sirve para ordenar lo pacientes de forma ascendente o descendente
export default function pacientSort (pacients: IPaciente[], order: Torder): IPaciente[] {

    //SE ORDENA POR APELLIDO

    if(order === "des"){
        pacients.sort((a, b) => {
            if(a.apellido > b.apellido) return 1;
            if(a.apellido < b.apellido) return -1;
            return 0;
        });
        return pacients
    }
    else if(order === "asc"){
        pacients.sort((a, b) => {
            if(a.apellido > b.apellido) return -1;
            if(a.apellido < b.apellido) return 1;
            return 0;
        });
        return pacients
    }
    else return pacients


};