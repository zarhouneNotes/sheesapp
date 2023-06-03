import { useMediaQuery } from "usehooks-ts"

// export const isMobile = useMediaQuery('(max-width: 900px)')


 export async  function getAuth (){
       const token = JSON.parse(localStorage.getItem('auth')) 
      if (token) {
        const response =  await fetch('http://localhost:3001/user' , {
            method : 'GET' ,
            headers : {
                'x-access-token' : token
            }
         })
        const data  =await response.json()
        return data 
      } else {
        return null
      }
 }


 export async function addVideo (obj){
    const response = await fetch("http://localhost:3001/add-video" ,{
      method : 'POST' , 
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(obj)
    })
    const data = await response.json()
    return data
 }

 export async  function getUser (username){
  const response =  await fetch(`http://localhost:3001/user/${username}` , {
   method :'GET',
   headers: {
     'Content-Type': 'application/json',
   },
  })
  const data  =await response.json()
  return data 

}


export async  function getShee (id){
  const response =  await fetch(`http://localhost:3001/shees/${id}` , {
   method :'GET' ,
   headers: {
    'Content-Type': 'application/json',

  },
  })
  const data  =await response.json()
  
  return data 

}




export  async function pushLike(arr , id) {
  fetch(`http://localhost:3001/like/${id}`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      likers : arr 
    })
  }).then(async(res)=>{
        const response = await res.json()
        // console.log(response)
  })
}


export async function pushSave(arr , id) {
  fetch(`http://localhost:3001/save/${id}`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      savers : arr 
    })
  }).then(async(res)=>{
        const response = await res.json()
        // console.log(response)
  })
}




export async function pushComment (obj ){
  fetch(`http://localhost:3001/comment` , {
           method :'POST',
           headers: {
             'Content-Type': 'application/json',
         },
         body : JSON.stringify(obj)
  }).then( async(response)=>{
    const res = await response.json()
    console.log(res)
  })
}



export async function getComments (id){
  const res  = await fetch(`http://localhost:3001/comments/${id}` , {
    method : 'GET' ,
    headers : {
      'Content-Type': 'application/json',
    } 
  })

  const resp  = await res.json()
  return resp
}

// const [followers , setFollowers] = useState()
export async  function pushFollow (followers , userToFollow) {

  fetch(`http://localhost:3001/follow/${userToFollow}`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      followers : followers
      //  followers?.includes(follower)   ?  ()=>{followers?.map((username)=>{return username !== follower})} :  [...followers , follower] ,
    })
  }).then(async(res)=>{
        const response = await res.json()
        console.log(response)
  })
}


export async  function getFollowingList (username){
  const response =  await fetch(`http://localhost:3001/following/${username}` , {
   method :'GET',
   headers: {
     'Content-Type': 'application/json',
   },
  })
  const data  =await response.json()
  return data 

}


export async function getShees() {
  // setLoad(true) 
  const res = await  fetch('http://localhost:3001/shees' , {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}



export async function getProfileShees(username , saved) {
 
  const res = await  fetch(`http://localhost:3001/publications/${username}/${saved}` , {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}
