/* eslint import/prefer-default-export: 0 */
import { check } from 'express-validator/check';

export const createAirport = [
  check('name')
    .exists()
    .withMessage('name is required'),

  check('city')
    .exists()
    .withMessage('city is required'),

  check('state')
    .exists()
    .withMessage('state is required'),

  check('icao')
    .exists()
    .withMessage('icao is required and must be unique'),

  check('iata')
    .exists()
    .withMessage('iata is required and must be unique'),

  check('lid')
    .exists()
    .withMessage('lid is required and must be unique'),
];
