import { NextFunction, Request, Response } from "express";
import { RatingsService } from "../services/ratingService";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const RatingsServiceInstance = new RatingsService()

export class RatingsController {

    async createRatings(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.createRatings(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getRatingsByPropertyId(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.getRatingsByPropertyId(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getRatingsByUserAndProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.getRatingsByUserAndproperty(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getRatingsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.getRatingsByUserId(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getAllRatings(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.readAllRatings(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async updateRatings(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.updateRatings(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async deleteRatings(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await RatingsServiceInstance.deleteRatings(req);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }
}
