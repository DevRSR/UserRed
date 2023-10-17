import Message from './Message';
import { useState,useEffect,useContext } from 'react';
import { db } from '../Firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../Context/ChatContext';

function Messages() {
  
  const { state } = useContext(ChatContext);
  const [ messages, setMessages ] = useState([]);
  
/*  useEffect(() => {
 
    const unsub = onSnapshot(doc(db,'chats' ,state.chatId),(doc) => {
      doc.exist() && setMessages(doc.data().messages)
    })
    
    return () => {
      unsub();
    }
  },[ state.chatId ])
    */
  return (
    <div className='Messages'>{
      messages.map(message => (
       <Message message = { message } key={ message.id } />
      ))
     }
    </div>
  );
}

export default Messages;