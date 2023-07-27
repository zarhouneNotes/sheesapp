import { Box, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Home/Home'
import { chatIdGen, getUser, timeAgo } from '../../RequMethods'
import { grey, teal } from '@mui/material/colors'
import { Link, useParams } from 'react-router-dom'
import { RxVideo } from 'react-icons/rx'
import {BsReplyFill} from 'react-icons/bs'

function ChatItem({chat  ,  activeChat }) {
  const {auth , socket , isMobile} = useContext(AppContext)
  const friend_id = chat?.members[0] == auth?.username ? chat?.members[1] : chat?.members[0]
  const [friend  , setFriend] = useState()
  const [lastMsg , setLastMsg] = useState(chat?.messages[chat?.messages?.length -1])
  const [focused , setFocused] = useState(false)
  const params = useParams()

  useEffect(()=>{
    socket.current?.on('receive-message' , (message)=>{
      // console.log(message):
      if (chatIdGen(auth?.username ,message.sender) === chat?.chatId ) {
        setLastMsg(message)
      } 
        
    })
    socket.current?.on('send-message' , (data)=>{
      if (chatIdGen(auth?.username ,data?.username) === chat?.chatId ) {
        setLastMsg(data?.message)
       
      } 
       console.log(data)
        
    })

  },[socket])

  useEffect(()=>{
      getUser(friend_id)
      .then((res)=>{
        setFriend(res.user)
      })
      
      return ()=> setFocused(false)
  },[])

  useEffect(()=>{
    
    setFocused( activeChat === chat?.chatId && !isMobile)
  },[activeChat , isMobile])

  
  return lastMsg && (
    <Link  className='link my-1' to={`/inbox/${chat?.chatId}`}>
      <Stack  direction='row' border={ !focused ?  '1px solid white' : '1px solid  skyblue ' } color='darkslategrey' alignItems='center' p={1} bgcolor={!focused  ? grey[100] : 'white'} gap={1} >
                <Box bgcolor={grey} borderRadius='50%'  >
                 <img src={`${process.env.REACT_APP_BASE_URL}/images/${friend?.pdp}`} alt="" srcset="" width='40px' className='carre rounded-circle' />

                </Box>
              <Stack direction='column' justifyContent='space-between' width='100%' >
                  <Stack  direction='row' justifyContent='space-between' alignItems='center' width='100%'  > 
                    <Typography padding={1}  variant='subtitle2' >{friend?.fullname}</Typography>
                    <Typography  color='GrayText'  variant='caption' >{timeAgo(lastMsg?.time)}</Typography>
                  </Stack>
                  <Typography variant='caption' color='GrayText' sx={{fontWeight : lastMsg?.sender === auth?.username ? '' :  '700'}} >{lastMsg?.sender === auth?.username  && <BsReplyFill />}    {lastMsg?.content ||  <RxVideo />  }</Typography>
              </Stack>
      </Stack>
    </Link>
  )
}

export default ChatItem