import React, { useContext, useEffect, useState } from 'react'
import SideChats from './SideChats'
import ChatFeed from './ChatFeed'
import {Routes , Route, useParams} from 'react-router-dom'
import { chatIdGen, getChats } from '../../RequMethods'
import { Box } from '@mui/material'
import { AppContext } from '../Home/Home'

function Inbox({ }) {
  const [ chats , setChats]= useState()
  const {auth , isMobile} = useContext(AppContext)
  const [chatBox , setChatBox] = useState()

  function generateChats (id){
    getChats(id)
    .then((res)=>{
      setChats(res.data) 
    })  
  }
  useEffect(()=>{
     if (auth) {
     generateChats(auth?.username)
     }
  },[auth])


const defineActiveChatBox = (chat_id)=>{
    setChatBox(chat_id)
}


  return (
    <Box className='d-md-flex bg-ino col-12 ' height={isMobile ? '94vh' : '100vh' }>
        
             {!isMobile &&   <SideChats  chats={chats} activeChat={chatBox} />}
      <Routes>
                <Route  path='/' element={isMobile ?  <SideChats  chats={chats} activeChat={chatBox} /> : <>pick a friend</>} />
                <Route  path='/:chat_id' element={<ChatFeed  defineActiveChatBox={defineActiveChatBox} />} />
        </Routes>
    </Box>  
  )
}

export default Inbox


