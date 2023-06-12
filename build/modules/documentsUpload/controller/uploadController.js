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
exports.FileUploadController = void 0;
const uploadService_1 = require("../services/uploadService");
const index_1 = require("../../../utils/index");
const constants_1 = require("../../../utils/constants");
const FileUploadServiceInstance = new uploadService_1.FileUploadService();
class FileUploadController {
    fileupload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield FileUploadServiceInstance.DocumentUpload(req);
                index_1.respHndlr.sendSuccess(res, data, constants_1.RESPONSE_STATUS.SUCCESS_CREATED);
            }
            catch (err) {
                index_1.respHndlr.sendError(res, err);
            }
        });
    }
}
exports.FileUploadController = FileUploadController;
