const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content : {type : String, required :true , minLength : 1} ,
    author : {type : String , required :true} ,
    post :{type : String , required :true},
    time : {type : Date}
})

const Comment = mongoose.model('comments' , commentSchema)
module.exports  = Comment