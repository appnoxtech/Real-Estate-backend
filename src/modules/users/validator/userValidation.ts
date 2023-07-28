import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class UsersValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('name')
                       .trim()
                       .notEmpty()
                       .withMessage("name is required"),
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),
                    check('email')
                        .trim()
                        .notEmpty()
                        .withMessage("email is required")
                        .isEmail().withMessage('Invalid email address'),
                    ],  
                    
                login:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),
                ],
                logout:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone Number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),

                ],
                verifyOtp:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),
                ],
                generateOtp:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),
                    check('type')
                          .trim()
                          .notEmpty()
                          .withMessage('Type is required')
                          
                ],
                update:[
                    check('phoneNumber')
                        .trim()
                        .optional()
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits'),
                    check('email')
                        .trim()
                        .optional()
                        .isEmail().withMessage('Invalid email address'),
                ]
                       
            }
        )
    }
}
export let usersValidator = new UsersValidator() 