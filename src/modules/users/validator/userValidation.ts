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
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number")
                        ,
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
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number"),
                ],
                logout:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number"),

                ],
                verifyOtp:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number"),
                ],
                generateOtp:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number"),
                    check('type')
                          .trim()
                          .notEmpty()
                          .withMessage('Type is required')
                          
                ],
                update:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .isLength({min:10,max:10})
                        .withMessage('Phone no must be 10 digits')
                        .matches(/^[6-9]\d{9}$/)
                        .withMessage("Invalid Phone number"),
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