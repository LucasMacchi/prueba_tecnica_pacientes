
//Se deberia encriptar el token en un servidor por seguridad, cosa que no puedo hacer en el cliente

//Creamos en el localstore el token
export function setToken (email: string){

    localStorage.setItem('Token', email);

}

//Traemos del localstore el token
export function getToken (){
    return localStorage.getItem('Token');
}

//eliminamos del localstore el token
export function deleteToken () {
    localStorage.removeItem('Token')
}