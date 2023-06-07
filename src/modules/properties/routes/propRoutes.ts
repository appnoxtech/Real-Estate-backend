import { Router } from "express";
import { PropertyController } from "../controllers/propController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";


class MainRouter {

    router: Router;
    property: PropertyController;
    validation:Validation
    constructor() {
        this.property = new PropertyController()
        this.validation = new Validation()
        this.router = Router()
        this.propertyRouters()
    }

    propertyRouters() {
        try{
        this.router.route(`/api/v1/create`)
            .post(this.property.createProperty)
        this.router.route(`/api/v1/update/:id`)
            .patch(this.validation.checkValidation,this.property.updateProperty)
        this.router.route(`/api/v1/delete/:id`)
            .delete(this.validation.checkValidation,this.property.deleteProperty)
        this.router.route(`/api/v1/:propertyId`)
            .get(this.validation.checkValidation,this.property.getPropertyById)
            this.router.route(`/api/v1/properties`)
            .get(this.validation.checkValidation,this.property.getAllProperties)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
