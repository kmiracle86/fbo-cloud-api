import mongoose from 'mongoose';
import restify from 'restify';
import passport from 'passport';
import cors from 'cors';

import config from './config';
import routes from './routes';


const server = restify.createServer({
  name: 'FBO Cloud',
  version: '0.0.1'
});

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useMongoClient: true });

server.use(cors());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());

server.use(passport.initialize());
config.passportConfig(passport);

routes(server, '/api');

server.listen(4000, () => {
  // eslint-disable-next-line
  console.log('%s listening at %s', server.name, server.url);
});
