import { check, response } from '../utils';
import * as validator from './validator';

const create = ({ Airport }) => (req, res, next) => {
  const newAirport = new Airport({ ...req.body });

  return newAirport.save()
    .then(airport => {
      res.success = true;
      res.data = airport;
      next();
    })
    .catch(err => {
      res.success = false;
      res.errors = err.errors; // Probably don't want to do this
      res.message = `Unknown error ${err.code || ''}. Unable to save airport`;
      next();
    });
};

const getAll = ({ Airport }) => (_, res, next) =>
  Airport.find({})
    .then(airports => {
      res.success = true;
      res.data = airports;
      next();
    })
    .catch(() => {
      res.success = false;
      next();
    });

export default (server, basePath, models) => {
  server.get(`${basePath}/airports`, getAll(models), response);
  server.post(`${basePath}/airports`, validator.createAirport, check, create(models), response);
};
