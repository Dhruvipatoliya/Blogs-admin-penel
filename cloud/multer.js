const multer=require('multer');

const path=require('path');
const AvtarPath = '/upload'
const storage=multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, path.join(__dirname,'..',AvtarPath))
    }
});

const upload= multer({
    storage
});

module.exports=upload;
