# Payment System API

This project is a technical exercise for the selection process at Guaostudio, aiming to design a REST API for a Payment System.

## Description

The API allows:

- **Registering new users:** Enables creation of new users.
- **Performing transactions:** Transactions must be initiated, validated, and completed. If the order is not respected, an error is thrown for security reasons.
- **Viewing transaction history:** Allows users to review their past transactions.

## Technologies Used

- **Language & Framework:** Node.js with Express.
- **Database:** MongoDB.
- **Unit/Integration Testing:** Basic tests implemented using Jest and Supertest.
- **CI/CD:** Configured for automatic deployment via GitHub Actions.

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher.
- [Git](https://git-scm.com/) installed.
- Access to a configured database.

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone git@github.com:abraham1229/ejercicioGuaostudio.git
   cd ejercicioGuaostudio
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set environment variables:**

   Create or edit the .env file and add:

   ```bash
   MONGO_URI=(Your MongoDB connection URI)
   JWT_SECRET=(Your desired secret word for JWT)
   ```

4. **Start the application:**

   ```bash
   npm run dev
   ```

## API Documentation

Please note that the `base_url` in dev mode is `http://localhost:4000`.  
It is recommended to use Postman to test the API functionality.

### User Endpoints

#### 1. Register User
- **Method:** POST  
- **Endpoint:** {base_url}/api/users/register  
- **Description:** Registers a new user.
- **Success:** 201 and a descriptive message  
- **Error:** Error status and descriptive error message

```json
{
  "username": "Lucy Reyna",
  "email": "correo3092@correo.com",
  "password": "password",
  "balance": 150 // Optional (default is 100)
}
```

---

#### 2. Login User
- **Method:** POST  
- **Endpoint:** {base_url}/api/users/login  
- **Description:** Authenticates a user and returns an access token.
- **Success:** 200 and a JWT containing user ID  
- **Error:** Error status and descriptive error message

```json
{
  "email": "correo2@correo.com",
  "password": "password"
}
```

---

#### 3. Get User Info
- **Method:** GET  
- **Endpoint:** {base_url}/api/users/information  
- **Requirements:**
  - **Authorization:** Bearer user JWT token
- **Description:** Retrieves authenticated user information.
- **Success:** 200 and user info  
- **Error:** Error status and descriptive error message

---

### Transaction Endpoints

#### 4. Initiate Transaction
- **Method:** POST  
- **Endpoint:** {base_url}/api/transactions/initiate  
- **Requirements:**
  - **Authorization:** Bearer user JWT token
- **Description:** Starts a transaction by specifying recipient's email and transfer amount.
- **Success:** 200 and a transaction JWT  
- **Error:** Error status and descriptive error message

```json
{
  "recipientEmail": "correo29@correo.com",
  "amount": 10.0,
  "status": "MXN", // Optional (default is MXN)
  "metadata": ""   // Optional (default is empty)
}
```

---

#### 5. Validate Transaction
- **Method:** PUT  
- **Endpoint:** {base_url}/api/transactions/validate  
- **Requirements:**
  - **Authorization:** Bearer user JWT token  
  - **Request Header:** **x-transaction-token** (transaction JWT)
- **Description:** Validates and authorizes a previously initiated transaction.
- **Success:** 200 and a descriptive message  
- **Error:** Error status and descriptive error message

---

#### 6. Complete Transaction
- **Method:** PUT  
- **Endpoint:** {base_url}/api/transactions/complete  
- **Requirements:**
  - **Authorization:** Bearer user JWT token  
  - **Request Header:** **x-transaction-token** (transaction JWT)
- **Description:** Completes a validated transaction.
- **Success:** 200 and a descriptive message  
- **Error:** Error status and descriptive error message

---

#### 7. Get Transaction History
- **Method:** GET  
- **Endpoint:** {base_url}/api/transactions/history  
- **Requirements:**
  - **Authorization:** Bearer user JWT token
- **Description:** Retrieves the transaction history of the authenticated user.
- **Success:** 200 and transaction history  
- **Error:** Error status and descriptive error message

---

## Unit/Integration Testing

To run unit/integration tests, use the following command:

```bash
npm test
```

The tests cover:
- User registration.
- Transaction creation, validation, and completion.
- Transaction history retrieval.

## Deployment & CI/CD

The project includes a CI/CD pipeline for automatic deployment. To configure it:

- Connect the repository to a CI/CD tool (e.g., GitHub Actions).
- Ensure the test and deployment scripts are properly defined in the configuration file (e.g., **.github/workflows/ci-cd.yml** for GitHub Actions).

## Contact

For questions or suggestions, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/abrahamortizcastro/)

<!--

# API de Sistema de Pagos

Este proyecto es un ejercicio técnico para el proceso de selección en Guaostudio, cuyo objetivo es diseñar una API REST para un Sistema de Pagos.

## Descripción

La API permite:

- **Registrar nuevos usuarios:** Permite la creación de nuevos usuarios.
- **Realizar transacciones:** Se deben iniciar, validar y terminar transacciones, si no se respeta ese orden, por seguridad, manda error.
- **Consultar el historial de transacciones:** Permite al usuario revisar sus transacciones previas.

