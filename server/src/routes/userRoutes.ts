import usersController from '@/controllers/usersController';
import verifyJWT from '@/middleware/verifyJWT';
import Express from 'express';

const usersRouter = Express.Router();

usersRouter
  .route('/')
  .get(verifyJWT, usersController.getUser)
  .post(usersController.createNewUser)
  .patch(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);

export default usersRouter;
