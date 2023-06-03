import React, { useState } from 'react'

function Tag({tag ,TagClick}) {
    const [added , setAdded] = useState(false)
  return (
    <div key={tag}  onClick={()=>{TagClick(tag) ; setAdded(!added)}}   className={`m-1 rounded-pill py p-2  ${added ? 'bg-1 text-white' : 'border bg-light '} `}>
                    <small>{tag }</small>
    </div>
  )
}

export default Tag