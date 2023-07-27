import React from 'react'
import { RiArrowRightLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import {BarLoader} from 'react-spinners'

function UploadLoad({progress}) {
  return (
    <div className=' d-flex flex-column align-items-center h-10 gap-4'>
    <div className="mx-aut bg align-items-center gap-5 d-flex flex-column justify-content-between ">
     <BarLoader color="#36d7b7" />
     <div className="d-flex align-items-center">
         <div  style={{transform : 'rotate(90deg)'}}>
            <BarLoader color="#36d7b7"  />
        </div> 
        <div className="text-2 -1 "> Uploding.. {progress}% </div>
        <div  style={{transform : 'rotate(90deg)'}}>
            <BarLoader color="#36d7b7"  />
        </div> 
     </div>
    <BarLoader color="#36d7b7" />
    </div>
    { progress ===   100 &&  <Link to='/' className='text-white  '> <small className='d-flex gap-2 align-items-center' ><span>Back home</span>  <RiArrowRightLine/> </small>    </Link>}
    </div>
  )
}

export default UploadLoad