import dotenv from 'dotenv';

dotenv.config({ quiet: true });

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Create a local .env file based on .env.dist and set a value.`,
    );
  }

  return value;
}

export const env = {
  USERNAME: getRequiredEnv('USERNAME'),
  PASSWORD: getRequiredEnv('PASSWORD'),
};
