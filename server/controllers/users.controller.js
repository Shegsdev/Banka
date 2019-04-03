// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from '../db/users.db';
import validateSignUpInput from '../../validation/signup';

const secret = process.env.SECRET || 'UseMeInstead';

class User {
	create(req, res) {
		const {
			email,
			firstname,
			lastname,
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
			firstname,
			lastname,
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
          if(err) console.log('Error generating token', err);
          else {
              res.status(201).send({
                  status: 201,
                  data: {
                  	token,
                  	id,
                  	firstname,
                  	lastname,
                  	email,
                  }
              });
          }
      });
		}
	}
}

export default new User();
