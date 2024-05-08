import Bottom from './Components/Bottom/Bottom';
import { Route, Routes} from "react-router-dom"

import './App.css';

//Components
import NavBar from './Components/NavBar/NavBar';
import Menu from './Components/Menu/Menu';
import HomeNotLog from './Components/Home/HomeNotLog';
import Home from './Components/Home/Home';
import Pacients from './Components/Pacients/Pacients';
import Alerta from './Components/Others/Alert';

//Context
import { useContext, useEffect } from 'react';
import { GlobalContext, PacienteContext } from './Context/Contexts';

export default function App() {

  const global = useContext(GlobalContext);
  const pacientes = useContext(PacienteContext);

  //Al entrar a la pagina, se chequea el localstore por si ya se estaba logeado
  //Y se obtiene los pacientes del JSON
  useEffect(() => {
    global?.autoLogin();
    pacientes?.getAllPacients();
  },[]);
  //Cada vez que cambia el array de pacientes, se hace un nuevo paginado
  
  useEffect(() => {
    pacientes?.setPagination(pacientes.pacientes);
  },[pacientes?.pacientes]);

  return (
    <div className='app'>
      <NavBar/>
      <Routes>
        <Route path="*" element={global?.isLogged ? <Home/> : <HomeNotLog/>}/>
        <Route path="/home" element={global?.isLogged ? <Home/> : <HomeNotLog/>}/>
        <Route path='/pacients' element={global?.isLogged ? <Pacients/> : <HomeNotLog/>}/>
      </Routes>
      
      <div className='bottom'>
        {global?.isLogged ? <Bottom/> : ""}
      </div>
      {global?.menu ? <Menu/> : ""}
      <Alerta/>
    </div>
  );
};


