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