import { useState, useEffect, useContext } from 'react';
import { db, Storage } from '../Firebase';
import { updateDoc, doc, arrayUnion, serverTimestamp, Timestamp } from 'firebase/firestore';
import { ref,uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ChatContext } from '../Context/ChatContext';
import { AuthContext } from '../Context/AuthContext';
import { v4 as uuid } from 'uuid';


function Input() {
  
  const [ text, setText ] = useState('');
  const [ img, setImg ] = useState(null);
  
  const { state } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  
  const handleSend = async (e) => {
    e.preventDefault();
    
    if(img) {
     const detail = await ref(Storage, uuid());
     
     const uploadTask = uploadBytesResumable(detail,img);
     
     uploadTask.on((err) => {
       alert(err.message)
      }, () => { getDownloadURL(uploadTask.onSnapshot.ref).then( async (url) => {
       await updateDoc(doc(db,'chats',state.chatId), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          id: uuid(),
          img: url,
          date: Timestamp.now(),
        })
      })
     })})
      
    } else {
     await updateDoc(doc(db,'chats',state.chatId), {
        messages: arrayUnion({
          text,
          senderId: currentUser.uid,
          id: uuid(),
          date: Timestamp.now(),
        })
      });
     
     await updateDoc(doc(db,'userChats',currentUser.uid),{
       [state.chatId + ".lastMessage"] :{
         text
       },
       [state.chatId + ".date"] : serverTimestamp(),
     });
     
     await updateDoc(doc(db,'userChats',state.user.uid),{
       [state.chatId + ".lastMessage"] :{
         text
       },
       [state.chatId + ".date"] : serverTimestamp(),
     });
    }
    setText('');
    setImg(null);
  }
  
  return (
    <div className='input'>
     <input type='text' onChange = { (e) => setText(e.target.value )}  placeholder='Type something' value = { text } />
     <div className='send'>
      <img src='' alt='add' />
     <input type='file' style={{display:'none'}} id='like' onChange = { e => { setImg(e.target.value) }} />
      <label htmlFor='like'>
       <img src='' alt='pin' />
      </label>
      <button onClick = { (e) => handleSend(e) } >Send</button>
     </div>
    </div>
  );
}

export default Input;
