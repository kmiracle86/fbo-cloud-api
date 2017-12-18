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
      next();
    })
    .catch(err => {
      res.success = false;
      res.errors = err.errors; // Probably don't want to do this
      res.message = err.code === 11000 ? 'User already exists' : `Unknown error ${err.code || ''}. Unable to save user`;
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
  server.get(`${basePath}/user`, getAll(models), response);
  server.post(`${basePath}/user`, validator.createUser, check, create(models), response);
  server.post(`${basePath}/token`, validator.createToken, check, createToken(models), response);
};
