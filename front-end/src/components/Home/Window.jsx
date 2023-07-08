import React, { useEffect, useState } from 'react'
import Shee from './Shee'
<<<<<<< HEAD
import { videos } from '../../Videos'
import Navbar from './Navbar'
=======
>>>>>>> 47c58b6 (chat)
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import SheeLoad from './SheeLoad'
import { getShee, getUser } from '../../RequMethods'
import { useMediaQuery } from '@mui/material'
<<<<<<< HEAD
=======
import UsersList from './UsersList';
>>>>>>> 47c58b6 (chat)


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
<<<<<<< HEAD
   <div className='  col-12 col-lg-4 col-md-8 mx-auto'>
{/* {false &&      <div  className=' fw-bold shee-logo text-2 text-center bg-dark  fs-5  d-flex align-items-center justify-content-center ' > Shees!</div>
}     <div  style={{width}}  /> */}
     <div className={`shees-fed bg-dange `}    >
=======
   <div className='bg-inf d-flex d col-  mx-auto  justify-content-end'>
      
     <div className={`shees-fed bg-dange col-12 col-md-4  mx-auto `}    >
>>>>>>> 47c58b6 (chat)
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
<<<<<<< HEAD
            return <SplideSlide   key={post?.id } className='bg-info h-100 d-flex flex-coumn align-items-center  justify-content-center ' >
=======
            return <SplideSlide    key={post?.id } className='bg-inf d-flex flex-coumn col align-items-cente align-items-lg-center mb-5  justify-content-center ' >
>>>>>>> 47c58b6 (chat)
                     <Shee mute={mute} setMute={setMute} post={post} />
                    </SplideSlide>
        })
       }

     </Splide>
     }
       
        
       
   

           

     </div>
<<<<<<< HEAD
=======
    { !isMobile &&  
    <div className="users-list col-3 text-dark p-2  ">
      <UsersList  label={true}/>
     </div>}
>>>>>>> 47c58b6 (chat)
     
   


   
 
   </div>
    
  )
}

<<<<<<< HEAD
export default Window
=======
export default Window
>>>>>>> 47c58b6 (chat)
