import request from 'supertest';
import app from '../server';
import { connectInMemoryDB, disconnectInMemoryDB } from '../setupTests';

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await disconnectInMemoryDB();
});

const userTestCreate = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
}; 

const userTestLogin = {
  email: 'test@example.com',
  password: 'password123'
};


describe('Test de usuarios', () => { 
  describe('Registro de Usuario', () => {
    it('Debería crear un nuevo usuario y responder con 201 y mensaje de éxito', async () => {
      const response = await request(app)
        .post('/api/users/register')
        .send(userTestCreate);
      
      expect(response.status).toBe(201);
      expect(response.text).toEqual('Registro creado correctamente');
    });
  });
  describe('Login de Usuario', () => {
    it('Debería aceptar credenciales creadas y responder con 200 y JWT', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send(userTestLogin);
      
      expect(response.status).toBe(200);
    });
  });
})
