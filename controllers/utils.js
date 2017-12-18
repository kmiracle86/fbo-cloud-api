import { validationResult } from 'express-validator/check';

export const check = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.success = false;
    res.errors = errors.mapped();
    return next();
  }
  next();
};

export const response = (_, res, next) => {
  if (res.errors) {
    res.message = undefined;
  }
  res.json({
    data: res.data,
    errors: res.errors,
    message: res.message,
    success: res.success,
  });
  next();
};
