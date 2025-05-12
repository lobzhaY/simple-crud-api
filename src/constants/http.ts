export const REALIZE_HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const HTTP_PATHS = 'api/users';

export const STATUS_CODES = {
  success: 200,
  created: 201,
  deleted: 204,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
};
