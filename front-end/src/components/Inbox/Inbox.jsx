import React, { useContext, useEffect, useState } from 'react'
import SideChats from './SideChats'
import ChatFeed from './ChatFeed'
import {Routes , Route, useParams} from 'react-router-dom'
import { chatIdGen, getChats } from '../../RequMethods'
import { Box } from '@mui/material'
import { AppContext } from '../Home/Home'

function Inbox({ }) {
  const [empChats  ,setEmpChats] =  useState()
  const {auth , socket,isMobile} = useContext(AppContext)
  const [chatBox , setChatBox] = useState()

 

const defineActiveChatBox = (chat_id)=>{
    setChatBox(chat_id)
}





  return (
    <Box className='d-md-flex bg-ino col-12 bottom-space' height={'100vh' }>
        
             {!isMobile &&   <SideChats  activeChat={chatBox} />}
      <Routes>
                <Route  path='/' element={isMobile ?  <SideChats   activeChat={chatBox} /> : <>pick a friend</>} />
                <Route  path='/:chat_id' element={<ChatFeed  defineActiveChatBox={defineActiveChatBox} />} />
        </Routes>
    </Box>  
  )
}

export default Inbox


