"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../utils/constants");
class ApiResponse {
    constructor(statusCode, result) {
        this.statusCode = statusCode;
        if (statusCode == constants_1.STATUS_CODE.SUCCESS) {
            result ? (this.result = result) : (this.result = {});
        }
        else {
            result ? (this.error = result) : (this.error = {});
        }
        this.time = new Date().getTime();
    }
}
exports.default = ApiResponse;
