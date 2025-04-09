# API de Sistema de Pagos

Este proyecto es un ejercicio técnico para el proceso de selección en Guaostudio, cuyo objetivo es diseñar una API REST para un Sistema de Pagos.

## Descripción

La API permite:

- **Registrar nuevos usuarios:** Permite la creación de nuevos usuarios.
- **Realizar transacciones:** Se deben iniciar, validar y terminar transacciones, si no se respeta ese orden, por seguridad, manda error.
- **Consultar el historial de transacciones:** Permite al usuario revisar sus transacciones previas.

## Tecnologías Utilizadas

- **Lenguaje y Framework:** Node.js con Express
- **Base de datos:** MongoDB
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

   - Crear y/o editar archivo .env y poner
     MONGO_URI = (URI para la conexion de su base de datos/nombrebase de datos)
     JWT_SECRET = (palabra secreta deseada para hacer los JWT)


4. **Iniciar la aplicación:**

   ```bash
   npm run dev
   ```
   
## Endpoints de la API

### Registrar Usuarios

- **URL:** `/api/users/register`
- **Método:** `POST`
- **Descripción:** Registra un nuevo usuario.
- **Cuerpo de la solicitud (JSON):**

  **{"username": "nombre_usuario", "email": "usuario@example.com", "password": "contraseña"}**

- **Respuestas:**
  - **201:** Usuario registrado exitosamente.
  - **400:** Error en los datos enviados.

### Iniciar Transacción de Pago

- **URL:** `/api/transactions`
- **Método:** `POST`
- **Descripción:** Inicia una nueva transacción de pago, validando que la transacción esté autorizada.
- **Cuerpo de la solicitud (JSON):**

  **{"userId": "id_del_usuario", "amount": 100.00, "paymentMethod": "tarjeta_credito"}**

- **Respuestas:**
  - **201:** Transacción iniciada y autorizada.
  - **400 / 401:** Error en la validación o autorización.

### Consultar Historial de Transacciones

- **URL:** `/api/transactions/:userId`
- **Método:** `GET`
- **Descripción:** Consulta el historial de transacciones de un usuario.
- **Parámetros:**
  - **userId:** Identificador del usuario.
- **Respuestas:**
  - **200:** Devuelve un listado de transacciones.
  - **404:** Usuario no encontrado o sin transacciones registradas.

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
