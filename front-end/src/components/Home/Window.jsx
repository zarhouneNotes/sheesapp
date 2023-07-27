import React, { useEffect, useState } from 'react'
import Shee from './Shee'
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SheeLoad from './SheeLoad'
import { getShee, getUser } from '../../RequMethods'
import { useMediaQuery } from '@mui/material'
import UsersList from './UsersList';


function Window({shees }) {

  const isMobile = useMediaQuery('(max-width: 900px)')
  const params = useParams()
  const [mute , setMute] = useState(false)

  /////// location
  const location = useLocation()
  const clickedPost = location.state 
  const filtred_list =  shees?.filter((post)=>{
    return post?.id !== clickedPost?.id
  })
 
  const videos = !clickedPost? shees :   [clickedPost, ...filtred_list ]



  


  return  (
   <div className='bg-inf d-flex d col-  mx-auto  justify-content-end'>
      
     <div className={`shees-fed bg-dange col-12 col-md-8 col-lg-4  mx-auto `}    >
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
            return <SplideSlide    key={post?.id } className='bg-inf d-flex  align-items-start  mb-3 align-items-lg-center  ' >
                     <Shee mute={mute} setMute={setMute} post={post} />
                    </SplideSlide>
        })
       }

     </Splide>
     }
       
        
       
   

           

     </div>
    { !isMobile &&  
    <div className="users-list col-3 text-dark p-2  ">
      <UsersList  label={true}/>
     </div>}
     
   


   
 
   </div>
    
  )
}

export default Window
