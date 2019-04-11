// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../db/users.db';
import validateSignUpInput from '../../validation/authentication/signup';
import validateSignInInput from '../../validation/authentication/signin';

const secret = process.env.SECRET || 'UseMeInstead';

class User {
	create(req, res) {
		const {
			email,
			firstName,
			lastName,
			password,
		} = req.body;

		const {
			error,
			isValid,

		} = validateSignUpInput(req.body);

		if (!isValid) {
			return res.status(400).send({
				status: 400,
				error,
			});
	   }

		// Check if account exists
		users.map(user => {
			if (user.email === email) {
				return res.send({
					status: 400,
					error: 'Account already exists',
				});
			}
		});
		const id = users.length + 1;

		const newUser = {
			id,
			email,
			firstName,
			lastName,
			password,
		};
		users.push(newUser);
		if (!users.map(user => user.email).includes(email)) {
			return res.send({
				status: 500,
				error: "Error creating account, try again"
			});
		} else {
			const payload = {}; /* Todo *//* - Fill payload with user data */
      jwt.sign(payload, secret, {
          expiresIn: '1h'
      }, (err, token) => {
          if (err) console.log('Error generating token', err);
          else {
            res.status(201).send({
                status: 201,
                data: {
                	token,
                	id,
                	firstName,
                	lastName,
                	email,
                }
            });
          }
      	});
		}
	}

	// login
	login(req, res) {
		const {
			email,
			password,
		} = req.body;

		const {
			error,
			isValid,
		} = validateSignInInput(req.body);

		if (!isValid) {
			return res.status(400).send({
				status: 400,
				error,
			});
	   }

		// Check if account exists
		users.find(user => {
			if (user.email !== email || user.password !== password) {
				return res.send({
					status: 401,
					error: 'Invalid login details',
				});
			} else {
				// Logs user in
				const payload = {};
				jwt.sign(payload, secret, {
		          expiresIn: '1h'
		      }, (err, token) => {
		          if (err) console.log('Error generating token', err);
		          else {
		            res.status(200).send({
	                status: 200,
		                data: {
		                	token,
		                	id: user.id,
		                	firstName: user.firstName,
		                	lastName: user.lastName,
		                	email: user.email,
		                }
		            });
		          }
		      	});
			}
		});

	}
}

export default new User();
