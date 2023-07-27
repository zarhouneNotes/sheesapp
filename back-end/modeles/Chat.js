const mongoose = require('mongoose')

const chatScheema = new mongoose.Schema({
    chatId : {type : String , required : true} ,
    members : {type : Array  , required : true} ,
    messages : {type : Array , required : true}
})

const msgSchema =  new mongoose.Schema({
    isShee : {type : Boolean} ,
    content : {type : String , required : true} ,
    time : {type : Date} ,
    sender : {type : String , required : true} ,
})

const ChatModel = mongoose.model('chats' , chatScheema)
module.exports = ChatModel