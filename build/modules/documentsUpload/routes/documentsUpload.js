"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadController_1 = require("../controller/uploadController");
const authValidator_1 = require("../../../middleware/authValidator");
const logger_1 = require("../../../utils/logger");
class MainRouter {
    constructor() {
        this.fileUpload = new uploadController_1.FileUploadController();
        this.validation = new authValidator_1.Validation();
        this.router = (0, express_1.Router)();
        this.fileUploadRouters();
    }
    fileUploadRouters() {
        try {
            this.router.route(`/api/v1/document-upload`)
                .post(this.fileUpload.fileupload);
        }
        catch (err) {
            logger_1.logger.error("error occur in access routes", err);
        }
    }
}
exports.default = new MainRouter().router;
