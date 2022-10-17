import { Router } from 'express';
import version from './routes/version';
import users from './routes/users';

export default () => {
  const router = Router();

  version(router);
  users(router);

  return router;
};
