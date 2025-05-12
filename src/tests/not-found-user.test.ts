import request from 'supertest';
import { server } from '../index';

const mockNewUser = { username: 'Foo Baz', age: 30, hobbies: ['tea', 'pasta'] };

const notExistUUID = '4f9f7ffa-dd5a-4e3e-b8d4-e38c0ef27dc5';

describe('User not found (404) scenarios', () => {
    it('Should create a new user', async () => {
          const res = await request(server).post('/api/users').send(mockNewUser).set('Content-Type', 'application/json');
          const { id, username, age, hobbies } = res.body;
          expect(res.statusCode).toBe(201);
      
          expect(typeof id).toBe('string');
          expect(username).toBe(mockNewUser.username);
          expect(age).toBe(mockNewUser.age);
          expect(hobbies).toStrictEqual(mockNewUser.hobbies);
        });

  it('Should return 404 when getting non-existent user', async () => {
    const res = await request(server).get(`/api/users/${notExistUUID}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });

  it('Should return 404 when updating non-existent user', async () => {
    const res = await request(server)
      .put(`/api/users/${notExistUUID}`)
      .send({
        username: 'New Name',
        age: 30,
        hobbies: ['reading'],
      })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });

  it('Should return 404 when deleting non-existent user', async () => {
    const res = await request(server).delete(`/api/users/${notExistUUID}`);
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('message');
    expect(typeof res.body.message).toBe('string');
  });
});