import Hapi from '@hapi/hapi';
import { getStatus } from './controller';

export = {
  name: 'status',
  register: function (server: Hapi.Server): void {
    server.route({
      method: 'GET',
      path: '/status',
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the status of the project',
        tags: ['api']
      },
      handler: getStatus,
    });
  },
};