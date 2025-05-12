import { IncomingMessage, ServerResponse } from "node:http";

export const addRequest  = (_req: IncomingMessage, res: ServerResponse, status: number, message: string,): void => {
    if (res.writableEnded) return;
  res.writeHead(status, { 'Content-Type': 'application/json, charset=utf-8' });
  res.end(message);
  return;
};