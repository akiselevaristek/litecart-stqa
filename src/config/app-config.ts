import { env } from './env';

export const appConfig = {
  credentials: {
    username: env.USERNAME,
    password: env.PASSWORD,
  },
};

