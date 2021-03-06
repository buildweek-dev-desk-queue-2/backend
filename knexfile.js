// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/db.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: 'data/seeds'
    }
  },

  // development: {
  //   client: 'pg',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'postgres',
  //     password: process.env.PG_PW,
  //     database: 'table'
  //   },
  //   migrations: {
  //     directory: './data/migrations'
  //   },
  //   seeds: {
  //     directory: 'data/seeds'
  //   }
  // },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
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
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/dbProduction.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: 'data/seeds'
    }
  }
  // production: {
  //   client: "pg",
  //   connection: process.env.DATABASE_URL, 
  //   migrations: {
  //     directory: "./data/migrations",
  //   },
  //   seeds: {
  //     directory: "./data/seeds",
  //   },
  // }
};
