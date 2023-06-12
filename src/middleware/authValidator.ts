//  var constants = require("../common/resp-handler");
 
  import { ERROR_TYPE, RESPONSE_STATUS } from "../utils/constants";
 import { Request, NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { logger } from "../utils/logger";
import Exception from "../exceptions/exception";
import User from "../modules/users/model/userModel";
import { respHndlr } from "../utils";

 const SERVICE_SECRET = 'service-management'
 export class Validation {
     constructor() { }
  async checkValidation(request: any, res: Response,next: NextFunction) {
        try {
            if (request.headers['service-token']) {
                try{
                    let token = request.headers['service-token']
                let verirfyToken: any = verify(token?.toString(), SERVICE_SECRET)
                if (verirfyToken) {
                    return next()
                }
                logger.error('Failed to verify service token')
            }catch(err:any){
                    logger.error(err)
                }
            }
            if (request.headers['authorization']) {
                let accToken = request.headers['authorization']
                const token = accToken.split(' ');
                const accessToken = token[1]
                 // Matching The Token From Data Base
               
                if (!accessToken) {
                    throw new Exception(ERROR_TYPE.NOT_FOUND,'Access token not Found.')
               }
               const tokenObject = await User.findOne({where:{ token: accessToken }});
               if (!tokenObject) {
                throw new Exception(ERROR_TYPE.NOT_FOUND,'Invalid Token')
           }
           return next()
             }
        } catch (err) {
            respHndlr.sendError(res, err);
        }
    }


 }

