const express = require('express');
const app = express();
var cors = require('cors');
const connection = require('./connection/connection');
require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const vendorRoutes = require('./routes/vendor.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
//const offerRoutes = require('./routes/offer.routes');
const collectionRoutes = require('./routes/collection.routes');
const advertisementRoutes = require('./routes/advertisement.routes');
const reviewRoutes = require('./routes/review.routes');
const uploadImageRoutes = require('./helper/uploadImage/uploadImage');
connection();
app.use(cors())
app.use(express.json());
app.use('/uploads',express.static ('uploads'))

app.use(userRoutes);
app.use(vendorRoutes);
app.use(adminRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
//app.use(offerRoutes);
app.use(collectionRoutes);
app.use(advertisementRoutes);
app.use(reviewRoutes);
app.use(uploadImageRoutes);

app.get('/', (req,res)=>{
    res.send("hello")
})


console.log(process.env.PORT);


app.listen(process.env.PORT, ()=>{
    console.log("server is running");
})