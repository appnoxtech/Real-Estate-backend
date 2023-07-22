import { Router } from "express";
import { feedBackController } from "../controllers/feedback_controller";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
//import {termsValidator} from '../validator/termsValidator'

class MainRouter {

    router: Router;
    terms: feedBackController;
    validation:Validation
    constructor() {
        this.terms = new feedBackController()
        this.validation = new Validation()
        this.router = Router()
        this.feedbackRouters()
    }
    feedbackRouters() {
        try{
        this.router.route(`/api/v1/feedback/create`)
            .post(this.terms.createFeedback)
        this.router.route(`/api/v1/delete/:id`)
            .delete(this.terms.deleteFeedback)
            this.router.route(`/api/v1/get/:id`)
            .get(this.terms.getbyId)   

        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
