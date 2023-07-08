<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
=======
import React, { createContext, useEffect, useState } from 'react'
>>>>>>> 47c58b6 (chat)
import Window from './Window'
import './home.css'
import Profile from '../Profile/Profile'
import SearchPage from '../Searsh/SearchPage'
import AddPost from '../Addvideo/AddPost'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
<<<<<<< HEAD
import { Button } from 'react-bootstrap'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { getAuth, getShees } from '../../RequMethods'
import EmptyHome from './EmptyHome'
import SheeLoad from './SheeLoad'

function Home() {
=======
import {  getAuth, getShees } from '../../RequMethods'
import SheeLoad from './SheeLoad'
import EditProfile from '../Profile/EditProfile'
import Inbox from '../Inbox/Inbox'
import io from 'socket.io-client'



export const AppContext = createContext()
function Home() {
  
>>>>>>> 47c58b6 (chat)
  const navigate = useNavigate()
  const params = useParams()

  const [load, setLoad] = useState(true)
  const [shees , setShees] = useState([])
<<<<<<< HEAD
 
=======
  const [auth , setAuth] =  useState()
  const [onlineUsers , setOnlineUers] = useState([])
  const [socket , setSocket] = useState()
>>>>>>> 47c58b6 (chat)


    
   useEffect(()=>{
<<<<<<< HEAD
=======
    getAuth()
    .then((res)=>{
      setAuth(res.result)
    })
    
>>>>>>> 47c58b6 (chat)
    getShees().then((res)=>{
      setShees([...res?.shees]) 
      setLoad(false) 
    })
   },[])
<<<<<<< HEAD
=======



   
>>>>>>> 47c58b6 (chat)
 

  

  function LogOut (e){
    e.preventDefault()
    localStorage.removeItem('auth')
    navigate('/login')
  }

  useEffect(()=>{

<<<<<<< HEAD

  
    if (! localStorage.getItem('auth')) navigate('/login') 
    
  },[])
  
  return (
=======
    if (! localStorage.getItem('auth')) navigate('/login') 
    
  },[params])


  useEffect(()=>{
    if (auth) {
      const s =  io(process.env.REACT_APP_BASE_URL , {
        query : {id : auth?.username}
      }) 
      setSocket(s)
      return ()=>{
      s.disconnect()
      }
    }
    
    return ()=>{
      socket?.disconnect()
      }
  },[auth])
  
  return (
    <AppContext.Provider value={{auth : auth ? auth : null , socket}}>

  
>>>>>>> 47c58b6 (chat)
    <div className='home bg-daner flex-column-reverse flex-lg-row d-flex flex flex  justify-content-between' >
      
         <div className='navbarr h-10  col-lg-2 px-2'>
           <Navbar />
         </div>
      
        

<<<<<<< HEAD
        <div className=' borer main-content bg-ifo h-100 col-12 col-lg-10 window mx-auto  position-relative '>
          <Routes>

            {/* <Route path='/:id'  element={ <EmptyHome  /> } /> */}
            <Route path='/'  element={ load ? <SheeLoad /> :   <Window shees={shees}  /> } />
            <Route path='/user/:id/*'  element={ <Profile /> } />
            <Route path='/search'  element={ <SearchPage />} />
            <Route path='/add-post'  element={ <AddPost /> } />
=======
        <div className=' borer main-content bg-fo h-10 col-12 col-lg-10 window mx-auto  position-relative '>
          <Routes>

            <Route path='/'  element={ load ? <SheeLoad /> :   <Window shees={shees} />  } />
            <Route path='/user/:id/*'  element={ <Profile /> } />
            <Route path='/search'  element={ <SearchPage />} />
            <Route path='/add-post'  element={ <AddPost /> } />
            <Route path='/edit'  element={ <EditProfile /> } />
            <Route path='/inbox/*'  element={<Inbox auth={auth} />}   />
>>>>>>> 47c58b6 (chat)
          </Routes>
         
        </div>
 



   
      
    </div>
<<<<<<< HEAD
=======
    </AppContext.Provider>
>>>>>>> 47c58b6 (chat)
  )
}

export default Home