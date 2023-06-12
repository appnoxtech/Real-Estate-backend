"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonStrings = exports.PAGINATORS = exports.ERROR_TYPE = exports.RESPONSE_STATUS = exports.STATUS_CODE = void 0;
exports.STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1,
    INVALID_TOKEN: 1000,
};
exports.RESPONSE_STATUS = {
    SUCCESS: 200,
    SUCCESS_CREATED: 201,
    SUCCESS_NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHERS: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    ALREADY_EXISTS: 409,
    PCP_CONSTRAINT: 400
};
exports.ERROR_TYPE = {
    NOT_FOUND: 'NotFoundError',
    UNAUTHORIZED: 'UnauthorizeError',
    INTERNAL_SERVER_ERROR: 'InternalServerError',
    BAD_REQUEST: 'BadRequestError',
    FORBIDDEN: 'ForbiddenError',
    NOT_IMPLEMENTED: 'NotImplementedError',
    ALREADY_EXISTS: 'AlreadyExistsError',
    NOT_ALLOWED: 'MethodNotAllowedError',
    PCP_CONSTRAINT: 'PcpConstraintError',
    INVALID_INPUT: 'invalid input',
    TOKEN_NOT: 'authorization token not found'
};
exports.PAGINATORS = {
    PAGINATION_START_PAGE: '1',
    PAGINATION_START_MAX_LIMIT: '1000',
    PAGINATION_DEFAULT_ORDER: 'ASC',
    ISENABLED_TRUE: '1',
    ISENABLED_FALSE: '0',
    ISACTIVE_TRUE: '1',
    ISACTIVE_FALSE: '0'
};
var CommonStrings;
(function (CommonStrings) {
    CommonStrings["SUBJECTS"] = "One Time Password";
    CommonStrings["HTML"] = "Your One Time Password Is";
    CommonStrings["CREATED"] = "SuccessFully Created";
    CommonStrings["UPDATED"] = "SuccessFully Updated";
    CommonStrings["DELETED_SUCCESSFULLY"] = "Deleted Successfully";
    CommonStrings["SUCCESS"] = "Success";
    CommonStrings["SEND_OTP"] = "SuccessFully Send Otp";
    CommonStrings["OTP_VERIFIED"] = "Otp Verified SuccessFully";
    CommonStrings["GENERATE"] = "GENERATE";
    CommonStrings["UPDATE_PASSWORD"] = "Updating User Password";
    CommonStrings["AUTHERIZATION_DENIED"] = "Autherization Denied";
    CommonStrings["PROFILE_UPDATE"] = "Profile Updated Successfulluy";
    CommonStrings["FACEBOOK"] = "FACEBOOK";
    CommonStrings["GOOGLE"] = "GOOGLE";
    CommonStrings["DOCUMENT_UPLOADED"] = "Document Uploaded Successfully";
})(CommonStrings = exports.CommonStrings || (exports.CommonStrings = {}));
