const multer = require('multer')
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