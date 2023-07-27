const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const http = require('http')
const userModel = require('./modeles/Users')
const {MongoClient} = require('mongodb')
// const db = client.db('mongotut')

const bcrypt = require('bcryptjs')
const app = express()
const port = 3001

const Post = require('./modeles/Posts')
const Comment = require('./modeles/Comments')
const { uploadHandler, uploadVideo } = require('./upload-handler')
const  Grid  = require('gridfs-stream')
const ChatModel = require('./modeles/Chat')
const MONGO_URL = 'mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery?retryWrites=true&w=majority'



// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../../client/build')));
//     app.get('*', (req, res) => {
//       res.sendFile(
//         path.resolve(__dirname, '../../client', 'build', 'index.html')
//       );
//     });
//   }

app.use(cors({ origin :  ["https://sheesapp.onrender.com"  , 'http://localhost:3000'] }))
app.use(express.json())
const server = http.createServer(app)
/////////// socket io     
const  {Server} = require('socket.io') 

const io = new Server(server ,{
    cors :{
        origin : 'http://localhost:3000',
        methods: ["GET", "POST"],
    }
})


let users = []
io.on('connection' , (socket)=>{
    
    socket.on('addUser' , (username)=>{
        const UserExi = users.some((user)=> user?.username === username  )
        !UserExi && users.push({username , socketId : socket.id})
        io.emit('getUsers' , users)
     })


     socket.on('send-message' , (data)=>{
        const {message , username} = data
        const receiver = users.find((user)=>{
            return user?.username === username
        })
        io.to(receiver?.socketId).emit('receive-message' , message)
        io.to(socket.id).emit('send-message' , data)

     } )
    
     socket.on('disconnect' , ()=>{
        users = users.filter((user)=>user?.socketId !== socket.id)
        io.emit('getUsers' , users)
     })

})
////////////////////////s


let  gfs ;

async function main  (){



    const client  = new MongoClient(MONGO_URL)
    await client.connect()
    const db = client.db('gallery')
    console.log('client connected')
    //// bucket
     let bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "photos"
      });
      ///// files
      gfs = Grid(db , mongoose.mongo)
       gfs.collection('photos')


app.get('/images/:filename' , async (req , res)=>{
  
    const file =  await gfs.files.findOne({ filename: req.params.filename })
    // , (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
    
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = bucket.openDownloadStreamByName(req.params.filename );
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not an image'
          });
        }
    //   });
})

      //////////////// read video  




// app.get('/videos/:filename' , async (req , res)=>{
//        const  file_name = req.params.filename


//      const file =await    shees.files.findOne({filename : file_name})
//     //  const file = files[0]
//      if (!file  || file.length=== 0 ) {
//         return res.status(400).json({ message: 'file does not exist !' });

//         }else{
//         // const range = 10000

//         // const length = file.length

//         // const startChunk = 100000
//         // const endChunk = length - 1;
//         // const chunkSize = endChunk - startChunk + 1;
       
//         // const headers  = {
//         //     'Content-Range': `bytes ${startChunk}-${endChunk}/${length}`,
//         //     'Content-Length': chunkSize,
//         //     'Content-Type': 'audio/mpeg',
//         //     'Accept-Ranges': 'bytes',
//         //   }
//         // res.status(206 , headers)
//     //    const rs =  

//     // bucket_.openUploadStream( file.filename ).pipe(res)
//     // shees.createReadStream("https://www.youtube.com/watch?v=6MItl7jFRU0&t=3339s&ab_channel=%D9%82%D9%86%D8%A7%D8%A9%D8%B1%D9%88%D8%A7%D8%A6%D8%B9%D8%A7%D9%84%D8%B4%D9%8A%D8%AE%D8%A7%D9%84%D9%85%D9%86%D8%B4%D8%A7%D9%88%D9%8A").pipe(res)
     
      
//     //  res.send({ file })

    
//         }
   
     
      
    
       

   


  
    
      
    

   
// })

    //////////:signup

