import { check, response } from '../utils';
import * as validator from './validator';

const create = ({ Role }) => (req, res, next) => {
  const newRole = new Role({ ...req.body });

  return newRole.save()
    .then(role => {
      res.success = true;
      res.data = role;
      res.status(201);
      next();
    })
    .catch(err => {
      res.success = false;
      res.errors = err.errors; // Probably don't want to do this
      if (err.code === 11000) {
        res.status(409);
        res.message = 'Role already exists';
      } else {
        res.status(500);
        res.message = `Unknown error ${err.code || ''}. Unable to save role`;
      }
      next();
    });
};

const getAll = ({ Role }) => (_, res, next) =>
  Role.find({})
    .then(roles => {
      res.success = true;
      res.data = roles;
      next();
    })
    .catch(() => {
      res.success = false;
      res.status(500);
      next();
    });

export default (server, basePath, models) => {
  server.get(`${basePath}/roles`, getAll(models), response);
  server.post(`${basePath}/roles`, validator.createRole, check, create(models), response);
};
