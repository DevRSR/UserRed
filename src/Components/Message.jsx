import { useContext, useRef, useEffect } from 'react';
import { ChatContext } from '../Context/ChatContext';
import { AuthContext } from '../Context/AuthContext';


function Message({ message }) {
  
  const { state } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  /*const ref = useRef();
  
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth"})
  },[message])*/
  
  return (
    <div 
      className={`message  ${ message.senderId === currentUser.uid ? 'owner' : '' }`}>
      <div className='messageInfo'>
       <img src={ message.senderId === currentUser.uid ? currentUser.photoURL : state.user.photoURL } alt='Rsr' />
      </div>
      <div className='messageContent'>
       <p>{ message.text }</p>
       { message.img && <img src={ message.img } alt='Rsr' /> }
      </div>
    </div>
  );
}

export default Message;
