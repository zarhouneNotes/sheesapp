import React, { useContext, useEffect, useRef, useState } from 'react'
import SheePoster from './SheePoster'
import { CreateChat, chatIdGen, getAuth, getUsers, pushFollow } from '../../RequMethods'
import {FaUserFriends} from 'react-icons/fa'
import { AppContext } from './Home'


function UsersList({label}) {
  const {auth} = useContext(AppContext)
    const [list , setList] = useState([])
    const [OrList , setOrList] = useState([])
    // const [auth , setAuth] = useState()
    const [query , setQuery] = useState()
    const inputRef = useRef()

    useEffect(()=>{
            if (!label) {
                inputRef.current.focus()
            }
      if (auth) {
        getUsers(auth?.username)
        .then((list)=>{
                setList(list?.users)
                setOrList(list?.users)
        })
      }
            
    }, [auth])
  return (
    <div className='border-lef bg-ipfo h-10 '>
{ label &&       <div className='d-flex py-2 border-bottom align-items-center gap-2'> <FaUserFriends fontSize='22px' />  <div className="fs-5">Users</div>   </div>
}        <input ref={inputRef} placeholder='Search..' className='rounded-pill my-1 px-2'  onChange={(e)=>{
                !e.target.value.length>0 ? setList(OrList) : setList(OrList?.filter((user)=> user?.username?.includes(e.target.value) || user?.fullname?.includes(e.target.value)  ))
        }} />
        {/* <FormControl  variant="standard">
        <Input
        size='medium'
            placeholder='search for users..'
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment  position="start">
              <RiAccountCircleFill  size='22px' />
            </InputAdornment>
          }
        /> 
        </FormControl> */}
        
        {list?.map((user)=>{
            // CreateChat(chatIdGen(auth?.username , user?.username) , [auth?.username , user?.username])
            return  <SheePoster key={user?.username} user={auth} poster={user} isFollowedByMe={user?.followers?.includes(auth?.username)} followHandel={()=>{pushFollow(user?.followers , user?.username , auth?.username)}} />
        })}
    </div>
  )
}

export default UsersList