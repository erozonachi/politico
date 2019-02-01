/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
export const API_BASE_URL = '/api/v1';
export const HASH_SALT_ROUNDS = 10;

export const CONNECTION_STRING = process.env.DATABASE_URL? {connectionString: process.env.DATABASE_URL, ssl: true} : 'postgres://postgres:root@localhost:5432/politicodb';
