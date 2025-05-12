
import { IncomingMessage, ServerResponse } from 'node:http';
// import { getRoutes } from '../utils/index';
import { parse } from 'node:url';
import { LOGS, ROUTERS_CONTROLLERS, STATUS_CODES } from '../constants/index';
import { addRequest } from '../utils/index';

export const router = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  const parsedUrl = parse(req.url || '', true);
  const pathname = parsedUrl.pathname || '';
  const method = req.method;
  const pathnameArr = pathname.split('/').slice(1);
  const pathNormalize = pathname.split('/').slice(1, 3).join('/');

  const routeKey = `${method}:${pathNormalize}:${pathnameArr.length}`;
  const handler = ROUTERS_CONTROLLERS[routeKey];


  if (handler) {
    const id = pathnameArr[2];
    handler(req, res, id!);
  } else {
      addRequest(req, res, STATUS_CODES.notFound, LOGS.notExist);
  }
};