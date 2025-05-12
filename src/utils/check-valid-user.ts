import { RequiredUserField } from '../types/index';

export const checkValidUser = (user: RequiredUserField): boolean => {
  const { username, age, hobbies } = user;
  const isEveryHobbiesType = hobbies.every(
    (hobby) => typeof hobby === 'string'
  );

  if (typeof username !== 'string' || !username.trim()) {
    return false;
  }

  if (isNaN(age) || typeof age !== 'number') {
    return false;
  }

  if (!Array.isArray(hobbies) || !isEveryHobbiesType) {
    return false;
  }

  return true;
};
