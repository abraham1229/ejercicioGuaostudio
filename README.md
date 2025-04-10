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
