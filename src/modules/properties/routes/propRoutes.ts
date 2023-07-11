import { Router } from "express";
import { PropertyController } from "../controllers/propController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
import {propertiesValidator} from '../validator/validation'


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
        this.router.route(`/api/v1/property/create`)
            .post(propertiesValidator.makeValidation('create'),this.property.createProperty)
        this.router.route(`/api/v1/property/update/:id`)
            .patch(this.property.updateProperty)
        this.router.route(`/api/v1/property/delete/:id`)
            .delete(this.property.deleteProperty)
        this.router.route(`/api/v1/property/:propertyId`)
            .get(this.property.getPropertyById)
            this.router.route(`/api/v1/properties`)
            .get(this.property.getAllProperties)
        this.router.route(`/api/v1/country`)
            .get(this.property.getAllCountries)

        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
