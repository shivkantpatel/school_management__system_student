const { body, validationResult } = require('express-validator');

let loginValidaion = [
    body('studentRollNo').notEmpty().withMessage('Roll No is required'),
    body('passwor_d').notEmpty().withMessage('Password No is required')
];

module.exports = loginValidaion