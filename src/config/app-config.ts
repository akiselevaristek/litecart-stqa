import { env } from './env';

export const appConfig = {
  baseUrl: 'https://litecart.stqa.ru/en',
  credentials: {
    username: env.USERNAME,
    password: env.PASSWORD,
  },
};

