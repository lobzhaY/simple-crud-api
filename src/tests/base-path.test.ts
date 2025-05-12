import request from 'supertest';
import { server } from '../index';

const mockNewUser = { username: 'Foo Baz', age: 30, hobbies: ['tea', 'pasta'] };
const mockUpdateUser = { username: 'Foo Baz', age: 99, hobbies: ['sleep'] };

describe('User API', () => {
  let userId: string;

  it('Should get all users return empty array', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('Should create a new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send(mockNewUser)
      .set('Content-Type', 'application/json');
    const { id, username, age, hobbies } = res.body;
    expect(res.statusCode).toBe(201);

    expect(typeof id).toBe('string');
    expect(username).toBe(mockNewUser.username);
    expect(age).toBe(mockNewUser.age);
    expect(hobbies).toStrictEqual(mockNewUser.hobbies);
    userId = id;
  });

  it('Should return the created user by id', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    const { id, username, age, hobbies } = res.body;

    expect(id).toBe(userId);
    expect(username).toBe(mockNewUser.username);
    expect(age).toBe(mockNewUser.age);
    expect(hobbies).toStrictEqual(mockNewUser.hobbies);
  });

  it('Should update the user', async () => {
    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send(mockUpdateUser)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);

    const { id, username, age, hobbies } = res.body;
    expect(id).toBe(userId);
    expect(username).toBe(mockUpdateUser.username);
    expect(age).toBe(mockUpdateUser.age);
    expect(hobbies).toStrictEqual(mockUpdateUser.hobbies);
  });

  it('Should delete the user', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(204);
  });

  it('Should return 404 after deletion', async () => {
    const res = await request(server).get(`/api/users/${userId}`);
    expect(res.statusCode).toBe(404);
  });
});
