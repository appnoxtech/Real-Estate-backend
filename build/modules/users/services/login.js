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
exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../../../utils/logger");
const userModel_1 = __importDefault(require("../model/userModel"));
const constants_1 = require("../../../utils/constants");
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const TOKEN_KEY = 'taxiRideBooking';
class Login {
    constructor() {
    }
    login(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user input
                const { phoneNumber, password } = req.body;
                let passwordReq = password.trim();
                // const user = await User.findOne({ username:username });
                const user = yield userModel_1.default.findOne({ where: { phoneNumber: phoneNumber } });
                if (!user) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.BAD_REQUEST, 'enter valid phoneNumber');
                }
                if (((_a = user === null || user === void 0 ? void 0 : user.dataValues) === null || _a === void 0 ? void 0 : _a.isPhoneVerified) !== true) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_ALLOWED, 'Please verify your phone-Number first.');
                }
                if (passwordReq === "" || passwordReq === null || passwordReq === undefined) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Password requires');
                }
                const pwd = yield bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
                // Validate user input
                if (!pwd) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'password not match');
                }
                if (user && (yield password, user.dataValues.password)) {
                    // Create token
                    const token = jsonwebtoken_1.default.sign({ user_id: user.dataValues.id, phoneNumber }, TOKEN_KEY, {
                        expiresIn: "2h",
                    });
                    // save user token
                    user.dataValues.token = token;
                    const userupdated = yield userModel_1.default.update({ token: user.dataValues.token }, { where: { phoneNumber: phoneNumber } });
                    return Promise.resolve(user);
                }
            }
            catch (err) {
                logger_1.logger.error("Error in Login ", err);
                return Promise.reject(err);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { phoneNumber } = req.body;
                const result = yield userModel_1.default.findOne({ where: { phoneNumber: phoneNumber } });
                if (!result) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'phone-Number not found.');
                }
                yield userModel_1.default.update({ token: null }, { where: { phoneNumber: phoneNumber } });
                return Promise.resolve('Logout successfully.');
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
}
exports.Login = Login;
