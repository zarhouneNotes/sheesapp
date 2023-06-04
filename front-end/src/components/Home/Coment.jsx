import React, { useEffect, useState } from 'react'
import {ClipLoader} from 'react-spinners'
import { getUser } from '../../RequMethods'

function Comment({comment}) {
  const [user , setUser] = useState({})
  const [load , setLoad] = useState(false)
  




  

  useEffect(()=>{
    getUser(comment?.author).then((res)=>{
      setUser(res?.user)
    })
  },[])


  return load ? 
    <div className="text-center text-2 py-2">
      <ClipLoader   size={20}   className='mx-auto '  color="#0A4D68"  />
    </div>
  : (
    <div className='bg-succes px-2 my-2 py-2 d-flex gap-2'  onClick={()=>{console.log(comment)}}    >
        <img width="30px" src={user?.pdp} alt="" srcset="" className='carre align-self-start mt-2 rounded-circle'/>
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


function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}