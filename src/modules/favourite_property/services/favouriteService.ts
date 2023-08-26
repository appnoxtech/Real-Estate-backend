import { Op } from "sequelize";
import Properties from "../../properties/models/propModel";
import favouriteProperty from "../model/favourite";
import Exception from "../../../exceptions/exception";
import { logger } from "../../../utils/logger";
import { ERROR_TYPE, RESPONSE_STATUS } from "../../../utils/constants";
import User from "../../users/model/userModel";

export class favouriteService {

  async postFavouriteProperty(req: any, res: any) {
    try {
      const { propertyId, status } = req.body;

      const propertyCheck = await Properties.findOne({
        where: {
          id: propertyId,
        },
      });

      if (propertyCheck) {
        if (status === "L") {
          let existFavProperty = await favouriteProperty.findOne({
            where:{
              propertyId:propertyCheck?.dataValues?.id,
              status:'L'
            }
          })
          if(existFavProperty){
            throw new Exception(ERROR_TYPE.ALREADY_EXISTS,"property already liked")
          }
          let createdData = await favouriteProperty.create(req.body);
          return "property liked sucessfully";
        } else if (status === "D") {
          const deletedCount = await favouriteProperty.destroy({
            where: {
              propertyId: propertyId,
            },
            force: true,
          });

          if (deletedCount > 0) {
            return "Property removed successfully";
          } else {
            throw new Exception(ERROR_TYPE.NOT_FOUND,"Property not found in favourite")
          }
        }
      } else {
        throw new Exception(ERROR_TYPE.NOT_FOUND,"Property not found");
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }

  // get all favourite property

  async getfavouriteProperty(req: any, res: any) {
    try {
      let fetchData = await favouriteProperty.findAndCountAll();
      return Promise.resolve(fetchData);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }

  async removefavouriteProperty(req: any, res: any) {
    try {
      const id = req.params.id;
      const property = await Properties.findOne({
        where: {
          id: id,
        },
      });
      if (!property) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, "property not found");
      }
      //remove the favourite entry
      let deleteData = await favouriteProperty.destroy({
        where: {
          propertyId: property.dataValues.id,
          status: "L",
        },
      });
      if (deleteData) {
        return Promise.resolve("Property disliked successfully");
      } else {
        throw new Exception(
          ERROR_TYPE.NOT_FOUND,
          "propert not found in favorite"
        );
      }
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
}
