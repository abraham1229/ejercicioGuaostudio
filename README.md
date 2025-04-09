# API de Sistema de Pagos

Este proyecto es un ejercicio técnico del proceso de selección en Guaostudio, cuyo objetivo es diseñar una API REST para un Sistema de Pagos.

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

- [Node.js](https://nodejs.org/) v12 o superior.
- [Git](https://git-scm.com/) instalado.
- Acceso a la base de datos configurada según la elección del desarrollador.

### Pasos de Instalación

1. **Clonar el repositorio:**

   **git clone <URL_DEL_REPOSITORIO>**  
   **cd <NOMBRE_DEL_REPOSITORIO>**

2. **Instalar dependencias:**

   **npm install**

3. **Configurar variables de entorno:**

   - Renombrar el archivo **.env.example** a **.env**:

     **cp .env.example .env**

   - Editar el archivo **.env** para configurar los siguientes parámetros (por ejemplo, cadena de conexión a la base de datos, puerto, etc.):

     **PORT=3000**  
     **DB_URI=tu_cadena_de_conexion**  
     **SECRET_KEY=tu_clave_secreta**

4. **Iniciar la aplicación:**

   **npm start**

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

**npm test**

Las pruebas cubren:
- Registro de usuarios.
- Creación, validación y autorización de transacciones.
- Consulta del historial de transacciones.

## Despliegue y CI/CD

El proyecto cuenta con un pipeline de CI/CD para despliegue automático. Para configurarlo:

- Conecta el repositorio a una herramienta de CI/CD (por ejemplo, GitHub Actions, Travis CI, CircleCI).
- Verifica que los scripts de prueba y despliegue estén correctamente definidos en el archivo de configuración correspondiente (por ejemplo, **.github/workflows/ci.yml** para GitHub Actions).

## Consideraciones Adicionales

- **Validaciones y Seguridad:** Se aplican validaciones básicas. Se recomienda usar HTTPS en producción y otros mecanismos de seguridad adicionales.
- **Estilo de Código:** Se sigue un code style uniforme (por ejemplo, mediante ESLint) para mantener la calidad del código.
- **Buenas Prácticas:** Se aplican buenas prácticas en el manejo de errores, modularidad y documentación interna del código.

## Contacto

Para dudas o sugerencias, por favor contacta a: [tu_email@ejemplo.com]
