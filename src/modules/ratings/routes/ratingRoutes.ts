import { Router } from "express";
import { RatingsController } from "../controllers/ratingController"; 
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
import { ratingsValidator } from "../validator/ratingsValidators";


class MainRouter {

    router: Router;
    ratings: RatingsController;
    validation:Validation
    constructor() {
        this.ratings = new RatingsController()
        this.validation = new Validation()
        this.router = Router()
        this.ratingsRouters()
    }

    ratingsRouters() {
        try{
        this.router.route(`/api/v1/ratings/create`)
            .post(ratingsValidator.makeValidation('create'),this.ratings.createRatings)
        this.router.route(`/api/v1/ratings/update/:userId/:propertyId`)
            .patch(this.ratings.updateRatings)
        this.router.route(`/api/v1/ratings/delete/:userId/:propertyId`)
            .delete(this.ratings.deleteRatings)
        this.router.route(`/api/v1/PropertyRatings/:propertyId`)
            .get(this.ratings.getRatingsByPropertyId)
        this.router.route(`/api/v1/ratings/:userId/:propertyId`)
            .get(this.ratings.getRatingsByUserAndProperty)
        this.router.route(`/api/v1/UserRatings/:userId`)
            .get(this.ratings.getRatingsByUserId)
        this.router.route(`/api/v1/Allratings`)
            .get(this.ratings.getAllRatings)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
