import request from 'supertest';
import app from '../server';
import { connectInMemoryDB, disconnectInMemoryDB } from '../setupTests';

jest.setTimeout(30000);

const userTestCreate1 = {
  username: 'testuser1',
  email: 'test1@example.com',
  password: 'password123',
  balance: 1000
}; 

const userTestCreate2 = {
  username: 'testuser2',
  email: 'test2@example.com',
  password: 'password123'
}; 

const userTestLogin = {
  email: 'test1@example.com',
  password: 'password123'
};

const transactionTest = {
  recipientEmail : "test2@example.com",
  amount : 10.0
}

let jwtTokenUser: string;
let jwtTokenTransaction: string;

beforeAll(async () => {
  await connectInMemoryDB();
  await request(app)
    .post('/api/users/register')
    .send(userTestCreate1);
  const response = await request(app)
    .post('/api/users/login')
    .send(userTestLogin);
  jwtTokenUser = response.text
  
  await request(app) 
    .post('/api/users/register')
    .send(userTestCreate2);
});

afterAll(async () => {
  await disconnectInMemoryDB();
});

describe('Test de transacciones', () => { 
  describe('Inicio de transacción', () => {
    //  Transferencia a el mismo
    it('Debería retornar 400 (mismo correo)', async () => {
      
      const transactionTestSameEmail = { ...transactionTest, recipientEmail: 'test1@example.com'}

      const response = await request(app)
        .post('/api/transactions/initiate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .send(transactionTestSameEmail);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual('No se puede transferir a usted mismo');
    });

    //  Transferencia a alguien que no existe
    it('Debería retornar 404 (no existe destinatario)', async () => {
      
      const transactionTestSameEmail = { ...transactionTest, recipientEmail: 'test10@example.com'}

      const response = await request(app)
        .post('/api/transactions/initiate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .send(transactionTestSameEmail);
      
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('El usuario destino no existe');
    });

    //  Saldo insuficiente
    it('Debería retornar 400 (saldo insuficiente)', async () => {
      
      const transactionTestNoBalance = {...transactionTest, amount: 10000}

      const response = await request(app)
        .post('/api/transactions/initiate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .send(transactionTestNoBalance);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual('Saldo insuficiente');
    });

    //  Happy
    it('Debería crear nueva transacción y retornar 200', async () => {

      const response = await request(app)
        .post('/api/transactions/initiate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .send(transactionTest);
      
      jwtTokenTransaction = response.text
      
      expect(response.status).toBe(200);
    });
  });

  describe('Autorizar de transacción', () => {

    //  Sin token de transacción
    it('Debería retornar 401 (sin token de transacción)', async () => {
      
      const response = await request(app)
        .put('/api/transactions/validate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
      
      expect(response.status).toBe(401);
      expect(response.body.error).toEqual('Falta token de transacción');
    });

    //  Token de transacción equivocado
    it('Debería retornar 404 (token de transacción equivocado)', async () => {
      const response = await request(app)
        .put('/api/transactions/validate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .set('x-transaction-token', jwtTokenUser)
      
      expect(response.status).toBe(404);
      expect(response.body.error).toEqual('La transacción no existe');
    });

    //  Happy
    it('Debería validar la transacción y retornar un 200', async () => {
      const response = await request(app)
        .put('/api/transactions/validate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .set('x-transaction-token', jwtTokenTransaction)
      
      expect(response.status).toBe(200);
      expect(response.text).toEqual('Transacción autorizada correctamente');
    });

    //  Transacción no se encuentra pendiente
    it('Debería retornar 400 (Transacción NO pendiente)', async () => {
      const response = await request(app)
        .put('/api/transactions/validate')
        .set('Authorization', `Bearer ${jwtTokenUser}`)
        .set('x-transaction-token', jwtTokenTransaction)
      
      expect(response.status).toBe(400);
      expect(response.body.error).toEqual('La transacción no está en estado pendiente');
    });
  });
})
