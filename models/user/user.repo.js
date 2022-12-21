const User = require('./user.model');

exports.create = async (Data) => {
    try {
        let new_user = new User(Data);
        let result = await new_user.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "userAdded",
                Data : result,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "userNotAdded"
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

exports.isExist = async (filter,populateType , select) => {
    try {
        let result = await User.findOne(filter).populate(populateType).select(select);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "User is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "User is Not Exist"
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

exports.list = async (filter, page, size,select) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await User.find(filter).limit(limit).skip(skip).select(select);
        const totalResult = await User.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "User is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "User is Not Exist"
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
        let result = await User.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "userUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "userNotUpdated"
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
        let result = await User.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "userDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "userNotDeleted"
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