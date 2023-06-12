"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exception_1 = __importDefault(require("./exception"));
const constants_1 = require("../utils/constants");
exports.default = {
    internalServerError(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.INTERNAL_SERVER_ERROR, msg || 'Internal server error, Please try after some time.', err);
    },
    badRequestError(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.BAD_REQUEST, msg || 'Bad request', err);
    },
    unAuthenticatedAccess(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.UNAUTHORIZED, msg || 'Unauthorized access', err);
    },
    forbiddenAccess(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.FORBIDDEN, msg || 'Forbidden access', err);
    },
    notFoundError(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.NOT_FOUND, msg || 'No route found', err);
    },
    notAllowedError(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.NOT_ALLOWED, msg || 'Method not allowed', err);
    },
    alreadyExistError(msg, err) {
        return new exception_1.default(constants_1.ERROR_TYPE.ALREADY_EXISTS, msg || 'Already Exists', err);
    },
};
