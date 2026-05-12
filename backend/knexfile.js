/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export default {

  development: {
    client: 'pg',
    connection: {
      host: "172.17.0.3" ,
      database: 'my_db_stock',
      user: "postgres",
      password: '1234',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    }, 
    seeds:{
      tableName: 'knex_seeds',
      directory: './src/db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || "database" ,
      database: process.env.DB_NAME || 'my_db_stock',
      user: process.env.DB_USER || "postgres",
      password:process.env.DB_PASSWORD || '1234',
      port: process.env.DB_PORT || 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    }, 
    seeds:{
      tableName: 'knex_seeds',
      directory: './src/db/seeds'
    }
  }

};
