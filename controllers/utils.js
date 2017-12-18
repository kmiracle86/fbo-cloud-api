import { validationResult } from 'express-validator/check';

export const check = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.success = false;
    res.validationErrors = errors.mapped();
    return next();
  }
  next();
};

export const response = (_, res, next) => {
  if (res.errors || res.validationErrors) {
    res.message = undefined;
  }

  if (res.validationErrors) {
    res.errors = undefined;
  }

  res.json({
    data: res.data,
    errors: res.errors,
    validationErrors: res.validationErrors,
    message: res.message,
    success: res.success,
  });
  next();
};
