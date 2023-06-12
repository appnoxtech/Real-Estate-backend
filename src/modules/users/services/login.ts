import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../../../utils/logger'; 
import User from '../model/userModel';
import { ERROR_TYPE } from '../../../utils/constants'; 
import Exception from '../../../exceptions/exception';


const TOKEN_KEY = 'taxiRideBooking'

export class Login {
    constructor() {

    }
    async login(req: any, res?: any) {
        try {
            // Get user input
            const { phoneNumber, password } = req.body;
            let passwordReq = password.trim();
            // const user = await User.findOne({ username:username });
            const user = await User.findOne({where:{ phoneNumber:phoneNumber}});
            if (!user) {
                throw new Exception(ERROR_TYPE.BAD_REQUEST, 'enter valid phoneNumber')
                
            }
            if(user?.dataValues?.isPhoneVerified !== true){
                throw new Exception(ERROR_TYPE.NOT_ALLOWED, 'Please verify your phone-Number first.')
            }

            if (passwordReq === "" || passwordReq === null || passwordReq === undefined) {
                throw new Exception(ERROR_TYPE.INVALID_INPUT, 'Password requires');
              }
  
            const pwd = await bcrypt.compare(password, user?.dataValues.password);
            // Validate user input
            if(!pwd){
                throw new Exception(ERROR_TYPE.NOT_FOUND,'password not match')
            }
            
            if (user && (await password, user.dataValues.password)) {
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
              
                return Promise.resolve(user)
            }
            
        } catch (err) {
            logger.error("Error in Login ",err)
            return Promise.reject(err)
        }
    }

    async logout(req: any, res: any) {
        try {
          const { phoneNumber } = req.body;
          await User.update({ token: null }, { where: { phoneNumber: phoneNumber } });
          return Promise.resolve('Logout successfully.')
        } catch (err) {
          return Promise.reject(err);
        }
      }
}
