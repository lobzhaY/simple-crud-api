import request from 'supertest';
import { server } from '../index';

const mockNewUser = { username: 'Foo Baz', age: 30, hobbies: ['tea', 'pasta'] };
const mockUpdateUser = { username: 'Foo Baz', age: 99, hobbies: ['sleep'] };

const notValidUUID = '123';

describe('Invalid uuid', () => {
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
  });

  it('Should get user return 400 if not valid user id', async () => {
    const res = await request(server).get(`/api/users/${notValidUUID}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });

  it('Should update the user return 400 if not valid user id', async () => {
    const res = await request(server)
      .put(`/api/users/${notValidUUID}`)
      .send(mockUpdateUser)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });

  it('Should delete the user return 400 if not valid user id', async () => {
    const res = await request(server).delete(`/api/users/${notValidUUID}`);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });
});
