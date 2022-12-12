const Review = require('../../models/review/review.repo');

const addReview = async(req,res)=>{
    const reviewData = req.body;
    reviewData.userId = req.user.id;
    let data = await Review.create(reviewData);
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
    let data = await Review.update({_id:id, userId : req.user.id}, reviewData);
    res.status(data.status).json(data);
    // let review = await Review.isExist({_id:id});
    // if(review.Data.userId == req.user.id){
        
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
    let data = await Review.delete({_id:id, userId : req.user.id});
    if(data.success == false){
        data.message = "you can not delete this comment";
    }
    res.status(data.status).json(data);
    // let review = await Review.isExist({_id:id});
    // if(review.success == true){
    //     if(review.Data.userId == req.user.id){
    //         let data = await Review.delete({_id:id, userId : req.user.id});
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
    let data = await Review.list({productId : id},page,size, { path: 'userId', select: 'name image' } , "-productId");
    res.status(data.status).json(data);
}


module.exports = {
    addReview,
    getReviewById,
    updateReview,
    deleteReview,
    getAllReviews,
}