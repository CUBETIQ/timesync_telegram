"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, message, data) => {
    const customResponse = {
        status: "success",
        message,
        data,
        timestamp: new Date().toISOString(),
    };
    res.status(200).json(customResponse);
};
exports.successResponse = successResponse;
const errorResponse = (res, message) => {
    const customResponse = {
        status: "fail",
        message,
        timestamp: new Date().toISOString(),
    };
    res.status(500).json(customResponse);
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=reponseUtil.js.map