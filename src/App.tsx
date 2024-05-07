import Bottom from './Components/Bottom/Bottom';

import './App.css';

//Components
import NavBar from './Components/NavBar/NavBar';
import Menu from './Components/Menu/Menu';

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
      
      <div className='alert'>
        
      </div>
      <div className='bottom'>
        {global?.isLogged ? <Bottom/> : ""}
      </div>
    </div>
  );
}


