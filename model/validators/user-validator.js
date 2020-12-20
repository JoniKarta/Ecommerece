

const { check } = require('express-validator');
const userService = require("../../logic/user-service");

module.exports = {
    validateEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be valid email')
        .custom(async (email) => {
            const existingUser = await userService.getSpecificUser(email);
            if (existingUser) {
                throw new Error('Email is use');
            }
        }),

    validatePassword: 
    check('password')
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage('password must be between 3 and 12 characters'),

    validateConfirmPassword: 
    check('confirmPassword')
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage('password must be between 3 and 12 characters')
        .exists()
        .custom((confirm) => {
            console.log(confirm)
        // }) 
            // console.log(req.body.confirm ,req.body.password);
            //     if (req.body.confirm !== req.body.password) {
            //         throw new Error("password don't match!");
            //     }
        }),
        
        validateUserEmailSignIn: 
        check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be valid email'),
    
        validateUserPasswordSignIn: 
        check('password')
        .trim()
        .isLength({min: 3, max: 12})
        .withMessage('Password must be between 3 and 12 characters')
        .custom(async (password, {req})=> {
            console.log(password, req.body.email, req.body.password)
            const user = await userService.getSpecificUser(req.body.email);
            if(!user) throw new Error('user not found!');
            const hasMatch = await userService.compareHash(password, user.password);
            if (!hasMatch) throw new Error("Password don't match");
        })
            
}