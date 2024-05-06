import React from 'react';
import logo from './logo.svg';
import './App.css';

//Components
import NavBar from './Components/NavBar/NavBar';
import Menu from './Components/Menu/Menu';
import Bottom from './Components/Bottom/Bottom';

//Context
import { useContext } from 'react';
import { GlobalContext } from './Context/Contexts';

export default function App() {

  const global = useContext(GlobalContext)


  return (
    <div className='app'>
      <NavBar/>
      {global?.menu ? <Menu/> : ""}
      
      <div className='bottom'>
        <Bottom/>
      </div>
    </div>
  );
}


