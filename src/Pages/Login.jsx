import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '../Firebase'

function Login() {
  
  const nav = useNavigate();
  const [err, setErr ] = useState(false);
  
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    signInWithEmailAndPassword(Auth,email,password).then(() => {
       nav('/'); 
    })
    .catch(err => setErr(true))
  }
  
  return (
    <div className="formContainer">
     <div className="formWrapper">
       <span className='logo'>Reel-Chat</span>
       <span className='title'>Login</span>
       <form  onSubmit = { (e) => handleSignIn(e) }>
        <input type='text' placeholder='Email'/>
        <input type='password' placeholder='password'/>
        <button >Sign in</button>
        { err && <span>something is wrong</span> }
        <p>if you don't have an account ? <Link to='/register'>Register</Link></p>
       </form>
     </div>
    </div>
  );
}

export default Login;
