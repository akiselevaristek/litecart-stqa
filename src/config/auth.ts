import path from 'path';

const authDir = path.resolve(process.cwd(), '.auth');

export const authConfig = {
  dir: authDir,
};

export function getAuthStatePath(email: string): string {
  return path.join(authDir, `${email}.json`);
}
