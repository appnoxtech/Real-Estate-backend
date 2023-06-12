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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
const auth_1 = require("../../../utils/auth");
const login_1 = require("../services/login");
const index_1 = require("../../../utils/index");
const constants_1 = require("../../../utils/constants");
const UserServiceInstance = new userService_1.UserService();
const authInstance = new auth_1.Auth();
const loginInstance = new login_1.Login();
class UserController {
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.registerUser(req, res);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS_CREATED);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.getUserById(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.readAll(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.updateUser(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.deleteUser(req);
                index_1.respHndlr.sendSuccess(res, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield loginInstance.login(req, res);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    auth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield authInstance.verifyToken(req, res, next);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield loginInstance.logout(req, res);
                index_1.respHndlr.sendSuccess(res, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    generateOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.generateOtp(req, res, next);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            //     const data =await UserServiceInstance.resetUsernameAndPassword(req,res,next);
            //     return (data)
            // } catch (err: any) {
            //     next(err)
            // };
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield UserServiceInstance.changePassword(req, res, next);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
            ;
        });
    }
}
exports.UserController = UserController;
