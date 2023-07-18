import { NextFunction, Request, Response } from "express";
import { terms_and_conditions_Service } from "../services/terms_and_conditions_service";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const termsServiceInstance = new terms_and_conditions_Service()
export class termsController {
    async createTerms(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await termsServiceInstance.createTerms(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getAllterms(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await termsServiceInstance.readAllTerms(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async updateTerms(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await termsServiceInstance.updateTerms(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async deleteterms(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await termsServiceInstance.deletesTerms(req);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }
}
