import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'


export class FavouriteValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('propertyId').trim().notEmpty().withMessage("propertyId is required").isUUID().withMessage("Id should be uuid"),
                    check('status').trim().notEmpty().withMessage("status is required").isIn(['L','D']).withMessage("should always be Like [L] and Dislike [D]")
                ],
            }
        )
    }
}
export let favValidator = new FavouriteValidator() 