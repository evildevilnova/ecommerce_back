const {check, validationResult} = require('express-validator');

// for signup
exports.validateRequest = [
    check('firstname')
    .notEmpty()
    .withMessage('First name is requied'),
    check('lastname')
    .notEmpty()
    .withMessage('lastname name is requied'),
    check('email')
    .isEmail()
    .withMessage('Invalid email'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password length must be 6 digit.4')
];
// for signin
exports.validatesigninRequest = [
    check('email')
    .isEmail()
    .withMessage('Invalid email'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password length must be 6 digit.4')
];

exports.isRequestValidated = (req, res, next) => {
    const errors =  validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({error: errors.array()[0].msg });
    }
    
    next();
};