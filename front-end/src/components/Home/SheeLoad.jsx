import React from 'react'
import { CircleLoader } from 'react-spinners'
import logo from '../../images/logo.png'


function SheeLoad() {
  return (
    <div style={{zIndex : '99999999999999'   , top : '0px'}} className='h-100 p-4 w-100 position-absolute bg-inf d-flex align-items-center justify-content-center'>
       <img width="200px" src={logo} alt="" srcset=""

       style={{
        scale :'1.2' , 
        transition :'1s'
       }}


         />
    </div>
  )
}

export default SheeLoad