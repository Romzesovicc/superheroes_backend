import dotenv from 'dotenv';

const env = dotenv.config({ path: '.env' }).parsed || process.env;

export default ({
  app: {
    frontUrl: env.FRONT_URL || 'http://localhost:3000',
    domain: process.env.APP_URL || env.APP_URL || 'http://localhost',
    port: process.env.PORT || env.PORT || 3002,
    url: env.FRONT_URL || `http://localhost:${process.env.PORT || env.PORT || 3000}`,
  },
  db: {
    username: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'root',
    database: env.DB_NAME || 'superhero',
    host: env.DB_HOST || '127.0.0.1',
    dialect: env.DB_DIALECT || 'mysql',
    operatorsAliases: false,
  },
});
