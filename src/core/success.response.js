"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
};

const ResponseStatusCode = {
  OK: "Success",
  CREATED: "Created!",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    responseStatusCode = ResponseStatusCode.OK,
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
    statusCode = StatusCode.CREATED,
    responseStatusCode = ResponseStatusCode.CREATED,
    metadata,
  }) {
    super({ message, statusCode, responseStatusCode, metadata });
    this.options = options;
  }
}

module.exports = {
  OK,
  CREATED,
};
