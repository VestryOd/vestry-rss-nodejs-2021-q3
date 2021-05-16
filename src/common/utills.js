const catchErrors = fn => async (req, res, next) => {
  console.log('fn:', fn);
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