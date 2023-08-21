import { Router } from "express";
import { FavouriteController } from "../controller/favourite";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
//import {propertiesValidator} from '../validator/validation'


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
            .post(this.validation.checkValidation,this.Favourite.postfavouriteProperty)
        this.router.route(`/api/v1/favProperty`)
            .get(this.Favourite.getfavouriteProperty)    
        this.router.route(`/api/v1/favProperty/:id`)
            .delete(this.Favourite.removefavouriteProperty)    
       
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
