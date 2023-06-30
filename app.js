const express = require('express');
const app = express();
var cors = require('cors');
const connection = require('./connection/connection');
require('dotenv').config();
const schedule = require('node-schedule')

const fittingRoomItemRoutes = require('./routes/fittingRoom/item.routes');
const fittingRoomCustomerRoutes = require('./routes/fittingRoom/customer.routes');

const customerRoutes = require('./routes/customer.routes');
const brandRoutes = require('./routes/brand.routes');
const adminRoutes = require('./routes/admin.routes');
const itemRoutes = require('./routes/item.routes');
const categoryRoutes = require('./routes/category.routes');
//const offerRoutes = require('./routes/offer.routes');
const collectionRoutes = require('./routes/collection.routes');
const saleRoutes = require('./routes/sale.routes');
const advertisementRoutes = require('./routes/advertisement.routes');
const itemReviewRoutes = require('./routes/item.review.routes');
const brandReviewRoutes = require('./routes/brand.review.routes');
const collectionReviewRoutes = require('./routes/collection.review.routes');
const recommendationRoutes = require('./routes/recommendation.routes');
const uploadImageRoutes = require('./helper/uploadImage/uploadImage');
const stripeAPI = require('./helper/stripe/stripe');
const {deleteBrandBatch, checkSubscriptionCustomer} = require('./helper/batchProcessing/batchProcessing');
const {uploadLogsFile} = require('./helper/uploadImage/s3');
connection();
app.use(cors())
app.use(express.json());
app.use('/uploads',express.static ('uploads'))

app.use(customerRoutes);
app.use(fittingRoomCustomerRoutes);
app.use(fittingRoomItemRoutes);
app.use(brandRoutes);
app.use(adminRoutes);
app.use(itemRoutes);
app.use(categoryRoutes);
//app.use(offerRoutes);
app.use(collectionRoutes);
app.use(saleRoutes);
app.use(advertisementRoutes);
app.use(itemReviewRoutes);
app.use(brandReviewRoutes);
app.use(collectionReviewRoutes);
app.use(uploadImageRoutes);
app.use(stripeAPI);
app.use(recommendationRoutes);


app.get('/', (req,res)=>{
    res.send("hello")
})


schedule.scheduleJob('0 15 3 * * *' , function(){
    deleteBrandBatch();
    checkSubscriptionCustomer();
    //uploadLogsFile();
});


console.log(process.env.PORT);


const server = app.listen(process.env.PORT, ()=>{
    console.log("server is running");
})

const io = require('./helper/socket/socket').init(server);
io.on('connection', (socket) => {
    
});

module.exports = app;


