import express, { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../common/utills';
import taskService from './service';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req?.params;
      const tasks = boardId && (await taskService.getAllByBoardId(boardId));
      if (!tasks) {
        return next(new CustomError({ status: 400, message: 'Bad request' }));
      }
      return res.status(200).json(tasks);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req?.params;
      const payload = req.body;
      const task = await taskService.create({ ...payload, boardId });
      if (!task) {
        return next(
          new CustomError({
            status: 400,
            message: '"Can\'t create, check your request"',
          }),
        );
      }
      return res.status(201).json(task);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:taskId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req?.params;
      const task = taskId && (await taskService.getById(taskId));
      if (!(task && task && Object.entries(task)?.length)) {
        return next(
          new CustomError({
            status: 404,
            message: `Task with id: ${taskId} not found`,
          }),
        );
      }
      return res.status(200).json(task);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId, boardId } = req.params;
      const task =
        taskId && boardId && (await taskService.update(taskId, boardId, { ...req.body }));
      if (!task) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, task with id: ${taskId} not found`,
          }),
        );
      }
      return res.status(200).json(task);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req?.params;
      const message = taskId && (await taskService.deleteById(taskId));
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `Task with id: ${taskId} not found`,
          }),
        );
      }
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  });

export default router;
