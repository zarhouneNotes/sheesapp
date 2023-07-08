import React, { useEffect, useState } from 'react'
import { getUser } from '../../RequMethods'
import ProfileLoad from './ProfileLoad'
import { ClipLoader, MoonLoader } from 'react-spinners'

function ListItem({id}) {
    const [user , setUser] = useState()
    const [load, setLoad] = useState(true)
    useEffect(()=>{
        getUser(id).then((res)=>{
            setUser(res?.user)
            setLoad(false)
        }  )
    },[])
  return (
<<<<<<< HEAD
    <div className='d-flex align-items-center gap-2 my-2 w-100'>
=======
    <div hr className='d-flex align-items-center gap-2 my-2 w-100'>
>>>>>>> 47c58b6 (chat)

      { load ?   
             <ClipLoader size='20px' className='mx-auo text-2'/>
  
  :   <>
<<<<<<< HEAD
        <img src={user?.pdp} alt="" srcset="" className='carre rounded-circle' width='32px' />
=======
        <img src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} alt="" srcset="" className='carre rounded-circle' width='32px' />
>>>>>>> 47c58b6 (chat)
        <div>{user?.username}</div>
       </>}
    </div>
  )
}

export default ListItem