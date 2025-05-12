import { IncomingMessage } from 'node:http';

export const bodyParser = async <T>(req: IncomingMessage): Promise<T> => {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  return JSON.parse(body) as T;
};
