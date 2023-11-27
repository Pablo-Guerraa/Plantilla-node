import { Role } from '../../../entities/roles';
import { EntityManager } from 'typeorm';

export const getRoles = async(manager: EntityManager, role?: Role):Promise<Role[]> => {
  return manager.find(Role, {
    where: role
  });
};

export const createRole = async(manager: EntityManager, name: string):Promise<Role> => {
  return manager.save(Role, { name });
};

export const updateRole = async(manager: EntityManager, where: Role, role: Role):Promise<void> => {
  manager.update(Role, where, role);
};