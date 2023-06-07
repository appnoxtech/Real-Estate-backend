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
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const exception_1 = __importDefault(require("../exceptions/exception"));
class BookingService {
    getBookingById(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const result = yield bookingModel_1.default.findAll({ where: { id: userId } });
                if (!result) {
                    // throw new Exception(...)
                }
                return Promise.resolve(result);
            }
            catch (error) {
                throw new exception_1.default(error.name, error.httpCode, error.isOperational);
            }
        });
    }
    bookRide(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const booking = yield bookingModel_1.default.create(req.body);
                return booking;
            }
            catch (error) {
                // Handle error
                console.error('Error booking a ride:', error);
                throw error;
            }
        });
    }
    confirmRide(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const driverId = req.body.id;
                const bookingId = req.body.id;
                const updatedBooking = yield bookingModel_1.default.update({ driverId: driverId, status: 'confirm' }, { where: { id: bookingId } });
                return updatedBooking;
            }
            catch (err) {
                throw new exception_1.default(err.name, err.httpCode, err.isOperational);
            }
        });
    }
    updateRide(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.id;
                const bookingExist = yield bookingModel_1.default.findOne({ where: { id: bookingId } });
                if (!bookingExist) {
                    // throw new Exception(...)
                }
                const updatedData = yield bookingModel_1.default.update(req.body, { where: { id: bookingId } });
                return Promise.resolve(updatedData);
            }
            catch (err) {
                throw new exception_1.default(err.name, err.httpCode, err.isOperational);
            }
        });
    }
    cancelRide(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.id;
                const bookingExist = yield bookingModel_1.default.findOne({ where: { id: bookingId } });
                if (!bookingExist) {
                    // throw new Exception(...)
                }
                const canceledData = yield bookingModel_1.default.update({ status: 'canceled' }, { where: { id: bookingId } });
                return Promise.resolve('booking canceled successfully.');
            }
            catch (err) {
                throw new exception_1.default(err.name, err.httpCode, err.isOperational);
            }
        });
    }
    deleteRide(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookingId = req.params.id;
                const bookingExist = yield bookingModel_1.default.findOne({ where: { id: bookingId } });
                if (!bookingExist) {
                    // throw new Exception(...)
                }
                const deleteBooking = yield bookingModel_1.default.destroy({ where: { id: bookingId } });
                return Promise.resolve('booking deleted successfully.');
            }
            catch (err) {
                throw new exception_1.default(err.name, err.httpCode, err.isOperational);
            }
        });
    }
}
exports.default = BookingService;
