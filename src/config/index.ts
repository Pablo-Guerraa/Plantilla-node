import dotenv from 'dotenv';
import { Environments } from './types';

dotenv.config();

export default {
  server: {
    environment: process.env.NODE_ENV || Environments.DEV,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9000,
    CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000',
  },
  project: {
    name: process.env.NAME || 'Hairdressing API',
  },
  firebase: {
    type: 'service_account',
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    signInWithPasswordUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
    sendFirebaseEmails: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode',
    apiKey: process.env.API_KEY,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || 'telco',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PWD || '',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false || true,
    logging: process.env.DB_ENABLE_LOGGING === 'true' ? true : false || false,
    entitiesPath: process.env.NODE_ENV === Environments.DEV ? './entities/*.ts' : './entities/*.js',
    migrationsPath: process.env.NODE_ENV === Environments.DEV ? './migrations/*.ts' : './migrations/*.js',
  },
};