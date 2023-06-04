const express = require('express')
const cors = require('cors') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userModel = require('./modeles/Users')
const {MongoClient} = require('mongodb')
// const db = client.db('mongotut')



const bcrypt = require('bcryptjs')
const app = express()
const port = 3001


<<<<<<< HEAD
app.use(cors(
  {
    origin : ["https://shees.netlify.app/" , "http://localhost:3000/" ]
}
))
=======
app.use(cors({
    origin : "https://shees.netlify.app/" 
}))
>>>>>>> e1b640f550d30665a5388510308d37387a44b137
app.use(express.json())

const Post = require('./modeles/Posts')
const Comment = require('./modeles/Comments')
const URI = 'mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery?retryWrites=true&w=majority'


async function main (){
    const client  = new MongoClient(URI)
    await client.connect()
    const db = client.db('gallery')
    console.log('client connected')

    //////////:signup

    app.post('/signup' , async (req , res)=>{
        const {fullname , username , email , password } = req.body
        const pwd = await bcrypt.hash(req.body.password , 10)
       
        const user = new userModel({
        
            fullname : req.body.fullname ,
            username  : req.body.username ,
            password : pwd ,
            email :   req.body.email ,
            pdp : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
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

   
    app.post("/add-video" , async(req , res)=>{
        const { url  , caption , tags , likers , savers , username , id} = req.body
        const post  = new Post({
            url  , caption , tags , likers , savers , id ,username
       })
        if(username , url  ){
            db.collection('posts').insertOne(post).then(()=>{
                res.send({status : "ok" , message : "your Shee is posted."})
            })
            .catch((err)=>{
                res.send({status : "err" , message : "Somthing went wrong"})
            })
        }else{
            res.send({status : "err" , message : "Something wrong while uploading your video!"})
        }

    })    




       

    app.get('/shees' ,   async (req , res)=>{
           const posts =  db.collection('posts').find({})
           const resuls  = await posts.toArray()  
           res.send({shees :resuls , status :'ok'})        
           if(!resuls) res.send({status : "err" , message : "Somthing went wrong"})

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
  
  
  



    
        
}

main()






mongoose.connect(
    'mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery'
   ).then(()=>{
        console.log('Mongofb is connectted')
   })




app.listen(port , ()=>{
    console.log('server is still running..')
})
