import { Express } from 'express';
import connect from './connect';
import entityInjector from './entityInjector';
import expressLoader from './express';

export default async (app: Express) => {
  expressLoader(app);
  console.info('Express Loaded');

  await connect();
  console.info('Mysql connected');

  entityInjector();
  console.info('entities injected');
};
