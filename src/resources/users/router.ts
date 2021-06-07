import express, { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../common/utills';
import usersService from './service';

const router = express.Router();

router
  .route('/')
  .get(async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usersService.getAll();
      if (!users) return next(new CustomError({ status: 400, message: 'Bad request' }));
      return res.status(200).json(users);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await usersService.create({ ...req.body });
      if (!user) {
        return next(
          new CustomError({
            status: 404,
            message: '"Can\'t create, check your request"',
          }),
        );
      }
      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:userId')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req?.params;
      const user = await usersService.getById(userId);
      if (!(user && Object.entries(user).length)) {
        return next(
          new CustomError({
            status: 404,
            message: `User with id: ${userId} not found`,
          }),
        );
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
    // return true;
  })
  .put(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user =
        userId &&
        (await usersService.update({
          userId,
          payload: { ...req.body },
        }));
      if (!(user && Object.entries(user).length)) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, user with id: ${userId} not found`,
          }),
        );
      }
      return res.status(200).json(user);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req?.params;
      const message = userId && (await usersService.remove(userId));
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `User with id: ${userId} not found`,
          }),
        );
      }
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  });

export default router;
