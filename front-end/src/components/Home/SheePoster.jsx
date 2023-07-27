import React from 'react'
import { Link } from 'react-router-dom'

function SheePoster({followHandel , isFollowedByMe , poster , user , isList}) {
  
  return (
    <div className='  d-flex align-items-center gap-2 p-2' >
                    
      <Link className='d-flex align-items-center link gap-1'  to={`/user/${poster?.username}`} >
           <img width='40px' className='rounded-circle carre' src={`${process.env.REACT_APP_BASE_URL}/images/${poster?.pdp}`} alt="" srcset="" />
            <div>{poster?.username}</div>
        </Link>

      

        { user?.username !== poster?.username  && isList && 
      <div  onClick={followHandel}>
          { !isFollowedByMe ?<small  className="text-secondary   mx-1 ">Follow</small>
          :  <small  className="tex   mx-1 text-2">Following</small>
          }
        </div>
        }
    </div>
  )
}

export default SheePoster