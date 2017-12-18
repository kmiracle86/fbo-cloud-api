import jwt from 'jsonwebtoken';
import { check, response } from '../utils';
import * as validator from './validator';
import config from '../../config';


const create = ({ User }) => (req, res, next) => {
  const { email, password, role } = req.body;
  const newUser = new User({
    email,
    password,
    role,
  });

  return newUser.save()
    .then(user => {
      res.success = true;
      res.data = user;
      res.status(201);
      next();
    })
    .catch(err => {
      res.success = false;
      if (err.code === 11000) {
        res.status(409);
        res.message = 'User already exists';
      } else {
        res.status(500);
        res.message = `Unknown error ${err.code || ''}. Unable to save user`;
      }
      res.errors = err.errors; // Probably don't want to do this
      next();
    });
};

const getAll = ({ User }) => (_, res, next) =>
  User.find({})
    .populate({ path: 'role' })
    .then(users => {
      res.success = true;
      res.data = users;
      next();
    })
    .catch(() => {
      res.success = false;
      next();
    });

const createToken = ({ User }) => (req, res, next) =>
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.success = false;
        res.message = 'Authentication failed. Invalid username or password';
        return next();
      }
      return user.comparePassword(req.body.password)
        .then(isMatch => {
          if (!isMatch) {
            res.success = false;
            res.message = 'Authentication failed. Invalid username or password';
            return next();
          }

          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: '2 days',
          });
          res.success = true;
          res.data = token;
          next();
        });
    })
    .catch(() => {
      res.success = false;
      res.message = 'Unknown error';
      next();
    });


export default (server, basePath, models) => {
  server.get(`${basePath}/users`, getAll(models), response);
  server.post(`${basePath}/users`, validator.createUser, check, create(models), response);
  server.post(`${basePath}/token`, validator.createToken, check, createToken(models), response);
};
