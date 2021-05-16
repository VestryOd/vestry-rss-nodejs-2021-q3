const router = require('express').Router();
const User = require('./model');
const usersService = require('./service');
const { CustomError } = require('../../common/utills');

// router.route('/').get(async (req, res) => {
//   const users = await usersService.getAll();
//   // map user fields to exclude secret fields like "password"
//   res.json(users.map(User.toResponse));
// });

router
  .route('/')
    .get(async (req, res, next) => {
        const users = await usersService.getAll();
        if (!users) return next(new CustomError({ status: 400, message: 'Bad request' }));
        await res.status(200).json(users.map(User.toResponse));
        return true;
      }
    )
    .post(async (req, res, next) => {
      const user = await usersService.create({...req.body});
      // if (user) {
      //   await res.status(201).json(User.toResponse(user));
      // } else {
      //   return next(new CustomError({ status: 404, message: '"Can\'t create, check your request"' }));
      // }
      if (!user) {
        return next(
          new CustomError({
            status: 404,
            message: '"Can\'t create, check your request"'
          })
        );
      }
      await res.status(201).json(User.toResponse(user));
      return true;
    });

router
  .route('/:userId')
    .get(async (req, res, next) => {
      const user = await usersService.getById(req.params?.userId);
      // if (user && Object.entries(user).length) {
      //   await res.status(200).json(User.toResponse(user));
      // } else {
      //   return next(
      //     new CustomError({
      //       status: 404,
      //       message: `User with id: ${req.params?.userId} not found`
      //     })
      //   );
      // }
      if (!(user && Object.entries(user).length)) {
          return next(
            new CustomError({
              status: 404,
              message: `User with id: ${req.params?.userId} not found`
            })
          );
      }
      await res.status(200).json(User.toResponse(user));
      return true;
    })
  .put(async (req, res, next) => {
    const { userId } = req.params;
    const user = await usersService.update({
      userId,
      payload: { ...req.body }
    });
    // if (user && Object.entries(user).length) {
    //   await res.send(200).json(User.toResponse(user));
    // } else {
    //   return next(
    //     new CustomError({
    //       status: 400,
    //       message: `Can't update, user with id: ${req.params?.id} not found`
    //     })
    //   );
    // }
    if (!(user && Object.entries(user).length)) {
        return next(
          new CustomError({
            status: 400,
            message: `Can't update, user with id: ${req.params?.id} not found`
          })
        );
    }
    await res.send(200).json(User.toResponse(user));
    return true;
    })
  .delete(async (req, res, next) => {
    const message = await usersService.remove(req.params?.userId);
    // if (message) {
    //   await res.status(204).json(User.toResponse(message));
    // } else {
    //   return next(
    //     new CustomError({
    //       status: 404,
    //       message: `User with id: ${req.params.id} not found`
    //     })
    //   );
    // }
    if (!message) {
      return next(
        new CustomError({
          status: 404,
          message: `User with id: ${req.params.id} not found`
        })
      );
    }
    await res.status(204).json(User.toResponse(message));
    return true;
  });

module.exports = router;
