import { Op } from "sequelize";
import phone from 'phone';
import bcrypt from "bcryptjs";
import Properties from "../models/propModel";
import Exception from "../../../exceptions/exception";
import { paginator } from "../../../utils/pagination";
import axios from "axios";
//import emailValidator from "email-validator";
const emailValidator = require('email-validator');
//import { addTokenService } from "./tokenService";
//import { sendOtpService, updatePasswordAndUsernameService, verifyEmail, verifyLoginServices, verifyOldPasswordServices, verifyOtpService } from "./accessUser";
import { CommonStrings, ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import { sendMessage } from "../../../utils/awsServices/awsService";


const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export class PropertyService {
  async getPropertyDetailsById(req: any) {
    try {
      const propertyId = req.params.propertyId;
      const result = await Properties.findOne({ where: { id: propertyId } });
      if (!result) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'property not found.')
      }
      return Promise.resolve(result);
    } catch (error: any) {
      return Promise.reject(error)
    }
  }

  async registerProperty(req: any, res: any) {
    try {
      const {title}= req.body
      let titleReq = title.trim();
      if (titleReq === "" || titleReq === null || titleReq === undefined) {
        throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Title required');
      }

      const alreadyExist =  await Properties.findOne({where:{title:title}})

      if(alreadyExist){
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS,'property already exist with this title.')

      }
      const propertyCreate = await Properties.create(req.body)
      return Promise.resolve(propertyCreate);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }
  
  async updatePropertyDetails(req: any) {
    try {
      const title= req.body?.title
      const id = req.params.id

      const Exist =  await Properties.findOne({where:{id:id}})

      if(!Exist){
        throw new Exception(ERROR_TYPE.NOT_FOUND,'property not exist, So we can not update the property details ')

      }
      const propertyUpdated = await Properties.update(req.body,{where:{id:id}})
      return Promise.resolve(propertyUpdated);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }

  async deleteProperty(req: any) {
    try {
      const id = req.params.id;
    
      const property = await Properties.findOne({ where: { id: id } });
      if (!property) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'property not found')
      }
      await Properties.destroy({ where: { id: id } });
      return Promise.resolve("property deleted successfully.");
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  async readAllPropertiesDetails(req: any) {
    try {
      let { status, title, sortBy, sortOrder, search } = req.query;
      let query = paginator(req.query, ['title', 'location', 'price','type']);
      if (sortBy === undefined) {
        sortBy = 'title';
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
      let Data = await Properties.findAndCountAll({
        where: { ...query.where, ...where },
        limit: query.limit,
        distinct: true,
        offset: query.offset,
        order: query.order,
      });
      return Promise.resolve(Data);
    } catch (error: any) {
      logger.error("Error in reading all properties.", error.message);
      return Promise.reject(error.message);
    }
  }
  
}

