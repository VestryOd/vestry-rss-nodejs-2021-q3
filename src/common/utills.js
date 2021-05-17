const catchErrors = fn => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

class CustomError extends Error {
  constructor({ status, message }) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  catchErrors,
  CustomError
};