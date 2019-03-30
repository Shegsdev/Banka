export const user = [
	{
		firstname: 'John',
		lastname: 'Doe',
		email: 'johndoe@email.com',
		password: 'password',
	},
	{
		firstname: 'Jane',
		lastname: 'Doe',
		email: 'janedoe@email.com',
		password: 'password',
	},
	{
		firstname: 'John',
		lastname: 'Morris',
		email: 'johnmorre@email.com',
		password: 'password',
	},
	{
		firstname: 'Dave',
		lastname: 'Morris',
		email: 'dmorris@email.com',
		password: 'password',
	},
];

export const missingFirstname = {
	firstname: '',
	lastname: 'Doe',
	email: 'nofirstname@email.com',
	password: 'password',
};

export const missingLastname = {
	firstname: 'John',
	lastname: '',
	email: 'nolastname@email.com',
	password: 'password',
};

export const missingEmail = {
	firstname: 'John',
	lastname: 'Doe',
	email: '',
	password: 'password',
};

export const missingPassword = {
	firstname: 'John',
	lastname: 'Doe',
	email: 'nopassword@email.com',
	password: '',
};