import React from 'react'
<<<<<<< HEAD

function SheePoster() {
  return (
    <div className='text-light d-flex align-items-center gap-2 py-2' >
        <img width='40px' className='rounded-circle carre' src="https://i.pinimg.com/564x/f4/ba/07/f4ba07fab871841a490d9fbcfe546de5.jpg" alt="" srcset="" />
        <div>User_977x</div>

        <small className="text-primary border px-2 mx-1 fw-bol border-primary">Follow</small>
=======
import { Link } from 'react-router-dom'

function SheePoster({followHandel , isFollowedByMe , poster , user}) {
  
  return (
    <div className='  d-flex align-items-center gap-2 p-2' >
                    
      <Link className='d-flex align-items-center link gap-1'  to={`/user/${poster?.username}`} >
           <img width='40px' className='rounded-circle carre' src={`${process.env.REACT_APP_BASE_URL}/images/${poster?.pdp}`} alt="" srcset="" />
            <div>{poster?.username}</div>
        </Link>

      

        { user?.username !== poster?.username && 
      <div  onClick={followHandel}>
          { !isFollowedByMe ?<small  className="text-secondary   mx-1 ">Follow</small>
          :  <small  className="tex   mx-1 text-2">Following</small>
          }
        </div>
        }
>>>>>>> 47c58b6 (chat)
    </div>
  )
}

export default SheePoster