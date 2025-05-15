# simple-crud-api with In-Memory Database

## Description

This project implements a simple CRUD API with an in-memory database, providing functionality for user management. The API supports creating, reading, updating, and deleting user records while adhering to best practices in API design.

---

## Features

### Endpoints

- `GET /api/users` – Fetch all users  
- `GET /api/users/{userId}` – Fetch a user by ID  
- `POST /api/users` – Create a new user  
- `PUT /api/users/{userId}` – Update an existing user  
- `DELETE /api/users/{userId}` – Delete a user by ID  

### User Properties

- `id` (`string`, UUID): Auto-generated unique identifier  
- `username` (`string`): Required user name  
- `age` (`number`): Required age of the user  
- `hobbies` (`string[]`): Required hobbies list (can be empty)  

### Error Handling

- Invalid or non-existing endpoints return a `404` response  
- Server-side errors return a `500` response  

---

## Horizontal Scaling

- Uses Node.js Cluster API for multi-instance deployment  
- Round-robin load balancing algorithm  

---

## Technical Requirements

- **Languages**: JavaScript or TypeScript  
- **Node.js Version**: `22.9.0` or above  
- **Allowed Dependencies**:
  - `nodemon`, `dotenv`, `cross-env`
  - `typescript`, `ts-node`, `ts-node-dev`
  - `eslint` and plugins, `prettier`
  - `webpack`, `webpack-cli`, and plugins
  - `uuid`, `@types/*`, and testing libraries

- **Environment Configuration**: Port is defined in `.env`

---

## Running the Application

### Development Mode

Start the application with hot-reloading:

```bash
npm run start:dev
```

### Production Mode

Build and run the application:

```bash
npm run start:prod
```

### Multi-instance Mode

Run the application with multiple workers using the Node.js Cluster API:

```bash
npm run start:multi
```

Requests are distributed using a round-robin algorithm.  
**Example**:
- Load balancer listens at `localhost:4000`  
- Workers listen on `localhost:4001`, `localhost:4002`, etc.

---

## API Documentation

### `GET /api/users`

Returns a list of all users.

**Status Codes**:
- `200 OK`: Success

---

### `GET /api/users/{userId}`

Fetches a user by their ID.

**Status Codes**:
- `200 OK`: User found  
- `400 Bad Request`: Invalid userId  
- `404 Not Found`: User not found

---

### `POST /api/users`

Creates a new user.

**Request Body**:
```json
{
  "username": "John Doe",
  "age": 30,
  "hobbies": ["reading", "coding"]
}
```

**Status Codes**:
- `201 Created`: User created  
- `400 Bad Request`: Invalid request body

---

### `PUT /api/users/{userId}`

Updates an existing user.

**Request Body**:
```json
{
  "username": "John Doe",
  "age": 31,
  "hobbies": ["reading"]
}
```

**Status Codes**:
- `200 OK`: User updated  
- `400 Bad Request`: Invalid userId or request body  
- `404 Not Found`: User not found

---

### `DELETE /api/users/{userId}`

Deletes a user by their ID.

**Status Codes**:
- `204 No Content`: User deleted  
- `400 Bad Request`: Invalid userId  
- `404 Not Found`: User not found

---

## Tests

### Running Tests

Run tests to verify API functionality:

```bash
npm run test
```

### Scenarios Covered

- `GET /api/users` – Returns an empty array initially  
- `POST /api/users` – Creates and returns the user  
- `GET /api/users/{userId}` – Returns the correct user  
- `PUT /api/users/{userId}` – Returns the updated user  
- `DELETE /api/users/{userId}` – Successfully removes the user  
- Verify deleted user is inaccessible (`GET /api/users/{userId}`)

---

## Horizontal Scaling

### How It Works

- Load balancer listens at `PORT` (e.g., `4000`)  
- Workers listen on `PORT + n` (e.g., `4001`, `4002`, etc.)

**Round-robin Request Distribution**:
- Request 1 → `4001`  
- Request 2 → `4002`  
- Request 3 → `4003`  
- Request 4 → `4001`, and so on

---

## Database Consistency

State is shared between workers to ensure consistent data regardless of which worker handles the request.

---

## Error Handling Summary

- `404 Not Found`: Invalid endpoints or missing resources  
- `400 Bad Request`: Invalid `userId` or malformed body  
- `500 Internal Server Error`: Server-side errors

---

## Environment Variables

- `PORT`: Specifies server port (default: `4000`)

---

## Tools and Best Practices

- **Code Quality**: Enforced with ESLint and Prettier  
- **Scalability**: Achieved via clustering and load balancing  
- **Testing**: Automated tests with at least 3 scenarios implemented



