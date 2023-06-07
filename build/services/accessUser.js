"use strict";
// import bcrypt from "bcryptjs";
// import { Op } from "sequelize";
// import OtpModel from "../models/OtpModel";
// import Exception from "../exceptions/exception";
// import config from "config";
// import nodemailer from "nodemailer";
// import UserModel from "../models/userModel";
// import { CommonStrings } from "../utils/constants";
// let UserId: string = config.get("USERID");
// let Password: string = config.get("PASSWORD");
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: UserId,
//     pass: Password,
//   },
// });
// // #region Send Email
// export const sendOTPByEmail = async (email: string, otp: number) => {
//   try {
//     // Sending Mail
//     const response = await transporter.sendMail({
//       to: email,
//       from: UserId,
//       subject: CommonStrings.SUBJECTS,
//       html: `<h2>  ${CommonStrings.HTML} : ${otp} </h2>`,
//     });
//     return response;
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const verifyLoginServices = async (email: string, password: string) => {
//   try {
//     const data = await UserModel.findOne({
//       where: {
//         email,
//       },
//     });
//     if (!data) {
//       return 'not found';
//     }
//     const foundUser = data;
//     if (!foundUser) {
//       return;
//     }
//     // Matching Password
//     const isMatch = await bcrypt.compare(password, foundUser.dataValues.password);
//     if (!isMatch) {
//       // handle invalid password
//     }
//     // Promise Resolved
//     return foundUser;
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const verifyEmail = async (email: string) => {
//   try {
//     const data = await UserModel.findAll({
//       where: {
//         email: {
//           [Op.eq]: email,
//         },
//       },
//     });
//     if (!data.length) {
//       // handle email not found
//     }
//     // Promise Resolved
//     return Promise.resolve();
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const sendOtpService = async (email: string) => {
//   try {
//     // User PipeLine
//     const user = await UserModel.findAll({
//       where: {
//         email: {
//           [Op.eq]: email,
//         },
//       },
//     });
//     if (!user.length) {
//       // handle user not found
//     }
//     // Generating OTP
//     const otp = Math.floor(1000 + Math.random() * 9000);
//     // Send OTP Email
//     await sendOTPByEmail(email, otp);
//     const savingObj = {
//       userId: user[0].dataValues.id,
//       otp: otp,
//     };
//     await OtpModel.create(savingObj);
//     // Promise Resolved
//     return otp;
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const verifyOtpService = async (email: string, otp: number) => {
//   try {
//     const user = await UserModel.findOne({ where: { email } });
//     if (!user) {
//       return;
//     }
//     const verifyOtp = await OtpModel.findOne({ where: { userId: user.dataValues.id, otp } });
//     // Matching OTP
//     if (!verifyOtp) {
//       // throw new Exception(...);
//     }
//     await UserModel.update(
//       { isEmailVerified: true },
//       {
//         where: {
//           _id: user.dataValues.id,
//         },
//       }
//     );
//     // Promise Resolved
//     return Promise.resolve();
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const updatePasswordAndUsernameService = async (email: string, password: string) => {
//   try {
//     const userFields: { password?: string } = {};
//     if (password) {
//       // Generating The Salt
//       const salt = await bcrypt.genSalt(10);
//       // Mixing The Salt With Password
//       const hashedPassword = await bcrypt.hash(password, salt);
//       userFields.password = hashedPassword;
//     }
//     // Updating Password
//     await UserModel.update(userFields, {
//       where: { email },
//     });
//     // Promise Resolved
//     return Promise.resolve();
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
// export const verifyOldPasswordServices = async (userId: any, oldPassword: string) => {
//   try {
//     const data = await UserModel.findOne({
//       where: {
//         _id: userId,
//       },
//     });
//     const foundUser = data;
//     if (!foundUser) {
//       return;
//     }
//     // Matching Password
//     const isMatch = await bcrypt.compare(oldPassword, foundUser.dataValues.password);
//     if (!isMatch) {
//       // handle invalid password
//     }
//     // Promise Resolved
//     return foundUser;
//   } catch (err: any) {
//     throw new Exception(err.name, err.httpCode, err.isOperational);
//   }
// };
