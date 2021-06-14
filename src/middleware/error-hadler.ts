import { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';
import createError from 'http-errors';
import winston from 'winston';

import { CustomError } from '../common/utills';

const loggerForEvents = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'silly',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.printf((info) => {
          const { timestamp } = info;
          return `${timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: './logs/info.log',
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
});

const eventLogger = expressWinston.logger({
  winstonInstance: loggerForEvents,
  statusLevels: true,
  meta: false,
  msg:
    'HTTP ({{res.statusCode}}) - {{req.method}}: {{req.path}}, params: {{JSON.stringify(req.query)}}, body: {{JSON.stringify(req.body)}}',
});

const errorLogger = expressWinston.errorLogger({
  winstonInstance: loggerForEvents,
  meta: false,
  // statusLevels: false,
  // dumpExceptions: true,
  // showStack: true,
  msg:
    'HTTP ({{err.statusCode}}) - {{req.method}}: {{req.path}}, params: {{JSON.stringify(req.query)}}, body: {{JSON.stringify(req.body)}}, message: {{err.message}}',
});

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err && err instanceof CustomError) {
    res.status(err.status).json(err.message);
    return;
  }
  const error = new createError.InternalServerError();
  errorLogger(error, req, res, next);
  res.status(error?.status).json(error.message);
};

const onUncaughtException = (err: Error): void => {
  loggerForEvents.log({
    level: 'error',
    message: `Unhandled exception: ${err.message}, stack: ${err.stack}`,
  });
};

const onUnhandledPromiseRejection = (err: Error): void => {
  loggerForEvents.log({
    level: 'error',
    message: `Unhandled promise rejection: ${err.message}, stack: ${err.stack}`,
  });
};

export { errorHandler, eventLogger, onUncaughtException, onUnhandledPromiseRejection };
