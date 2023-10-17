import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore'
import { Auth,Storage,db } from '../Firebase'

function Register() {
  
  const [err,setErr] = useState(false)
  const nav = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const img = e.target[3].files[0];
    
    createUserWithEmailAndPassword(Auth,email,password).then(res => {
      const storageRef = ref(Storage,name);
      const uploadTask = uploadBytesResumable(storageRef,img);
      
      uploadTask.on((err) => { 
        setErr(true)},() => {
        getDownloadURL(uploadTask.snapshot.ref).then( async (url) => {
          await updateProfile(res.user,{
            displayName: name,
            photoURL: url
          })
          await setDoc(doc(db,'users',res.user.uid),{
            uid: res.user.uid, 
            displayName: name,
            email,
            photoURL: url
          })
          await setDoc(doc(db,'userChats',res.user.uid),{})
        })
     })
      
     nav('/login')
    })
    .catch(err => setErr(true))
  }
  
  return (
    <div className="formContainer">
     <div className="formWrapper">
       <span className='logo'>Reel-Chat</span>
       <span className='title'>Register</span>
       <form onSubmit = { handleSubmit }>
        <input type='text' placeholder='Display name'/>
        <input type='text' placeholder='Email'/>
        <input type='password' placeholder='password'/>
        <input style={{display:'none'}} type='file' id='file' />
        <label htmlFor='file' > 
         <div>+</div>
         <p>Add an avatar</p>
        </label> 
        <button>Sign up</button>
        {err ? <span>something is wrong</span>: ''}
        <p>if already have an account ? <Link to = '/login'> Login </Link></p>
       </form>
     </div>
    </div>
  );
}

export default Register;
