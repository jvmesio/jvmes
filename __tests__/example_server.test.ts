import request from 'supertest';
const SERVER_URI = 'http://localhost:3000';

describe('Testing test endpoint', () => {
  it('should send back "Hello" with status 201', () => {
    request(`/test`)
  });
});