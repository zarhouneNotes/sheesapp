const  {Server} = require('socket.io')
const io = new Server(Server ,{
    cors :{
        origin : ["https://sheesapp.onrender.com"  , 'http://localhost:3000'] 
    }
})

io.on('connection' , (socket)=>{
    console.log(socket.id)
})