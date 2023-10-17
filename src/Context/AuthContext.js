import { createContext,useState,useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '../Firebase';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
    const unsub = onAuthStateChanged(Auth,(user) => {
      setCurrentUser(user)
    })
    return () =>  unsub();
  },[]);
  
  return (
   <AuthContext.Provider value = {{ currentUser }}>
     { children }
   </AuthContext.Provider>
   )
}

export default AuthContextProvider;