import { useState, useContext } from 'react';
import { collection, setDoc, doc, serverTimestamp, getDoc, where, query, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../Firebase';

function Search() {
  
  const [ username, setUsername ] = useState(null);
  const [ user, setUser ] = useState(null);
  const [ err, setErr ] = useState(true);
  
  const { currentUser } = useContext(AuthContext);
  
  const handleSearch = () => {
   query(collection(db,'users'), where("displayName", "==", username))
   .then(res => {
     getDoc(res)
    .then(docs => {
       docs.forEach(doc => {
         setUser(doc.data())
       });
     })
   }).catch(err => setErr(true))
 }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  }
  
  const handleClick = () => {
   const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
   
    getDoc(doc(db,'userChats',combinedId))
    .then(res => {
    if(!res.exist()) {
      setDoc(doc(db,'chats',combinedId),{ messages:[] });
      
    updateDoc(doc(db, 'userChats', currentUser.uid),{
      [combinedId + '.userInfo']:{
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      [combinedId+'.date']: serverTimestamp(),
    })
    
    updateDoc(doc(db, 'userChats', user.uid),{
      [combinedId + '.userInfo']:{
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      [combinedId+'.date']: serverTimestamp(),
     })
    } 
    })
    
    setUsername('');
    setUser(null)
  }
  
  return (
    <div className='search'>
     <form onSubmit = { () => handleSubmit }
      className='searchForm'>
      <input type='text' onChange = { (e) => setUsername(e.value) } placeholder='find a user' value={ username } />
     </form>
     
     { user && <div className='userChat' onClick = { handleClick } >
      <img src={ user.photoURL } alt='av'/>
      <div className='userChatInfo'>
       <span>{ user.displayName }</span>
      </div>
     </div> }
     
    </div>
  );
}

export default Search;