app.post('/signup' , async (req , res)=>{
    const {fullname , username , email , password } = req.body
    const pwd = await bcrypt.hash(req.body.password , 10)
    
    const user = new userModel({
    
        fullname : req.body.fullname ,
        username  : req.body.username ,
        password : pwd ,
        email :   req.body.email ,
        pdp : 'default.png',
        followers :[] ,
        following :[]
    }) 
    try {
        if (fullname && username && email && password ) {
        db.collection('users').insertOne(user).then(()=>{
            console.log( "user added successfully")
                res.send({status : "ok" , message : "user added successfully"})
        }).catch(()=>{
            res.send({status :'err' , message : 'username/email is already is use!'})
            console.log( "somthing wrong !!")
        })
        
        }else{
        res.send({status : "err" , message : "please fill all the form!"})
        }

    } catch (error) {
            
    }
})

/////////login

app.post('/login' , async (req , res)=>{

    
    const user = await userModel.findOne({
        email : req.body.email 
    })  
    const isPwdValid = await bcrypt.compare(req.body.password , user.password)

    if(!user){
            res.send({status : 'err' , message :'user not found'})
    }
    if(!isPwdValid && user){
        res.send({status : 'err' , message : 'wrong credintials'})
    }

    
    if( user &&  isPwdValid) { 
        const { fullname , username , email  , followers , following , pdp } = user
        const token = jwt.sign({
            fullname , username , email  , followers , following , pdp
        } , "shikamaru_320")


            
            res.send({status : 'ok'   ,info :token}) 
    } 

    

    
})  

app.get('/user' , async (req , res)=>{
    const tk = req.headers['x-access-token']
    
        if (tk) {
        const user = jwt.verify(tk ,"shikamaru_320" )
        userModel.findOne({email : user.email})
        .then((result)=>{
            res.send({result , status : 'ok'})
        })
        .catch (error =>res.send({status : 'err' , message : 'invalid Token !'}) ) 
        }
})


// app.use('/videos', express.static(path.join(__dirname, 'public')))
app.post("/add-video", async(req , res)=>{
    const {  caption , tags , likers , savers , username ,url, id} = req.body
    // const {filename} = req.file
    const post  = new Post({
        url   , caption , tags , likers , savers , id ,username
    })

    if(username , url  ){
        db.collection('posts').insertOne(post).then(()=>{
          return  res.send({status : "ok" , message : "posted successfully!" })
        })
        .catch((err)=>{
           return res.send({status : "err" , message : "Somthing went wrong"})
        })
    }else{
        return   res.send({status : "err" , message : "Something wrong while uploading your video!"})
    }
 

})    




       

app.get('/shees' ,   async (req , res)=>{
        const posts =  db.collection('posts').find({})
        const resuls  = await posts.toArray()  
        res.send({shees :resuls , status :'ok'})        
        if(!resuls) res.send({status : "err" , message : "Somthing went wrong"})

})      

app.get('/users/:username' ,   async (req , res)=>{
    const users =  db.collection('users').find({})
    const resuls  = await users.toArray()  
    const arr  = req.params.username ? resuls.filter((user)=>{return user?.username !== req.params.username }) : resuls
    res.send({users :arr , status :'ok'})        
    if(!resuls) {res.send({status : "err" , message : "Somthing went wrong"})}

})  


app.get('/shees/:id' , async (req , res)=>{
        const i = req.params.id
         const post = await db.collection('posts').findOne({ id :i})
        // const post  = await Post.findById(i)
         
        res.send({shee : post})
        if(!post) res.send({status : "err" , message : "No shee found!!"})

 })     
 app.get('/user/:username' , async (req , res)=>{
    const i = req.params.username
    const user = await db.collection('users').findOne({ username :i})
    res.send({user : user})
     if(!user) res.send({status : "err" , message : "No shee found!!"})
  
})   



app.post('/comment' ,async (req , res)=>{
    const {content , author , post , time} = req.body
    const comment = new Comment({
        content , author , time , post
    })
    db.collection('comments').insertOne(comment)
    .then(()=>{
        res.send({status :'ok'})
    })
    .catch((err)=>{
        res.send({status: 'err' , message : err})
    })
})


app.get('/comments/:postid' , async(req , res)=>{
    const comments =  db.collection('comments').find({post  : req.params.postid})
    const arr = await comments.toArray()
    res.send({status : 'ok' , data : arr})
    if(!arr) res.send({status : 'err' , message : 'something wrong'})
})


