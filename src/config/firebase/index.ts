import Hapi from '@hapi/hapi';
import * as firebase from 'firebase-admin';
import config from '..';
import firebaseAuth from './firebaseAuth';

export default async function initializeFirebase(
  server: Hapi.Server,
): Promise<void> {
  try {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        config.firebase as firebase.ServiceAccount,
      ),
    });

    await server.register({
      plugin: firebaseAuth,
      options: {
        firebaseContext: firebase,
        loadUser: true,
      },
    });
    server.auth.strategy('firebase', 'firebase');
  } catch (err) {
    console.error('Firebase error:', err);
  }
}
