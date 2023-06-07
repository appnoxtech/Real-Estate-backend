"use strict";
//  var constants = require("../common/resp-handler");
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
exports.Validation = void 0;
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = require("jsonwebtoken");
const logger_1 = require("../utils/logger");
const exception_1 = __importDefault(require("../exceptions/exception"));
const userModel_1 = __importDefault(require("../modules/users/model/userModel"));
const utils_1 = require("../utils");
const SERVICE_SECRET = 'service-management';
class Validation {
    constructor() { }
    checkValidation(request, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (request.headers['service-token']) {
                    try {
                        let token = request.headers['service-token'];
                        let verirfyToken = (0, jsonwebtoken_1.verify)(token === null || token === void 0 ? void 0 : token.toString(), SERVICE_SECRET);
                        if (verirfyToken) {
                            return next();
                        }
                        logger_1.logger.error('Failed to verify service token');
                    }
                    catch (err) {
                        logger_1.logger.error(err);
                    }
                }
                if (request.headers['authorization']) {
                    let accToken = request.headers['authorization'];
                    const token = accToken.split(' ');
                    const accessToken = token[1];
                    // Matching The Token From Data Base
                    if (!accessToken) {
                        throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'Access token not Found.');
                    }
                    const tokenObject = yield userModel_1.default.findOne({ where: { token: accessToken } });
                    if (!tokenObject) {
                        throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'Invalid Token');
                    }
                    utils_1.respHndlr.sendSuccess(res, constants_1.RESPONSE_STATUS.SUCCESS);
                }
            }
            catch (err) {
                utils_1.respHndlr.sendError(res, err);
            }
        });
    }
}
exports.Validation = Validation;
