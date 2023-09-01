import { Router } from "express";
import { UserController } from "../controllers/userController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";
import { usersValidator } from "../validator/userValidation";
import  userSwaggerSpec from "../../../utils/SwaggerSpec";
import yaml from 'yamljs'; 
import swaggerUi from 'swagger-ui-express';
import path from 'path';

class MainRouter {

    router: Router;
    user: UserController;
    validation:Validation
    constructor() {
        this.user = new UserController()
        this.validation = new Validation()
        this.router = Router()
        this.userRouters()
        this.setupUserSwagger();
    }

    userRouters() {
        try{
        this.router.route(`/api/v1/user/create`)
            .post(usersValidator.makeValidation('create'),this.user.createUser)
        this.router.route(`/api/v1/user/update/:id`)
            .patch(usersValidator.makeValidation('update'),this.validation.checkValidation,this.user.updateUser)
        this.router.route(`/api/v1/user/delete/:id`)
            .delete(this.user.deleteUser)
        this.router.route(`/api/v1/user/:userId`)
            .get(this.user.getUserById)
        this.router.route(`/api/v1/users`)
            .get(this.user.getAllUsers)
        this.router.route(`/api/v1/generate-otp`)
            .post(usersValidator.makeValidation('generateOtp'),this.user.generateOtp)
        this.router.route(`/api/v1/verify-otp`)
            .post(usersValidator.makeValidation('verifyOtp'),this.user.verifyOtp)
        this.router.route(`/api/v1/login`)
            .post(usersValidator.makeValidation('login'),this.user.login)
        this.router.route(`/api/v1/logout`)
            .post(usersValidator.makeValidation('logout'),this.user.logout)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }
    setupUserSwagger(){
        try{
           const userSwaggerSpec = yaml.load(path.resolve(__dirname,  '../../../../swagger.yml'))
           this.router.use('/api-docs-user',swaggerUi.serve);
           this.router.get('/api-docs-user',swaggerUi.setup(userSwaggerSpec))
        }catch(err:any){
          logger.error("Error occured while loading swagger spec",err)
        }
    }

}
export default new MainRouter().router
