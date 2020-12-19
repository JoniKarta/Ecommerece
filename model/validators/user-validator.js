

const { body } = require('express-validator');
const userService = require("../../logic/user-service");

module.exports = {

    validateEmail: body('email')
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

    validatePassword: body('password')
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage('password must be between 6 and 12 characters'),

    validateConfirmPassword: body('confirm')
        .trim()
        .isLength({ min: 3, max: 12 })
        .withMessage('password mut be between 6 and 12 characters')
        .custom( function (confirm, { req }) {
                if (confirm !== req.body.password) {
                    throw new Error("password don't match!");
                }
            })
}