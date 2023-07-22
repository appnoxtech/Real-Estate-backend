import { NextFunction, Request, Response } from "express";
import { feedBack_Service } from "../services/feedback_service";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const feedbackServiceInstance = new feedBack_Service()
export class feedBackController {
    async createFeedback(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await feedbackServiceInstance.createFeedback(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getbyId(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await feedbackServiceInstance.getById(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async deleteFeedback(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await feedbackServiceInstance.deletesFeedBack(req);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }
}
