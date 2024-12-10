export const RUNTIME_ENV = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '',
  MONGO_DSN: process.env.MONGO_DSN || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000
} as const;
