import styled from '@emotion/styled'
import { Box,  ButtonBase, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { AiOutlineCamera } from 'react-icons/ai'
import { IoIosCloudUpload } from 'react-icons/io'
import { getAuth, updateProfileAvatar, updateProfileHandel } from '../../RequMethods'
import axios from 'axios'
import ProfileLoad from './ProfileLoad'


function EditProfile() {
    const [user , setUser] = useState()
   const [username , setUsername ] = useState()
   const [fullName , setFullName] = useState()
   const [pdp , setPdp] = useState()
   const [email , setEmail] = useState()
   const [caption , setCaption] = useState()
   const [previewPdp , setPreviewPdp] = useState()
   const [load , setLoad ] = useState(false)

   function bringAuth (){
    getAuth().then((res)=>{
        setFullName(res.result.fullname)
        setUsername(res.result.username)
        setPdp(res.result.pdp)
        setPreviewPdp(`${process.env.REACT_APP_BASE_URL}/images/${res.result.pdp}`)
        setEmail(res.result.email)
        setCaption(res.result?.caption)
        setUser(res.result) 
       })
   }
    useEffect(()=>{
      bringAuth()
    },[])

    // function areEqual (key){
    //     return user[key] == 
    // }


    function updateFullname (){
        setLoad(true)
        updateProfileHandel(user?.username , 'fullname' , fullName )
        .then(()=>{
            bringAuth()
        }).then(()=>{
            setLoad(false)
        })
    }

    
    function updateEmail (){
        setLoad(true)
        updateProfileHandel(user?.username , 'email' , email )
        .then(()=>{
            bringAuth()
        }).then(()=>{
            setLoad(false)
        })
    }

    function updateCaption (){
        setLoad(true)
        updateProfileHandel(user?.username , 'caption' , caption )
        .then(()=>{
            bringAuth()
        }).then(()=>{
            setLoad(false)
        })
    }


    const updatePic =  ()=>{
        setLoad(true)
        const formData = new FormData()
        formData.append('photo' , pdp)
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/upload/${user?.username}`, formData,{})
          .then(res =>{
             console.log(res)
             setLoad(false)
             })
          .catch(err => console.error(err));
    }
    

   

    const BTN_CLASS = 'bg-1 rounded-pill time'

  return  load ? <ProfileLoad /> : (
    <Box className='col-12 col-md-10 bg-inf mx-auto bottom-spac' sx={{paddingBottom :'2vh' , overflowY :'scroll' ,height :'94vh' }} >
        <Typography variant='h5' >Update Profile</Typography>
        <Divider className='my-3' />
        <Form>
            <Stack direction='column' gap={2}>

                <MyBox className='border p-2'>
                    <Form.Label>Change your profile</Form.Label>
                    
                    
                    <UploadProfile>
                        <HoverInput >
                        <AiOutlineCamera fontSize='22px' color='#fff' />              
                        </HoverInput>
                        <InputFile name='photo' multiple={false} type='file' onChange={(e)=>{  setPdp(e.target.files[0]) ; setPreviewPdp(URL.createObjectURL(e.target.files[0]))}} />
                        <img  className='carre rounded-circle'  width='200px' src={ previewPdp} alt="" srcset="" />
                    </UploadProfile>
                    <Stack direction='row' justifyContent='end' >
                     {  pdp !== user?.pdp && <Button   onClick={updatePic}    className={BTN_CLASS} >update</Button>}
                    </Stack>
                </MyBox>

            
             <MyBox  >
               <Form.Label>username</Form.Label>
               <Form.Control  className='input' value={username} disabled size='sm'  />
               
              </MyBox>

              <MyBox>
               <Form.Label>Fullname</Form.Label>
               
               <Stack  gap={1} direction='row' sx={{width : '100%'  , alignItems :'center'}} >
                <input className='input'  onChange={(e)=>setFullName(e.target.value)} value={fullName}    size='sm'  />
                { user?.fullname !== fullName &&<Button onClick={updateFullname} key="fullname"  className={BTN_CLASS}  >update</Button>}
               </Stack>
              </MyBox>


              <MyBox>
               <Form.Label>Email</Form.Label>
               <Stack  gap={1} direction='row' sx={{width : '100%'  , alignItems :'center'}} >
                <input  onChange={(e)=>setEmail(e.target.value)}  className='input'    type='email'  value={email}   size='sm'  />
                { email !== user?.email && <Button  onClick={updateEmail}  className={BTN_CLASS} >update</Button>}
               </Stack>
              </MyBox>

              <MyBox>
               <Form.Label>Caption</Form.Label>
               <Stack  gap={1} direction='row' sx={{width : '100%'  , alignItems :'center'}} >
                <input onChange={(e)=>setCaption(e.target.value)}   className='input'  value={caption}  placeholder='Type something..' size='sm'  />
              { caption !== user?.caption && <Button  onClick={updateCaption} className={BTN_CLASS}  >update</Button>}
               </Stack>
               
              </MyBox>


            </Stack>
            


        </Form>
    </Box>
  )
}

export default EditProfile


const UploadProfile = styled('div')({
    position :'relative' ,
    width : 'fit-content',
    borderRadius: '50%',
   
    
})

const InputFile = styled('input')({
    position : 'absolute' ,
    height : '100%' ,
    width : '100%' ,
    backgroundColor :'yellow' , 
    opacity : 0
    
})

const HoverInput = styled('div')({
    position : 'absolute' ,
    height : '100%' ,
    width : '100%' ,
    display : 'flex' ,
    justifyContent : 'center',
    alignItems:'center' ,
    backgroundColor :'rgb(0 , 0 , 0 , 0.4)',
    borderRadius: '50%'

})

const MyBox = styled('div')({
    display :'flex',
    flexDirection :'column',
    paddingInline : 3
})