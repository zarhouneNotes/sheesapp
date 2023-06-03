import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import ProfileBody from './ProfileBody'
import { getAuth, getProfileShees, getUser } from '../../RequMethods'
import { useParams } from 'react-router-dom'
import ProfileLoad from './ProfileLoad'

function Profile() {
  const [user , setUser] = useState()
  const [shees , setShees] = useState([])
  const [load , setLoad] = useState(true)
  const [sheesLoad , setSheesLoad] = useState(true)
  const [saved , setSaved] = useState(false)
  const [pubs , setPubs] = useState(0)
  const params = useParams()
    
  useEffect( ()=>{
      setLoad(true)
      getUser(params?.id)
      .then((res)=>{
          setUser(res.user)
          setLoad(false)
      })
      .catch(()=>{
         alert('something went wrong')
      })
  },[params?.id])  

  const [auth , setAuth] = useState()
 useEffect(()=>{
  getAuth().then((res)=>{
    setAuth(res.result)
  })
 },[])


  useEffect(()=>{
    setSheesLoad(true)
    getProfileShees(params?.id , saved)
    .then((res)=>{
      !saved ? setPubs(res?.data?.length) : setPubs(pubs)
      setShees(res?.data)
      setSheesLoad(false)
    })
    
  },[params?.id , saved])




  return load  ? <ProfileLoad /> :  (
    <div className=' bottom-space col-12 col-lg-9 profile-page mx-auto h-100'>
      <ProfileHeader pubs={pubs}  auth={auth}  user={user}/>
      {<ProfileBody load={sheesLoad}  auth={auth}  user={user}  shees={shees} setSaved={setSaved} />}
    </div>
  )
}

export default Profile