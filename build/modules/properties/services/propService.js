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
exports.PropertyService = void 0;
const sequelize_1 = require("sequelize");
const propModel_1 = __importDefault(require("../models/propModel"));
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const pagination_1 = require("../../../utils/pagination");
//import emailValidator from "email-validator";
const emailValidator = require('email-validator');
//import { addTokenService } from "./tokenService";
//import { sendOtpService, updatePasswordAndUsernameService, verifyEmail, verifyLoginServices, verifyOldPasswordServices, verifyOtpService } from "./accessUser";
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
class PropertyService {
    getPropertyDetailsById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyId = req.params.propertyId;
                const result = yield propModel_1.default.findOne({ where: { id: propertyId } });
                if (!result) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'property not found.');
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    registerProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title } = req.body;
                let titleReq = title.trim();
                if (titleReq === "" || titleReq === null || titleReq === undefined) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.INVALID_INPUT, 'Title required');
                }
                const alreadyExist = yield propModel_1.default.findOne({ where: { title: title } });
                if (alreadyExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'property already exist with this title.');
                }
                const propertyCreate = yield propModel_1.default.create(req.body);
                return Promise.resolve(propertyCreate);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    updatePropertyDetails(req) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const title = (_a = req.body) === null || _a === void 0 ? void 0 : _a.title;
                const id = req.params.id;
                const Exist = yield propModel_1.default.findOne({ where: { id: id } });
                if (!Exist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'property not exist, So we can not update the property details ');
                }
                const propertyUpdated = yield propModel_1.default.update(req.body, { where: { id: id } });
                return Promise.resolve(propertyUpdated);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    deleteProperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const property = yield propModel_1.default.findOne({ where: { id: id } });
                if (!property) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'property not found');
                }
                yield propModel_1.default.destroy({ where: { id: id } });
                return Promise.resolve("property deleted successfully.");
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    readAllPropertiesDetails(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { status, title, sortBy, sortOrder, search } = req.query;
                let query = (0, pagination_1.paginator)(req.query, ['title', 'location', 'price', 'type']);
                if (sortBy === undefined) {
                    sortBy = 'title';
                }
                if (sortOrder === undefined) {
                    sortOrder = 'ASC';
                }
                query.order = [[String(sortBy), String(sortOrder)]];
                let where = {};
                if (status !== undefined) {
                    where = Object.assign(Object.assign({}, where), { status: { [sequelize_1.Op.eq]: status } });
                }
                if (title !== undefined) {
                    where = Object.assign(Object.assign({}, where), { title: { [sequelize_1.Op.eq]: title } });
                }
                let Data = yield propModel_1.default.findAndCountAll({
                    where: Object.assign(Object.assign({}, query.where), where),
                    limit: query.limit,
                    distinct: true,
                    offset: query.offset,
                    order: query.order,
                });
                return Promise.resolve(Data);
            }
            catch (error) {
                logger_1.logger.error("Error in reading all properties.", error.message);
                return Promise.reject(error.message);
            }
        });
    }
}
exports.PropertyService = PropertyService;
