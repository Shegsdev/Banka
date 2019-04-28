export const user = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: 'password',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@email.com',
    password: 'password',
  },
  {
    firstName: 'John',
    lastName: 'Morris',
    email: 'johnmorre@email.com',
    password: 'password',
  },
  {
    firstName: 'Dave',
    lastName: 'Morris',
    email: 'dmorris@email.com',
    password: 'password',
  },
  {
    firstName: 'Dan',
    lastName: 'Steve',
    email: 'dsteve@email.com',
    password: 'password',
  },
  {
    firstName: 'Jay',
    lastName: 'Hairston',
    email: 'no_mail@email.com',
    password: 'password',
  },
  {
    firstName: 'Admin',
    lastName: 'Account',
    email: 'admin@banka.com',
    password: '$2b$10$yNBCruKSjV593RECsYeu7eddMlbLqN/LdTyJ0/VPlx4OiT01rXv06',
    type: 'admin',
  },
  {
    firstName: 'Staff',
    lastName: 'Account',
    email: 'staff@banka.com',
    password: '$2b$10$yNBCruKSjV593RECsYeu7eddMlbLqN/LdTyJ0/VPlx4OiT01rXv06',
    type: 'staff',
  },
];

export const missingFirstname = {
  firstName: '',
  lastName: 'Doe',
  email: 'nofirstname@email.com',
  password: 'password',
};

export const missingLastname = {
  firstName: 'John',
  lastName: '',
  email: 'nolastname@email.com',
  password: 'password',
};

export const missingEmail = {
  firstName: 'John',
  lastName: 'Doe',
  email: '',
  password: 'password',
};

export const missingPassword = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'nopassword@email.com',
  password: '',
};

export const invalidEmail = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'invalidemail',
  password: 'password',
};

export const admin = {
  firstName: 'Admin',
  lastName: 'Account',
  email: 'admin@banka.com',
  password: 'password',
  type: 'admin',
};

export const staff = {
  firstName: 'Staff',
  lastName: 'Account',
  email: 'staff@banka.com',
  password: 'password',
  type: 'staff',
};
