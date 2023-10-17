import { signOut } from 'firebase/auth';
import { Auth } from '../Firebase';

function NavBar() {
  
  const handleClick = () => {
    signOut(Auth)
  }
  
  return (
    <div className='navbar'>
      <span className='logo'>Reel-Chat</span>
      <div>
       <img src='' alt="av" />
       <p>name</p>
       <button onClick= { handleClick } >log out</button>
      </div>
    </div>
  );
}

export default NavBar;
