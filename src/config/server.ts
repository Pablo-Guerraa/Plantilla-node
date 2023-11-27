import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';
import config from '.';

export default function initializeServer(): Hapi.Server {
  const { host, port, CORS_ORIGINS } = config.server;
  const server = Hapi.server({
    host: host,
    port: port,
    routes: {
      cors: {
        origin: CORS_ORIGINS?.replace(/ /g, '').split(',') || [`${host}:${port}`],
        // origin: ['*']
      },
    },
  });

  server.validator(Joi);
  return server;
}