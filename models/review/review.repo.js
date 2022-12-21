const Review = require('./review.model');

exports.create = async (Data) => {
    try {
        let new_review = new Review(Data);
        let result = await new_review.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "reviewAdded",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "reviewNotAdded"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}

exports.isExist = async (filter, populateType) => {
    try {
        let result = await Review.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "review is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "review is Not Exist"
            }
        }
    } 
    catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
   }
}


exports.list = async (filter, page, size,populateType,select) => {
    //try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Review.find(filter).limit(limit).skip(skip).populate(populateType).select(select);
        const totalResult = await Review.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "review is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "review is Not Exist"
            }
        }
//     } 
//     catch {
//         return {
//             success: false,
//             status: 500,
//             message: "some thing wrong"
//         }
//    }
}


exports.update = async (filter, query) => {
    try {
        let result = await Review.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "reviewUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "reviewNotUpdated"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}


exports.delete = async (filter) => {
    try {
        let result = await Review.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "reviewDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "reviewNotDeleted"
            }
        }
    } catch {
        return {
            success: false,
            status: 500,
            message: "some thing wrong"
        }
    }
}