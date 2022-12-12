const Vendor = require('./vendor.model');

exports.create = async (Data) => {
    try {
        let new_vendor = new Vendor(Data);
        let result = await new_vendor.save();
        if (result) {
            return {
                success: true,
                status: 201,
                message: "vendorAdded",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "vendorNotAdded"
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

exports.isExist = async (filter, populateType, select) => {
    try {
        let result = await Vendor.findOne(filter).populate(populateType).select(select);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Vendor is Exist",
                Data: result
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Vendor is Not Exist"
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


exports.list = async (filter, page, size, select) => {
    try {
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        const limit = parseInt(size);
        const skip = (page - 1) * limit;
        let result = await Vendor.find(filter).limit(limit).skip(skip).select(select);
        const totalResult = await Vendor.count(filter);
        const totalPages = Math.ceil(totalResult / limit);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "Vendors is Exist",
                Data: result,
                totalResult,
                totalPages,
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "Vendors is Not Exist"
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
        let result = await Vendor.findOneAndUpdate(filter, query,{new:true});
        if (result) {
            return {
                success: true,
                status: 200,
                message: "VendorUpdated",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "VendorNotUpdated"
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
        let result = await Vendor.findOneAndDelete(filter);
        if (result) {
            return {
                success: true,
                status: 200,
                message: "VendorDeleted",
            }
        }
        else {
            return {
                success: false,
                status: 400,
                message: "VendorNotDeleted"
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