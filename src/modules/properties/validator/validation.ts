import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class PropertiesValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    // check('title').trim().notEmpty().withMessage("Title is required"),
                    // check('location').trim().notEmpty().withMessage("location is required"),
                    // check('latitude').trim().notEmpty().withMessage("latitude is required"),
                    // check('longitude').trim().notEmpty().withMessage("longitude is required"),
                    // check('lookingTo').trim().notEmpty().withMessage("lookingTo is required"),
                    // check('readyToMove').trim().notEmpty().withMessage('readyToMove is required'),
                ],
            }
        )
    }
}
export let propertiesValidator = new PropertiesValidator() 