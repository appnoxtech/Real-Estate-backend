import { Router } from "express";
import { FavouriteController } from "../controller/favourite";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
import { favValidator} from '../validation/favouriteValidation'
import yaml from 'yamljs'; 
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { favouriteSwaggerSpec } from "../../../utils/SwaggeerConfig";


class MainRouter {

    router: Router;
    Favourite: FavouriteController;
    validation:Validation
    constructor() {
        this.Favourite = new FavouriteController()
        this.validation = new Validation()
        this.router = Router()
        this.FavouriteRouters()
    }

    FavouriteRouters() {
        try{
        this.router.route(`/api/v1/favProperty`)
            .post(this.validation.checkValidation,favValidator.makeValidation('create'),this.Favourite.postfavouriteProperty)
        this.router.route(`/api/v1/favProperty`)
            .get(this.validation.checkValidation,this.Favourite.getfavouriteProperty)    
        this.router.route(`/api/v1/favProperty/:id`)
            .delete(this.validation.checkValidation,this.Favourite.removefavouriteProperty)    
       
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

    setupfavouriteSwagger(){
        try{
            const userSwaggerSpec = yaml.load(path.resolve(__dirname,  '../../../../swagger.yml'))
            this.router.use('/api-docs-favourite',swaggerUi.serve);
            this.router.get('/api-docs-favourite',swaggerUi.setup(favouriteSwaggerSpec))
         }catch(err:any){
           logger.error("Error occured while loading swagger spec",err)
         }
    }

}
export default new MainRouter().router
