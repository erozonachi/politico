/**
* @author Eneh, James Erozonachi
*
* @description A module that holds Application constant values
*
* */
export const apiBaseURL = '/api/v1';
export const notFound = 'Resource not found';
export const systemError = 'Unable to process request at this time';
export const hashSaltRounds = 10;

export const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/politicodb';
