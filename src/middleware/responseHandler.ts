import { Response } from 'express';
import ApiResponse from './apiResponse';
import CustomException from '../exceptions/customException';
import { STATUS_CODE, ERROR_TYPE, RESPONSE_STATUS } from '../utils/constants';

let result: ApiResponse;

function sendResponse(res: any, rslt: ApiResponse, statusCode?: number): void {
  const err = rslt && rslt.error;
  if (err) {
    switch (err.errType) {
      case ERROR_TYPE.UNAUTHORIZED:
        return res.status(RESPONSE_STATUS.UNAUTHORIZED).send(rslt);
      case ERROR_TYPE.INTERNAL_SERVER_ERROR:
        return res.status(RESPONSE_STATUS.INTERNAL_ERROR).send(rslt);
      case ERROR_TYPE.BAD_REQUEST:
        return res.status(RESPONSE_STATUS.BAD_REQUEST).send(rslt);
      case ERROR_TYPE.NOT_IMPLEMENTED:
        return res.status(RESPONSE_STATUS.NOT_IMPLEMENTED).send(rslt);
      case ERROR_TYPE.ALREADY_EXISTS:
        return res.status(RESPONSE_STATUS.ALREADY_EXISTS).send(rslt);
      case ERROR_TYPE.NOT_ALLOWED:
        return res.status(RESPONSE_STATUS.NOT_ALLOWED).send(rslt);
      case ERROR_TYPE.FORBIDDEN:
        return res.status(RESPONSE_STATUS.FORBIDDEN).send(rslt);
      case ERROR_TYPE.NOT_FOUND:
        return res.status(RESPONSE_STATUS.NOT_FOUND).send(rslt);
      default:
        return res.status(RESPONSE_STATUS.INTERNAL_ERROR).send(rslt);
    }
  }

  if (statusCode) {
    return res.status(statusCode).send(rslt);
  }

  return res.status(RESPONSE_STATUS.SUCCESS).send(rslt);
}

function sendError(res: Response, err: any ): void {
  if (!err?.errType) {
    err = CustomException.internalServerError(err);
  }
  result = new ApiResponse(STATUS_CODE.ERROR, err);
  sendResponse(res, result);
}

function handleError(err: Error, req: any, res: Response, next: any): void {
  // unhandled error
  sendError(res, err);
}

function sendSuccessDuplicate(res: Response, result: any, statusCode = RESPONSE_STATUS.ALREADY_EXISTS): void {
  result = new ApiResponse(STATUS_CODE.SUCCESS, result);
  sendResponse(res, result, statusCode);
}

function sendSuccess(res: Response, result: any, statusCode = RESPONSE_STATUS.SUCCESS): void {
  result = new ApiResponse(STATUS_CODE.SUCCESS, result);
  sendResponse(res, result, statusCode);
}

function sendSuccessWithMsg(res: Response, msg: string, statusCode = RESPONSE_STATUS.SUCCESS): void {
  const rslt = { message: msg };
  const result = new ApiResponse(STATUS_CODE.SUCCESS, rslt);
  sendResponse(res, result, statusCode);
}

export {
  sendResponse,
  sendError,
  handleError,
  sendSuccess,
  sendSuccessWithMsg,
  sendSuccessDuplicate
};