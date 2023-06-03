import React, { useState } from 'react'
import { useEffect } from 'react'
import { RiSaveLine, RiVideoUploadLine } from 'react-icons/ri'
import { getProfileShees } from '../../RequMethods'

function ProfileBody({shees ,load,user , auth ,setSaved}) {
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


   

    let elemClass = "col-4 bg-inf p-1  col-md-3"
  return (
    <div className=''>
        <div className="d-flex justify-content-around border-bottom">
                <div onClick={handelclick} className={ ` ${cl} ${status && ac_cl} `}  >Publications  </div>
               { user?.username == auth?.username && <div onClick={handelclick_}  className={ `${cl}  ${!status && ac_cl} ` }  >Saved Shees </div>}
        </div>

        <div className="text-cent d-flex flex-wrap bg-secodary ">
            
           {
            load ? 'loading..' :
           shees?.map((post)=>{
            return <div className={elemClass}>
                    <div className=" bg-dar vid">
                      <video className='w-100 h-100' >
                        <source src={post?.url} type='video/mp4' />
                      </video>
                    </div>
                  </div>
           })}
       
           
        </div>

    </div>
  )
}

export default ProfileBody