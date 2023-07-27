import React, { useEffect, useState } from 'react'
import {AiFillHome , AiOutlineSearch , AiOutlineCloudUpload , AiOutlineUser, AiOutlineInbox, AiOutlineLogout, AiOutlineClose} from 'react-icons/ai'
import {RiSendPlaneFill} from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth } from '../../RequMethods'
import logo from '../../images/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from 'usehooks-ts'
import { IoIosLogOut } from 'react-icons/io'
import useLongPress from './useLongPress'
import { Box, Stack, Typography, styled } from '@mui/material'
import { grey } from '@mui/material/colors'



function Navbar() {
   const isMobile = useMediaQuery('(max-width: 900px)')
   const [showDisconnetBtn , setShowDisconnectBtn ] = useState(false)
   const navigate = useNavigate()
   const [user , setUser] = useState()
    const size =  isMobile ?"22px" :   "25px"
    useEffect( ()=>{
      getAuth()
      .then((res)=>{
          setUser(res?.result)
      })
      .catch(()=>{
         alert('something went wrong')
      })
  },[]) 
  const classname = `navlink text-dark link justify-content-center align-items-center fw-bold   d-flex ${isMobile ? 'justify-content-md-center'  : 'justify-content-md-start'}`
  const activeclass = `navlink fs-6 text-secondary link align-items-center   d-lg-flex  ${isMobile ? 'justify-content-md-center'  : 'justify-content-md-start'} `
  const icon = 'icon mx-3'

  const onLongPress = () => {
   setShowDisconnectBtn(true)
   };

   const defaultOptions = {
      shouldPreventDefault: true,
      delay: 1000,
   };

   const onClick = ()=>{
      navigate(`/user/${user?.username}`)
   }

   

  const longPressEvent = useLongPress(onLongPress,onClick ,defaultOptions );


  return (
   //  <div className='h-100 w-100 d-flex  ' >
<>
        <div className='border-secondary  navbar-elements mx-aut col-12 col-lg-4 w-100 h-100 bg-dangr    d-flex justify-content-around  py-  gap-3    flex-lg-column justify-content-lg-start'>
            <div className='nav-logo  pt-3 mt-4 mb-5'>
               <img src={logo} width="150px" alt="" srcset="" />
            </div> 
         
            <NavLink to='/'   className={({ isActive }) =>
         isActive ? classname  : activeclass
      } >
                  <AiFillHome fontSize={size} className={icon} />
                  <span  >Home</span>
            </NavLink>
            
            <NavLink to='/search' className={({ isActive }) =>
         isActive ? classname  : activeclass
      } >


               <AiOutlineSearch fontSize={size}  className={icon}  />
               <span  >Search</span>
            </NavLink>


            <NavLink to='/add-post' className={({ isActive }) =>
         isActive ? classname  : activeclass
      }>
               <AiOutlineCloudUpload fontSize={size}  className={icon} /> 
               <span  >Upload </span>   
            </NavLink>


            <NavLink to='/inbox' className={({ isActive }) =>
         isActive ? classname  : activeclass
      }>
               <RiSendPlaneFill fontSize={size}  className={icon} /> 
               <span  >Inbox </span>   
            </NavLink>

         <div  {...longPressEvent}  >
            <NavLink to={`/user/${user?.username}`}className={({ isActive }) =>
            isActive ? classname  : activeclass
      } >
             <img src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} className='carre rounded-circle bg-light border border-light mx-3 '   alt="" srcset="" width="32px"  />
               <span  >Profile</span>
            </NavLink>
         </div>
          {!isMobile &&  

          <div className="lat-item " onClick={()=>{localStorage.removeItem('auth') ; setShowDisconnectBtn(false) ; navigate('/login')} }>
            <div po className={'navlnk align-items-center py-2  my-2 border rounded-pill'}>
                  <IoIosLogOut   fontSize={size}  className={icon}  /> 
                  <span  >Log out  </span> 
            </div>
          </div>
          }

        </div>

       
        
        
      {isMobile && showDisconnetBtn&&  <DisconnectBtn  HandelCancel={()=>{setShowDisconnectBtn(false)}}  HandelLogOut={()=>{localStorage.removeItem('auth') ; setShowDisconnectBtn(false) ; navigate('/login')}} />}
        </>
  )
}

export default Navbar



const size = '40px'
function DisconnectBtn ({ HandelCancel ,  HandelLogOut}){
   return (
      <LogOutComp className='bg-1'>
         <Stack direction={'row'}  gap={3}>
            <Stack color={grey[100]} direction={'column'} alignItems={'center'} gap={1} onClick ={HandelLogOut}   >
               <AiOutlineLogout size={size} />
               <Typography variant=''>Log out</Typography>
            </Stack>
            <Stack color={grey[600]}  direction={'column'} alignItems={'center'} gap={1}  onClick ={HandelCancel}>
               <AiOutlineClose size={size} />
               <Typography >Cancel</Typography>
            </Stack>
         </Stack>
      </LogOutComp>
   )
}

const LogOutComp = styled(Box)({
   position : 'fixed' , 
   top : '0vh' , 
   left :'0px' , 
   width :'100vw' , 
   height :'100vh' , 
   display :'flex' , 
   justifyContent : 'center' , 
   alignItems :"center" , 
 
})