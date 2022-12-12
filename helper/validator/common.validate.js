module.exports = (schema)=>{
    return (req,res,next) =>{
        var validation = [];
        var validationResult = schema.body.validate(req.body);
        if(validationResult.error){
            validation.push(validationResult.error.details[0].message);
        }
        if(validation.length){
            console.log(validationResult.error.details);
            res.json({
                message : validation.join(),
            })
            return;
        }
        next();
    }
}