import { Router } from "express";
import { PropertyController } from "../controllers/propController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
import {propertiesValidator} from '../validator/validation'
import yaml from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { propertySwaggerSpec } from "../../../utils/SwaggeerConfig";


class MainRouter {

    router: Router;
    property: PropertyController;
    validation:Validation
    constructor() {
        this.property = new PropertyController()
        this.validation = new Validation()
        this.router = Router()
        this.propertyRouters()
        this.setupPropertySwagger();
    }

    propertyRouters() {
        try{
        this.router.route(`/api/v1/property/create`)
            .post(propertiesValidator.makeValidation('create'),this.property.createProperty)
        this.router.route(`/api/v1/property/update/:id`)
            .patch(propertiesValidator.makeValidation('update'),this.property.updateProperty)
        this.router.route(`/api/v1/property/delete/:id`)
            .delete(this.property.deleteProperty)
        this.router.route(`/api/v1/property/:propertyId`)
            .get(propertiesValidator.makeValidation('getById'),this.property.getPropertyById)
            this.router.route(`/api/v1/properties`)
            .get(this.property.getAllProperties)
        this.router.route(`/api/v1/country`)
            .get(this.property.getAllCountries)
        this.router.route(`/api/v1/search`)
            .get(this.property.search)   
            this.router.route(`/api/v1/PropertyByUsersId/:userId`)
            .get(propertiesValidator.makeValidation('getByUserId'),this.property.getPropertyByUserId)  
            this.router.route(`/api/v1/stateByCountryCode`)
            .get(this.property.getStates)      
            this.router.route(`/api/v1/cityByStateCode`)
            .get(this.property.getCities)     
            this.router.route(`/api/v1/propertyType/:type`)
            .get(this.property.propertyType) 
            this.router.route(`/api/v1/randomProperty`)
            .get(this.property.randomProperty)
            this.router.route(`/api/v1/amenties`)
            .get(this.property.getAllAmenties)

        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }
    setupPropertySwagger(){
        try{
            const userSwaggerSpec = yaml.load(path.resolve(__dirname,  '../../../../swagger.yml'))
            this.router.use('/api-docs-property',swaggerUi.serve);
            this.router.get('/api-docs-propertyr',swaggerUi.setup(propertySwaggerSpec))
        }catch(err:any){
            logger.error("Error occured while loading swagger spec",err)
        }
    }

}
export default new MainRouter().router
