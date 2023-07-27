import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import ChatItem from './ChatItem'
import { Badge, Box, Stack, Typography } from '@mui/material'
import { CreateChat, chatIdGen, getChats, getUsers } from '../../RequMethods'
import { AppContext } from '../Home/Home'
import { teal } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'
import EmptyChatItem from './EmptyChatItem'

function SideChats({}) {
  const navigate = useNavigate()
  const [ chats , setChats]= useState()
  const [chatBox , setChatBox] = useState()
  const {auth , socket} = useContext(AppContext)


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


  // useEffect(()=>{
  //   // socket.current?.on('receive-message' , (message)=>{
  //   //   // console.log(message):
  //   //   if (chatIdGen(auth?.username ,message.sender)  ) {
        
  //   //   } 
        
  //   // })
  //   // socket.current?.on('send-message' , (data)=>{
  //   //  const CI = chatIdGen(auth?.username ,data?.username)
  //   //  const lastChat = chats?.find((chat)=>{
  //   //   return chat?.chatId == CI
  //   //  } )
  //   //  console.log(data)
  //   // //  setChats([lastChat , ...chats])
        
  //   // })

  // },[socket])

 

 
  return (
    <Box className='col-12 col-md-5 col-lg-4 bg-warnin ' overflow='scroll'  maxHeight='100vh' >
      <Typography variant='h5' p={1} className='text-1 border-bottom'  >Chats</Typography>
       
    <Stack className='bg-i"fo ' direction='row' alignItems='center' padding={1} overflow="scroll">
      {   chats?.map((empChat)=>{

        
          
          return  (empChat?.messages?.length === 0 ) && <EmptyChatItem empChat={empChat} />
                
                  // </Link>

      })}
      </Stack>

            {/* <hr /> */}
        {chats?.map((chat)=> <ChatItem key={chat?.chatId} activeChat={chatBox} chat={chat} />
        )}
        
    </Box>
  )
}

export default SideChats


// const ChatItem = styled('div')({
//     display : 'flex' ,
      
// })