/* eslint no-console:0 */
import mongoose from 'mongoose';
// eslint-disable-next-line
import prompt from 'prompt';
// eslint-disable-next-line
import faker from 'faker';
import Airport from './models/airport';
import Aircraft from './models/aircraft';
import Role from './models/role';
import User from './models/user';
import config from './config';


const seedAircraft = airports => {
  console.log('Seeding Aircraft');
  const promises = [...Array(5).keys()].map(i => {
    const newAircraft = new Aircraft({
      base: airports[i],
      color: faker.commerce.color(),
      description: faker.lorem.paragraph(),
      manufacturer: faker.company.companyName(),
      rate: faker.commerce.price(),
      registration: faker.random.alphaNumeric(5),
      type: faker.random.alphaNumeric(4),
    });
    return newAircraft.save();
  });

  return Promise.all(promises).then(() => {
    console.log('Finished seeding Aircraft');
  });
};

const seedAirports = () => {
  console.log('Seeding Airports');
  const promises = [...Array(5).keys()].map(() => {
    const newAirport = new Airport({
      name: `${faker.address.county()} County Airport`,
      city: faker.address.city(),
      state: faker.address.state(),
      iata: faker.helpers.replaceSymbols('???'),
      icao: `k${faker.random.alphaNumeric(3)}`,
      lid: faker.helpers.replaceSymbols('???'),
    });
    return newAirport.save();
  });

  return Promise.all(promises).then(airports => {
    console.log('Finished seeding Airports');
    return airports;
  });
};

const seedUsers = roles => {
  console.log('Seeding Users');
  const customer = new User({
    firstName: faker.name.findName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'customer@example.com',
    password: 'password123',
    role: roles[0]._id,
  });

  const instructor = new User({
    firstName: faker.name.findName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'instructor@example.com',
    password: 'password123',
    role: roles[1]._id,
  });

  const administrative = new User({
    firstName: faker.name.findName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'administrative@example.com',
    password: 'password123',
    role: roles[2]._id,
  });

  const companyAdmin = new User({
    firstName: faker.name.findName(),
    middleName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'company-admin@example.com',
    password: 'password123',
    role: roles[3]._id,
  });

  return Promise.all([
    customer.save(),
    instructor.save(),
    administrative.save(),
    companyAdmin.save(),
  ]);
};

const seedRoles = () => {
  console.log('Seeding Roles');
  const customer = new Role({
    name: 'customer',
    description: 'Customer'
  });

  const instructor = new Role({
    name: 'instructor',
    description: 'Instructor'
  });

  const administrative = new Role({
    name: 'administrative',
    description: 'Administrative Employee'
  });

  const companyAdmin = new Role({
    name: 'companyadmin',
    description: 'Company Admin'
  });

  const superAdmin = new Role({
    name: 'superadmin',
    description: 'Super Admin'
  });

  return Promise.all([
    customer.save(),
    instructor.save(),
    administrative.save(),
    companyAdmin.save(),
    superAdmin.save(),
  ]);
};

prompt.start();
prompt.message = '';
prompt.delimiter = '';
prompt.colors = true;

prompt.get({
  properties: {
    confirm: {
      pattern: /^(yes|no|y|n)$/gi,
      description: 'This command will remove all collections from the db. Are you sure?',
      message: 'Type yes/no',
      required: true,
      default: 'no'
    }
  }
}, (err, result) => {
  const c = result.confirm.toLowerCase();
  if (c !== 'y' && c !== 'yes') {
    console.log('Okay, aborting.');
    return;
  }

  console.log('Okay, seeding collections...');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.database, { useMongoClient: true });

  Promise.all([
    User.remove({}),
    Role.remove({}),
    Airport.remove({}),
    Aircraft.remove({}),
  ])
    .then(() => console.log('Finished removing collections'))
    .then(seedRoles)
    .then(seedUsers)
    .then(seedAirports)
    .then(seedAircraft)
    .then(() => {
      console.log('Finished seeding all collections');
      mongoose.disconnect();
    })
    .catch(error => console.log('error', error));
});
