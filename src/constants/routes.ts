import {
  getUsers,
  getUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} from '../controllers/index';
import { HTTP_PATHS, REALIZE_HTTP_METHODS } from './http';

export const ROUTERS_CONTROLLERS = {
  [`${REALIZE_HTTP_METHODS.GET}:${HTTP_PATHS}:2`]: getUsers,
  [`${REALIZE_HTTP_METHODS.GET}:${HTTP_PATHS}:3`]: getUserById,
  [`${REALIZE_HTTP_METHODS.POST}:${HTTP_PATHS}:2`]: createNewUser,
  [`${REALIZE_HTTP_METHODS.PUT}:${HTTP_PATHS}:3`]: updateUserById,
  [`${REALIZE_HTTP_METHODS.DELETE}:${HTTP_PATHS}:3`]: deleteUserById,
};
