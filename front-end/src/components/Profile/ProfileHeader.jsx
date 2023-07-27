import React, { useEffect, useState } from 'react'
import { chatIdGen, getAuth, getFollowingList, pushFollow } from '../../RequMethods'
import { Button } from 'react-bootstrap'
import { AiFillEdit, AiOutlineCheck, AiOutlineEye, AiOutlinePlus } from 'react-icons/ai'
import { useMediaQuery } from 'usehooks-ts'
import ListModal from './ListModal'
import ListOfFollowing from './ListOfFollowing'
import { Link, useNavigate } from 'react-router-dom'

function ProfileHeader({user , auth , pubs}) {
  const isMobile = useMediaQuery('(max-width: 900px)')
 
  const navigate = useNavigate()
  const [followers , setFollowers] =useState(user?.followers)
  const [following, setFollowing] = useState([])
  const [show , setShow] = useState(false)
  const [show_ , setShow_] = useState(false)


  useEffect(()=>{
      // console.log(user)
      getFollowingList(user?.username).then((res)=>{
          setFollowing(res?.iamFollowing)
      })
  },[])


  let isFollowedByMe = followers?.includes(auth?.username)
  const followHandel =()=>{
    if (!isFollowedByMe) {
      setFollowers([...followers, auth?.username])
      pushFollow([...followers, auth?.username] , user?.username)
    }else{
        const arr = followers?.filter((id)=>{
          return id !== auth.username
        })
        setFollowers(arr)
        pushFollow(arr ,user?.username )
    }
  }



  return (
    <>
    <div className=' d-flex flex-column align-items-center w-100 gap-1 py-4'>

        <div className=" w-100 d-flex flex-column justify-content-center align-items-center         flex-md-row  justify-content-md-start    gap-3 bg-inf px-2 ">
          <img className='carre border  rounded-circle' src={ `${process.env.REACT_APP_BASE_URL}/images/${user?.pdp}`} alt="" srcset="" width='150px' />

          <div className='d-flex flex-column user-info bg-inf w-10'>
              <div className=" d-lg-flex align-items-lg-center bg-o justify-content-lg-between gap-4">
                <div>
                {user?.fullname}

                </div>
                {!isMobile &&  <div className="d-flex gap-1 mx-3">
                { user?.username !== auth?.username &&  
               
                  <Button className='bg-2 d-flex align-items-center gap-2 px-3 rounded-pill' size='sm' onClick={()=>{navigate(`/inbox/${chatIdGen(user?.username , auth?.username)}`)}} > <span>Message</span> <AiOutlineEye /></Button>
               
                }
                { user?.username == auth?.username ?  
                <Link to='/edit'  >
                  <Button className='bg-2 w-10  px-3 rounded-pill  ' size='sm' >Edit <AiFillEdit /> </Button>
                </Link>
                : <div onClick={followHandel} className='w-100' >
                  {isFollowedByMe ? 
                  <Button className='bg-2 px-3 rounded-pill ' size='sm' >Following <AiOutlineCheck /> </Button> : 
                  <Button  variant='outline-info' className='border border-info  rounded-pill px-3 text- ' size='sm' >Follow <AiOutlinePlus /> </Button>} 
                </div> 
                }
                </div>}
                
              </div>

              <div className="text-secondary">@{user?.username}</div>

              <div className="my-3 text-2"> {user?.caption ? user?.caption : 'TYPE SOMETHING HERE !!'} </div>
          </div>
        </div>
      

        <div className="d-flex  borer py-2 col-12 col-lg- align-items-center justify-content-evenly">
          <div className="d-flex  flex-column align-items-center" onClick={()=>{ setShow(true)}} >
            <small className="text-secondary" >Followers</small>
            <div className="text-1">{followers?.length}</div>
          </div>
          <div className="d-flex flex-column align-items-center" onClick={()=>{ setShow_(true)}} >
            <small className="text-secondary">Following</small>
            <div className="text-1">{following?.length}</div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <small className="text-secondary">Publications</small>
            <div className="text-1">{pubs}</div>
          </div>
        </div>
        {/* {!isMobile && <hr className='text-secondar' />} */}
     {isMobile&&   <div className="d-flex justify-content-around w-100 gap-1">
      { user?.username !== auth?.username &&  <Button className='bg-2 w-100 ' size='sm' onClick={()=>{navigate(`/inbox/${chatIdGen(user?.username , auth?.username)}`)}} >message <AiOutlineEye /></Button>}
       { user?.username == auth?.username ?  
       <Link to='/edit' className=' w-100' >
         <Button className='bg-2   w-100' size='sm' >Edit <AiFillEdit /> </Button>
       </Link>
       : <div onClick={followHandel} className='w-100' >
        {isFollowedByMe ? 
         <Button className='bg-2 w-100  ' size='sm' >Following <AiOutlineCheck /> </Button> : 
        <Button  variant='outline-inf' className='border border-info w-100  text-info ' size='sm' >Follow <AiOutlinePlus /> </Button>} 
       </div> 
       }
       </div>}
       
    </div>

    <ListModal onHide={()=>setShow(false)}  show={show} list={followers} />
    { user?.username == auth?.username &&   <ListOfFollowing onHide={()=>setShow_(false)}  show={show_}  list={following}   />}

    </>
  )
}

export default ProfileHeader