import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class PropertiesValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('title').trim().notEmpty().withMessage("Title is required"),
                    check('userId').trim().notEmpty().withMessage("userId is required"),
                    check('propertyType').trim().notEmpty().withMessage("propertyType is required"),
                    check('description').trim().notEmpty().withMessage("description is required"),
                    check('area').trim().notEmpty().withMessage("area is required"),
                    check('price').trim().notEmpty().withMessage("price is required"),
                    check('bhk').trim().notEmpty().withMessage("bhk is required"),
                    check('status').trim().notEmpty().withMessage("status is required").isIn(['readyToMove','underConstruction']).withMessage("status should be ['readyToMove','underConstruction']"),
                    check("lookingTo").trim().notEmpty().withMessage("lookingTo is required").isIn(['Buy', 'Rent/Lease','PG']).withMessage("lokingTo should be ['Buy', 'Rent/Lease','PG']"),
                    check('furnishedStatus').trim().notEmpty().withMessage("furnishedStatus is required").isIn(['unfurnished', 'semi-furnished', 'fully-furnished']).withMessage("furnishedStatus should be ['unfurnished', 'semi-furnished', 'fully-furnished']"),
                    check('parking').trim().optional().isIn(['Yes','No']).withMessage("should be ['Yes','No']"),
                    check('ownerName').trim().notEmpty().withMessage("ownerName is required"),
                    check('ownerPhoneNumber').trim().notEmpty().withMessage("ownerPhoneNumber is required").matches(/^[6-9]\d{9}$/).withMessage("invalid Phone number"),
                    check('propertyOnFloor').trim().notEmpty().withMessage("propertyOnFloor is required"),
                    check('totalFloor').trim().notEmpty().withMessage("totalFloor is required"),
                   // check('userId').trim().notEmpty().withMessage("userId is required"),
                    
                    
                ],
            }
        )
    }
}
export let propertiesValidator = new PropertiesValidator() 