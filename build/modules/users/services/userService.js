"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const sequelize_1 = require("sequelize");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../model/userModel"));
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const pagination_1 = require("../../../utils/pagination");
//import emailValidator from "email-validator";
const emailValidator = require('email-validator');
//import { addTokenService } from "./tokenService";
//import { sendOtpService, updatePasswordAndUsernameService, verifyEmail, verifyLoginServices, verifyOldPasswordServices, verifyOtpService } from "./accessUser";
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const awsService_1 = require("../../../utils/awsServices/awsService");
const otpModel_1 = __importDefault(require("../model/otpModel"));
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
class UserService {
    getUserById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const result = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!result) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'user not found.');
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = req.body.password;
                const phoneNumber = req.body.phoneNumber;
                const email = req.body.email;
                const name = req.body.name;
                const role = req.body.role;
                let passwordReq = password.trim();
                // Validate phone number format
                const regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                // const validPhoneNumber = phone(phoneNumber);
                if (regex.test(phoneNumber) === false) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Invalid phone number');
                }
                if (passwordReq === "" || passwordReq === null || passwordReq === undefined) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Invalid password');
                }
                if (name === "" || name === null || name === undefined) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Please enter name.');
                }
                if (!emailValidator.validate(email)) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Invalid email');
                }
                const userExist = yield userModel_1.default.findOne({
                    where: { phoneNumber: phoneNumber },
                });
                if (userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this phone-number.');
                }
                const userExistwithEmail = yield userModel_1.default.findOne({
                    where: { email: email },
                });
                if (userExistwithEmail) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'Account already exists with this email.');
                }
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                req.body.password = hashedPassword;
                const user = yield userModel_1.default.create(req.body);
                return Promise.resolve(user);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    updateUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!user) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'user not found');
                }
                const updatedData = yield userModel_1.default.update(req.body, {
                    where: { id: userId },
                });
                const userupdated = yield userModel_1.default.findOne({ where: { id: userId } });
                return Promise.resolve(userupdated);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    deleteUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!user) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'user not found');
                }
                yield userModel_1.default.destroy({ where: { id: userId } });
                return Promise.resolve("user deleted successfully.");
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    readAll(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { status, name, sortBy, sortOrder, isPredefined, search, sync } = req.query;
                let query = (0, pagination_1.paginator)(req.query, ['name', 'updatedAt', 'createdAt']);
                if (sortBy === undefined) {
                    sortBy = 'name';
                }
                if (sortOrder === undefined) {
                    sortOrder = 'ASC';
                }
                query.order = [[String(sortBy), String(sortOrder)]];
                let where = {};
                if (status !== undefined) {
                    where = Object.assign(Object.assign({}, where), { status: { [sequelize_1.Op.eq]: status } });
                }
                if (name !== undefined) {
                    where = Object.assign(Object.assign({}, where), { name: { [sequelize_1.Op.eq]: name } });
                }
                let processData = yield userModel_1.default.findAndCountAll({
                    where: Object.assign(Object.assign({}, query.where), where),
                    limit: query.limit,
                    distinct: true,
                    offset: query.offset,
                    order: query.order,
                });
                return Promise.resolve(processData);
            }
            catch (error) {
                logger_1.logger.error("Error in reading all users.", error.message);
                return Promise.reject(error.message);
            }
        });
    }
    verifyOldPasswordServices(userId, oldPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!user) {
                    throw new Error('User not found');
                }
                const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.dataValues.password);
                if (!isMatch) {
                    throw new Error('Invalid old password');
                }
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    updatePasswordAndUsernameService(phoneNumber, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const hashedPassword = yield bcryptjs_1.default.hash(newPassword, salt);
                yield userModel_1.default.update({ password: hashedPassword }, { where: { phoneNumber: phoneNumber } });
                // You can also update the username using a similar update query if needed
                return 'Password updated.';
            }
            catch (err) {
                throw err;
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPassword, newPassword } = req.body;
                const userId = req.params.userId;
                const userData = yield this.verifyOldPasswordServices(userId, oldPassword);
                const changedPassword = yield this.updatePasswordAndUsernameService(userData === null || userData === void 0 ? void 0 : userData.dataValues.phoneNumber, newPassword);
                return Promise.resolve(changedPassword);
            }
            catch (error) {
                logger_1.logger.error("Error in change password all users.", error.message);
                return Promise.reject(error.message);
            }
        });
    }
    generateOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Destructuring
                const { phoneNumber, otp, type } = req.body;
                if (type == constants_1.CommonStrings.GENERATE) {
                    const otp = yield this.sendOtpService(phoneNumber);
                    return Promise.resolve('otp send successfully.');
                }
                else {
                    // Verify OTP
                    yield this.verifyOtpService(phoneNumber, otp);
                    return Promise.resolve('otp verified successfully');
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    ;
    sendOtpService(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield userModel_1.default.findOne({
                    where: { phoneNumber: phoneNumber },
                });
                if (!userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'Account not exists with this phone-number.');
                }
                // Generating OTP
                const otp = Math.floor(1000 + Math.random() * 9000);
                yield (0, awsService_1.sendMessage)(phoneNumber, otp);
                const savingObj = {
                    userId: userExist.dataValues.id,
                    otp: otp,
                };
                const otpSave = yield otpModel_1.default.create({ userId: userExist.dataValues.id, otp: otp });
                // Promise Resolved
                return (otpSave);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    ;
    verifyOtpService(phoneNumber, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExist = yield userModel_1.default.findOne({
                    where: { phoneNumber: phoneNumber },
                });
                if (!userExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'Account not exists with this phone-number.');
                }
                const verifyOtp = yield otpModel_1.default.findOne({
                    where: {
                        userId: userExist.dataValues.id,
                        otp: otp,
                    },
                });
                // Matching OTP
                if (!verifyOtp) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.BAD_REQUEST, 'Otp Is Invalid');
                }
                yield userModel_1.default.update({ isPhoneVerified: true }, { where: { id: userExist.dataValues.id } });
                // Promise Resolved
                return Promise.resolve();
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    ;
}
exports.UserService = UserService;
