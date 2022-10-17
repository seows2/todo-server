import { Request, Response, NextFunction } from 'express';

export const handleGetUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'users' });
  } catch (error) {
    next(error);
  }
};

export const handleGetUserTodoItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'handleGetUserTodoItems' });
  } catch (error) {
    next(error);
  }
};

export const handleCreateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'createUser' });
  } catch (error) {
    next(error);
  }
};

export const handleCreateUserTodoItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'handleCreateUserTodoItem' });
  } catch (error) {
    next(error);
  }
};

export const handleGetUserDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'userDetail' });
  } catch (error) {
    next(error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ good: 'deleteUser' });
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
    res.json({ good: 'handleDeleteUsersAllTodoItem' });
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
    res.json({ good: 'handleDeleteUserOneTodoItem' });
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
    res.json({ good: 'handleUpdateUserOneTodoItem' });
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
    res.json({ good: 'handleUpdateUserOneTodoItem' });
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
    res.json({ good: 'handleUpdateUserOneTodoItemCompleted' });
  } catch (error) {
    next(error);
  }
};
