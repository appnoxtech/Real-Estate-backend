import { NextFunction, Request, Response } from "express";
import { respHndlr } from "../../../utils/index";
import {favouriteService} from "../services/favouriteService"
import { RESPONSE_STATUS } from "../../../utils/constants";

const FavouriteServiceInstance = new favouriteService();

export class FavouriteController {
  async postfavouriteProperty(req: Request, res: Response) {
    try {
      const data = await FavouriteServiceInstance.postFavouriteProperty(
        req,
        res
      );
      respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS_CREATED);
    } catch (err: any) {
      respHndlr.sendError(res, err);
    }
  }

  async getfavouriteProperty(req: Request, res: Response) {
    try {
      const data = await FavouriteServiceInstance.getfavouriteProperty(
        req,
        res
      );
      respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
    } catch (err: any) {
      respHndlr.sendError(res, err);
    }
  }

  async removefavouriteProperty(req: Request, res: Response) {
    try {
      const data = await FavouriteServiceInstance.removefavouriteProperty(
        req,
        res
      );
      respHndlr.sendSuccess(res, data, RESPONSE_STATUS.SUCCESS);
    } catch (err: any) {
      respHndlr.sendError(res, err);
    }
  }
}
