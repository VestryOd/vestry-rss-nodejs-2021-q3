import express from 'express';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

import {
  errorHandler,
  eventLogger,
  onUncaughtException,
  onUnhandledPromiseRejection,
} from './middleware/error-hadler';
import boardsRouter from './resources/boards/router';
import userRouter from './resources/users/router';

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(eventLogger);
app.use('/users', userRouter);
app.use('/boards', boardsRouter);
app.use(errorHandler);

process.on('uncaughtException', (error: Error) => {
  onUncaughtException(error);
});

process.on('unhandledRejection', (error: Error) => {
  onUnhandledPromiseRejection(error);
});

// throw Error('oops');

// Promise.reject(new Error('Oops!'));

export default app;
