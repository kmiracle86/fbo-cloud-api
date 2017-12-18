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
];
