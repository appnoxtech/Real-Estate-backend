"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TestSchema = new mongoose_1.default.Schema({
    // Fields
    testFields: {
        type: String,
        required: true,
    },
});
const Test = mongoose_1.default.model('test', TestSchema);
exports.default = Test;
