// Se importa la biblioteca Knex

import knex from 'knex';
import knexfile from "./knexfile.ts"

// Se escoge el entorno de configuración

const environment = process.env.NODE_ENV || 'development';
const config = knexfile[environment];

//Se inicializa con esa configuración

const db = knex(config);

export default db;