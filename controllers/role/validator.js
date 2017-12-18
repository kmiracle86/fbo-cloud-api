/* eslint import/prefer-default-export: 0 */
import { check } from 'express-validator/check';

export const createRole = [
  check('name')
    .exists()
    .withMessage('name is required'),

  check('description')
    .exists()
    .withMessage('description is required'),
];
