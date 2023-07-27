

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

export async  function pushFollow (followers , userToFollow , follower) {
   let isInList = followers?.includes(follower)
   let arr = !isInList ? [...followers , follower]  : followers?.filter((username)=> { return   username !== follower})
  fetch(`${process.env.REACT_APP_BASE_URL}/follow/${userToFollow}`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      followers : arr
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

export async function getUsers(username) {
  // setLoad(true) 
  const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/users/${username}`, {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}


export async function getProfileShees(username , saved) {
 
  const res = await  fetch(`${process.env.REACT_APP_BASE_URL}/publications/${username}/${saved}` , {
    method : 'GET' , 
    headers: {
      'Content-Type': 'application/json',

    }, 
  })
  const resp = await res.json()
  return resp

}


export async  function updateProfileHandel (username , key , value) {

  fetch(`${process.env.REACT_APP_BASE_URL}/update/${username}/${key}`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      newvalue : value
    })
  }).then(async(res)=>{
        const response = await res.json()
        console.log(response)
  })
}


export function chatIdGen(a, b ){
  return a>b ? a+b : b+a
}

export async function sendMessage (chatId , members , message){
  fetch(`${process.env.REACT_APP_BASE_URL}/send-message`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      chatId, members , message

    })
  }).then(async(res)=>{
        const response = await res.json()
        console.log(response)
  })
}



export async function getChats(username){

    const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/chats/${username}` , {
      method :'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     })
  const res  =await response.json()
  return res
}

export async function getChat(chatId){

  const response =  await fetch(`${process.env.REACT_APP_BASE_URL}/chat/${chatId}` , {
    method :'GET',
    headers: {
      'Content-Type': 'application/json',
    },
   })
const res  =await response.json()
return res
}


export async function CreateChat (chatId , members ){
  fetch(`${process.env.REACT_APP_BASE_URL}/create-chat`  , {
    method : 'POST' ,
    headers :{
      'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      chatId, members 

    })
  }).then(async(res)=>{
        const response = await res.json()
        console.log(response)
  })
}



export function timeAgo(input) {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}
