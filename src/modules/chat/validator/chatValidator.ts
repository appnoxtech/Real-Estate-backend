import { Validator} from "../../../middleware/Validator/validator"
import {check} from 'express-validator'



class ChatValidator extends Validator{
    constructor(){
        super(
            {
                create:[
                    check('userId').trim().notEmpty().withMessage("userId is required").isUUID().withMessage("Id should be uuid"),
                ],
            }
        )
    }
}
export let chatValidator = new ChatValidator() 