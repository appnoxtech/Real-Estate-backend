"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginator = void 0;
const sequelize_1 = require("sequelize");
const constants_1 = require("../constants");
/**
 *
 * @param params query params from request are passed here
 * @param searchFields used to apply search upon the fields in a table
 */
function paginator(params, searchFields) {
    if (undefined == params.page || 0 == Number(params.page)) {
        params.page = constants_1.PAGINATORS.PAGINATION_START_PAGE;
    }
    if (undefined == params.limit || 0 == Number(params.limit)) {
        params.limit = constants_1.PAGINATORS.PAGINATION_START_MAX_LIMIT;
    }
    if (undefined == params.sortOrder) {
        params.sortOrder = constants_1.PAGINATORS.PAGINATION_DEFAULT_ORDER;
    }
    let nLimit = +params.limit;
    let offset = +Math.abs(+params.page - 1) * nLimit;
    let where = {}, inclued = [];
    if (undefined !== params.search) {
        let obj = {};
        let whereList = searchFields.map((field) => {
            obj = {};
            obj[field] = {
                [sequelize_1.Op.like]: '%' + params.search + '%',
            };
            return obj;
        });
        where[sequelize_1.Op.or] = whereList;
    }
    let query = {
        limit: nLimit,
        offset,
        where,
        order: undefined == params.sortBy || params.sortBy.length == 0
            ? [['id', params.sortOrder]]
            : [[params.sortBy, params.sortOrder]],
        include: [],
    };
    return query;
}
exports.paginator = paginator;
