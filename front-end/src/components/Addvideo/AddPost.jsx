import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, ProgressBar } from 'react-bootstrap'
import { IoIosClose, IoIosCloudUpload, IoMdTrash } from 'react-icons/io'
import vd from '../../images/backvideo.mp4'
import Tag from '../Home/Tag'
import { tags } from '../../App'
import axios from 'axios'
import { addVideo, getAuth } from '../../RequMethods'
<<<<<<< HEAD
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import UploadLoad from './UploadLoad'
import uniqid from 'uniqid';

function AddPost() {
  const cancelUploadBtn = document.getElementsByClassName('')
  const [progress, setProgress] = useState(0);
  const [videoToUp , setVideotoUp] = useState()
  // const [caption , setCaption] = useState('')
  const [username , setUsername ] = useState('')
  const [pdp , setPdp] = useState('')
  const [err , setErr] = useState('')
  const inputRef = useRef(null);
=======

import { Link, useNavigate } from 'react-router-dom'
import UploadLoad from './UploadLoad'
import uniqid from 'uniqid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../Firebase'

function AddPost() {
  const [progress, setProgress] = useState();
  const [videoToUp , setVideotoUp] = useState('')
  const [username , setUsername ] = useState('')

  const [err , setErr] = useState('')
  const inputRef = useRef('');
>>>>>>> 47c58b6 (chat)
  const vidRef = useRef()
  const navigate = useNavigate()

   var tgs = []
<<<<<<< HEAD
  const cancelHandel = ()=> {setVideotoUp() ; setProgress(0)}
=======
  const cancelHandel = ()=> {setVideotoUp() ; setProgress()}
>>>>>>> 47c58b6 (chat)
  
 
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

<<<<<<< HEAD
const uid = uniqid().toString()
 async function uploadVideo (){
  ///:upload to firebaseee
    const fileRef =    ref(storage ,uid)
    const upload  =  uploadBytesResumable(fileRef , videoToUp).then((res)=>{
=======

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
    uploadBytesResumable(fileRef , videoToUp).then((res)=>{
>>>>>>> 47c58b6 (chat)
      console.log(res)

      getDownloadURL(fileRef).then((URL_)=>{
        if(!URL_){setErr('Uploading failed')}
<<<<<<< HEAD
         fetch  (`${process.env.BASE_URL}/add-video` ,{
=======
         fetch  (`${process.env.REACT_APP_BASE_URL}/add-video` ,{
>>>>>>> 47c58b6 (chat)
          method : 'POST' , 
          headers: {
            'Content-Type': 'application/json',
          },
<<<<<<< HEAD
          body : JSON.stringify( {
            id : uniqid() ,
            url : URL_ ,
            caption : inputRef.current.value,
            tags : tgs ,
            likers : [] ,
            savers : [] ,
            username : username
            
=======
          body : JSON.stringify({
            username : username ,
            id : uniqid(),
            caption : inputRef.current.value ,
            tags : tgs ,
            url : URL_
>>>>>>> 47c58b6 (chat)
          })
        }).then((res)=>{
          const data =  res.json()
    
          if (data.status === 'err')
             {setErr('Something went wrong') }
             else {
              console.log('perfeecto')
             }
         
        })
      })
    })
  
      
   
  }




  return (
    <div className=' col-12 col-lg-10 mx-auto bg-dange add-video borde'>    
<<<<<<< HEAD
   {  progress >0  &&
    <div className="position-absolute p-2 bg-1 w-100 d-flex justify-content-center align-items-center  bg-drk" style={{zIndex : "99" , height:'100vh'}} >
     
      
      <UploadLoad   progress={progress}  /> 
     

    

=======
   {  progress  &&
    <div className="position-absolute p-2 bg-1 w-100 d-flex justify-content-center align-items-center  bg-drk" style={{zIndex : "99" , height:'100vh'}} >   
      <UploadLoad    /> 
>>>>>>> 47c58b6 (chat)
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

   {videoToUp &&  <>
     <div className='text-secondary  px-2 mt-4'>Add more details about your shee </div>
      
       
       
      
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

    </div>
  
  )
}

export default AddPost