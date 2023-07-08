const multer = require('multer')
<<<<<<< HEAD
const MAX_FILE_SIZE = 100*1024*1024

const options = {
    storage : multer.diskStorage({
        destination : (_1 , _2 , cb)=> cb(null , "uploads/videos"),
        filename : (_,file , cb)=>{
            const uniq_sufix = Date.now()+"-"+Math.round(Math.random()*1e9)
            cb(null , file.fieldname+"-"+uniq_sufix)
        },
        fileFilter: (_, file, cb) => {
            if (file.mimetype === "video/mp4" || file.mimetype === "video/x-matroska") {
              cb(null, true);
            } else {
              cb(new multer.MulterError("File type not supported"), false);
            }
          },
    }),
    limits : {fileSize : MAX_FILE_SIZE}
}


const uploadHandler = multer(options).single("video")
module.exports = {uploadHandler}
=======
const { GridFsStorage } = require('multer-gridfs-storage')
const MAX_FILE_SIZE = 10*1024*1024



const storage_av = new GridFsStorage({
  url :"mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery?retryWrites=true&w=majority",
  file : (req , file)=>{
    const match = ["image/png" , "image/jpeg"] 
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`
      return filename
    }
    return {
      bucketName : "photos" ,
      filename : `${Date.now()}_${file.originalname}`
    }
  }
})

const uploadHandler = multer({storage : storage_av})



/////////////////////::

const storage_shee =  new GridFsStorage({
  url :"mongodb+srv://zarhounehoussine:zarhoune@users.avi47la.mongodb.net/gallery?retryWrites=true&w=majority",
  file : (req , file)=>{
    return {
      bucketName : "videos" ,
      filename : `${Date.now()}_${file.originalname.replace(/\s+/g, '')}`
    }
  },

})

 const  fileFilter =  (_, file, cb) => {
  if (file.mimetype === "video/mp4" || file.mimetype === "video/x-matroska") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("File type not supported"), false);
  }
}

const uploadVideo = multer({
  storage : storage_shee , 
  fileFilter : fileFilter , 
  limits : MAX_FILE_SIZE*5,
});
module.exports = { uploadVideo  , uploadHandler};
>>>>>>> 47c58b6 (chat)
