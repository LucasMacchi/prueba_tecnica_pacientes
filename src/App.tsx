import Bottom from './Components/Bottom/Bottom';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import './App.css';

//Components
import NavBar from './Components/NavBar/NavBar';
import Menu from './Components/Menu/Menu';
import HomeNotLog from './Components/Home/HomeNotLog';
import Home from './Components/Home/Home';
import Pacients from './Components/Pacients/Pacients';

//Context
import { useContext, useEffect } from 'react';
import { GlobalContext } from './Context/Contexts';

export default function App() {

  const global = useContext(GlobalContext)

  useEffect(() => {
    global?.autoLogin()
  },[])

  return (
    <div className='app'>
      <NavBar/>
      {global?.menu ? <Menu/> : ""}
      <Routes>
        <Route path="*" element={global?.isLogged ? <Home/> : <HomeNotLog/>}/>
        <Route path="/home" element={global?.isLogged ? <Home/> : <HomeNotLog/>}/>
        <Route path='/pacients' element={global?.isLogged ? <Pacients/> : <HomeNotLog/>}/>
      </Routes>

      <div className='bottom'>
        {global?.isLogged ? <Bottom/> : ""}
      </div>
    </div>
  );
}


