"use strict";

const { StatusCodes, ReasonPhrases } = require("./httpStatusCode");

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCodes.OK,
    responseStatusCode = ReasonPhrases.OK,
    metadata = {},
  }) {
    this.message = !message ? responseStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res, headers = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  constructor({
    options = {},
    message,
    statusCode = StatusCodes.CREATED,
    responseStatusCode = ReasonPhrases.CREATED,
    metadata,
  }) {
    super({ message, statusCode, responseStatusCode, metadata });
    this.options = options;
  }
}

module.exports = {
  OK,
  CREATED,
  SuccessResponse,
};
