import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URL) {
	throw new Error('Invalid environment variable: "MONGODB_URL"');
}

if (!process.env.MONGODB_AUTH_SOURCE) {
	throw new Error('Invalid environment variable: "MONGODB_AUTH_SOURCE"');
}

if (!process.env.MONGODB_USERNAME) {
	throw new Error('Invalid environment variable: "MONGODB_USERNAME"');
}

if (!process.env.MONGODB_PASSWORD) {
	throw new Error('Invalid environment variable: "MONGODB_PASSWORD"');
}

if (!process.env.MONGODB_DATABASE) {
	throw new Error('Invalid environment variable: "MONGODB_DATABASE"');
}

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';
export const HOST = process.env.HOST || `localhost:${PORT}`;

export const MONGODB_URL = process.env.MONGODB_URL;
export const MONGODB_AUTH_SOURCE = process.env.MONGODB_AUTH_SOURCE;
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

export const RATE_LIMIT_WINDOW_IN_SECONDS = parseInt(
	process.env.RATE_LIMIT_WINDOW_IN_SECONDS || '300'
);
export const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '100');

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS;

export const COOKIE_SECRET = process.env.COOKIE_SECRET || 'secret123';
export const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE || '900');
