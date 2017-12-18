import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from './';

export default passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
  };

  passport.use(new JWTStrategy(opts, (payload, done) => {
    User.findOne({ id: payload.id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
