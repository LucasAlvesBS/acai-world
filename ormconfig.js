require('dotenv/config');

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  ssl: process.env.NODE_ENV === 'production' ? true : false,
  extra:
    process.env.NODE_ENV === 'production'
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : null,
  entities: [process.env.ENTITIES],
  migrations: [process.env.MIGRATIONS],
  cli: {
    entitiesDir: 'src/app/**',
    migrationsDir: 'src/config/typeorm/migrations',
  },
  seeds: [process.env.SEEDS],
};
