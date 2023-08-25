import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'


const isPositiveInteger = (value:any) => {
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error('totalFloor must be a positive integer');
    }
    return true;
};
class PropertiesValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('title').trim().notEmpty().withMessage("Title is required"),
                    check('userId').trim().notEmpty().withMessage("userId is required"),
                    check('type').trim().notEmpty().withMessage("type is required").isIn(['Commercial-property','Residential-property']).withMessage("type should be ['Commercial-property','Residential-property']"),
                    check('propertyType').trim().notEmpty().withMessage("propertyType is required"),
                    check('description').trim().notEmpty().withMessage("description is required"),
                    check('area').trim().notEmpty().withMessage("area is required"),
                    check('state').trim().notEmpty().withMessage("state is required"),
                    check('price').trim().notEmpty().withMessage("price is required"),
                    check('bhk').trim().notEmpty().withMessage("bhk is required"),
                    check('status').trim().notEmpty().withMessage("status is required").isIn(['readyToMove','underConstruction']).withMessage("status should be ['readyToMove','underConstruction']"),
                    check("lookingTo").trim().notEmpty().withMessage("lookingTo is required").isIn(['Sell', 'Rent/Lease','PG']).withMessage("lookingTo should be ['Sell', 'Rent/Lease','PG']"),
                    check('furnishedStatus').trim().notEmpty().withMessage("furnishedStatus is required").isIn(['unfurnished', 'semi-furnished', 'fully-furnished']).withMessage("furnishedStatus should be ['unfurnished', 'semi-furnished', 'fully-furnished']"),
                    check('parking').trim().optional().isIn(['Yes','No']).withMessage("should be ['Yes','No']"),
                    check('ownerName').trim().notEmpty().withMessage("ownerName is required"),
                    check('ownerPhoneNumber').trim().notEmpty().withMessage("ownerPhoneNumber is required").matches(/^[6-9]\d{9}$/).withMessage("invalid Phone number"),
                    check('propertyOnFloor').trim().notEmpty().withMessage("propertyOnFloor is required").isNumeric().withMessage("propertyOnFloor always in integerType"),
                    //check('totalFloor').trim().notEmpty().withMessage("totalFloor is required").isNumeric().withMessage("totalFloor always in integerType"),
                    check('totalFloor').trim().optional().isNumeric().withMessage('totalFloor must be a number').toFloat().isFloat({ min: 0 }).withMessage('totalFloor must be non-negative'),
                    check('propertyOnFloor').trim().optional().notEmpty().withMessage('propertyOnFloor is required').isNumeric().withMessage('propertyOnFloor must be a number')                   
                    
                ],
                getById:[
                    check('propertyId').trim().isUUID().withMessage("propertyId should be uuid")
                ],
                getByUserId:[
                    check('userId').trim().isUUID().withMessage("userId should be uuid")
                ],
                update:[
                    check('status').trim().optional().isIn(['readyToMove','underConstruction']).withMessage("status should be ['readyToMove','underConstruction']"),
                    check('ownerPhoneNumber').trim().optional().matches(/^[6-9]\d{9}$/).withMessage("invalid Phone number"),
                    check('parking').trim().optional().isIn(['Yes','No']).withMessage("should be ['Yes','No']"),
                    check('furnishedStatus').trim().optional().isIn(['unfurnished', 'semi-furnished', 'fully-furnished']).withMessage("furnishedStatus should be ['unfurnished', 'semi-furnished', 'fully-furnished']"),
                    check("lookingTo").trim().optional().isIn(['Sell', 'Rent/Lease','PG']).withMessage("lokingTo should be ['Sell', 'Rent/Lease','PG']"),
                    check('propertyOnFloor').trim().optional().isNumeric().withMessage("propertyOnFloor always in integerType"),
                    check('totalFloor').optional().isNumeric().withMessage('totalFloor must be a number').toFloat().isFloat({ min: 0 }).withMessage('totalFloor must be non-negative'),
                    check('type').trim().optional().isIn(['Commercial-property','Residential-property']).withMessage("type should be ['Commercial-property','Residential-property']"),
                ]
            }
        )
    }
}
export let propertiesValidator = new PropertiesValidator() 