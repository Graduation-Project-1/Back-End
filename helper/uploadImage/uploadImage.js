const app = require('express').Router();
const { uploadFile, getFileStream } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniquePrifix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrifix + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
  if((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('jpg')){
      cb(null, true);
  } else{
      cb(null, false);

  }

};


const upload = multer({storage : storage, fileFilter: fileFilter,});


const uploadImages = async(req,res)=>{
    try{
      var files = [];
      // var fileKeys = Object.keys(req.files);
      // fileKeys.forEach(function(key) {
      //    files.push(req.files[key].path.replace(/\\/g, "/"));
      // });
      req.files.map(async(item)=>{
          await uploadFile(item).then((data)=>{
                    files.push(data.Location);
                    if(files.length == req.files.length){
                        res.json({ "state": true, "message": "File Uploaded SuceesFully", Data: files});
                    }
          });
          await unlinkFile(item.path);
      })
    }
    catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
     })
    }
    
}
app.post('/uploadImages', upload.array("images"), uploadImages);


module.exports = app;
