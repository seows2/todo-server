import ErrorResponse from '@/utils/errorResponse';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const createUserValidation = (req: Request, _: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).messages({
      'any.required': 'name을 입력해주세요.',
      'string.min': 'name을 두 글자 이상 입력해주세요.',
    }),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ErrorResponse({ statusCode: 400, message: validationResult.error.message });
  }

  next();
};

export const createUserTodoItemValidation = (req: Request, _: Response, next: NextFunction) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      'any.required': 'userId을 입력해주세요.',
    }),
    contents: Joi.string().required().messages({
      'any.required': 'contents을 입력해주세요.',
    }),
  });

  const validationResult = schema.validate({ ...req.body, ...req.params });

  if (validationResult.error) {
    throw new ErrorResponse({ statusCode: 400, message: validationResult.error.message });
  }

  next();
};

export const updateUserTodoItemContentsValidation = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      'any.required': 'userId을 입력해주세요.',
    }),
    itemId: Joi.string().required().messages({
      'any.required': 'itemId을 입력해주세요.',
    }),
    contents: Joi.string().required().messages({
      'any.required': 'contents을 입력해주세요.',
    }),
  });

  const validationResult = schema.validate({ ...req.body, ...req.params });

  if (validationResult.error) {
    throw new ErrorResponse({ statusCode: 400, message: validationResult.error.message });
  }

  next();
};

export const updateUserTodoItemPriorityValidation = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      'any.required': 'userId을 입력해주세요.',
    }),
    itemId: Joi.string().required().messages({
      'any.required': 'itemId을 입력해주세요.',
    }),
    priority: Joi.any().required().valid('NONE', 'FIRST', 'SECOND').messages({
      'any.required': 'priority을 입력해주세요.',
      'any.only': 'priority는 [NONE, FIRST, SECOND]중 하나의 값이 허용됩니다.',
    }),
  });

  const validationResult = schema.validate({ ...req.body, ...req.params });

  if (validationResult.error) {
    throw new ErrorResponse({ statusCode: 400, message: validationResult.error.message });
  }

  next();
};

export const updateUserTodoItemCompletedValidation = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const schema = Joi.object({
    userId: Joi.string().required().messages({
      'any.required': 'userId을 입력해주세요.',
    }),
    itemId: Joi.string().required().messages({
      'any.required': 'itemId을 입력해주세요.',
    }),
  });

  const validationResult = schema.validate({ ...req.body, ...req.params });

  if (validationResult.error) {
    throw new ErrorResponse({ statusCode: 400, message: validationResult.error.message });
  }

  next();
};
