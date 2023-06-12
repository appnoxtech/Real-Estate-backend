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
exports.RatingsService = void 0;
const sequelize_1 = require("sequelize");
const ratingModel_1 = __importDefault(require("../model/ratingModel"));
const exception_1 = __importDefault(require("../../../exceptions/exception"));
const pagination_1 = require("../../../utils/pagination");
const constants_1 = require("../../../utils/constants");
const logger_1 = require("../../../utils/logger");
const propModel_1 = __importDefault(require("../../properties/models/propModel"));
const userModel_1 = __importDefault(require("../../users/model/userModel"));
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
class RatingsService {
    getRatingsByPropertyId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyId = req.params.propertyId;
                const result = yield ratingModel_1.default.findAll({ where: { propertyId: propertyId } });
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
    getRatingsByUserId(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const result = yield ratingModel_1.default.findAll({ where: { userId: userId } });
                if (!result) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'ratings not found.');
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    getRatingsByUserAndproperty(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, propertyId } = req.params;
                const result = yield ratingModel_1.default.findOne({ where: { userId: userId, propertyId: propertyId } });
                if (!result) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'rating with this property & user not found.');
                }
                return Promise.resolve(result);
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    createRatings(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId, userId } = req.body;
                const alreadyExist = yield ratingModel_1.default.findOne({ where: { propertyId: propertyId, userId: userId } });
                if (alreadyExist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, 'ratings already exist with this user for this property.');
                }
                const property = yield propModel_1.default.findOne({ where: { id: propertyId } });
                if (!property) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'property not exist with this propertyId');
                }
                req.body.propertyName = (_a = property === null || property === void 0 ? void 0 : property.dataValues) === null || _a === void 0 ? void 0 : _a.title;
                const user = yield userModel_1.default.findOne({ where: { id: userId } });
                if (!user) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'user not exist with this userId');
                }
                req.body.userName = (_b = user === null || user === void 0 ? void 0 : user.dataValues) === null || _b === void 0 ? void 0 : _b.name;
                const ratingsCreated = yield ratingModel_1.default.create(req.body);
                return Promise.resolve(ratingsCreated);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    updateRatings(req) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.propertyId;
                const userId = (_b = req.body) === null || _b === void 0 ? void 0 : _b.userId;
                const Exist = yield ratingModel_1.default.findOne({ where: { propertyId: propertyId, userId: userId } });
                if (!Exist) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'property ratings and reviews not exist for this user, So we can not update the property details ');
                }
                const ratingsUpdated = yield ratingModel_1.default.update(req.body, { where: { propertyId: propertyId, userId: userId } });
                return Promise.resolve(ratingsUpdated);
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    deleteRatings(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { propertyId, userId } = req.params;
                const property = yield ratingModel_1.default.findOne({ where: { propertyId: propertyId, userId: userId } });
                if (!property) {
                    throw new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, 'ratings not found');
                }
                yield ratingModel_1.default.destroy({ where: { propertyId: propertyId, userId: userId } });
                return Promise.resolve("rating deleted successfully.");
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    readAllRatings(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { status, title, sortBy, sortOrder, search } = req.query;
                let query = (0, pagination_1.paginator)(req.query, ['userName', 'propertyName']);
                if (sortBy === undefined) {
                    sortBy = 'propertyName';
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
                let Data = yield ratingModel_1.default.findAndCountAll({
                    where: Object.assign(Object.assign({}, query.where), where),
                    limit: query.limit,
                    distinct: true,
                    offset: query.offset,
                    order: query.order,
                });
                return Promise.resolve(Data);
            }
            catch (error) {
                logger_1.logger.error("Error in reading all ratings & reviews.", error.message);
                return Promise.reject(error.message);
            }
        });
    }
}
exports.RatingsService = RatingsService;
