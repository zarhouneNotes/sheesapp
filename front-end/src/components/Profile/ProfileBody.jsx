import React, { useState } from 'react'
import { useEffect } from 'react'
import { RiSaveLine, RiVideoUploadLine } from 'react-icons/ri'
import { getProfileShees } from '../../RequMethods'
import { Link } from 'react-router-dom'
import ProfileLoad from './ProfileLoad'

function ProfileBody({shees ,load,user , auth ,setSaved }) {
    const [status , setStatus] = useState(true)
    const cl = `w-100  mb- py-2 text-center text-2`
    const ac_cl =   ' text-2 border-bottom border-info fw-bold '

    const handelclick  = (e)=>{
        e.preventDefault()
        setStatus(true)
        setSaved(false)
    }
    const handelclick_  = (e)=>{
      e.preventDefault()
      setStatus(false)
      setSaved(true)
  }


   

    let elemClass = "col-4 bg-inf   col-md-3"
  return (
    <div className=''>
        <div className="d-flex justify-content-around border-bottom">
                <small onClick={handelclick} className={ ` ${cl} ${status && ac_cl} `}  >Publications  </small>
               { user?.username == auth?.username && <small onClick={handelclick_}  className={ `${cl}  ${!status && ac_cl} ` }  >Saved Shees </small>}
        </div>

        <div className="text-cent d-flex flex-wrap "   >
             {shees?.length === 0 && <div className="text-secondary py-4 text-center w-100">empty :)</div>}
             
           {
            load ? 

           <div className="h-100 w-100 py-5 d-flex align-items-center">
             <ProfileLoad />
           </div>
            
            :
           shees?.map((post)=>{
            return <Link className={elemClass} state={post} to={`/user/${post?.username}/shees`} style={{padding : " 0 2.5px"}} >
                  
                    <div className=" bg-dar col-12 vid px1"     >
                      <video className='w-100 h-100' >
                        <source src={`${post?.url}`} type='video/mp4' />
                      </video>
                    </div>
              
                </Link>
           })
          }
       
           
        </div>

    </div>
  )
}

export default ProfileBody