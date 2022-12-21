const Product = require('./product.model');

exports.create = async (Data) => {
    try {
        let new_product = new Product(Data);
        let result = await new_product.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "productAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "productNotAdded"
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
        let result = await Product.findOne(filter).populate(populateType);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Product is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Product is Not Exist"
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


exports.list = async (filter, page, size) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Product.find(filter).limit(limit).skip(skip);
        const totalResult = await Product.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Products is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Products is Not Exist"
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


exports.update = async (filter, query) => {
    try {
        let result = await Product.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ProductUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ProductNotUpdated"
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
        let result = await Product.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "ProductDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "ProductNotDeleted"
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