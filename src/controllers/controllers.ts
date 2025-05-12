import { addRequest, bodyParser, checkValidUser } from '../utils/index';
import { usersServices } from '../db/index';
import { IncomingMessage, ServerResponse } from 'node:http';
import { validate as isUuid } from 'uuid';
import { LOGS, STATUS_CODES } from '../constants/index';
import { User } from '../types';

export const getUsers = (_req: IncomingMessage, res: ServerResponse): void => {
  const users = usersServices.getAllUsers();
  addRequest(
    _req,
    res,
    STATUS_CODES.success,
    JSON.stringify([...users.values()])
  );
};

export const getUserById = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
): void => {
  if (!isUuid(id)) {
    addRequest(
      _req,
      res,
      STATUS_CODES.badRequest,
      JSON.stringify({ message: LOGS.invalidRequest })
    );
  }

  const bdUser = usersServices.getUserById(id);
  if (!bdUser) {
    addRequest(
      _req,
      res,
      STATUS_CODES.notFound,
      JSON.stringify({ message: LOGS.uuidNotExist })
    );
  } else {
    addRequest(_req, res, STATUS_CODES.success, JSON.stringify(bdUser));
  }
};

export const createNewUser = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const user = await bodyParser<User>(req);
  const isValidUser = checkValidUser(user);

  if (!isValidUser) {
    addRequest(
      req,
      res,
      STATUS_CODES.badRequest,
      JSON.stringify({ message: LOGS.invalidRequest })
    );
  } else {
    const createdUser = await usersServices.createNewUser(user);

    addRequest(req, res, STATUS_CODES.created, JSON.stringify(createdUser));
  }
};

export const updateUserById = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  if (!isUuid(id)) {
    addRequest(
      req,
      res,
      STATUS_CODES.badRequest,
      JSON.stringify({ message: LOGS.invalidRequest })
    );
  }

  const bdUser = usersServices.getUserById(id);
  if (!bdUser) {
    addRequest(
      req,
      res,
      STATUS_CODES.notFound,
      JSON.stringify({ message: LOGS.uuidNotExist })
    );
  } else {
    const user = await bodyParser<User>(req);
    const updatedUser = usersServices.updateUser(id, user);

    addRequest(req, res, STATUS_CODES.success, JSON.stringify(updatedUser));
  }
};

export const deleteUserById = (
  _req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  if (!isUuid(id)) {
    addRequest(
      _req,
      res,
      STATUS_CODES.badRequest,
      JSON.stringify({ message: LOGS.invalidRequest })
    );
  }

  const result = usersServices.deleteUser(id);

  if (result) {
    addRequest(_req, res, STATUS_CODES.deleted, '');
  } else {
    addRequest(
      _req,
      res,
      STATUS_CODES.notFound,
      JSON.stringify({ message: LOGS.uuidNotExist })
    );
  }
};
