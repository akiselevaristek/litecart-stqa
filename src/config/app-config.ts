import { env } from './env';

export const appConfig = {
  baseUrl: 'https://litecart.stqa.ru/en/',
  credentials: {
    email: env.EMAIL,
    password: env.PASSWORD,
  },
};

