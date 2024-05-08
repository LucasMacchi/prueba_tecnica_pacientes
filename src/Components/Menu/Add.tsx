import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { IPaciente, IPacienteCreate, nameRegex, numbersRegex, daysMonthsRegex, yearsRegex, TtypeAlert } from '../../Interfaces/interfaces';

//Context
import { useContext, useState, useEffect } from 'react';
import { GlobalContext, PacienteContext } from '../../Context/Contexts';

export default function AddMenu () {

    const global = useContext(GlobalContext)
    const pacientCon = useContext(PacienteContext)


    
    const [loading, setLoading] = useState(false)
    const [pacient, setPacient] = useState<IPacienteCreate>({
        nombre: "",
        apellido: "",
        dni: "",
        localidad: "",
        nacimiento: "",
        alergias: ""
    })

    const [date, setDate] = useState({
        day: "1",
        month: "1",
        year: "2000"
    })

    //Esta funcion se llamara solo si se necesita editar un paciente, tendra la logica para cargar los datos
    const pacientToEdit = (pacient: IPaciente) => {
        
        setPacient({
            nombre: pacient.nombre,
            apellido: pacient.apellido,
            dni: (pacient.dni).toString(),
            localidad: pacient.localidad,
            nacimiento: pacient.nacimiento,
            alergias: pacient.alergias
        })
        const dates = pacient.nacimiento.split("/")
        setDate({
            day: dates[0],
            month: dates[1],
            year: dates[2]
        })
    }
    //Si se quiere editar un paciente, se va a cargar los datos del mismo
    useEffect(() => {
        if(global?.menu === "editPacient"){
            const pacientEdit = pacientCon?.getPacient(pacientCon.pacient_edit_dni, pacientCon.pacientes)
            if(pacientEdit) pacientToEdit(pacientEdit)
        }
    },[global?.menu])



    const [formsError, setError] = useState({
        name: false,
        nameMsg: "",
        surname: false,
        surnameMsg: "",
        dni: false,
        dniMsg:"",
        localidad: false,
        localidadMsg: "",
        alergias: false,
        alergiasMsg: "",
        day: false,
        dayMsg: "",
        month: false,
        monthMsg: "",
        year: false,
        yearMsg: ""
    })

    //Errors handlers
    const errorHandlerName = () => {
        if(pacient.nombre === "") setError({...formsError, name: true, nameMsg: "Ingrese un nombre"})
        else if(!nameRegex.test(pacient.nombre)) setError({...formsError, name: true, nameMsg: "Solo letras son permitidas"})
        else setError({...formsError, name: false, nameMsg: ""})
    }
    const errorHandlerSurname = () => {
        if(pacient.nombre === "") setError({...formsError, surname: true, surnameMsg: "Ingrese un Apellido"})
        else if(!nameRegex.test(pacient.apellido)) setError({...formsError, surname: true, surnameMsg: "Solo letras son permitidas"})
        else setError({...formsError, surname: false, surnameMsg: ""})
    }
    const errorHandlerDni = () => {
        if(pacient.dni === "") setError({...formsError, dni: true, dniMsg: "Ingrese un DNI"})
        else if(!numbersRegex.test(pacient.dni)) setError({...formsError, dni: true, dniMsg: "Solo numeros son permitidos, 8 digitos"})
        else setError({...formsError, dni: false, dniMsg: ""})
    }
    const errorHandlerLocalidad = () => {
        if(pacient.localidad === "") setError({...formsError, localidad: true, localidadMsg: "Ingrese una Localidad"})
        else setError({...formsError, localidad: false, localidadMsg: ""})
    }
    const errorHandlerAlergias = () => {
        if(pacient.alergias === "") setError({...formsError, alergias: true, alergiasMsg: "Puede ingresar una alergia"})
        else setError({...formsError, alergias: false, alergiasMsg: ""})
    }
    const errorHandlerDays = () => {
        if(date.day === "") setError({...formsError, day: true, dayMsg: "Ingrese un dia"})
        else if(!daysMonthsRegex.test(date.day)) setError({...formsError, day: true, dayMsg: "Ingrese un dia valido"})
        else if(parseInt(date.day) > 31 || parseInt(date.day) < 1) setError({...formsError, day: true, dayMsg: "Ingrese un dia valido"})
        else setError({...formsError, day: false, dayMsg: ""})
    }
    const errorHandlerMonths = () => {
        if(date.month === "") setError({...formsError, month: true, monthMsg: "Ingrese un mes"})
        else if(!daysMonthsRegex.test(date.month)) setError({...formsError, month: true, monthMsg: "Ingrese un mes valido"})
        else if(parseInt(date.month) > 12 || parseInt(date.month) < 1) setError({...formsError, month: true, monthMsg: "Ingrese un mes valido"})
        else setError({...formsError, month: false, monthMsg: ""})
    }
    const errorHandlerYears = () => {
        if(date.year === "") setError({...formsError, year: true, yearMsg: "Ingrese un año"})
        else if(!yearsRegex.test(date.year)) setError({...formsError, year: true, yearMsg: "Ingrese un año valido"})
        else setError({...formsError, year: false, yearMsg: ""})
    }
    useEffect(() => {
        errorHandlerName();
        errorHandlerSurname();
        errorHandlerDni();
        errorHandlerLocalidad();
        errorHandlerAlergias();
        errorHandlerDays();
        errorHandlerMonths();
        errorHandlerYears();
    },[]);
    useEffect(errorHandlerName,[pacient.nombre])
    useEffect(errorHandlerSurname,[pacient.apellido])
    useEffect(errorHandlerDni,[pacient.dni])
    useEffect(errorHandlerLocalidad,[pacient.localidad])
    useEffect(errorHandlerAlergias,[pacient.alergias])
    useEffect(errorHandlerDays,[date.day])
    useEffect(errorHandlerMonths,[date.month])
    useEffect(errorHandlerYears,[date.year])


    //Va añadiendo los datos al estado de paciente
    const handlePacient = (prop: string, payload: string) => {
        setPacient({
            ...pacient,
            [prop]: payload
        })
    }
    //Va añadiendo los datos al estado de date
    const handleDate = (prop: string, payload: string) => {
        setDate({
            ...date,
            [prop]: payload
        })
    }
    //Esta funcion generara una alerta dependiendo de la situacion
    const alertFn = (type: TtypeAlert, msg: string) => {
        global?.setAlert(true, msg, type)
    }

    const createPacient = () => {
        const newPacient: IPaciente = {
            nombre: pacient.nombre,
            apellido: pacient.apellido,
            dni: parseInt(pacient.dni),
            localidad: pacient.localidad,
            nacimiento: date.day+"/"+date.month+"/"+date.year,
            alergias: pacient.alergias
        }
        if(global?.menu === "addPacient"){
            const result = pacientCon?.getAddPacient(newPacient, pacientCon.pacientes)
            if(result) alertFn("success", "Paciente creado exitosamente")
            else alertFn("error", "Error al crear paciente")
        }
        else {
            const result = pacientCon?.getEditPacient(newPacient, pacientCon.pacientes)
            if(result) alertFn("success", "Paciente editado exitosamente")
            else alertFn("error", "Error al editar paciente")
        }
        
        setPacient({
            nombre: "",
            apellido: "",
            dni: "",
            localidad: "",
            nacimiento: "",
            alergias: ""
        })
        setDate({
            day: "1",
            month: "1",
            year: "2000"
        })
        global?.changeMenu(false)

    }

    const disableBtn = (): boolean => {
        if(formsError.day || formsError.month || formsError.year || formsError.name 
            || formsError.surname || formsError.dni || formsError.localidad
            || !pacient.nombre || !pacient.apellido || !pacient.dni || !pacient.localidad
            || !date.day || !date.month || !date.year) return true
        else return false
    }

    const exitMenu = () => {
        global?.changeMenu(false)
        pacientCon?.setDniEdit(0)
    }
    //INTENTAR AGREGAR DIVIDER DESPUES
    return (
        <Box component={"form"}>
            <Box display={ 'flex'} justifyContent={"space-between"}>
                <Typography sx={{marginLeft: "20px"}} color={"secondary"} variant='h6'>{global?.menu === "editPacient" ? "Editar Paciente" : "Añadir Nuevo Paciente"}</Typography> 
            </Box>
            <Divider sx={{backgroundColor: "#fafafa"}}/>
            <Box>
                <Box display={'flex'} marginTop={"10px"}>
                    <TextField required={true} error={formsError.name} helperText={formsError.nameMsg} fullWidth id="nombre" size="small" 
                    variant="filled" label={"Nombre/s"} color="secondary" value={pacient.nombre} onChange={(e) => handlePacient("nombre", e.target.value)}/>
                    <TextField required={true} error={formsError.surname} helperText={formsError.surnameMsg} fullWidth id="apellido" size="small" 
                    variant="filled" label={"Apellido/s"} color="secondary" value={pacient.apellido} onChange={(e) => handlePacient("apellido", e.target.value)}/>
                </Box>
                <Box marginTop={"10px"}>
                    <TextField required={true} error={formsError.dni} helperText={formsError.dniMsg} fullWidth id="dni" size="small" 
                    variant="filled" label={"DNI/CUIT"} color="secondary" value={pacient.dni} onChange={(e) => handlePacient("dni", e.target.value)}/>
                </Box>
                <Typography marginTop={"10px"} variant='body2'>Fecha de Nacimiento</Typography>
                <Box marginTop={"10px"} display={"flex"}>
                    <TextField required={true} error={formsError.day} helperText={formsError.dayMsg} fullWidth id="day" size="small" 
                    variant="filled" label={"Dia"} color="secondary" value={date.day} onChange={(e) => handleDate("day", e.target.value)}/>
                    <TextField required={true} error={formsError.month} helperText={formsError.monthMsg} fullWidth id="month" size="small" 
                    variant="filled" label={"Mes"} color="secondary" value={date.month} onChange={(e) => handleDate("month", e.target.value)}/>
                    <TextField required={true} error={formsError.year} helperText={formsError.yearMsg} fullWidth id="year" size="small" 
                    variant="filled" label={"Año"} color="secondary" value={date.year} onChange={(e) => handleDate("year", e.target.value)}/>
                </Box>
                <Box marginTop={"10px"}> 
                    <TextField required={true} error={formsError.localidad} helperText={formsError.localidadMsg} fullWidth id="localidad" size="small" 
                    variant="filled" label={"Localidad"} color="secondary" value={pacient.localidad} onChange={(e) => handlePacient("localidad", e.target.value)}/>
                </Box>
                <Box marginTop={"10px"}>
                    <TextField error={formsError.alergias} helperText={formsError.alergiasMsg} fullWidth id="alergias" size="small" 
                    variant="filled" label={"Alergias"} color="secondary" value={pacient.alergias} onChange={(e) => handlePacient("alergias", e.target.value)}/>
                </Box>
                <Box display={"flex"} justifyContent={"space-evenly"} marginTop={"50px"}>
                    <Button color="primary" variant="contained" onClick={() => exitMenu()}>CANCELAR</Button>
                    <Button disabled={disableBtn()} color="primary" variant="contained" onClick={() => createPacient()}>{global?.menu === "editPacient" ? "EDITAR" : "CREAR"}</Button>
                </Box>
            </Box>
        </Box>
    )
}