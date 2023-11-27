import Hapi from '@hapi/hapi';
import config from '../../config';
import { Status } from './types';

/**
 * Get API service status
 *
 * @param {Hapi.request} req Request.
 * @returns {Promise<User>}
 */
export async function getStatus(req: Hapi.request): Promise<Status> {
  return {
    module: config.project.name,
    api: true,
    database: req?.server?.app?.connection?.isConnected || false
  };
}
