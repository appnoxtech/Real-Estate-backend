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
exports.FileUploadService = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = require("../../../utils/logger");
const file_type_1 = __importDefault(require("file-type"));
const multiparty_1 = __importDefault(require("multiparty"));
dotenv_1.default.config();
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('Missing AWS configuration. Please check your environment variables.');
}
// Aws Secret Key
aws_sdk_1.default.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});
// Acquiring The AWS S3 Functionality
const s3 = new aws_sdk_1.default.S3();
class FileUploadService {
    DocumentUpload(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = new multiparty_1.default.Form();
                return new Promise((resolve, reject) => {
                    form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            reject(err);
                            return;
                        }
                        try {
                            const filePath = files.file[0].path;
                            const buffer = fs_1.default.readFileSync(filePath);
                            const type = yield file_type_1.default.fromBuffer(buffer);
                            // Replacing The File Name
                            const fileName = yield this.replaceFileName(files.file[0].originalFilename, type);
                            // Calling The Service To Upload The Image To S3 Bucket
                            const result = yield this.uploadFile(buffer, fileName, type);
                            const imagePath = result === null || result === void 0 ? void 0 : result.Key;
                            // Getting The Value of AWS_IMAGE_URL From .env File
                            const AWS_IMAGE_URL = process.env.AWS_IMAGE_URL;
                            if (!AWS_IMAGE_URL) {
                                throw new Error('Missing AWS_IMAGE_URL configuration. Please check your environment(.env) variables.');
                            }
                            const baseUrl = AWS_IMAGE_URL;
                            const data = { imagePath, baseUrl };
                            // Sending The Response To User
                            resolve(data);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }));
                });
            }
            catch (err) {
                return Promise.reject(err);
            }
        });
    }
    toGetFilename(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFilename = `appnox/Real-Estate-Documents/${fileName}_${Date.now().toString()}`;
                return newFilename;
            }
            catch (err) {
                logger_1.logger.error("Error occurred while getting the file name", err);
                throw err;
            }
        });
    }
    replaceFileName(fileName, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let extLength = type.ext.length + 1;
                fileName = fileName.slice(0, -extLength);
                fileName = fileName.replace(/[\W_]+/g, "_");
                const newFilename = yield this.toGetFilename(fileName);
                return newFilename;
            }
            catch (err) {
                logger_1.logger.error("Error occurred in file name replacement", err);
                throw err;
            }
        });
    }
    uploadFile(buffer, name, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = {
                    ACL: "public-read",
                    Body: buffer,
                    Bucket: "harsha-temp",
                    ContentType: type.mime,
                    Key: `${name}.${type.ext}`,
                };
                const response = yield s3.upload(params).promise();
                logger_1.logger.info("File was uploaded successfully");
                return response;
            }
            catch (err) {
                logger_1.logger.error("Error occurred in file uploading", err);
                throw err;
            }
        });
    }
}
exports.FileUploadService = FileUploadService;
