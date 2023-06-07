"use strict";
// import { promisify } from 'util';
// import jwt, { Secret } from 'jsonwebtoken';
// import AccessToken from '../models/AccessToken';
// import config from 'config';
// import Exception from '../exceptions/exception';
// /**
//  * This service token in to database associated with a particular user
//  * @param {string} userId of the user.
//  * Returns an object of data
//  */
// export const addTokenService = async (userId: string) => {
//     try {
//       // Json Web Token Payload
//       const payload:any = {
//         user: {
//           id: userId,
//         },
//       };
//       // Accessing The Value
//       const key = config.get('JWTSECRET') as Secret;
//       const signAsync = promisify<string, Secret, jwt.SignOptions>(jwt.sign);
//       // Signing JWT Token
//       const signedToken = await signAsync(payload, key, {
//         expiresIn: config.get('TOKEN_EXPIRY'),
//       });
//       // Making The Token Fields According To Schema
//       const tokenFields = {
//         userId: userId,
//         accessToken: signedToken,
//         tokenExpiredOn: addNoOfDaysWithDate(parseInt(config.get('DAY'))),
//       };
//       await AccessToken.create(tokenFields);
//       // Making The Response Obj
//       const resObj = {
//         token: signedToken,
//         tokenExpiredOn: addNoOfDaysWithDate(parseInt(config.get('DAY'))),
//       };
//       // Promise Resolved
//       return resObj;
//     } catch (err: any) {
//       throw new Exception(err.name, err.httpCode, err.isOperational);
//     }
//   };
// export const addNoOfDaysWithDate = (days: any) => {
//   const dateTimeStamp = new Date();
//   dateTimeStamp.setDate(dateTimeStamp.getDate() + parseInt(days));
//   return dateTimeStamp;
// };
