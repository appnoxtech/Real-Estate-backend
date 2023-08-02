import { NextFunction, Request, Response } from "express";
import { FileUploadService } from "../services/uploadService";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";
import { logger } from "../../../utils/logger";

const FileUploadServiceInstance = new FileUploadService()
logger.info("check---->02")
export class FileUploadController {

    async fileupload(req: Request, res: Response) {
        try {
            const data = await FileUploadServiceInstance.DocumentUpload(req);
            logger.info("data",data)
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }
}
