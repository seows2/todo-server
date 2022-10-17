import { Router } from 'express';
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
} from './users.controller';

const userRouter = Router();

export default (router: Router) => {
  router.use('/users', userRouter);

  userRouter.get('/', handleGetUsers);
  userRouter.get('/:userId', handleGetUserDetail);
  userRouter.get('/:userId/items', handleGetUserTodoItems);

  userRouter.post('/', handleCreateUser);
  userRouter.post('/:userId/items', handleCreateUserTodoItem);

  userRouter.delete('/:userId', handleGetUserDetail);
  userRouter.delete('/:userId/items', handleDeleteUserAllTodoItem);
  userRouter.delete('/:userId/items/:itemId', handleDeleteUserOneTodoItem);

  userRouter.put('/:userId/items/:itemId', handleUpdateUserOneTodoItemContents);
  userRouter.put('/:userId/items/:itemId/priority', handleUpdateUserOneTodoItemPriority);
  userRouter.put('/:userId/items/:itemId/toggle', handleUpdateUserOneTodoItemCompleted);

  return router;
};
