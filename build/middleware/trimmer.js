"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postTrimmer = void 0;
//#region Trim Post Requests
const postTrimmer = (req, res, next) => {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string')
                req.body[key] = value.trim();
        }
    }
    next();
};
exports.postTrimmer = postTrimmer;
//#endregion
