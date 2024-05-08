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

  const global = useContext(GlobalContext)
  const pacientes = useContext(PacienteContext)

  useEffect(() => {
    global?.autoLogin()
    pacientes?.getAllPacients()
  },[])

  useEffect(() => {
    pacientes?.setPagination(pacientes.pacientes)
  },[pacientes?.pacientes])

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
}


