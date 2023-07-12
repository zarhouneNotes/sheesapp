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
    <div hr className='d-flex align-items-center gap-2 my-2 w-100'>

      { load ?   
             <ClipLoader size='20px' className='mx-auo text-2'/>
  
  :   <>
        <img src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} alt="" srcset="" className='carre rounded-circle' width='32px' />
        <div>{user?.username}</div>
       </>}
    </div>
  )
}

export default ListItem