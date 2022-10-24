import TodoItemService from '@/services/todoItem';
import UserService from '@/services/user';
import {
  CreateTodoItemReqBody,
  CreateUserReqBody,
  UpdateTodoItemContents,
  UpdateTodoItemPriority,
} from '@/types';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';

export const handleGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userServiceInstance = Container.get(UserService);
    const users = await userServiceInstance.getAllUser();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const handleGetUserTodoItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const todoList = await TodoItemServiceInstance.getUserTodoItems(userId);

    res.json(todoList);
  } catch (error) {
    next(error);
  }
};

export const handleCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInfoToCreate = req.body as CreateUserReqBody;

    const userServiceInstance = Container.get(UserService);
    const users = await userServiceInstance.createUser(userInfoToCreate);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const handleCreateUserTodoItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const TodoInfoToCreate = req.body as CreateTodoItemReqBody;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const todoList = await TodoItemServiceInstance.createUserTodoItem(TodoInfoToCreate, userId);

    res.json(todoList);
  } catch (error) {
    next(error);
  }
};

export const handleGetUserDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const userServiceInstance = Container.get(UserService);
    const users = await userServiceInstance.getUserDetail(userId);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;

    const userServiceInstance = Container.get(UserService);
    await userServiceInstance.deleteUser(userId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUserAllTodoItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    await TodoItemServiceInstance.deleteUserAllTodoItem(userId);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUserOneTodoItem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId } = req.params;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const users = TodoItemServiceInstance.deleteUserOneTodoItem(userId, itemId);

    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserOneTodoItemContents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId } = req.params;
    const { contents } = req.body as UpdateTodoItemContents;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const updatedTodoItem = await TodoItemServiceInstance.updateUserTodoItemContents(
      userId,
      itemId,
      contents,
    );

    res.json(updatedTodoItem);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserOneTodoItemPriority = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId } = req.params;
    const { priority } = req.body as UpdateTodoItemPriority;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const updatedTodoItem = await TodoItemServiceInstance.updateUserTodoItemPriority(
      userId,
      itemId,
      priority,
    );

    res.json(updatedTodoItem);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateUserOneTodoItemCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, itemId } = req.params;

    const TodoItemServiceInstance = Container.get(TodoItemService);
    const updatedTodoItem = await TodoItemServiceInstance.updateUserTodoItemCompleted(
      userId,
      itemId,
    );

    res.json(updatedTodoItem);
  } catch (error) {
    next(error);
  }
};
