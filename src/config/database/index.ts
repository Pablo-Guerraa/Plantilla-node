import Hapi from '@hapi/hapi';
import { ApplicationState, DatabaseConfig } from '../types';
import { createConnection } from 'typeorm';

export default class Database {
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    this.config = config;
  }

  async connect(server: Hapi.server): Promise<void> {
    try {
      const connection = await createConnection({
        type: 'postgres',
        host: this.config.host,
        port: this.config.port,
        username: this.config.username,
        password: this.config.password,
        database: this.config.name,
        extra: { ssl: false },
        entities: [this.config.entitiesPath],
        synchronize: this.config.synchronize,
        logging: this.config.logging,
      });

      (<ApplicationState>server.app).connection = connection;
    } catch (err) {
      console.error('Database error:', err);
    }
  }
}
