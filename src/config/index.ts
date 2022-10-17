process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  port: parseInt(process.env.PORT || '5000', 10),
  api: {
    prefix: '/api',
    version: process.env.API_VERSION || '0.0.0',
  },
  corsOptions: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    optionsSuccessStatus: 200,
  },
  database: {
    mysql: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
  },
};
