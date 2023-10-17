import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import './style.scss';
import { AuthContext } from './Context/AuthContext'

function App() {
  
  const { currentUser } = useContext(AuthContext);
  
  
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/'>
       <Route index element={ !currentUser ? <Navigate to='login' /> : <Home />
         } />
       <Route path='login' element={ <Login  /> } />
       <Route path='register' element={ <Register  /> } />
      </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
