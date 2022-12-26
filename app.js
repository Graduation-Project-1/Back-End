const express = require('express');
const app = express();
var cors = require('cors');
const connection = require('./connection/connection');
require('dotenv').config();
const customerRoutes = require('./routes/customer.routes');
const brandRoutes = require('./routes/brand.routes');
const adminRoutes = require('./routes/admin.routes');
const itemRoutes = require('./routes/item.routes');
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

app.use(customerRoutes);
app.use(brandRoutes);
app.use(adminRoutes);
app.use(itemRoutes);
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