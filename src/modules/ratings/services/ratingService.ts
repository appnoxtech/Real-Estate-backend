import { Op } from "sequelize";
import Ratings from "../model/ratingModel";
import Exception from "../../../exceptions/exception";
import { paginator } from "../../../utils/pagination";
import { ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import Properties from "../../properties/models/propModel";
import User from "../../users/model/userModel";


const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export class RatingsService {
  async getRatingsByPropertyId(req: any) {
    try {
      const propertyId = req.params.propertyId;
      const result = await Ratings.findAll({ where: { propertyId: propertyId } });
      if (!result) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'property not found.')
      }
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  async getRatingsByUserId(req: any) {
    try {
      const userId = req.params.userId;
      const result = await Ratings.findAll({ where: { userId: userId } });
      if (!result) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'ratings not found.')
      }
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  async getRatingsByUserAndproperty(req: any) {
    try {
      const {userId,propertyId} = req.params;
      const result = await Ratings.findOne({ where: { userId: userId,propertyId:propertyId } });
      if (!result) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'rating with this property & user not found.')
      }
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  async createRatings(req: any, res: any) {
    try {
      const {propertyId,userId}= req.body

      const alreadyExist =  await Ratings.findOne({where:{propertyId:propertyId,userId:userId}})

      if(alreadyExist){
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS,'ratings already exist with this user for this property.')

      }
      const property =  await Properties.findOne({where:{id:propertyId}})
      if(!property){
        throw new Exception(ERROR_TYPE.NOT_FOUND,'property not exist with this propertyId')

      }
      req.body.propertyName = property?.dataValues?.title
      const user =  await User.findOne({where:{id:userId}})
      if(!user){
        throw new Exception(ERROR_TYPE.NOT_FOUND,'user not exist with this userId')

      }
      req.body.userName = user?.dataValues?.name

      const ratingsCreated = await Ratings.create(req.body)
      return Promise.resolve(ratingsCreated);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  
  async updateRatings(req: any) {
    try {
      console.log("ffhsgdjh",req.body)
      const propertyId= req.params?.propertyId
      const userId = req.params?.userId

      const Exist =  await Ratings.findOne({where:{propertyId:propertyId,userId:userId}})

      if(!Exist){
        throw new Exception(ERROR_TYPE.NOT_FOUND,'property ratings and reviews not exist for this user, So we can not update the property details ')

      }
      const ratingsUpdated = await Ratings.update(req.body,{where:{propertyId:propertyId,userId:userId}})
      return Promise.resolve(ratingsUpdated);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }

  async deleteRatings(req: any) {
    try {
      const {propertyId,userId} = req.params;
    
      const property = await Ratings.findOne({ where: { propertyId: propertyId,userId: userId } });
      if (!property) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'ratings not found')
      }
      await Ratings.destroy({ where: { propertyId: propertyId,userId: userId } });
      return Promise.resolve("rating deleted successfully.");
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  async readAllRatings(req: any) {
    try {
      let { status, title, sortBy, sortOrder, search } = req.query;
      let query = paginator(req.query, ['userName', 'propertyName']);
      if (sortBy === undefined) {
        sortBy = 'propertyName';
      }
      if (sortOrder === undefined) {
        sortOrder = 'ASC';
      }
      query.order = [[String(sortBy), String(sortOrder)]];
      let where = {};
      if (status !== undefined) {
        where = { ...where, status: { [Op.eq]: status } };
      }
      if (title !== undefined) {
        where = { ...where, title: { [Op.eq]: title } };
      }
      let Data = await Ratings.findAndCountAll({
        where: { ...query.where, ...where },
        limit: query.limit,
        distinct: true,
        offset: query.offset,
        order: query.order,
      });
      return Promise.resolve(Data);
    } catch (error: any) {
      logger.error("Error in reading All ratings & reviews.", error.message);
      return Promise.reject(error.message);
    }
  }
  
}

