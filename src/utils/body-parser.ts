import { IncomingMessage } from "node:http";

export const bodyParser = async (req: IncomingMessage): Promise<any> => {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }
  return JSON.parse(body);
};