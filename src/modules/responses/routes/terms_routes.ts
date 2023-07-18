import { Router } from "express";
import { termsController } from "../controllers/terms_and_conditions_controller";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
//import {termsValidator} from '../validator/termsValidator'


class MainRouter {

    router: Router;
    terms: termsController;
    validation:Validation
    constructor() {
        this.terms = new termsController()
        this.validation = new Validation()
        this.router = Router()
        this.termsRouters()
    }

    termsRouters() {
        try{
        this.router.route(`/api/v1/terms/create`)
            .post(this.terms.createTerms)
        this.router.route(`/api/v1/terms/update/:id`)
            .patch(this.terms.updateTerms)
        this.router.route(`/api/v1/terms/delete/:id`)
            .delete(this.terms.deleteterms)
            this.router.route(`/api/v1/get`)
            .get(this.terms.getAllterms)   

        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
