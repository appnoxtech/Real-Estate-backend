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
                        .matches(/^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/)
                        .withMessage("Invalid Phone number"),
                    check('email')
                        .trim()
                        .isEmail().withMessage('Invalid email address'),
                    ],  
                    
                login:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^[0-9 +]+$/)
                        .withMessage("Invalid Phone number"),
                ],
                logout:[
                    check('phoneNumber')
                        .trim()
                        .notEmpty()
                        .withMessage("phone number is required")
                        .matches(/^(?:(?:\+|0{0,2})1(\s*[\-]\s*)?)?\(?[2-9]\d{2}\)?[-.\s]?[2-9]\d{2}[-.\s]?\d{4}$/)
                        .withMessage("Invalid Phone Number"),

                ]  
                       
            }
        )
    }
}
export let usersValidator = new UsersValidator() 