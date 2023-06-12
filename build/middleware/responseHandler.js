"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessDuplicate = exports.sendSuccessWithMsg = exports.sendSuccess = exports.handleError = exports.sendError = exports.sendResponse = void 0;
const apiResponse_1 = __importDefault(require("./apiResponse"));
const customException_1 = __importDefault(require("../exceptions/customException"));
const constants_1 = require("../utils/constants");
let result;
function sendResponse(res, rslt, statusCode) {
    const err = rslt && rslt.error;
    if (err) {
        switch (err.errType) {
            case constants_1.ERROR_TYPE.UNAUTHORIZED:
                return res.status(constants_1.RESPONSE_STATUS.UNAUTHORIZED).send(rslt);
            case constants_1.ERROR_TYPE.INTERNAL_SERVER_ERROR:
                return res.status(constants_1.RESPONSE_STATUS.INTERNAL_ERROR).send(rslt);
            case constants_1.ERROR_TYPE.BAD_REQUEST:
                return res.status(constants_1.RESPONSE_STATUS.BAD_REQUEST).send(rslt);
            case constants_1.ERROR_TYPE.NOT_IMPLEMENTED:
                return res.status(constants_1.RESPONSE_STATUS.NOT_IMPLEMENTED).send(rslt);
            case constants_1.ERROR_TYPE.ALREADY_EXISTS:
                return res.status(constants_1.RESPONSE_STATUS.ALREADY_EXISTS).send(rslt);
            case constants_1.ERROR_TYPE.NOT_ALLOWED:
                return res.status(constants_1.RESPONSE_STATUS.NOT_ALLOWED).send(rslt);
            case constants_1.ERROR_TYPE.FORBIDDEN:
                return res.status(constants_1.RESPONSE_STATUS.FORBIDDEN).send(rslt);
            case constants_1.ERROR_TYPE.NOT_FOUND:
                return res.status(constants_1.RESPONSE_STATUS.NOT_FOUND).send(rslt);
            default:
                return res.status(constants_1.RESPONSE_STATUS.INTERNAL_ERROR).send(rslt);
        }
    }
    if (statusCode) {
        return res.status(statusCode).send(rslt);
    }
    return res.status(constants_1.RESPONSE_STATUS.SUCCESS).send(rslt);
}
exports.sendResponse = sendResponse;
function sendError(res, err) {
    if (!(err === null || err === void 0 ? void 0 : err.errType)) {
        err = customException_1.default.internalServerError(err);
    }
    result = new apiResponse_1.default(constants_1.STATUS_CODE.ERROR, err);
    sendResponse(res, result);
}
exports.sendError = sendError;
function handleError(err, req, res, next) {
    // unhandled error
    sendError(res, err);
}
exports.handleError = handleError;
function sendSuccessDuplicate(res, result, statusCode = constants_1.RESPONSE_STATUS.ALREADY_EXISTS) {
    result = new apiResponse_1.default(constants_1.STATUS_CODE.SUCCESS, result);
    sendResponse(res, result, statusCode);
}
exports.sendSuccessDuplicate = sendSuccessDuplicate;
function sendSuccess(res, result, statusCode = constants_1.RESPONSE_STATUS.SUCCESS) {
    result = new apiResponse_1.default(constants_1.STATUS_CODE.SUCCESS, result);
    sendResponse(res, result, statusCode);
}
exports.sendSuccess = sendSuccess;
function sendSuccessWithMsg(res, msg, statusCode = constants_1.RESPONSE_STATUS.SUCCESS) {
    const rslt = { message: msg };
    const result = new apiResponse_1.default(constants_1.STATUS_CODE.SUCCESS, rslt);
    sendResponse(res, result, statusCode);
}
exports.sendSuccessWithMsg = sendSuccessWithMsg;
