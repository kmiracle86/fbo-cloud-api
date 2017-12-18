import passport from './passport';

const dbUser = process.env.FBO_DB_USER;
const dbPwd = process.env.FBO_DB_PASSWORD;
const secret = process.env.FBO_SECRET;

export default {
  database: `mongodb://${dbUser}:${dbPwd}@ds159926.mlab.com:59926/fbo-cloud`,
  passportConfig: passport,
  secret,
};
