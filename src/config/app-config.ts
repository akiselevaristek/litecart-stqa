import { env } from './env';

export const appConfig = {
  baseUrl: 'http://localhost/litecart/en/',
  credentials: {
    username: env.USERNAME,
    password: env.PASSWORD,
  },
};

