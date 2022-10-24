import { Router } from 'express';
import {
  createUserTodoItemValidation,
  createUserValidation,
  updateUserTodoItemContentsValidation,
  updateUserTodoItemPriorityValidation,
} from '../validation/user';
import {
  handleGetUsers,
  handleCreateUser,
  handleGetUserDetail,
  handleCreateUserTodoItem,
  handleDeleteUserAllTodoItem,
  handleDeleteUserOneTodoItem,
  handleUpdateUserOneTodoItemContents,
  handleUpdateUserOneTodoItemPriority,
  handleUpdateUserOneTodoItemCompleted,
  handleGetUserTodoItems,
  handleDeleteUser,
} from './users.controller';

const userRouter = Router();

export default (router: Router) => {
  router.use('/users', userRouter);

  userRouter.get('/', handleGetUsers);
  userRouter.get('/:userId', handleGetUserDetail);
  userRouter.get('/:userId/items', handleGetUserTodoItems);

  userRouter.post('/', createUserValidation, handleCreateUser);
  userRouter.post('/:userId/items', createUserTodoItemValidation, handleCreateUserTodoItem);

  userRouter.delete('/:userId', handleDeleteUser);
  userRouter.delete('/:userId/items', handleDeleteUserAllTodoItem);
  userRouter.delete('/:userId/items/:itemId', handleDeleteUserOneTodoItem);

  userRouter.put(
    '/:userId/items/:itemId',
    updateUserTodoItemContentsValidation,
    handleUpdateUserOneTodoItemContents,
  );
  userRouter.put(
    '/:userId/items/:itemId/priority',
    updateUserTodoItemPriorityValidation,
    handleUpdateUserOneTodoItemPriority,
  );
  userRouter.put('/:userId/items/:itemId/toggle', handleUpdateUserOneTodoItemCompleted);

  return router;
};
