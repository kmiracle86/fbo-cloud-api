import userRoutes from './controllers/user';
// needs to be imported for mongoose, remove after Role controllers created
// eslint-disable-next-line
import Role from './models/role';
import User from './models/user';

export default (server, basePath) => {
  userRoutes(server, basePath, { User });
};
