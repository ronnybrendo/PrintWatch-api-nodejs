const httpStatusService = require("./httpStatus.service");

const FEEDBACK = {
    OK: {
        http: httpStatusService.OK
    },
    VALIDATED: {
        http: httpStatusService.OK
    },
    SUCCESS: {
        http: httpStatusService.OK
    },
    CREATED: {
        http: httpStatusService.CREATED
    },
    READ: {
        http: httpStatusService.OK
    },
    LISTED: {
        http: httpStatusService.OK
    },
    BAD_REQUEST: {
        http: httpStatusService.BAD_REQUEST
    },
    NOT_FOUND: {
        http: httpStatusService.NOT_FOUND
    },
    FORBIDDEN: {
        http: httpStatusService.FORBIDDEN
    },
    ERROR: {
        http: httpStatusService.ERROR
    }
};

module.exports = {
    getFeedbacks() {
        return FEEDBACK;
    }
};
