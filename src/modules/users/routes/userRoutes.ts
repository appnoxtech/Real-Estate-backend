import { Router } from "express";
import { UserController } from "../controllers/userController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";


class MainRouter {

    router: Router;
    user: UserController;
    validation:Validation
    constructor() {
        this.user = new UserController()
        this.validation = new Validation()
        this.router = Router()
        this.userRouters()
    }

    userRouters() {
        try{
        this.router.route(`/api/v1/create`)
            .post(this.user.createUser)
        this.router.route(`/api/v1/update/:id`)
            .patch(this.validation.checkValidation,this.user.updateUser)
        this.router.route(`/api/v1/delete/:id`)
            .delete(this.user.deleteUser)
        this.router.route(`/api/v1/user/:userId`)
            .get(this.user.getUserById)
            this.router.route(`/api/v1/users`)
            .get(this.user.getAllUsers)
        this.router.route(`/api/v1/login`)
            .post(this.user.login)
        this.router.route(`/api/v1/generate-otp`)
            .post(this.user.generateOtp)
        this.router.route(`/api/v1/verify-otp`)
            .post(this.user.generateOtp)
        this.router.route(`/api/v1/change-password/:userId`)
            .patch(this.user.changePassword)
        this.router.route(`/api/v1/reset-password`)
            .post(this.user.resetPassword)
        this.router.route(`/api/v1/logout`)
            .post(this.user.logout)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
