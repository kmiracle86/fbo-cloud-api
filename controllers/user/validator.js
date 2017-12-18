import { check } from 'express-validator/check';

export const createUser = [
  check('email')
    .exists()
    .isEmail()
    .withMessage('must be an email')
    .trim()
    .normalizeEmail(),

  check('password', 'passwords must be at least 5 chars long and contain one number')
    .exists()
    .isLength({ min: 5 })
    .withMessage('must be at least 5 characters')
    .matches(/\d/)
    .withMessage('must contain a number'),
];

export const createToken = [
  check('email')
    .exists()
    .withMessage('must exist'),
  check('password')
    .exists()
    .withMessage('must exist'),
];
