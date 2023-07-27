import React from 'react'
import { BarLoader, CircleLoader } from 'react-spinners'

function ProfileLoad() {
  return (
    <div className='h-100 w-100  d-flex align-items-center justify-content-center'>
        <CircleLoader />
    </div>
  )
}

export default ProfileLoad