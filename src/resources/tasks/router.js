const router = require('express').Router({ mergeParams: true });
const taskService = require('./service');
const { CustomError } = require('../../common/utills');

router
  .route('/')
  .get(
      async (req, res, next) => {
      const tasks = await taskService.getAllByBoardId(req.params.boardId);
      if (!tasks) {
        return next(new CustomError({ status: 400, message: 'Bad request' }));
      }
      await res.status(200).json(tasks);
      return true;
    }
  )
  .post(
      async (req, res, next) => {
      const task = await taskService.create({ ...req.body, boardId: req.params.boardId });
      if (!task) {return next(
        new CustomError({
          status: 400,
          message: '"Can\'t create, check your request"'
        })
      );
      }
      await res.status(200).json(task);
      return true;
    }
  );

router
  .route('/:taskId')
  .get(
      async (req, res, next) => {
      const task = await taskService.getById(req.params?.taskId);
      if (!((task && Object.entries(task).length))) {
        return next(
          new CustomError({
            status: 404,
            message: `Task with id: ${req.params.taskId} not found`
          })
        );
      }
      await res.status(200).json(task);
      return true;
    }
  )
  .put(
      async (req, res, next) => {
        const { taskId, boardId } = req.params;
      const task = await taskService.update(taskId, boardId, { ...req.body });
      if (!task) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, task with id: ${req.params.taskId} not found`
          })
        );
      }
      await res.status(200).json(task);
      return true;
    }
  )
  .delete(
      async (req, res, next) => {
      const message = await taskService.deleteById(req.params.taskId);
      if (!message) {
        return next(
          new CustomError({
            status: 404,
            message: `Task with id: ${req.params.taskId} not found`
          })
        );
      }
      await res.status(204).json(message);
      return true;
    }
  );

module.exports = router;