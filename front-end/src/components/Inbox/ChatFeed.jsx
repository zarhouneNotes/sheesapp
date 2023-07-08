import React, { useContext, useEffect, useRef, useState } from 'react'
import useFetch from './useFetch'
import { AppContext } from '../Home/Home'
import { chatIdGen, getChat, getUser, sendMessage } from '../../RequMethods'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { RiEyeCloseLine } from 'react-icons/ri'
import { grey, teal } from '@mui/material/colors'
import MyMessage from './MyMessage'
import Message from './MyMessage'
import { Form } from 'react-bootstrap'
import ProfileLoad from '../Profile/ProfileLoad'


function ChatFeed({}) {
  const {auth} = useContext(AppContext)
  const {socket} = useContext(AppContext)
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

        const friend_id = res.data?.members[0] == auth?.username ? res.data?.members[1] : res.data?.members[0]
        getUser(friend_id)
        .then((user)=>{
          emptyElement.current?.scrollIntoView({})
          setFriend(user?.user)
        })
        .finally(()=>{
          setLoad(false)
        })
      })
  
    return ()=>{
      controller.abort()
    }
},[params])






///////////// receeieve instant message





function sendHandel (e){ 
  e.preventDefault()
  let message  = {
    isShee  : false, 
    time :Date.now(),
    sender : auth?.username
  
  }
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
   
   //////////::: to socket
  socket.emit('send-message' , {message  , friend_id : friend?.username  })

}

////////// receive msg from socket
useEffect(()=>{
  if (socket) {
    socket.on("receive-message" , (message)=>{
      // console.log(message)
      if(params?.chat_id === chatIdGen(message?.sender , auth?.username)) 
       {setMessages(list =>[...list , message])}
    })
  }

},[socket , chat])

useEffect(()=>{
  emptyElement.current?.scrollIntoView({
 
  })
},[messages])
useEffect(()=>{
  emptyElement.current?.scrollIntoView({
    behavior : 'smooth'
  })
},[])


 
  return load ? <ProfileLoad /> : (
    <Stack  direction='column' className='h-100 col-12 col-md-8 bg-sucess' borderLeft='1px solid teal'>
        <Stack direction='row' color={'white'}  justifyContent='space-between' p={2} bgcolor={teal[500]} alignItems='center' >
          <Stack direction='row' alignItems='center' gap={1} >
            <img src={`${process.env.REACT_APP_BASE_URL}/images/${friend?.pdp}`} alt="" srcset="" width='40px' className='carre rounded-circle' />
            <Stack direction="column" >
            <Typography variant='subtitle2' >{friend?.fullname}</Typography>
            <Typography variant='caption'  >@{friend?.username}</Typography>
            </Stack>

          </Stack>
          <CloseIcon />
        </Stack>
        {/* ////////////////////// */}
        <Box height='85vh'  bgcolor='blueiolet'  overflow='scroll'     >

         {messages?.map((msg)=>{
          return  (msg?.content.length>0 ||msg?.url )  && <Message key={msg?.time} message={msg} authIsTheSender={msg?.sender == auth?.username}  />
         })}

         <div ref={emptyElement}   />




        </Box>

        {/* ////////////// */}
        <Form onSubmit={sendHandel}>
          <Stack m={1} direction='row' bgcolor='white' border='1px solid teal' >
            <input   ref={msgInput}  placeholder='write a message..' className='border-0'  />
            <Button type='submit' variant='' onClick={sendHandel}>Send</Button>
          </Stack>
        </Form>
    </Stack>
  )
}

export default ChatFeed


