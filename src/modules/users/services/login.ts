import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../../../utils/logger'; 
import User from '../model/userModel';
import { ERROR_TYPE } from '../../../utils/constants'; 
import Exception from '../../../exceptions/exception';
import { UserService } from './userService';

const UserServiceInstance = new UserService()


const TOKEN_KEY = 'taxiRideBooking'

export class Login {
    constructor() {

    }
    async login(req: any, res: any) {
        try {
            // Get user input
            const { phoneNumber } = req.body;
           
            // const user = await User.findOne({ username:username });
            const user = await User.findOne({where:{ phoneNumber:phoneNumber}});
            if (!user) {
                throw new Exception(ERROR_TYPE.BAD_REQUEST, 'user not registered')  
                
            }
            if (user?.dataValues?.isPhoneVerified === false) {
                const type = 'GENERATE';
                const generateOTP = await UserServiceInstance.generateOtp(phoneNumber, type);
               throw new Exception(ERROR_TYPE.BAD_REQUEST,'Phone number is not verified', { generateOTP })
              }
               // Phone number is verified, proceed with generating token and updating user data
            const type = 'GENERATE'
            const generateOTP = await UserServiceInstance.generateOtp(phoneNumber,type)
            if (user) {
                // Create token
                const token = jwt.sign(
                    { user_id: user.dataValues.id, phoneNumber },
                    TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                // save user token
                user.dataValues.token = token;
                const userupdated = await User.update({ token: user.dataValues.token },{where:{ phoneNumber:phoneNumber}});
                   
            }
            return Promise.resolve({user,generateOTP})
            
        } catch (err) {
            logger.error("Error in Login ",err)
            return Promise.reject(err)
        }
    }

    async logout(req: any, res: any) {
        try {
          const { phoneNumber } = req.body;
          const result = await User.findOne({ where: { phoneNumber: phoneNumber } });
          if (!result) {
          throw new Exception(ERROR_TYPE.NOT_FOUND, 'phone-Number not found.')
          }
          await User.update({ token: null }, { where: { phoneNumber: phoneNumber } });
          return Promise.resolve('Logout successfully.')
        } catch (err) {
          return Promise.reject(err);
        }
      }
}
