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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsController = void 0;
const ratingService_1 = require("../services/ratingService");
const index_1 = require("../../../utils/index");
const constants_1 = require("../../../utils/constants");
const RatingsServiceInstance = new ratingService_1.RatingsService();
class RatingsController {
    createRatings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.createRatings(req, res);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS_CREATED);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getRatingsByPropertyId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.getRatingsByPropertyId(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getRatingsByUserAndProperty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.getRatingsByUserAndproperty(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getRatingsByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.getRatingsByUserId(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getAllRatings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.readAllRatings(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    updateRatings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.updateRatings(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    deleteRatings(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield RatingsServiceInstance.deleteRatings(req);
                index_1.respHndlr.sendSuccess(res, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
}
exports.RatingsController = RatingsController;
