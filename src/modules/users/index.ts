import Hapi from '@hapi/hapi';
import { addUser, getUsers, updateUser, updatePassword } from './controller';
import Joi from '@hapi/joi';

export = {
  name: 'users',
  register: function (server: Hapi.Server): void {
    server.route({
      method: 'POST',
      path: '/user',
      options: {
        description: 'Create user',
        notes: 'Create user',
        auth: {
          strategy: 'firebase'
        },
        tags: ['api']
      },
      handler: addUser,
    });
    server.route({
      method: 'PUT',
      path: '/user',
      options: {
        description: 'Update user',
        notes: 'Update user',
        tags: ['api'],
        auth: {
          strategy: 'firebase'
        }
      },
      handler: updateUser,
    });
    server.route({
      method: 'PATCH',
      path: '/user',
      options: {
        description: 'Update password user',
        notes: 'Update password user',
        tags: ['api'],
        auth: {
          strategy: 'firebase'
        }
      },
      handler: updatePassword,
    });
    server.route({
      method: 'GET',
      path: '/user',
      options: {
        description: 'Get status service',
        notes: 'Service to obtain the status of the project',
        tags: ['api'],
        auth: {
          strategy: 'firebase'
        },
      },
      handler: getUsers,
    });
  },
};