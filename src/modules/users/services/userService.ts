import { Op } from "sequelize";
import phone from 'phone';
import bcrypt from "bcryptjs";
import User from "../model/userModel";
import Exception from "../../../exceptions/exception";
import { paginator } from "../../../utils/pagination";
const TOKEN_KEY = 'realEstate'
const emailValidator = require('email-validator');
import { CommonStrings, ERROR_TYPE } from "../../../utils/constants";
import { logger } from "../../../utils/logger";
import { sendMessage } from "../../../utils/awsServices/awsService";
import Otp from "../model/otpModel";
import jwt from 'jsonwebtoken';
import Address from "../model/addresses";

export class UserService {
  async getUserById(req: any) {
    try {
      const userId = req.params.userId;
      const result = await User.findOne({ where: { id: userId } });
      if (!result) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'user not found.')
      }
      return Promise.resolve(result);
    } catch (error: any) {
      logger.error("Error in geting userData:: ",error)
      return Promise.reject(error)
    }
  }

  async registerUser(req: any, res: any) {
    try {
      const phoneNumber = req.body.phoneNumber;
      const email = req.body?.email;
      const reqname = req.body?.name;
      const userExist = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (userExist) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this phone number.');
      }
      const emailExist = await User.findOne({
        where:{
          email:email
        }
      })
      if (emailExist) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this email Id.');
      }
      const userData = { ...req.body, isPhoneVerified: false };
      const user = await User.create(userData);
      const type = "GENERATE"
      const Number = phoneNumber
      const generateOTP = await this.generateOtp(Number,type)
      return Promise.resolve({user,generateOTP});
    } catch (err: any) {
      logger.error("Error in Register user:: ",err)
      return Promise.reject(err);
    }
  }

  
  async updateUser(req: any) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'user not found')
      }
      if (req.body?.phoneNumber && req.body.phoneNumber !== user?.dataValues?.phoneNumber) {
        throw new Exception(ERROR_TYPE.BAD_REQUEST, 'Phone number cannot be updated');
    }
      const updatedData = await User.update(req.body, {
        where: { id: userId },
      });
      const userupdated = await User.findOne({ where: { id: userId } });
      return Promise.resolve(userupdated);
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  async deleteUser(req: any) {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Exception(ERROR_TYPE.NOT_FOUND, 'user not found')
      }
      await User.destroy({ where: { id: userId } });
      return Promise.resolve("user deleted successfully.");
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  async readAll(req: any) {
    try {
      let { status, name, sortBy, sortOrder, isPredefined, search, sync } = req.query;
      let query = paginator(req.query, ['name', 'updatedAt', 'createdAt']);
      if (sortBy === undefined) {
        sortBy = 'name';
      }
      if (sortOrder === undefined) {
        sortOrder = 'ASC';
      }
      query.order = [[String(sortBy), String(sortOrder)]];
      let where = {};
      if (status !== undefined) {
        where = { ...where, status: { [Op.eq]: status } };
      }
      if (name !== undefined) {
        where = { ...where, name: { [Op.eq]: name } };
      }
      let processData = await User.findAndCountAll({
        where: { ...query.where, ...where },
        limit: query.limit,
        distinct: true,
        offset: query.offset,
        order: query.order,
      });
      return Promise.resolve(processData);
    } catch (error: any) {
      logger.error("Error in reading all users.", error.message);
      return Promise.reject(error.message);
    }
  }

  async generateOtp(phoneNumber: any, type: any){
    try {
      // Destructuring

      if(!phoneNumber){
        throw new Exception(ERROR_TYPE.NOT_FOUND,"please provide phoneNumber")
      }
      if (type !== 'GENERATE') {
        throw new Exception(ERROR_TYPE.NOT_FOUND,'Type must be "GENERATE"');
      }
      let data = await User.findOne({
        where:{
          phoneNumber:phoneNumber
        }
      })
      if(data){
      const otp = await this.sendOtpService(phoneNumber);
      const otpValue = otp?.dataValues.otp
      return Promise.resolve(`otp send successfully:${otpValue}`)
     }
     else{
      throw new Exception(ERROR_TYPE.BAD_REQUEST,"Entered phone number is not registered")
     }

    } catch (err: any) {
      return Promise.reject(err);
    }
  };



 async sendOtpService(phoneNumber:any){
    try {
      const regex: any = /^[6-9]\d{9}$/;

      // const validPhoneNumber = phone(phoneNumber);
      if (regex.test(phoneNumber) === false) {
        throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Invalid phone number');
      }
      // Generating OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
      await sendMessage(phoneNumber, otp);

      const savingObj = {
        phoneNumber:phoneNumber,
        otp: otp,
      };
      const userUpdate = await Otp.findOne({where:{phoneNumber:phoneNumber}})
      if(!userUpdate){
        const otpSave = await Otp.create({phoneNumber:phoneNumber,otp:otp});
      }
      const otpSave = await Otp.update(savingObj,{where:{phoneNumber:phoneNumber}});
      const otpFind = await Otp.findOne({where:{phoneNumber:phoneNumber}});
      // Promise Resolved
      return(otpFind);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  async verifyOtpService(phoneNumber:any, otp:any,){
    try {
      if(!otp){
        throw new Exception(ERROR_TYPE.BAD_REQUEST,'please provide otp for verification')
      }
      const checkPhoneNo = await User.findOne({
        where:{
          phoneNumber:phoneNumber
        }
      })
      if(checkPhoneNo == null){
        throw new Exception(ERROR_TYPE.NOT_FOUND,"phoneNumber is not registered")
      }
      const verifyOtp = await Otp.findOne({
        where: {
            phoneNumber:phoneNumber,
          otp: otp,
        },
      });

      // Matching OTP
      if (!verifyOtp) {
        throw new Exception(
            ERROR_TYPE.BAD_REQUEST,'OTP Is Invalid');
      }

      const userExist = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });

        if(!userExist) {
          throw new Exception(ERROR_TYPE.BAD_REQUEST,'user not-found')
      }
        const address = await Address.findOne({where:{userId:userExist.dataValues.id}})
      if (userExist) {
        // Create token
        const token = jwt.sign(
          { user_id: userExist.dataValues.id, phoneNumber },
          TOKEN_KEY,
          {
            expiresIn: "365d",
          }
        );

        // save user token
        userExist.dataValues.token = token;
          const userupdated = await User.update({ token: userExist.dataValues.token },{where:{ phoneNumber:phoneNumber}});

          const user =  await User.update({isPhoneVerified: true,token: userExist.dataValues.token},{where: {id: userExist.dataValues.id}});
     const otps = await Otp.update({otp:null},{where: {phoneNumber:phoneNumber}});

      }
      const resObj = {
      id:userExist?.dataValues?.id,  
      token:userExist?.dataValues.token,
      name:userExist?.dataValues.name,
      profilePhoto:userExist?.dataValues?.profilePhoto,
      phoneNumber:userExist?.dataValues?.phoneNumber,
      email:userExist?.dataValues?.email,
      isPhoneVerified:true,
      role:userExist?.dataValues?.role
      }

      // Promise Resolved
      return Promise.resolve(resObj);
  }catch(error:any){
      return Promise.reject(error)
    }
  }

}

