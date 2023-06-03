const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id : {type : String , required : true} ,
    username : {type : String , required : true} ,
    url :{type : String , required : true} ,
    caption : {type : String } ,
    tags : {type : Array} , 
    likers : {type : Array} ,
    savers : {type : Array}

})

const Post = mongoose.model('posts' , postSchema)
module.exports = Post