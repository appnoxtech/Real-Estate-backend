import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../../../utils/logger'; 
import User from '../model/userModel';
import { ERROR_TYPE } from '../../../utils/constants'; 
import Exception from '../../../exceptions/exception';


const TOKEN_KEY = 'taxiRideBooking'

export class Login {
    
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
