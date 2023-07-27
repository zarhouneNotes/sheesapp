import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, ProgressBar } from 'react-bootstrap'
import { IoIosClose, IoIosCloudUpload, IoMdTrash } from 'react-icons/io'
import vd from '../../images/backvideo.mp4'
import Tag from '../Home/Tag'
import { tags } from '../../App'
import axios from 'axios'
import { addVideo, getAuth } from '../../RequMethods'

import { Link, useNavigate } from 'react-router-dom'
import UploadLoad from './UploadLoad'
import uniqid from 'uniqid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../Firebase'
import { Box } from '@mui/material'

function AddPost() {
  const [progress, setProgress] = useState(0);
  const [videoToUp , setVideotoUp] = useState('')
  const [username , setUsername ] = useState('')

  const [err , setErr] = useState('')
  const inputRef = useRef('');
  const vidRef = useRef()
  const navigate = useNavigate()

   var tgs = []
  const cancelHandel = ()=> {setVideotoUp() ; setProgress()}
  
 
  const TagClick = (tag) =>{
      if (tgs.includes(tag)) {
        const newlist = tgs.filter((t)=>{
          return t !=tag
        })
        tgs = newlist
       
      }else{ tgs.push(tag)}
       
       
       
      
  }  

///get user
  useEffect(()=>{
   getAuth()
    .then((res)=>{
       setUsername(prev=>   res.result.username)  
          
    })

    
  },[])


 async function uploadVideo (){
  // setProgress(true)
  // const formData = new FormData()
  // formData.append('video' , videoToUp)
  // formData.append('id' , uniqid())
  // formData.append('caption' ,inputRef.current.value )
  // formData.append('tags' , tgs)
  // formData.append('username' , username)

 

  // axios
  // .post(`${process.env.REACT_APP_BASE_URL}/add-video`, formData,{})
  // .then(res =>{
  //   setProgress(false)
  //    console.log(res)
  //    setVideotoUp()
  //   //  setLoad(false)
  //    })
  // .catch(err => console.error(err));




  ///:upload to firebaseee
    const fileRef =    ref(storage ,uniqid())
    
  const uploadTask =   uploadBytesResumable(fileRef , videoToUp)
  uploadTask.on('state_changed' , (snapshot)=>{
      
    setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))

    
  }, (err)=> {
    setErr(err)
  } , 
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((URL_)=>{
      if(!URL_) return  setErr('Uploading failed')
       fetch  (`${process.env.REACT_APP_BASE_URL}/add-video` ,{
        method : 'POST' , 
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          username : username ,
          id : uniqid(),
          caption : inputRef.current.value ,
          tags : tgs ,
          url : URL_
        })
      }).then((res)=>{
        const data =  res.json()
  
        if (data.status === 'err')
           {setErr('Something went wrong') }
           else {
            navigate('/')
           }
       
      })
    }) 
  }
    )
  
      
   
  }




  return (
    <Box className=' col-12 col-lg-10 mx-auto text- -1  bg-inf p-1 add-video borde  position-relative h-100' >    
   {  progress>0  &&
    <div className="position-absolute p-2 bg- w-100 d-flex justify-content-center align-items-center  bg-white " style={{zIndex : "99" , bottom : '0px' , height:'100vh' }} >   
      <UploadLoad progress={progress}   /> 
    </div> 
    }
   
    {err && <Alert  variant='danger' className='m-1' >{err}</Alert> }
    
      <div className="text-1 fs-4 m-2">Add new Shee</div>
      {!videoToUp &&  <Button   className=" mt-3  py-2 d-flex text-info align-items-center justify-content-center bg-white w-100 mx-auto file-upload borde border-info position-relative">
          <input
          ref={vidRef}
          onChange={(e)=>{
            
            setVideotoUp(e.target.files[0])
              // console.log(e.target.files[0])
               }
            
          }
           type="file" className='position-absolute h-100' accept='video/*'
            />
          <div className="fs- ">UPLOAD </div>
          <IoIosCloudUpload className='mx-2 fs-5'  />
        </Button>}

   {videoToUp  && <>
     <div className='text-secondary  bottom-space px-2 mt-4'>Add more details about your shee </div>
      
       
       
      
          <div className="bg d-flex flex-column align-items-center  bg-light position-relative ">
              <div className='about-to-upload-video mt'>
                  <video src={URL.createObjectURL(videoToUp)} autoPlay={false}  loop  height='350px' />
              </div>
              <div className="close">
                <IoMdTrash onClick={cancelHandel} fontSize="30px" />
              </div>
   
          </div>

          <input
          type='text'
          ref={inputRef}
           className='mb- my-2 input mx- post-input' placeholder='Write a caption..'
            />

          <div className='px-1 d-flex flex-wrap   tags' >
            {tags.map((tag)=>{
              return <Tag key={tag}  TagClick={TagClick} tag={tag} />
            })}
          </div>
      {/* </div> */}
    

      <Form className='px-1 mt-3 d-flex gap-1 ' >
       
        <Button className='bg-2 w-50   '  size='sm'  onClick={uploadVideo}   >Post</Button>
        <Button variant='outline-info ' size='sm' className=' w-50 mt- border border-info '   onClick={cancelHandel}    >Cancel</Button>
      </Form>
     </>}

    </Box>
  
  )
}

export default AddPost