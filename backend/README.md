# Backend - LabStock Control

Backend de la aplicación LabStock Control. Este servicio contiene la API encargada de gestionar la comunicación entre el frontend y la base de datos PostgreSQL.

## Tecnologías utilizadas

- Node.js
- Express / API REST
- PostgreSQL
- Knex.js
- Docker

## Estructura principal

```bash
backend/
├── src/
├── dataBaseData/
├── Dockerfile
├── knexfile.js
├── package.json
├── package-lock.json
└── README.md
```

## Función del backend

El backend se encarga de:

- Recibir las peticiones HTTP del frontend.
- Gestionar productos, proveedores y pedidos.
- Realizar operaciones CRUD.
- Conectarse con PostgreSQL.
- Devolver respuestas a la aplicación cliente.

## Dockerfile

El backend usa una imagen basada en Node.js Alpine:

```dockerfile
FROM node:24-alpine
```

El contenedor trabaja dentro de:

```bash
/home/app
```

Instala las dependencias con:

```bash
npm install
```

Expone el puerto:

```bash
4000
```

Y arranca la aplicación con:

```bash
npm start
```

## Ejecución individual

Desde la carpeta `backend`:

```bash
npm install
npm start
```

## Ejecución con Docker

Desde la raíz del proyecto, se recomienda levantar el backend junto al resto de servicios:

```bash
docker compose up -d --build
```

## Puerto del servicio

El backend se ejecuta en el puerto:

```bash
4000
```

## Variables y conexión

El servicio está configurado en Docker Compose con:

```yaml
environment:
  NODE_ENV: production
```

La base de datos se ejecuta en el servicio `database`, usando PostgreSQL.

## Notas

Para que el backend funcione correctamente, la base de datos debe estar levantada y accesible desde Docker Compose.
