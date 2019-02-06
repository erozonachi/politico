/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
export const API_BASE_URL = '/api/v1';
export const HASH_SALT_ROUNDS = 10;

export const CONNECTION_STRING = process.env.DATABASE_URL? 
  {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  } : {
    connectionString: 'postgres://postgres:root@localhost:5432/politicodb',
    ssl: false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
