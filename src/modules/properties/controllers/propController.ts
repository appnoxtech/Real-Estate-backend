import { NextFunction, Request, Response } from "express";
import { PropertyService } from "../services/propService";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const PropertyServiceInstance = new PropertyService()

export class PropertyController {

    async createProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.registerProperty(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getPropertyById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.getPropertyDetailsById(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.readAllPropertiesDetails(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async updateProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.updatePropertyDetails(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async deleteProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.deleteProperty(req);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async getAllCountries(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.readAllCountriesDetails(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.search(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getPropertyByUserId(req: Request, res: Response,next:NextFunction) {
        try {
            const data = await PropertyServiceInstance.getPropertyByUserId(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

}
