import { check, response } from '../utils';
import * as validator from './validator';

const create = ({ Aircraft }) => (req, res, next) => {
  const newAircraft = new Aircraft({ ...req.body });

  return newAircraft.save()
    .then(aircraft => {
      res.success = true;
      res.data = aircraft;
      res.status(201);
      next();
    })
    .catch(err => {
      res.success = false;
      res.errors = err.errors; // Probably don't want to do this
      if (err.code === 11000) {
        res.status(409);
        res.message = 'Aircraft already exists';
      } else {
        res.status(500);
        res.message = `Unknown error ${err.code || ''}. Unable to save aircraft`;
      }
      next();
    });
};

const getAll = ({ Aircraft }) => (_, res, next) =>
  Aircraft.find({})
    .populate('base')
    .then(aircraft => {
      res.success = true;
      res.data = aircraft;
      next();
    })
    .catch(() => {
      res.success = false;
      res.status(500);
      next();
    });

export default (server, basePath, models) => {
  server.get(`${basePath}/aircraft`, getAll(models), response);
  server.post(`${basePath}/aircraft`, validator.createAircraft, check, create(models), response);
};
