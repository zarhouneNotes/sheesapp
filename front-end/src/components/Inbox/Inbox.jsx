import React, { useContext, useEffect, useState } from 'react'
import SideChats from './SideChats'
import ChatFeed from './ChatFeed'
import {Routes , Route} from 'react-router-dom'
import { getChats } from '../../RequMethods'
import { Box } from '@mui/material'
import { AppContext } from '../Home/Home'

function Inbox({ }) {
  const [ chats , setChats]= useState()
  const {auth , socket} = useContext(AppContext)
  useEffect(()=>{
     if (auth) {
      getChats(auth?.username)
      .then((res)=>{
        setChats(res.data) 
      })
     }
  },[auth])

  // useEffect(()=>{
  //   if (socket) {
  //     socket.on("receive-message" , ()=>{
  //       console.log('new msg')
  //     })
  //   }
  
  // },[socket])
  return (
    <Box className='d-md-flex bg-ino col-12 ' height='100vh' >
        
     <SideChats  chats={chats} />
      <Routes>
                <Route  path='/' element={<div>select a friend</div>} />
                <Route  path='/:chat_id' element={<ChatFeed  />} />
        </Routes>
    </Box>
  )
}

export default Inbox


