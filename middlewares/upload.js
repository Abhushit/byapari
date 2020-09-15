const multer = require('multer');
const path = require('path');
// const upload = multer({
//     dest:'./uploads/images'
// })

function filter(req,files,cb){
    var mimeType = files.mimetype.split('/')[0];
        if(mimeType != 'image'){
            req.errHandle = true;
            cb(null, false);
        }else{
            cb(null,true); 
        }    
}

const myStorage = multer.diskStorage({
    filename: function(req,files,cb){
        cb(null, Date.now() + '-' + files.originalname);
    },
    destination: function(req,files,cb){
        cb(null,path.join(process.cwd(),'uploads/images'));
    }   
})

const upload = multer({
    storage : myStorage,
    fileFilter: filter
})

module.exports = upload;