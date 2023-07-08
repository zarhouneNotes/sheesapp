import styled from '@emotion/styled'
import { Box , Stack, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React from 'react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../RequMethods'


function   Message({authIsTheSender , message}) {
  return    (


    <>
    
    <Stack  direction='row'm={1} justifyContent={ authIsTheSender ? 'end' :  'start'}  >
        { authIsTheSender && message?.content?.length>0 &&
        <Stack direction='row-reverse' alignItems='center' gap={1}>
            <MyMessage  direction={'row'} >
             <>{message?.content}</>
            </MyMessage>
            <Typography  variant='caption'  color='grey' > {timeAgo(message?.time)} </Typography> 
        </Stack>
         }

        { !authIsTheSender && message?.content?.length>0 &&
       <Stack direction='row' alignItems='center' gap={1}>
            <OtherMessage direction={'row'} >
                <>{message?.content}</>
            </OtherMessage>
            <Typography variant='caption'  color='grey' > {timeAgo(message?.time)} </Typography> 
        </Stack> }
    </Stack>

    <Stack  direction='row'm={1} justifyContent={ authIsTheSender ? 'end' :  'start'}  >
    { message?.url &&  
            <Stack className=" bg-dar col-2 vid"  direction={authIsTheSender ?  'row-reverse' : 'row' }alignItems='center' gap={1}   >
              <video className='w-100 h-100'  style={{borderRadius :'20px'}} >
                <source src={`${message?.url}`} type='video/mp4' />
              </video>
              <Typography variant='caption'  color='grey' > {timeAgo(message?.time)} </Typography> 
            </Stack>
     
        }
    </Stack>
    </>
  )
  
}

export default Message

const MyMessage = styled(Stack)({
    backgroundColor : 'teal',
    padding : '0.7rem', 
    color :'white',
    borderRadius :'15px',
    borderTopRightRadius :'0'

})
const OtherMessage = styled(Stack)({
    backgroundColor : 'white',
    padding : '0.7rem', 
    color :'teal',
    border : "1px solid" ,
    borderColor :teal[200] ,
    borderRadius :'15px',
    borderTopLeftRadius :'0'

})