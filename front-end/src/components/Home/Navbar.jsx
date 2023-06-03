import React, { useEffect, useState } from 'react'
import {AiFillHome , AiOutlineSearch , AiOutlineCloudUpload , AiOutlineUser} from 'react-icons/ai'
import {RiLogoutBoxLine, RiUserFill} from 'react-icons/ri'
import { NavLink } from 'react-router-dom'
import { getAuth } from '../../RequMethods'
import logo from '../../images/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { useMediaQuery } from 'usehooks-ts'
import { IoIosLogOut } from 'react-icons/io'


function Navbar() {
   const isMobile = useMediaQuery('(max-width: 900px)')
   
   const [user , setUser] = useState()
    const size =  isMobile ?"22px" :   "25px"
    useEffect( ()=>{
      getAuth()
      .then((res)=>{
          setUser(res.result)
      })
      .catch(()=>{
         alert('something went wrong')
      })
  },[]) 
  const classname = "navlink text-dark link justify-content-center align-items-center fw-bold   d-flex justify-content-lg-start"
  const activeclass = "navlink fs-6 text-secondary link align-items-center   d-lg-flex  justify-content-lg-start"
  const icon = 'icon mx-3'
  return (
   //  <div className='h-100 w-100 d-flex  ' >

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


            <NavLink to={`/${user?.username}`}className={({ isActive }) =>
            isActive ? classname  : activeclass
      } >
               <img src={user?.pdp} className='carre rounded-circle bg-light border border-light mx-3 '   alt="" srcset="" width="32px" />
               <span  >Profile</span>
            </NavLink>

          {!isMobile &&  

          <div className="lat-item ">
            <div po className={'navlnk align-items-center py-2  my-2 border rounded-pill'}>
                  <IoIosLogOut   fontSize={size}  className={icon}  /> 
                  <span  >Log out  </span> 
            </div>
          </div>
          }

        </div>

       
        
        
        
   //  {/* </div> */}
  )
}

export default Navbar