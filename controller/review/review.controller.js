const Review = require('../../models/review/review.repo');
const Item = require('../../models/item/item.repo');

const addReview = async(req,res)=>{
    const reviewData = req.body;
    reviewData.customerId = req.user.id;
    let data = await Review.create(reviewData);
    let itemData = await Item.isExist({_id : reviewData.itemId});
    let sumOfRate = itemData.Data.averageRate * itemData.Data.numberOfReviews;
    sumOfRate += reviewData.rate;
    let averageRate = sumOfRate / (itemData.Data.numberOfReviews+1);
    await Item.update({_id : reviewData.itemId}, {$inc : {'numberOfReviews' : 1} , averageRate : averageRate})
    res.status(data.status).json(data);
}

const getReviewById = async(req,res)=>{
    const id = req.params.id;
    let data = await Review.isExist({_id:id});
    res.status(data.status).json(data);
}

const updateReview = async(req,res)=>{
    const id = req.params.id;
    const reviewData = req.body;
    let data = await Review.update({_id:id, customerId : req.user.id}, reviewData);
    res.status(data.status).json(data);
    // let review = await Review.isExist({_id:id});
    // if(review.Data.customerId == req.user.id){
        
    // }else{
    //     res.status(400).json({
    //         success: false,
    //         status: 400,
    //         message: "you can not update this comment"
    //     });
    // }
}


const deleteReview = async(req,res)=>{
    const id = req.params.id;
    let data = await Review.delete({_id:id, customerId : req.user.id});
    if(data.success == false){
        data.message = "you can not delete this comment";
    }
    res.status(data.status).json(data);
    // let review = await Review.isExist({_id:id});
    // if(review.success == true){
    //     if(review.Data.customerId == req.user.id){
    //         let data = await Review.delete({_id:id, customerId : req.user.id});
    //         res.status(data.status).json(data);
    //     }else{
    //         res.status(400).json({
    //             success: false,
    //             status: 400,
    //             message: "you can not delete this comment"
    //         });
    //     }
    // }else{
    //     res.status(400).json({
    //         success: false,
    //         status: 400,
    //         message: "you can not delete this comment"
    //     });
    // }
    
}


const getAllReviews = async(req,res)=>{
    const id = req.params.id;
    let {page, size } = req.query;
    let data = await Review.list({itemId : id},page,size, { path: 'customerId', select: 'name image' } , "-itemId");
    res.status(data.status).json(data);
}


module.exports = {
    addReview,
    getReviewById,
    updateReview,
    deleteReview,
    getAllReviews,
}