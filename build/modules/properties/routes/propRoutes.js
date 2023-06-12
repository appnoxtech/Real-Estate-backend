"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propController_1 = require("../controllers/propController");
const authValidator_1 = require("../../../middleware/authValidator");
const logger_1 = require("../../../utils/logger");
class MainRouter {
    constructor() {
        this.property = new propController_1.PropertyController();
        this.validation = new authValidator_1.Validation();
        this.router = (0, express_1.Router)();
        this.propertyRouters();
    }
    propertyRouters() {
        try {
            this.router.route(`/api/v1/property/create`)
                .post(this.property.createProperty);
            this.router.route(`/api/v1/property/update/:id`)
                .patch(this.property.updateProperty);
            this.router.route(`/api/v1/property/delete/:id`)
                .delete(this.property.deleteProperty);
            this.router.route(`/api/v1/property/:propertyId`)
                .get(this.property.getPropertyById);
            this.router.route(`/api/v1/properties`)
                .get(this.property.getAllProperties);
        }
        catch (err) {
            logger_1.logger.error("error occur in access routes", err);
        }
    }
}
exports.default = new MainRouter().router;
