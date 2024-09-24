import { cleanEnv, str, port } from 'envalid';

export function validateEnv() {
  cleanEnv(process.env, {
    PORT: port(),
    JWT_SECRET: str(),
    DB_HOST: str(),
    DB_PORT: port(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
  });
}