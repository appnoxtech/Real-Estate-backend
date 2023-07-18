import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class TermsValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                     check('terms_and_conditions').trim().notEmpty().withMessage("terms_and_conditions is required"),
                    // check('userId').trim().notEmpty().withMessage("userId is required").isUUID().withMessage("userId should be uuid"),
                    // check('ratings').trim().notEmpty().withMessage("ratings is required")

                ],
            }
        )
    }
}
export let termsValidator = new TermsValidator() 