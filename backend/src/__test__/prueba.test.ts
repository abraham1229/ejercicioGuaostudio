import request from 'supertest';
import app from '../server'; // Asegúrate de que la ruta sea correcta
import { disconnectDB } from '../config/db';

describe('Registro de usuario', () => {

  afterAll(async () => {
    await disconnectDB();
  });

  it('Debería crear un nuevo usuario y responder con 201 y mensaje de éxito', async () => {
    const newUser = {
      username: "Rabi Soto",
      email: "testuser1@example.com",
      password: "password123"
    };

    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);
    
    expect(response.status).toEqual(201) 
    expect(response.text).toEqual("Registro creado correctamente");
  });
});
