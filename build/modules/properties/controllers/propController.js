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
exports.PropertyController = void 0;
const propService_1 = require("../services/propService");
const index_1 = require("../../../utils/index");
const constants_1 = require("../../../utils/constants");
const PropertyServiceInstance = new propService_1.PropertyService();
class PropertyController {
    createProperty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PropertyServiceInstance.registerProperty(req, res);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS_CREATED);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getPropertyById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PropertyServiceInstance.getPropertyDetailsById(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getAllProperties(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PropertyServiceInstance.readAllPropertiesDetails(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    updateProperty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PropertyServiceInstance.updatePropertyDetails(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    deleteProperty(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PropertyServiceInstance.deleteProperty(req);
                index_1.respHndlr.sendSuccess(res, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
}
exports.PropertyController = PropertyController;
