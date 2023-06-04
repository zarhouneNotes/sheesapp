// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Shee from './Shee'
// import SheeLoad from './SheeLoad'

// function EmptyHome() {

//   const [post , setPost] = useState()
//   const params = useParams()
//   const [load, setLoad] = useState(false)
  
//   async function getShee() {
//     setLoad(true)
//     const res = await  fetch(`http://localhost:3001/shees/${params.id}` , {
//       method : 'GET' , 
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     const resp = await res.json()
//     setPost(resp?.shee)
//     setLoad(false)
//     console.log(resp)
 
//   }


//   useEffect(()=>{
//     const controller = new AbortController()
//      getShee()
//     // console.log(params)
//    return controller.abort()
//   },[params.id])
//   return (
//     <div className='home-window'>
//       <div  className='p-2 fw-bold text-2 fs-5 shee-loo ' > Shees!</div>
    
//       {load ?
//       <SheeLoad />
//       :
//       <div className='shees-feed'>
//             <Shee  key={post?.id} post={post}  />
//       </div>
      
//       }


  

//   </div>
   
//  )
  
// }
// // 
// export default EmptyHome