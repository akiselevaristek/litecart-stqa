import path from 'path';
import { appConfig } from './app-config';

const authDir = path.resolve(process.cwd(), '.auth');

export const authConfig = {
  dir: authDir,
  file: path.join(authDir, `${appConfig.credentials.email}.json`),
};
