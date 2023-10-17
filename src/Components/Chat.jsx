import Messages from './Messages';
import Input from './Input';
import { useContext } from 'react';
import { ChatContext } from '../Context/ChatContext';

function Chat() {
  
  const { state } = useContext( ChatContext );
  
  return (
    <div className="chat">
      <div className='chatInfo'>
       <span>{ state.user.displayName }</span>
       <div className='chatIcon'>
        <img src='' alt='pin' />
        <img src='' alt='add' />
        <img src='' alt='more' />
       </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
