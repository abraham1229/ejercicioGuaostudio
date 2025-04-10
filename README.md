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
