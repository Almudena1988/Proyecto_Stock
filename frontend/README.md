# Frontend - LabStock Control

Frontend de la aplicación LabStock Control. Esta parte contiene la interfaz web desde la que el usuario puede iniciar sesión y gestionar productos, proveedores y pedidos.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- Nginx
- Docker

## Estructura principal

```bash
frontend/
├── dist/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── order/
│   │   ├── products/
│   │   └── suppliers/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Función del frontend

El frontend permite al usuario:

- Iniciar sesión.
- Visualizar productos.
- Crear, modificar y eliminar productos.
- Gestionar proveedores.
- Crear pedidos.
- Ver notificaciones de las acciones realizadas.
- Navegar entre las distintas secciones de la aplicación.

## Dockerfile

El frontend utiliza una construcción en dos fases:

1. Construcción de la aplicación con Node.js.
2. Servido del contenido estático con Nginx.

Imagen de construcción:

```dockerfile
FROM node:24-alpine AS build
```

Imagen final:

```dockerfile
FROM nginx:stable-alpine
```

La carpeta generada `dist` se copia en:

```bash
/usr/share/nginx/html
```

También se copia la configuración de Nginx:

```bash
/etc/nginx/conf.d/default.conf
```

## Ejecución individual en desarrollo

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

## Construcción del frontend

```bash
npm run build
```

## Ejecución con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

## Puerto del servicio

El frontend se sirve en el puerto:

```bash
80
```

Acceso desde el navegador:

```bash
http://localhost
```

## Notas

El frontend necesita que el backend esté disponible para poder realizar las peticiones HTTP y mostrar los datos de productos, proveedores y pedidos.
