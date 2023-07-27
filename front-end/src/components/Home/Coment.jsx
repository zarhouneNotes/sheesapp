import React, { useEffect, useState } from 'react'
import {ClipLoader} from 'react-spinners'
import { getUser, timeAgo } from '../../RequMethods'
import { useNavigate } from 'react-router-dom'

function Comment({comment}) {
  const [user , setUser] = useState({})
  const [load , setLoad] = useState(false)
  




  

  useEffect(()=>{
    getUser(comment?.author).then((res)=>{
      setUser(res?.user)
    })
  },[])
  const navigate = useNavigate()

  return load ? 
    <div className="text-center text-2 py-2">
      <ClipLoader   size={20}   className='mx-auto '  color="#0A4D68"  />
    </div>
  : (
    <div className='bg-succes px-2 my-2 py-2 d-flex gap-2'   onClick={()=>{navigate(`/user/${user?.username}`)}}   >
        <img width="30px" src={`${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} alt="" srcset="" className='carre align-self-start mt-2 rounded-circle'/>
        <div className="d-flex flex-column">
            <div  className=''>
                <small className='fw-700'>{user?.username}</small>
                <small className="text-secondary mx-2 time"> {timeAgo(comment?.time) || 'now'}</small>
            </div>
            <small>
               {comment?.content}
            </small>
        </div>
    </div>
  )
}

export default Comment


