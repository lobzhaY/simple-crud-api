import { mockUser1, mockUser2 } from './../db/users';
import { User } from '../types/index';

export const addMockData = (isDev: boolean, users: Map<string, User>) => {
    if (isDev) {
      users.set('b416de67-c8d9-4eb1-b828-1897a7a45bde', mockUser1);
      users.set('4f9f7ffa-dd5a-4e3e-b8d4-e38c0ef27dc5', mockUser2);
    } 
};