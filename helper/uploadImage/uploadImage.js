const app = require('express').Router();
const { uploadFile } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const User = require('../../models/user/user.repo');
const Vendor = require('../../models/vendor/vendor.repo');
const Category = require('../../models/category/category.repo');
const Collection = require('../../models/collection/collection.repo');
const Advertisement = require('../../models/advertisement/advertisement.repo');
const Product = require('../../models/product/product.repo');

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


const uploadImageUser = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const userData = {
        image : result.Location,
    };
    let data = await User.update({_id : id}, userData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck user Id";
    }
    res.status(data.status).json(data);
  }
  catch{
    res.status(500).json({
      success: false,
      status: 500,
      message: "some thing wrong"
   })
  }
}


const uploadImageVendor = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const vendorData = {
        image : result.Location,
    };
    let data = await Vendor.update({_id : id}, vendorData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck vendor Id";
    }
    res.status(data.status).json(data);
  }
  catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
    })
 }
}

const uploadImageCategory = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const categoryData = {
        image : result.Location,
    };
    let data = await Category.update({_id : id}, categoryData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck category Id";
    }
    res.status(data.status).json(data);
 }
  catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
    })
 }
}

const uploadImageCollection = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const collectionData = {
        image : result.Location,
    };
    let data = await Collection.update({_id : id}, collectionData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck collection Id";
    }
    res.status(data.status).json(data);
 }
  catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
    })
 }
}


const uploadImageAdvertisement = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const advertisementData = {
        image : result.Location,
    };
    let data = await Advertisement.update({_id : id}, advertisementData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck advertisement Id";
    }
    res.status(data.status).json(data);
 }
  catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
    })
 }
}


const uploadProductCover = async(req,res)=>{
  try{
    const result = await uploadFile(req.file);
    await unlinkFile(req.file.path);
    const id = req.params.id;
    const productData = {
        cover : result.Location,
    };
    let data = await Product.update({_id : id}, productData);
    if(data.success == true){
      data.message = "Image Uploaded SuceesFully";
    }else{
      data.message = "please ckeck product Id";
    }
    res.status(data.status).json(data);
 }
  catch{
      res.status(500).json({
        success: false,
        status: 500,
        message: "some thing wrong"
    })
 }
}


const uploadImagesProduct = async(req,res)=>{
  try{
    var files = [];
    req.files.map(async(item)=>{
        await uploadFile(item).then(async(data)=>{
                  files.push(data.Location);
                  if(files.length == req.files.length){
                        const id = req.params.id;
                        const productData = {
                            images : files,
                        };
                        let data = await Product.update({_id : id}, productData);
                        if(data.success == true){
                          data.message = "Image Uploaded SuceesFully";
                        }else{
                          data.message = "please ckeck product Id";
                        }
                        res.status(data.status).json(data);
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

app.post('/uploadImageUser/:id', upload.single("images"), uploadImageUser);
app.post('/uploadImageVendor/:id', upload.single("images"), uploadImageVendor);
app.post('/uploadImageCategory/:id', upload.single("images"), uploadImageCategory);
app.post('/uploadImageCollection/:id', upload.single("images"), uploadImageCollection);
app.post('/uploadImageAdvertisement/:id', upload.single("images"), uploadImageAdvertisement);
app.post('/uploadProductCover/:id', upload.single("images"), uploadProductCover);
app.post('/uploadImagesProduct/:id', upload.array("images"), uploadImagesProduct);

module.exports = app;