## Tecnologías Utilizadas

- **Lenguaje y Framework:** Node.js con Express.
- **Base de datos:** MongoDB.
- **Pruebas Unitarias:** Se han implementado pruebas básicas usando jest y supertest.
- **CI/CD:** Configuración para despliegue automático mediante Github Actions.

## Instalación y Configuración

### Prerrequisitos

- [Node.js](https://nodejs.org/) v16 o superior.
- [Git](https://git-scm.com/) instalado.
- Acceso a la base de datos configurada según la elección del desarrollador.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone git@github.com:abraham1229/ejercicioGuaostudio.git
   cd ejercicioGuaostudio
   cd backend
    ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**

   Crear y/o editar archivo .env y poner
   ```
   MONGO_URI = (URI para la conexion de su base de datos/nombrebase de datos)
   JWT_SECRET = (palabra secreta deseada para hacer los JWT)  
   ```

4. **Iniciar la aplicación:**

   ```bash
   npm run dev
   ```

## Documentación de API

Por favor tome en consideración que base_url en modo dev es http://localhost:4000. 
Se recomienda usar postman para probar la funcionalidad de la api.

### Endpoints de Usuario

#### 1. Agregar Usuario
- **Método:** POST  
- **Endpoint:** {base_url}/api/users/register  
- **Descripción:** Registra un nuevo usuario.
- **Success:** 201 y mensaje descriptivo
- **Error:** Status de error y mensaje descriptivo del error

```json
{
    "username": "Luchi Reyna",
    "email": "correo3092@correo.com",
    "password": "password",
    "balance": 150 Opcional (Default es 100)
}
```

---

#### 2. Identificar Usuario
- **Método:** POST  
- **Endpoint:** {base_url}/api/users/login  
- **Descripción:** Autentica a un usuario y devuelve un token de acceso.
- **Success:** 200 y JWT de id de usuario
- **Error:** Status de error y mensaje descriptivo del error

```json
{
    "email": "correo2@correo.com",
    "password": "password"
}
```

---

#### 3. Obtener Datos del Usuario
- **Método:** GET  
- **Endpoint:** {base_url}/api/users/information  
- **Requerimientos:**
  - **Authorization:** Bearer Token JWT de usuario 
- **Descripción:** Recupera la información del usuario autenticado.
- **Success:** 200 e información de usuario puesto con el JWT
- **Error:** Status de error y mensaje descriptivo del error

---

### Endpoints de Transacciones

#### 4. Iniciar Transacción
- **Método:** POST  
- **Endpoint:** {base_url}/api/transactions/initiate  
- **Requerimientos:**
  - **Authorization:** Bearer Token JWT de usuario 
- **Descripción:** Inicia una transacción especificando el correo del destinatario y el monto a transferir.
- **Success:** 200 y JWT de id de transacción
- **Error:** Status de error y mensaje descriptivo del error

```json
{
    "recipientEmail": "correo29@correo.com",
    "amount": 10.0,
    "status" : "MXN" //Opcional (default es MXN),
    "metadata" : "" //Opcional (default es "")
}
```

---

#### 5. Autorizar Transacción
- **Método:** PUT  
- **Endpoint:** {base_url}/api/transactions/validate  
- **Requerimientos:**
  - **Authorization:** Bearer Token JWT de usuario 
  - **Request Header:** **x-transaction-token** (JWT de id de transacción)
- **Descripción:** Valida y autoriza la transacción iniciada previamente.
- **Success:** 200 y mensaje descriptivo
- **Error:** Status de error y mensaje descriptivo del error

---

#### 6. Completar Transacción
- **Método:** PUT  
- **Endpoint:** {base_url}/api/transactions/complete  
- **Requerimientos:**
  - **Authorization:** Bearer Token JWT de usuario 
  - **Request Header:** **x-transaction-token** (JWT de id de transacción)
- **Descripción:** Finaliza una transacción autorizada.
- **Success:** 200 y mensaje descriptivo
- **Error:** Status de error y mensaje descriptivo del error

---

#### 7. Obtener Historial de Transacciones
- **Método:** GET  
- **Endpoint:** {base_url}/api/transactions/history  
- **Requerimientos:**
  - **Authorization:** Bearer Token JWT de usuario 
- **Descripción:** Recupera el historial de transacciones del usuario autenticado.
- **Success:** 200 e historial de transacciones del usuario
- **Error:** Status de error y mensaje descriptivo del error

---

   
## Pruebas Unitarias

Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
  ```bash
    npm test
  ```
Las pruebas cubren:
- Registro de usuarios.
- Creación, validación y autorización de transacciones.
- Consulta del historial de transacciones.

## Despliegue y CI/CD

El proyecto cuenta con un pipeline de CI/CD para despliegue automático. Para configurarlo:

- Conecta el repositorio a una herramienta de CI/CD (en mi caso fue GitHub Actions).
- Verifica que los scripts de prueba y despliegue estén correctamente definidos en el archivo de configuración correspondiente (por ejemplo, **.github/workflows/ci-cd.yml** para GitHub Actions).


## Contacto

Para dudas o sugerencias, por favor contacta a: [abrahamortizcastro1229@gmail.com]
-->
