import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { createUser, getUsers as getUsersService, updateUser as updateUserService } from './services/services';
import { EntityManager } from 'typeorm';
import { User } from '../../entities/users';

export async function addUser(req: Hapi.request): Promise<User> {
  try {
    const { email, name, password, role } = req.payload;
    const firebaseContext = req.server.registrations.firebase.options.firebaseContext;
    const manager: EntityManager = req.server.app.connection.manager;

    const userFirebase = await firebaseContext
      .auth()
      .createUser({
        email,
        password,
        displayName: name
      });
    const user = new User();
    user.uid = userFirebase.uid;
    user.name = name;
    user.email = email;
    user.role = role.id;
    return await createUser(manager, user);
  } catch(err) {
    console.log(err);
    throw Boom.badGateway('', err);
  }
}

export async function updateUser(req: Hapi.request): Promise<{ response: string, status: number }> {
  try {
    const { uid, email, name, role } = req.payload;
    const firebaseContext = req.server.registrations.firebase.options.firebaseContext;
    const manager: EntityManager = req.server.app.connection.manager;

    await firebaseContext
      .auth()
      .updateUser(uid, {
        email,
        displayName: name
      });
    const user = new User();
    user.name = name;
    user.email = email;
    user.role = role.id;
    await updateUserService(manager, uid, user);
    return {
      response: 'Actualizado',
      status: 201
    };
  } catch(err) {
    console.log(err);
    throw Boom.badGateway('', err);
  }
}

export async function updatePassword(req: Hapi.request): Promise<{ response: string, status: number }> {
  try {
    const { password } = req.payload;
    const firebaseContext = req.server.registrations.firebase.options.firebaseContext;
    const { uid } = req.auth.credentials;
    const res = await firebaseContext
      .auth()
      .updateUser(uid, {
        password,
        emailVerified: true
      });
    console.log(res);
    return {
      response: 'Actualizado',
      status: 200
    };
  } catch(err) {
    console.log(err);
    throw Boom.badGateway('', err);
  }
}

export async function getUsers(req: Hapi.request): Promise<{ response: User[]}> {
  try {
    const manager: EntityManager = req.server.app.connection.manager;
    const users: User[] = await getUsersService(manager);
    return {
      response: users
    };
  } catch(err) {
    throw Boom.badGateway('', err);
  }
}