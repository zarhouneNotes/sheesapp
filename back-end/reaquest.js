const Joi = require("joi")

const schema = Joi.object().keys({
    _id : Joi.string().optional(),
    title : Joi.string().min(3).max(30).required()
})

const validateData = (data)=>{
    const isValidate = schema.validate(data)
    console.log("isvalid :" +isValidate)
    return isValidate
}

module.exports = {
    validateData,
}


