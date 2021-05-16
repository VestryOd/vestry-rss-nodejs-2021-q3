const router = require('express').Router();
const boardsService = require('./service');
const taskRouter = require('../tasks/router');
const { CustomError } = require('../../common/utills');

router
  .route('/')
  .get(
      async (req, res, next) => {
      const boards = await boardsService.getAll();
      if (!boards) {
        return next(new CustomError({ status: 400, message: 'Bad request' }));
      }
      await res.status(200).json(boards);
      return true;
    }
  )
  .post(
      async (req, res, next) => {
      const board = await boardsService.create({ ...req.body });
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 400,
            message: '"Can\'t create, check your request"'
          })
        );
      }
      await res.status(200).json(board);
      return true;
    }
  );

router
  .route('/:id')
  .get(
      async (req, res, next) => {
      const board = await boardsService.getById(req.params.boardId);
      if (!(board && Object.entries(board).length)) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${req.params.boardId} not found`
          })
        );
      }
      await res.status(200).json(board);
      return true;
    }
  )
  .put(
      async (req, res, next) => {
      const { boardId } = req.params;
      const board = await boardsService.update(boardId, { ...req.body });
      if (!board) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, board with id: ${req.params.boardId} not found`
          })
        );
      }
      await res.status(200).json(board);
      return true;
    }
  )
  .delete(
      async (req, res, next) => {
      const message = await boardsService.remove(req.params.boardId);
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `Board with id: ${req.params.boardId} not found`
          })
        );
      }
      await res.status(204).json(message);
      return true;
    }
  );

router.use('/:boardId/tasks', taskRouter);

module.exports = router;