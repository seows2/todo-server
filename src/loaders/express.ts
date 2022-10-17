import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from '@/config';
import routes from '@/api';
import ErrorResponse from '@/utils/errorResponse';
import errorHandler from '@/api/middlewares/error';
import { ERROR } from '@/constants/error';
import cookieParser from 'cookie-parser';

export default (app: Express) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(config.corsOptions));
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use(config.api.prefix, routes());

  app.all('*', (_req, _res, next) => {
    next(new ErrorResponse(ERROR.NOT_FOUND));
  });
  app.use(errorHandler);

  return app;
};
