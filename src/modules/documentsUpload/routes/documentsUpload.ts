import { Router } from "express";
import { FileUploadController } from "../controller/uploadController";
import { Validation } from "../../../middleware/authValidator";
import { logger } from "../../../utils/logger";


class MainRouter {

    router: Router;
    fileUpload: FileUploadController;
    validation:Validation
    constructor() {
        this.fileUpload = new FileUploadController()
        this.validation = new Validation()
        this.router = Router()
        this.fileUploadRouters()
    }

    fileUploadRouters() {
        try{
        this.router.route(`/api/v1/document-upload`)
            .post(this.fileUpload.fileupload)
        }catch(err:any){
            logger.error("error occur in access routes",err)
        }

    }

}
export default new MainRouter().router
