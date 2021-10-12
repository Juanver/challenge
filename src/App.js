import React, {useState} from 'react';
import UserContext from './Context/UserContext';
import AppRouter from './Router/App'


const App = () => {

  const [user, setUser]= useState({});

  return ( 
      
      <UserContext.Provider value={{
        user,
        setUser
      }}>

        <AppRouter/>

      </UserContext.Provider>
   );
}
 
export default App;