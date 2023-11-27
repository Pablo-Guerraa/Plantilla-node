import { EntityManager } from 'typeorm';
import { User } from '../../../entities/users';

export const getUsers = async(manager: EntityManager, user?: User):Promise<User[]> => {
  return manager.find(User, {
    where: user,
    relations: ['role']
  });
};

export const createUser = async(manager: EntityManager, user: User):Promise<User> => {
  return manager.save(User, user);
};

export const updateUser = async(manager: EntityManager, where: User, user: User):Promise<void> => {
  manager.update(User, where, user);
};