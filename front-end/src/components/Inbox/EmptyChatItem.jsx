import { Badge, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Home/Home'
import { useNavigate } from 'react-router-dom'
import { chatIdGen, getUser } from '../../RequMethods'

function EmptyChatItem({empChat}) {
    const {auth , socket } = useContext(AppContext)
    const [isStillEmpty , setIsStillEmpty] = useState(true)
    const id = empChat?.members[0] === auth?.username ? empChat?.members[1] : empChat?.members[0]
    const  [user , setUser] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        getUser(id)
        .then((res)=>{
            setUser(res.user)
        })
    },[])

    useEffect(()=>{
      socket.current?.on('receive-message' , (message)=>{
        // console.log(message):
        if (chatIdGen(auth?.username ,message.sender) === empChat?.chatId ) {
          setIsStillEmpty(false)
        } 
          
      })
      socket.current?.on('send-message' , (data)=>{
        if (chatIdGen(auth?.username ,data?.username) === empChat?.chatId ) {
          setIsStillEmpty(false)
        } 
          
      })
  
    },[socket])

  return isStillEmpty && (
        <Stack key={empChat?.chatId} direction='column' alignItems='center' sx={{margin :1}} 

                   onClick={async()=>{
                   navigate(`/inbox/${empChat?.chatId}`)
                   }}
                   
                   >
                      <Badge badgeContent={'+'} color='primary' >
                        <img src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} width='50px' alt="" className='carre rounded-circle' srcset="" />
                      </Badge>
                      <Typography variant='caption' className='time'>@{user?.username}</Typography>
                      
         </Stack>
  )
}

export default EmptyChatItem