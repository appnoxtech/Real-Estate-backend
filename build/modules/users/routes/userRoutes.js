"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authValidator_1 = require("../../../middleware/authValidator");
const logger_1 = require("../../../utils/logger");
class MainRouter {
    constructor() {
        this.user = new userController_1.UserController();
        this.validation = new authValidator_1.Validation();
        this.router = (0, express_1.Router)();
        this.userRouters();
    }
    userRouters() {
        try {
            this.router.route(`/api/v1/create`)
                .post(this.user.createUser);
            this.router.route(`/api/v1/update/:id`)
                .patch(this.validation.checkValidation, this.user.updateUser);
            this.router.route(`/api/v1/delete/:id`)
                .delete(this.validation.checkValidation, this.user.deleteUser);
            this.router.route(`/api/v1/user/:userId`)
                .get(this.validation.checkValidation, this.user.getUserById);
            this.router.route(`/api/v1/users`)
                .get(this.user.getAllUsers);
            this.router.route(`/api/v1/login`)
                .post(this.user.login);
            this.router.route(`/api/v1/generate-otp`)
                .post(this.user.generateOtp);
            this.router.route(`/api/v1/verify-otp`)
                .post(this.user.generateOtp);
            this.router.route(`/api/v1/change-password/:userId`)
                .patch(this.user.changePassword);
            this.router.route(`/api/v1/reset-password`)
                .post(this.user.resetPassword);
            this.router.route(`/api/v1/logout`)
                .post(this.user.logout);
        }
        catch (err) {
            logger_1.logger.error("error occur in access routes", err);
        }
    }
}
exports.default = new MainRouter().router;
