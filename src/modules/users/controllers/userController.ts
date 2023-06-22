import { NextFunction, Request, Response } from "express";
import {UserService} from "../services/userService";
import { Auth } from "../../../utils/auth";
import { Login } from "../services/login";
import { respHndlr} from "../../../utils/index"
import { RESPONSE_STATUS } from "../../../utils/constants";

const UserServiceInstance = new UserService()
const authInstance = new Auth()
const loginInstance = new Login()

export class UserController {

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.registerUser(req,res);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.getUserById(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.readAll(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.updateUser(req);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.deleteUser(req);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }

    async auth(req:Request, res: Response, next:any){
        try {
            const data =await authInstance.verifyToken(req,res,next);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    
    }


    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await loginInstance.logout(req,res);
            respHndlr.sendSuccess(res, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };
    }
    
    async generateOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await UserServiceInstance.generateOtp(req,res,next);
            respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
        } catch (err: any) {
            respHndlr.sendError(res, err);
        };

    }

}
