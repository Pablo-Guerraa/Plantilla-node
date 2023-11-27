import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { FirebaseAuthOptions } from '../types';

export default {
  name: 'firebase',
  version: '1.0.0',
  async register(
    server: Hapi.Server,
    options: FirebaseAuthOptions,
  ): Promise<void> {
    server.auth.scheme('firebase', () => {
      if (!options?.firebaseContext)
        console.error('Missing firebase admin context');

      const scheme = {
        async authenticate(request, h) {
          const { authorization } = request.headers;

          if (!authorization) {
            throw Boom.unauthorized();
          }

          const parts = authorization.split(/\s+/);

          if (parts[0].toLowerCase() !== 'bearer') {
            throw Boom.unauthorized();
          }

          if (parts.length !== 2) {
            throw Boom.badRequest(
              'Bad HTTP authentication header format',
              'Bearer',
            );
          }

          const bearerToken = parts[1];

          try {
            const decodedToken = await options.firebaseContext
              .auth()
              .verifyIdToken(bearerToken);

            if (options.loadUser) {
              const user = await options.firebaseContext
                .auth()
                .getUser(decodedToken.uid);

              decodedToken.scope =
                user.customClaims &&
                Object.keys(user.customClaims).map((claim) =>
                  user.customClaims && user.customClaims[claim] === true
                    ? claim
                    : null,
                );
              decodedToken.user = user;

              // server.app.user = () => {
              // 	const model = new UserModel();
              // 	return model.getUser({ _id: decodedToken.uid });
              // };
            }

            return h.authenticated({ credentials: decodedToken });
          } catch (e) {
            return h.unauthenticated(
              Boom.unauthorized('Invalid credentials', 'Bearer'),
              null,
            );
          }
        },
      };

      return scheme;
    });
  },
};
