import { IPaciente, IUser } from "../Interfaces/interfaces"
import users from "../mocks/cuentas.json"
import pacients from "../mocks/pacientes.json"

//Esta funcion servira para convertir los archivos JSON en datos utilizables

export function JsonConverterUsers (): IUser[]{
    const doctors: IUser[] = users.cuentas
    return doctors
}

export function JsonConverterPacients (): IPaciente[]{
    const pacientes: IPaciente[] = pacients.pacientes
    return pacientes
}
