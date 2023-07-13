import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class RatingsValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('propertyId').trim().notEmpty().withMessage("propertyId is required").isUUID().withMessage("propertyId should be uuid"),
                    check('userId').trim().notEmpty().withMessage("userId is required").isUUID().withMessage("userId should be uuid"),
                    check('ratings').trim().notEmpty().withMessage("ratings is required")

                ],
            }
        )
    }
}
export let ratingsValidator = new RatingsValidator() 