import http from 'node:http';
import { LOGS, ROUTERS_CONTROLLERS, STATUS_CODES } from './constants';
import { addRequest } from './utils';

const PORT = Number(process.env.PORT);

http
  .createServer(async (req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const method = req.method?.toUpperCase();

    const pathnameArr = url.pathname.split('/').slice(1);
    const pathNormalize = url.pathname.split('/').slice(1, 3).join('/');

    const routeKey = `${method}:${pathNormalize}:${pathnameArr.length}`;
    const handler = ROUTERS_CONTROLLERS[routeKey];

    if (!handler) {
      addRequest(
        req,
        res,
        STATUS_CODES.notFound,
        JSON.stringify({ message: LOGS.notExist })
      );
      return;
    }

    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      try {
        const id = pathnameArr[2];
        handler(req, res, id!);
        console.log(`Worker listening on port ${PORT}`);
      } catch (err) {
        addRequest(
          req,
          res,
          STATUS_CODES.serverError,
          JSON.stringify({ message: LOGS.serverError })
        );
        console.error(err);
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Worker started on port ${PORT}`);
  });
