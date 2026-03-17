import { env } from './env';

export const appConfig = {
  baseUrl: 'http://localhost/litecart/en/',
  credentials: {
    email: env.EMAIL,
    password: env.PASSWORD,
  },
};

