/* eslint import/prefer-default-export: 0 */
import { check } from 'express-validator/check';

export const createAircraft = [
  check('base')
    .exists()
    .withMessage('base is required'),

  check('manufacturer')
    .exists()
    .withMessage('manufacturer is required'),

  check('rate')
    .exists()
    .withMessage('rate is required'),

  check('registration')
    .exists()
    .withMessage('registration is required'),

  check('type')
    .exists()
    .withMessage('type is required'),
];
