import styled from '@emotion/styled'
import React, { useContext, useEffect, useState } from 'react'
import ChatItem from './ChatItem'
import { Badge, Box, Stack, Typography } from '@mui/material'
import { CreateChat, chatIdGen, getUsers } from '../../RequMethods'
import { AppContext } from '../Home/Home'
import { teal } from '@mui/material/colors'
import { Link, useNavigate } from 'react-router-dom'

function SideChats({chats , activeChat}) {
  const navigate = useNavigate()
  const [users , setUsers] = useState()
  const {auth} = useContext(AppContext)
  useEffect(()=>{
      getUsers()
      .then((res)=>{
        setUsers(res.users)
      })
  },[])
  

 
  return (
    <Box className='col-12 col-md-4 bg-warnin ' overflow='scroll'  maxHeight='100vh' >
      <Typography variant='h5' p={1} className='text-1 border-bottom'  >Chats</Typography>
    {chats?.some((chat)=> chat.messages?.length === 0 ) 
    &&     
    <Stack className='bg-i"fo ' direction='row' alignItems='center' padding={1} overflow="scroll">
      {   users?.map((user)=>{

        const conv = chats?.find((chat)=>  chat.chatId === chatIdGen(auth?.username , user?.username) )
          
          return  user.username !== auth?.username
                  && conv?.messages.length ===0 
                             
      
                  &&
                
                   <Stack key={user?.username} direction='column' alignItems='center' sx={{margin :1}} 

                   onClick={async()=>{
                   navigate(`/inbox/${chatIdGen(auth?.username , user?.username) }`)
                   }}
                   
                   >
                      <Badge badgeContent={'+'} color='primary' >
                        <img src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} width='50px' alt="" className='carre rounded-circle' srcset="" />
                      </Badge>
                      <Typography variant='caption' className='time'>@{user?.username}</Typography>
                      
                  </Stack>
                
                  // </Link>

      })}
      </Stack>}

            {/* <hr /> */}
        {chats?.map((chat)=> chat?.messages?.length >0 && <ChatItem key={chat?.chatId} activeChat={activeChat} chat={chat} />
        )}
        
    </Box>
  )
}

export default SideChats


// const ChatItem = styled('div')({
//     display : 'flex' ,
      
// })