import React, { createContext, useEffect, useRef, useState } from 'react'
import Window from './Window'
import './home.css'
import Profile from '../Profile/Profile'
import SearchPage from '../Searsh/SearchPage'
import AddPost from '../Addvideo/AddPost'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Navbar from './Navbar'
import {  getAuth, getShees } from '../../RequMethods'
import SheeLoad from './SheeLoad'
import EditProfile from '../Profile/EditProfile'
import Inbox from '../Inbox/Inbox'
import io from 'socket.io-client'
import { useMediaQuery } from 'usehooks-ts'


// const socket = io.connect(process.env.REACT_APP_BASE_URL)
export const AppContext = createContext()
function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const navigate = useNavigate()
  const params = useParams()

  const [load, setLoad] = useState(true)
  const [shees , setShees] = useState([])
  const [auth , setAuth] =  useState()
  const [onlineUsers , setOnlineUers] = useState([])
  // const [socket , setSocket] = useState()
  const socket = useRef(io(process.env.REACT_APP_BASE_URL))

    
   useEffect(()=>{
    getAuth()
    .then((res)=>{
      setAuth(res.result)
    })
 
    getShees().then((res)=>{
      setShees([...res?.shees]) 
      setLoad(false) 
    })
    // return ()=> socket.close() 
   },[])



  function LogOut (e){
    e.preventDefault()
    localStorage.removeItem('auth')
    navigate('/login')
  }

  useEffect(()=>{
    if (! localStorage.getItem('auth')) {
      navigate('/login')
      socket.current?.close()     
     }
    
  },[params])


  useEffect(()=>{
    auth && socket.current.emit('addUser' , auth?.username)   
    socket.current.on('getUsers' , (users)=>{
      setOnlineUers(users)
      console.log(users)
    })
  },[auth])



  
  return  load ? <SheeLoad /> :  (
    <AppContext.Provider value={{auth , socket , isMobile}}>

  
    <div className='home bg-danr flex-column-reverse flex-lg-row d-flex h-100  justify-content-between' >
      
         <div className='navbarr   col-lg-2 px-2'>
           <Navbar />
         </div>
      
        

        <div className=' borer main-content bg-ino h-100 col-12 col-lg-10 window mx-auto  position-relative '>
          <Routes>

            <Route path='/'  element={   <Window shees={shees} />  } />
            <Route path='/user/:id/*'  element={ <Profile /> } />
            <Route path='/search'  element={ <SearchPage />} />
            <Route path='/add-post'  element={ <AddPost /> } />
            <Route path='/edit'  element={ <EditProfile /> } />
            <Route path='/inbox/*'  element={<Inbox auth={auth} />}   />
          </Routes>
         
        </div>
 



   
      
    </div>
    </AppContext.Provider>
  )
}

export default Home