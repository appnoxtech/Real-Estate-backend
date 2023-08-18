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
const State = require('country-state-city').State;
const City = require('country-state-city').City;
import PropertiesType from '../models/propertyTypeModel'
import User from "../../users/model/userModel";
import sequelize from "sequelize";
import amenties from "../models/amenties";



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
      let usersId = await User.findOne({
        where: {
          id: req.body.userId
        }
      })
      if (!usersId) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, "userId is not exist in user Database")
      }
      const propertyCreate = await Properties.create(req.body)
      return Promise.resolve(propertyCreate);
    } catch (err: any) {
      return Promise.reject(err);
    }
  }

  async updatePropertyDetails(req: any) {
    try {
      const title = req.body?.title
      const id = req.params.id

      const Exist = await Properties.findOne({ where: { id: id } })

      if (!Exist) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'property not exist, So we can not update the property details ')

      }
      const propertyUpdated = await Properties.update(req.body, { where: { id: id } })
      return Promise.resolve('Property updated successfully');
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
  async readAllCountriesDetails(req: any) {
    try {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
      let responseData = response.data.data
      let result = []
      for (let i = 0; i < responseData.length; i++) {
        const item = responseData[i];
        result.push({
          country: item.country,
          cities: item.cities
        });
      }
      return result
    }
    catch (err: any) {
      logger.err("Error in retrieving Country Data", err)
    }
  }
  async readAllPropertiesDetails(req: any) {
    try {
      let { status, title, sortBy, sortOrder, search } = req.query;
      let query = paginator(req.query, ['title', 'location', 'price', 'type']);
      if (sortBy === undefined) {
        sortBy = 'createdAt';
      }
      if (sortOrder === undefined) {
        sortOrder = 'DESC';
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
  async search(req: any) {
    try {
      let { type,state,city,furnishedStatus,lookingTo,price,bhk} = req.query;
      let listings = await Properties.findAll({
        where: { ...req.query }
      });
      if (listings.length === 0) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'No Data found for these filter:: ')
      }
      return Promise.resolve(listings);
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }
  async getPropertyByUserId(req: any) {
    let data = await Properties.findAll({
      where: {
        userId: req.params.userId
      }
    })
    return Promise.resolve(data)

  }

  async getStates(req: any) {

    let countryCode = req.query.countryCode
    if (countryCode) {
      let data = State.getStatesOfCountry(`${countryCode}`)
      if (data.length == 0) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, "No Data found for this CountryCode")
      }
      return Promise.resolve(data)
    }
  }

  async getCities(req: any) {
    let countryCode = req.query.countryCode
    let stateCode = req.query.stateCode
    if (countryCode && stateCode) {
      let data = City.getCitiesOfState(`${countryCode}`, `${stateCode}`)
      if (data.length == 0) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, "No Data found for this CountryCode or StateCode")
      }
      return Promise.resolve(data)
    }

  }

  async propertyType(req: any) {
    let data = await PropertiesType.findAll({
      where: {
        type: req.params.type
      }, attributes: ['name']
    })
    if (data.length == 0) {
      throw new Exception(ERROR_TYPE.NOT_FOUND, "No DATA Found")
    }
    return data
  }

  
  async randomProperty(req: any) {
    try {
      let fetchData = await Properties.findAll({
        order: sequelize.literal('RAND()'),
        limit: 8
      });
      let result ={
        count :fetchData.length,
        Data:fetchData
      }
      return result
    } catch (err: any) {
      logger.error("Errror in fetch data ", err);
    }
  }

  async getAllAmenties(req:any){
    let data = await amenties.findAll({
      attributes:['name']
    })
    return Promise.resolve(data)
  }
}
