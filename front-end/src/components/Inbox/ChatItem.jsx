import { Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Home/Home'
import { getUser, timeAgo } from '../../RequMethods'
import { grey } from '@mui/material/colors'
import { Link } from 'react-router-dom'
import { BsYoutube } from 'react-icons/bs'

function ChatItem({chat}) {
  const {auth} = useContext(AppContext)
  const friend_id = chat?.members[0] == auth?.username ? chat?.members[1] : chat?.members[0]
  const [friend  , setFriend] = useState()
  useEffect(()=>{
      getUser(friend_id)
      .then((res)=>{
        setFriend(res.user)
      })
  },[])
  
  return (
    <Link className='link' to={`/inbox/${chat?.chatId}`}>
      <Stack  direction='row' borderBottom='1px solid white' color='darkslategrey' alignItems='center' p={1} bgcolor={grey[100/2]} gap={1}>
              <img src={`${process.env.REACT_APP_BASE_URL}/images/${friend?.pdp}`} alt="" srcset="" width='40px' className='carre rounded-circle' />
              <Stack direction='column' justifyContent='space-between' width='100%' >
                  <Stack   direction='row' justifyContent='space-between' alignItems='center' width='100%'  > 
                    <Typography variant='subtitle2' >{friend?.fullname}</Typography>
                    <Typography padding={1} color='GrayText'  variant='caption' >{timeAgo(chat?.messages[chat?.messages?.length-1]?.time)}</Typography>
                  </Stack>
                  <Typography variant='caption' color='GrayText' >{chat?.messages[chat?.messages?.length-1]?.content ||  <BsYoutube />  }</Typography>
              </Stack>
      </Stack>
    </Link>
  )
}

export default ChatItem