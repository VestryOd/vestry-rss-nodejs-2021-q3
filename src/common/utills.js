/**
 * Function wrapper, which allow avoid of code doubling in cases,
 * when need to process API request with try-catch construction
 * @param fn
 * @returns {function(...{Object},{Object},{function})}
 */

const catchErrors = (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return next(error);
  }
};

/** Class for generating Custom Errors. */
class CustomError extends Error {
  /**
   * Create an Error.
   * @param {string} status - The status code of Error.
   * @param {string} message - The Errors message.
   */
  constructor({ status, message }) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  catchErrors,
  CustomError,
};
