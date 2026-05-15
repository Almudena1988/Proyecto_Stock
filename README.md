# LabStock Control

Aplicación web para la gestión de stock, productos, proveedores y pedidos. El proyecto está dividido en tres servicios principales: frontend, backend y base de datos PostgreSQL, ejecutados mediante Docker Compose.

## Estructura del proyecto

```bash
Proyecto_Stock/
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── README.md
├── postgres/
├── docker-compose.yml
└── README.md
```

## Tecnologías utilizadas

- React: desarrollo de la interfaz de usuario.
- Vite: entorno de desarrollo y construcción del frontend.
- Node.js: entorno de ejecución del backend.
- Express / API REST: comunicación entre frontend y backend.
- PostgreSQL: base de datos relacional.
- Docker: creación de contenedores para cada servicio.
- Docker Compose: ejecución conjunta de frontend, backend y base de datos.
- Nginx: servidor web para servir el frontend en producción.

## Funcionalidades principales

- Inicio de sesión de usuario administrador.
- Gestión de productos.
- Gestión de proveedores.
- Gestión de pedidos.
- Operaciones CRUD sobre los datos principales.
- Ordenación y paginación de registros.
- Avisos y notificaciones al realizar acciones.
- Persistencia de datos en PostgreSQL.

## Ejecución con Docker Compose

Desde la raíz del proyecto:

```bash
docker compose up -d --build
```

Este comando construye y levanta los servicios definidos en `docker-compose.yml`.

## Servicios disponibles

| Servicio | Descripción | Puerto |
|---|---|---|
| frontend | Aplicación React servida con Nginx | 80 |
| backend | API del proyecto | 4000 |
| database | Base de datos PostgreSQL | 5433:5432 |

## Acceso a la aplicación

Una vez levantados los contenedores, la aplicación estará disponible en:

```bash
http://localhost
```

## Comandos útiles

Ver contenedores activos:

```bash
docker ps
```

Detener los servicios:

```bash
docker compose down
```

Reconstruir los contenedores:

```bash
docker compose up -d --build
```

Ver logs:

```bash
docker compose logs -f
```

## Base de datos

El servicio de base de datos utiliza PostgreSQL y mantiene los datos mediante un volumen local:

```bash
./postgres/data:/var/lib/postgresql
```

Credenciales configuradas en Docker Compose:

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=1234
```

## Autoría

Proyecto desarrollado como aplicación de gestión de stock para controlar productos, proveedores y pedidos mediante una arquitectura frontend, backend y base de datos.
