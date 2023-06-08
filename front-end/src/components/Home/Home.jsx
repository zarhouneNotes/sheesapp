import React, { useEffect, useState } from 'react'
import Window from './Window'
import './home.css'
import Profile from '../Profile/Profile'
import SearchPage from '../Searsh/SearchPage'
import AddPost from '../Addvideo/AddPost'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { Button } from 'react-bootstrap'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { getAuth, getShees } from '../../RequMethods'
import EmptyHome from './EmptyHome'
import SheeLoad from './SheeLoad'

function Home() {
  const navigate = useNavigate()
  const params = useParams()

  const [load, setLoad] = useState(true)
  const [shees , setShees] = useState([])
 


    
   useEffect(()=>{
    getShees().then((res)=>{
      setShees([...res?.shees]) 
      setLoad(false) 
    })
   },[])
 

  

  function LogOut (e){
    e.preventDefault()
    localStorage.removeItem('auth')
    navigate('/login')
  }

  useEffect(()=>{


  
    if (! localStorage.getItem('auth')) navigate('/login') 
    
  },[])
  
  return (
    <div className='home bg-daner flex-column-reverse flex-lg-row d-flex flex flex  justify-content-between' >
      
         <div className='navbarr h-10  col-lg-2 px-2'>
           <Navbar />
         </div>
      
        

        <div className=' borer main-content bg-ifo h-100 col-12 col-lg-10 window mx-auto  position-relative '>
          <Routes>

            {/* <Route path='/:id'  element={ <EmptyHome  /> } /> */}
            <Route path='/'  element={ load ? <SheeLoad /> :   <Window shees={shees}  /> } />
            <Route path='/user/:id/*'  element={ <Profile /> } />
            <Route path='/search'  element={ <SearchPage />} />
            <Route path='/add-post'  element={ <AddPost /> } />
          </Routes>
         
        </div>
 



   
      
    </div>
  )
}

export default Home