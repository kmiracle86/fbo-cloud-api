import userRoutes from './controllers/user';
import User from './models/user';

export default (server, basePath) => {
  userRoutes(server, basePath, { User });
};
