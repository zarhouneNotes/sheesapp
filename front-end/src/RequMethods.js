import { useMediaQuery } from "usehooks-ts"

// export const isMobile = useMediaQuery('(max-width: 900px)')


 export async  function getAuth (){
       const token = JSON.parse(localStorage.getItem('auth')) 
      if (token) {
        const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/user` , {
            method : 'GET' ,
            headers : {
                'x-access-token' : token
            }
         })
        const data  =await response.json()
        return data 
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
  const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/user/${username}` , {
   method :'GET',
   headers: {
     'Content-Type': 'application/json',
   },
  })
  const data  =await response.json()
  return data 

}


export async  function getShee (id){
  const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/shees/${id}` , {
   method :'GET' ,
   headers: {
    'Content-Type': 'application/json',

  },
  })
  const data  =await response.json()
  
  return data 

}




export  async function pushLike(arr , id) {
  fetch(`${process.env.REACT_APP_BASE_URL}/like/${id}`  , {
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
  fetch(`${process.env.REACT_APP_BASE_URL}/save/${id}` , {
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
  fetch(`${process.env.REACT_APP_BASE_URL}/comment` , {
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
  const res  = await fetch(`${process.env.REACT_APP_BASE_URL}/comments/${id}` , {
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

  fetch(`${process.env.REACT_APP_BASE_URL}/follow/${userToFollow}`  , {
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


export async  function getFollowingList (id){
  const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/following/${id}` , {
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
  const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/shees`, {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}



export async function getProfileShees(username , saved) {
 
  const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/${username}/${saved}` , {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}
