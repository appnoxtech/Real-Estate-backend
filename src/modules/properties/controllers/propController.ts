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
            //set cors headers 

            res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,x-auth-token');
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

    async getStates(req: Request, res: Response,next:NextFunction) {
        try {
            const data = await PropertyServiceInstance.getStates(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getCities(req: Request, res: Response,next:NextFunction) {
        try {
            const data = await PropertyServiceInstance.getCities(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }
    async propertyType(req: Request, res: Response,next:NextFunction) {
        try {
            const data = await PropertyServiceInstance.propertyType(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async randomProperty(req: Request, res: Response,next:NextFunction) {
        try {
            const data = await PropertyServiceInstance.randomProperty(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getAllAmenties(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await PropertyServiceInstance.getAllAmenties(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

}

