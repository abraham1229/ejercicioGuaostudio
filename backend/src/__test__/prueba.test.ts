import request from 'supertest';
import app from '../server';
import { connectInMemoryDB, disconnectInMemoryDB } from '../setupTests';

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await disconnectInMemoryDB();
});

describe('Registro de Usuario', () => {
  it('Debería crear un nuevo usuario y responder con 201 y mensaje de éxito', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);
    
    expect(response.status).toBe(201);
    expect(response.text).toEqual('Registro creado correctamente');
  });
});
