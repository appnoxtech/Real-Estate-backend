"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeacherValidation = void 0;
const express_validator_1 = require("express-validator");
const validationResult_js_1 = require("./validationResult.js");
//#region Test Fields
const testFields = [[(0, express_validator_1.body)('name', 'Name Is Required: ').not().isEmpty()]];
//#endregion
exports.addTeacherValidation = [testFields, validationResult_js_1.resultChecker];
