"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ratingController_1 = require("../controllers/ratingController");
const authValidator_1 = require("../../../middleware/authValidator");
const logger_1 = require("../../../utils/logger");
class MainRouter {
    constructor() {
        this.ratings = new ratingController_1.RatingsController();
        this.validation = new authValidator_1.Validation();
        this.router = (0, express_1.Router)();
        this.ratingsRouters();
    }
    ratingsRouters() {
        try {
            this.router.route(`/api/v1/ratings/create`)
                .post(this.ratings.createRatings);
            this.router.route(`/api/v1/ratings/update/:userId/:propertyId`)
                .patch(this.ratings.updateRatings);
            this.router.route(`/api/v1/ratings/delete/:userId/:propertyId`)
                .delete(this.ratings.deleteRatings);
            this.router.route(`/api/v1/ratings/:propertyId`)
                .get(this.ratings.getRatingsByPropertyId);
            this.router.route(`/api/v1/ratings/:userId/:propertyId`)
                .get(this.ratings.getRatingsByUserAndProperty);
            this.router.route(`/api/v1/ratings/:userId`)
                .get(this.ratings.getRatingsByUserId);
            this.router.route(`/api/v1/ratings`)
                .get(this.ratings.getAllRatings);
        }
        catch (err) {
            logger_1.logger.error("error occur in access routes", err);
        }
    }
}
exports.default = new MainRouter().router;
