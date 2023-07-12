const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    password : {
        type : String ,
        required : true ,
    
    } ,

    email : {
        type : String ,
        required : true ,
        unique : true
    } ,
    username : {
        type : String , 
        required : true , 
        unique : true ,
    },
    fullname : {
        type : String , 
        required : true , 
    },
     pdp : {
        type : String ,
    
    } , 
    followers : {type : Array} , 
    following : {type : Array} ,
    caption : {type : String }
})


const userModel = mongoose.model('users' , userSchema)
module.exports = userModel