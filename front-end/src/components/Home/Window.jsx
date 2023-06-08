import React, { useEffect, useState } from 'react'
import Shee from './Shee'
import { videos } from '../../Videos'
import Navbar from './Navbar'
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SheeLoad from './SheeLoad'
import { getShee, getUser } from '../../RequMethods'
import { useMediaQuery } from '@mui/material'


function Window({shees }) {

  const isMobile = useMediaQuery('(max-width: 900px)')
  const params = useParams()
  const  an_id = Object.values(params)[0]
  const [mute , setMute] = useState(false)

  /////// location
  const location = useLocation()
  const clickedPost = location.state 
  const filtred_list =  shees?.filter((post)=>{
    return post?.id !== clickedPost?.id
  })
 
  const videos = !clickedPost? shees :   [clickedPost, ...filtred_list ]



  


  return  (
   <div className='  col-12 col-lg-4 col-md-8 mx-auto'>
{/* {false &&      <div  className=' fw-bold shee-logo text-2 text-center bg-dark  fs-5  d-flex align-items-center justify-content-center ' > Shees!</div>
}     <div  style={{width}}  /> */}
     <div className={`shees-fed bg-dange `}    >
        {shees?.length ==  0 ? 
        <div className="text-center text-secondary">
          no shees found
        </div>
      :
      <Splide
      
        options={{
       pagination : false ,
       arrows : false ,
       height :   '100vh',
       direction :'ttb' ,
       dragable :true ,   
     }}
     
     >
      {videos?.map((post)=>{
            return <SplideSlide   key={post?.id } className='bg- d-flex flex-coumn align-items-center  justify-content-center ' >
                     <Shee mute={mute} setMute={setMute} post={post} />
                    </SplideSlide>
        })
       }

     </Splide>
     }
       
        
       
   

           

     </div>
     
   


   
 
   </div>
    
  )
}

export default Window