import dotenv from 'dotenv';
import { LOGS, REALIZE_HTTP_METHODS, STATUS_CODES } from './constants/index';
import http from 'node:http';
import { router } from './router/index';
import { addRequest } from './utils/index';
import path from 'node:path';
import { users } from './db';
import { addMockData } from './utils/add-mock-data';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env')
});

const PORT = Number(process.env.PORT) || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const isDev = NODE_ENV === 'development';
console.log(`Running in ${isDev ? 'development' : 'production'} mode`);
addMockData(isDev, users);

const server = http.createServer(async (req, res) => {
  const { url, method } = req;
  if (!url || !method || !(method in REALIZE_HTTP_METHODS)) {
      addRequest(req, res, STATUS_CODES.notFound, LOGS.notExist);
      return;
  } else {
    try {
      await router(req, res);
    } catch (err) {
      addRequest(req, res, STATUS_CODES.serverError, LOGS.serverError);
    }
  } 
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
