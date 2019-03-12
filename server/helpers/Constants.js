/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
export const API_BASE_URL = '/api/v1';
export const HASH_SALT_ROUNDS = 10;
export const MAX = 99999999;
export const MIN = 11111111;
export const CONNECTION_STRING = process.env.DATABASE_URL? {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
} : {
  connectionString: 'postgres://postgres:root@127.0.0.1:5432/politicodb_test',
  ssl: false,
  max: 100,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};
