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
exports.sendMessage = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AWS_IAM_ACCESS_KEY_ID = process.env.AWS_IAM_ACCESS_KEY_ID;
const AWS_IAM_SECRET_ACCESS_KEY = process.env.AWS_IAM_SECRET_ACCESS_KEY;
const AWS_REGION = process.env.AWS_REGION;
if (!AWS_IAM_ACCESS_KEY_ID || !AWS_IAM_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('Missing AWS configuration. Please check your environment variables.');
}
// Aws Secret Key
aws_sdk_1.default.config.update({
    accessKeyId: AWS_IAM_ACCESS_KEY_ID,
    secretAccessKey: AWS_IAM_SECRET_ACCESS_KEY,
    region: AWS_REGION,
});
/**
 * This service upload a image in amazon simple storage service
 * @param {string} buffer.
 * @param {string} name.
 * @param {string} type.
 * Returns {string} promise resolved
 */
const sendMessage = (phoneNumber, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Message: `Your one time password:${otp}`,
            PhoneNumber: '+917355312681',
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': "Appnox"
                }
            }
        };
        const response = yield new aws_sdk_1.default.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
        return response;
    }
    catch (err) {
        return Promise.reject("otp send");
    }
});
exports.sendMessage = sendMessage;
