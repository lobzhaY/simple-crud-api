import { IncomingMessage, ServerResponse } from 'node:http';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void;