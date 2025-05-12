import { User } from '../types/index';

export const users: Map<string, User> = new Map<string, User>([]);

export const mockUser1 = {
  id: 'b416de67-c8d9-4eb1-b828-1897a7a45bde',
  username: 'Alice Johnson',
  age: 28,
  hobbies: ['reading', 'yoga', 'traveling'],
};

export const mockUser2 = {
  id: '4f9f7ffa-dd5a-4e3e-b8d4-e38c0ef27dc5',
  username: 'Bob Smith',
  age: 35,
  hobbies: ['bloging'],
};
