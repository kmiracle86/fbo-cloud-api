/* eslint no-console:0 */
import mongoose from 'mongoose';
// eslint-disable-next-line
import prompt from 'prompt';
import Role from './models/role';
import User from './models/user';
import config from './config';

const seedUsers = roles => {
  const customer = new User({
    email: 'customer@example.com',
    password: 'password123',
    role: roles[0]._id,
  });

  const instructor = new User({
    email: 'instructor@example.com',
    password: 'password123',
    role: roles[1]._id,
  });

  const administrative = new User({
    email: 'administrative@example.com',
    password: 'password123',
    role: roles[2]._id,
  });

  const companyAdmin = new User({
    email: 'company-admin@example.com',
    password: 'password123',
    role: roles[3]._id,
  });

  Promise.all([
    customer.save(),
    instructor.save(),
    administrative.save(),
    companyAdmin.save(),
  ]).then(() => {
    console.log('Finished seeding...');
    mongoose.disconnect();
  });
};

const createRoles = () => {
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

  Promise.all([
    customer.save(),
    instructor.save(),
    administrative.save(),
    companyAdmin.save(),
    superAdmin.save(),
  ]).then(seedUsers);
};

prompt.start();
prompt.message = '';
prompt.delimiter = '';
prompt.colors = true;

prompt.get({
  properties: {
    confirm: {
      // allow yes, no, y, n, YES, NO, Y, N as answer
      pattern: /^(yes|no|y|n)$/gi,
      description: 'This command will remove all Users and Roles from the db. Are you sure?',
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

  console.log('Okay, seeding Users and Roles...');
  mongoose.Promise = global.Promise;
  mongoose.connect(config.database, { useMongoClient: true });

  User.remove({}, () => {
    console.log('[!] Removed all users');
  })
    .then(() =>
      Role.remove({}, () => {
        console.log('[!] Removed all roles');
      }))
    .then(createRoles);
});
