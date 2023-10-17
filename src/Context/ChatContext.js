import { createContext, useContext,
useReducer } from 'react';
import { AuthContext } from './AuthContext'


export const ChatContext = createContext();


const ChatContextProvider = ({ children }) => {
  
  const { currentUser } = useContext(AuthContext);
  
  const INITIAL_USER = {
   chatId: null,
   user:{}
  } 
   
  const chatReducer = (state,action) => {
    switch (action.type ) {
      case 'CHANGE_USER': 
        return {
          chatId: currentUser.uid > action.payload.user.uid ? currentUser.uid + action.payload.user.uid : action.payload.user.uid + currentUser.uid,
          user: action.payload,
        };
      default: return state;
    }
  }
  
  const [state, dispatch] = useReducer(chatReducer,INITIAL_USER);
  
  return (
   <ChatContext.Provider value = {{ state,dispatch }}>
     { children }
   </ChatContext.Provider>
   )
}

export default ChatContextProvider;