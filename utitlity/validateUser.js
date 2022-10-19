const {body, validationResult} = require('express-validator');

const userSchemaValidation = [
    body('username').exists({checkFalsy: true, checkNull: true}).withMessage("Username is a mandatory field"),
    body('email').exists().withMessage("Email is a mandatory field").isEmail().withMessage("Please enter valid email"),
    body('password').exists().withMessage("Password is a mandatory field").isLength({min: 5}).withMessage("Password length must be more than or equal to 5")
]

const requestSchemaValidation = (request, response, next) => {
    const errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(404).json({errors: errors.array()})
    }
    next();
}

module.exports = {
    requestSchemaValidation,
    userSchemaValidation
}
