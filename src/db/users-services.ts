import { RequiredUserField, User } from '../types/index';
import { users } from './users';
import { randomUUID } from 'node:crypto';

const getAllUsers = (): Map<string, User> => users;

const getUserById = (id: string): User | undefined => users.get(id);

const createNewUser = async ({ username, age, hobbies }: RequiredUserField) => {
  const id = randomUUID();
  users.set(id, { id, username, age, hobbies });
  return users.get(id);
};

const updateUser = (id: string, newBody: User) => {
  const body = {
    ...newBody,
    id,
  };
  users.set(id, body);
  return users.get(id);
};

const deleteUser = (id: string): boolean => {
  return users.delete(id);
};

export const usersServices = {
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  createNewUser: createNewUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
};
