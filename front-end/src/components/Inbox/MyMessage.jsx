import styled from '@emotion/styled'
import { Box , Stack, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getShee, timeAgo } from '../../RequMethods'


function   Message({authIsTheSender , message}) {
    const [shee , setShee] = useState()
    const [load , setLoad] = useState(true)
  useEffect(()=>{
    if(message?.url && message?.url?.length >0 ){
      getShee(message?.url)
      .then((res)=>{
        setShee(res.shee)
        // console.log(shee.url)
      })
      .finally(()=>{
        setLoad(false)
      })
  }},[])
  var post = shee
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

    <Stack  direction='row'm={1} justifyContent={ authIsTheSender ? 'end' :  'start'} className='bg-ino' >
    { message?.url &&  
           
            <Stack className=" bg-dar col-12  bg-warnng "  direction={authIsTheSender ?  'row-reverse' : 'row' }alignItems='center'   gap={1}  
             >
              {load ?  <>loadin..</>  :
               <Link className='link col-3 col-md-2 ' state={post} to={'/'}>
               <video className='w-100 h-100'  style={{borderRadius :'20px'}} >
                 <source src={`${shee?.url}`} type='video/mp4' />
               </video>
               </Link>}
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


const SheeDetails = styled(Box)({
  display : 'flex',
  flexDirection : 'column',
  justifyContent : 'space-between',
  position :'absolute' ,
  width :'100%',
  height :'100%'
})