app.post('/like/:postid' , async(req , res)=>{
    const i = req.params.postid
    const post = await db.collection('posts').updateOne({ id :req.params.postid} , {
        $set : {
            likers : req.body.likers
        }
    })
    res.send({status : 'ok' , messag :'liked successfully'})
    
    
    if(!post) res.send({status : "err" , message : "No shee found!!"})
})


app.post('/save/:postid' , async(req , res)=>{
    const i = req.params.postid
    const post = await db.collection('posts').updateOne({ id :req.params.postid} , {
        $set : {
            savers : req.body.savers
        }
    })
    res.send({status : 'ok' , messag :'saved successfully'})
    
    
    if(!post) res.send({status : "err" , message : "saving failed!!"})
})

  

app.post('/follow/:username' , async(req , res)=>{
    const userToFollow = req.params.username

    const following = await db.collection('users').updateOne({ username :userToFollow} , {
        $set : {
            followers : req.body.followers
        }
    })

   
    
    res.send({status : 'ok' , messag :'followed succesflly'})
    if(!following) res.send({status : "err" , message : "follow failed!!"})
})


app.get('/following/:username' , async (req , res)=>{
    const list  = db.collection('users').find({
    })
    const arr = await list.toArray()
    const iamFollowing = arr.filter((user)=>{
        return user.followers.includes(req.params.username) 
    })
    res.send({iamFollowing})
})




app.get('/publications/:username/:saved' , async (req , res)=>{
    const list  = db.collection('posts').find({
    })
    const arr = await list.toArray()
    const data = arr.filter((post)=>{
        return req.params.saved=='true' ? post?.savers?.includes(req.params.username)
                                 : req.params.username == post?.username
    })
    res.send({data})
})
  
////////////////// 



app.post('/update/:username/:key' , async (req ,res)=>{
    const key = req.params.key
       
            
         await db.collection('users').updateOne({username : req.params.username} , {
            $set : {
                [key] : req.body.newvalue
            }
           }).then(()=>{
                res.send({ message: 'updated successfully!!'  })
           }).catch(()=>{
            res.send({ message: 'somthing went wrong!!'  })
           })
        
    
})



// app.use('/images', express.static(path.join(__dirname, 'public')))

// app.use('/file' , :uploadHandler)

app.post('/upload/:username' , uploadHandler.single('photo') , async (req , res)=>{
  const {filename} = req.file
  if (!filename) {
    return res.status(400).json({ message: 'failed' });
  }
    await db.collection('users').updateOne({username : req.params.username} , {
        $set : {
            pdp :`${filename}`
        }
       }).then(()=>{
            res.send({ message: 'updated successfully!!'  })
       }).catch(()=>{
        res.send({ message: 'somthing went wrong!!'  })
       })

})


app.post('/send-message' , async (req , res)=>{
    const {chatId , message , members} = req.body
    // if(!message?.content || !message?.url) return  res.send(500, {error});
  
 try {
     
    ChatModel.findOneAndUpdate({chatId : chatId} ,{
        $push : {messages : message}, 
        $set : {members : members}
    } , {
        upsert : true
    }).then(()=>{
    
       return res.json({ message: 'sent!' });
    })

} catch (error) {
    return res.send(500, {error});
}

})

app.get('/chats/:username' , async(req , res)=>{
   const chats = await ChatModel.find({members : req.params.username})
   if(!chats){ return  res.status(400).json({ message: 'somthing went wrong'  , status :'err'});}
   return  res.json({ status: 'ok' ,data : chats });
})

app.get('/chat/:id' , async(req, res)=>{
     ChatModel.findOne({chatId : req.params.id})
     .then((chat)=>{
        if(!chat){     
            return  res.status(400).json({ status: 'no chat found' });
        }
        return res.json({ status: 'ok' , data : chat });
     })
   
})


app.post('/create-chat' , async(req, res)=>{
    const {chatId , members} = req.body
    ChatModel.exists({chatId : chatId})
    .then(async(chat)=>{
       if(chat){     
           return  res.status(400).json({ status: 'chat alraeady exost!' });
       }
       const newChat = new ChatModel({
        chatId ,
        members ,
        messages : []
       })

       await newChat.save()
       console.log('chat created :' ,  chatId)
    })
  
})




    
        
}

main()






mongoose.connect(
    'mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery'
   ).then(()=>{
        console.log('Mongofb is connectted')
   })




server.listen(port , ()=>{
    console.log('server is still running..')
})
