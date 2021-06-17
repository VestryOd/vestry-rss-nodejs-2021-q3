import express, { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../common/utills';
import taskRouter from '../tasks/router';
import boardsService from './service';

const router = express.Router();

router
  .route('/')
  .get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const boards = await boardsService.getAll();
      if (!boards) {
        return next(new CustomError({ status: 400, message: 'Bad request' }));
      }
      return res.status(200).json(boards);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const board = await boardsService.create({ ...req.body });
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 400,
            message: '"Can\'t create, check your request"',
          }),
        );
      }
      return res.status(201).json(board);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:boardId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req?.params;
      const board = boardId && (await boardsService.getById(boardId));
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${boardId} not found`,
          }),
        );
      }
      return res.status(200).json(board);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      const board = boardId && (await boardsService.update(boardId, { ...req.body }));
      if (!board) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, board with id: ${boardId} not found`,
          }),
        );
      }
      return res.status(200).json(board);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { boardId } = req.params;
      const message = boardId && (await boardsService.remove(boardId));
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${boardId} not found`,
          }),
        );
      }
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  });

router.use('/:boardId/tasks', taskRouter);

export default router;
