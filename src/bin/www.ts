import http from 'http';
import createApp from '@/app';
import config from '@/config';

const { port } = config;

createApp().then(app => {
  app.set('port', port);

  const server = http.createServer(app);

  /**
   * HTTP "error" 이벤트를 위한 리스너
   */

  const onError = (error: any) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // 메세지에 따른 에러 처리
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  /**
   * HTTP "listening" 이벤트를 위한 이벤트 리스너
   */

  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr?.port}`;
    console.info(`Listening on ${bind}`);
  };

  server.listen(port, () => {
    console.log(`Express Server http://localhost:${port}`);
  });

  server.on('error', onError);
  server.on('listening', onListening);
});
