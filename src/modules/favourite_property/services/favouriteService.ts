import { Op } from "sequelize";
import Properties from "../../properties/models/propModel";
import favouriteProperty from "../model/favourite";
import Exception from "../../../exceptions/exception";
import { logger } from "../../../utils/logger";
import { ERROR_TYPE, RESPONSE_STATUS } from "../../../utils/constants";
import User from "../../users/model/userModel";

export class favouriteService {
  //post favourite property
  async postFavouriteProperty(req: any, res: any) {
    try {
      
      // let token_part = req.headers.authorization.split(" ")[1]
      // let data = await User.findOne({
      //   where:{
      //     token:token_part
      //   }
      // })
      // let userId = data?.dataValues.id
      // Check if the property exists
      const propertyCheck = await Properties.findOne({
        where: {
          id: req.body.propertyId,
        },
      });
      if (propertyCheck) {
        let checkExistData = await favouriteProperty.findOne({
          where: {
            propertyId: req.body.propertyId,
            status: "L",
          },
          raw: true,
        });
        if (checkExistData) {
          throw new Exception(
            ERROR_TYPE.ALREADY_EXISTS,
            "this property is already in liked model"
          );
        }
        let createData = await favouriteProperty.create(req.body);
        return createData;
      } else {
        throw new Exception(
          ERROR_TYPE.NOT_FOUND,
          "property not exist "
        );
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
