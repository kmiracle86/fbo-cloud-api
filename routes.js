import airportRoutes from './controllers/airport';
import aircraftRoutes from './controllers/aircraft';
import roleRoutes from './controllers/role';
import userRoutes from './controllers/user';
import Airport from './models/airport';
import Aircraft from './models/aircraft';
import Role from './models/role';
import User from './models/user';

export default (server, basePath) => {
  userRoutes(server, basePath, { User });
  airportRoutes(server, basePath, { Airport });
  aircraftRoutes(server, basePath, { Aircraft });
  roleRoutes(server, basePath, { Role });
};
