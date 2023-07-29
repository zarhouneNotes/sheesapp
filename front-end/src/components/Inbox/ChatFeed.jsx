import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from './useFetch'
import { AppContext } from '../Home/Home'
import { chatIdGen, getChat, getUser, sendMessage } from '../../RequMethods'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { RiEyeCloseLine } from 'react-icons/ri'
import { grey, teal } from '@mui/material/colors'
import MyMessage from './MyMessage'
import Message from './MyMessage'
import { Form } from 'react-bootstrap'
import ProfileLoad from '../Profile/ProfileLoad'


function ChatFeed({defineActiveChatBox}) {
  const {auth  , socket , isMobile} = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()
  const [chat , setChat] = useState()
  const [messages , setMessages] = useState()
  const [friend  , setFriend] = useState()
  const [load , setLoad] = useState(false)
  const msgInput = useRef('')
  const emptyElement = useRef(null)



useEffect(()=>{
  // setChat([])
    const controller = new AbortController()
    setLoad(true)
      getChat(params?.chat_id)
      .then((res)=>{
        setChat(res.data)
        setMessages(res?.data?.messages)
        defineActiveChatBox(res.data?.chatId)
        
        const friend_id = res.data?.members[0] == auth?.username ?  res.data?.members[1] : res.data?.members[0]
        
        // if(!friend_id) return avigate('/inbox')
        getUser(friend_id)
        .then((user)=>{
          
          setFriend(user?.user)
        })
        .finally(()=>{
          emptyElement.current?.scrollIntoView({})
          setLoad(false)
        })
      })
  
    return ()=>{
      controller.abort()
    }
},[params?.chat_id  ])








function sendHandel (e){ 
      const message  = {
        isShee  : false, 
        time :Date.now(),
        sender : auth?.username
    } 
      e.preventDefault()
    
      message.content = msgInput.current.value
      if (msgInput.current.value.length >0 && msgInput.current.value) {
        setMessages([...messages , message])
        sendMessage(
          chat?.chatId ,
          chat?.members ,
          message
        ).then(()=>{
          msgInput.current.value = ''
        })
      }
      //////////
      socket.current.emit('send-message' , {message , username : friend?.username})

}
///////////// receeieve instant message

useEffect(()=>{
  socket.current?.on('receive-message' , (message)=>{

     setMessages((prev)=>[...prev , message])
    
  })

},[socket])




useEffect(()=>{
  emptyElement.current?.scrollIntoView({
  })
},[messages])




 
  return load ? <ProfileLoad /> : (
    <Stack  height={'100%' } direction='column' className=' col-12 col-lg-8 bg-sucess ' borderLeft='1px solid teal'>
        <Stack direction='row' color={'white'}  justifyContent='space-between' p={ isMobile ? 1 : 2} bgcolor={teal[500]} alignItems='center' >
          <Stack direction='row' alignItems='center' gap={1}  onClick={()=>{navigate(`/user/${friend?.username}`)}}>
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${friend?.pdp}`} alt="" srcset="" width='40px' className='carre rounded-circle' />
            <Stack direction="column" >
            <Typography variant='subtitle2' >{friend?.fullname}</Typography>
            <Typography variant='caption'  >@{friend?.username}</Typography>
            </Stack>

          </Stack>
          <Box onClick={()=>{navigate('/inbox')}} >
           <CloseIcon  />
          </Box>
        </Stack>
        {/* ////////////////////// */}
        <Box  bgcolor='blueiolet' height={'100%'}  overflow='scroll'     >

         {messages?.map((msg)=>{
          return  (msg?.content.length>0 ||msg?.url )  && <Message key={msg?.time} message={msg} authIsTheSender={msg?.sender == auth?.username}  />
         })}

         <div ref={emptyElement}   />




        </Box>

        {/* ////////////// */}
        <Form onSubmit={sendHandel} className='p-1'>
          <Stack  direction='row' bgcolor='white' border='1px solid teal' >
            <input   ref={msgInput}  placeholder='write a message..' className='border-0'  />
            <Button type='submit' variant='' onClick={sendHandel}>Send</Button>
          </Stack>
        </Form>
    </Stack>
  )
}

export default ChatFeed


