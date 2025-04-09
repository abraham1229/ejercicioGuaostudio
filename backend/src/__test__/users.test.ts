import request from "supertest";
import app from "../server";
import { connectInMemoryDB, disconnectInMemoryDB } from "../setupTests";

jest.setTimeout(30000);

beforeAll(async () => {
  await connectInMemoryDB();
});

afterAll(async () => {
  await disconnectInMemoryDB();
});

const userTestCreate = {
  username: "testuser",
  email: "test@example.com",
  password: "password123",
};

const userTestLogin = {
  email: "test@example.com",
  password: "password123",
};

let jwtToken: string;

describe("Test de usuarios", () => {
  describe("Registro de Usuario", () => {
    //Missing values
    it("Debería responder con 400 (hace falta password) ", async () => {
      const userIncorrectPassword = { ...userTestCreate, password: "12" };

      const response = await request(app)
        .post("/api/users/register")
        .send(userIncorrectPassword);

      expect(response.status).toBe(400);
    });

    //Happy
    it("Debería crear un nuevo usuario, responder con 201 y mensaje de éxito", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send(userTestCreate);

      expect(response.status).toBe(201);
      expect(response.text).toEqual("Registro creado correctamente");
    });

    //Duplicate
    it("Debería retornar error 409 (email duplicado)", async () => {
      const response = await request(app)
        .post("/api/users/register")
        .send(userTestCreate);

      expect(response.status).toBe(409);
      expect(response.body.error).toEqual("Correo ya registrado");
    });
  });
  describe("Login de Usuario", () => {
    //Email does not exist
    it("Debería retornar 404 (correo no existe)", async () => {
      const userNoEmail = { ...userTestLogin, email: "correo@noexiste.com" };
      const response = await request(app)
        .post("/api/users/login")
        .send(userNoEmail);

      expect(response.status).toBe(404);
      expect(response.body.error).toEqual(
        "Este correo no esta vinculado a una cuenta"
      );
    });

    //Incorrect password
    it("Debería retornar 401 (incorrect password)", async () => {
      const userNoPassword = { ...userTestLogin, password: "1249" };
      const response = await request(app)
        .post("/api/users/login")
        .send(userNoPassword);

      expect(response.status).toBe(401);
      expect(response.body.error).toEqual("Password Incorrecto");
    });

    //Happy
    it("Debería aceptar credenciales creadas y responder con 200", async () => {
      const response = await request(app)
        .post("/api/users/login")
        .send(userTestLogin);

      jwtToken = response.text;
      expect(response.status).toBe(200);
    });
  });

  describe("Obtener información del usuario", () => {
    //  No bearer token
    it("Debería retornar 401 (sin token)", async () => {
      const response = await request(app).get("/api/users/information");

      expect(response.status).toBe(401);
      expect(response.body.error).toEqual("No autorizado");
    });

    //  bearer token invalido
    it("Debería retornar 404 (token invalido)", async () => {
      const response = await request(app)
        .get("/api/users/information")
        .set("Authorization", "Bearer tokenmalonosequetengaperonoes");

      expect(response.status).toBe(500);
      expect(response.body.error).toEqual("Token no valido");
    });

    //  Happy
    it("Debería retornar 200", async () => {
      const response = await request(app)
        .get("/api/users/information")
        .set("Authorization", `Bearer ${jwtToken}`);

      expect(response.status).toBe(200);
    });
  });
});
