import { Op } from "sequelize";
import phone from 'phone';
import bcrypt from "bcryptjs";
import User from "../model/userModel";
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
import Otp from "../model/otpModel";


const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

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
      return Promise.reject(error)
    }
  }

  async registerUser(req: any, res: any) {
    try {
        const password = req.body.password;
        const phoneNumber = req.body.phoneNumber;
        const email = req.body.email;
        const name = req.body.name
        const role = req.body.role
        let passwordReq = password.trim();

        // Validate phone number format
        const regex: any = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
  
        // const validPhoneNumber = phone(phoneNumber);
        if (regex.test(phoneNumber) === false) {
          throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Invalid phone number');
        }

        if (passwordReq === "" || passwordReq === null || passwordReq === undefined) {
          throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Invalid password');
        }

        if (name === "" || name === null || name === undefined) {
          throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Please enter name.');
        }

      if (!emailValidator.validate(email)) {
        throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Invalid email');
      }

      const userExist = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (userExist) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this phone-number.');
      }

      const userExistwithEmail = await User.findOne({
        where: {email:email},
      });
      if (userExistwithEmail) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this email.');
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const user = await User.create(req.body);
      return Promise.resolve(user);
    } catch (err: any) {
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


  async verifyOldPasswordServices(userId: any, oldPassword: string) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }
  
      const isMatch = await bcrypt.compare(oldPassword, user.dataValues.password);
      if (!isMatch) {
        throw new Error('Invalid old password');
      }
  
      return user;
    } catch (err) {
      throw err;
    }
  }
  
  async updatePasswordAndUsernameService(phoneNumber: string, newPassword: string) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
  
      await User.update(
        { password: hashedPassword },
        { where: { phoneNumber: phoneNumber } }
      );
  
      // You can also update the username using a similar update query if needed
  
      return 'Password updated.';
    } catch (err) {
      throw err;
    }
  }
  
  async changePassword(req: any, res: any, next: any) {
    try {
      const {oldPassword, newPassword } = req.body;
      const userId = req.params.userId
      const userData = await this.verifyOldPasswordServices(userId, oldPassword);
     const changedPassword = await this.updatePasswordAndUsernameService(userData?.dataValues.phoneNumber, newPassword);
      return Promise.resolve(changedPassword)
    } catch (error:any) {
      logger.error("Error in change password all users.", error.message);
      return Promise.reject(error.message);
    }
  }


 async generateOtp(req: any, res: any, next: any){
    try {
      // Destructuring
      const { phoneNumber, otp, type } = req.body;
  
      if (type == CommonStrings.GENERATE) {
        const otp = await this.sendOtpService(phoneNumber);
  
        return Promise.resolve('otp send successfully.')
      } else {
        // Verify OTP
        await this.verifyOtpService(phoneNumber, otp);
        return Promise.resolve('otp verified successfully')
      }
    } catch (err: any) {
      next(err);
    }
  };

 async sendOtpService(phoneNumber:any){
    try {
      const userExist = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (!userExist) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account not exists with this phone-number.');
      }
      // Generating OTP
      const otp = Math.floor(1000 + Math.random() * 9000);
  
      await sendMessage(phoneNumber, otp);
  
      const savingObj = {
        userId: userExist.dataValues.id,
        otp: otp,
      };
      const otpSave = await Otp.create({userId:userExist.dataValues.id,otp:otp});
      // Promise Resolved
      return(otpSave);
    } catch (err) {
      return Promise.reject(err);
    }
  };
 
  async verifyOtpService(phoneNumber:any, otp:any){
    try {
      const userExist = await User.findOne({
        where: { phoneNumber: phoneNumber },
      });
      if (!userExist) {
        throw new Exception(ERROR_TYPE.ALREADY_EXISTS, 'Account not exists with this phone-number.');
      }
      const verifyOtp = await Otp.findOne({
        where: {
          userId: userExist.dataValues.id,
          otp: otp,
        },
      });
  
      // Matching OTP
      if (!verifyOtp) {
        throw new Exception(
          ERROR_TYPE.BAD_REQUEST,'Otp Is Invalid');
      }
  
      await User.update({isPhoneVerified: true},{where: {id: userExist.dataValues.id}}
      );
  
      // Promise Resolved
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
}

