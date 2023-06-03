import React, { useEffect, useState } from 'react'
import Shee from './Shee'
import { videos } from '../../Videos'
import Navbar from './Navbar'
import {  Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SheeLoad from './SheeLoad'
import { getShee, getUser } from '../../RequMethods'
import { useMediaQuery } from '@mui/material'


function Window({shees }) {

  const params = useParams()
  const  an_id = Object.values(params)[0]
  const [mute , setMute] = useState(false)


  //  useEffect(()=>{
  //     if (an_id.length>0) {
  //       getShee(an_id)
  //       .then((res)=>{
  //         setShees([res?.shee , ...shees])
  //       })
  //     }
  //  },[an_id])

   






  return  (
   <div className='  col-12 col-lg-4 col-md-8 mx-auto'>
     {/* <div  className=' fw-bold text-white text-center bg-dark  fs-5 shee-logo d-flex align-items-center justify-content-center ' > Shees!</div> */}
     {/* <div  style={{width}}  /> */}
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
       height : '100vh' ,
       direction :'ttb' ,
       dragable :true ,   
     }}
     
     >
      {shees?.map((post)=>{
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