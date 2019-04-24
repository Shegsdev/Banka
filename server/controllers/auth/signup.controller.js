/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user.model';
import validateSignUpInput from '../../validation/authentication/signup';
import { hash /* setAuthToken */ } from '../../utils/helpers';

config();

const secret = process.env.SECRET || 'UseMeInstead';

const SignupController = {
  /**
   * @description - Creates new user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status, token and user data/error
   *
   * Route: POST: /auth/signup
   *
   * */
  signup(req, res) {
    let { email } = req.body;
    const {
      firstName, lastName, password,
    } = req.body;

    const {
      error,
      isValid,
    } = validateSignUpInput(req.body);

    if (!isValid) {
      return res.status(400).json({ status: 400, error });
    }

    // Convert email to lowercase
    email = email.toLowerCase().trim();

    // Check if account exists
    User.findOne('email', email)
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(400).json({
            status: 400,
            error: 'Account already exists',
          });
        }
      });

    // Hash password
    hash(password).then((hashed) => {
      const newUser = {
        firstName, lastName, email, password: hashed,
      };

      // Save user
      User.save(newUser)
        .then((result) => {
          // Check if user was successfully added to database
          if (result.rows === undefined || result.rows.length < 1) {
            return;
          }
          const payload = result.rows[0];
          // eslint-disable-next-line consistent-return
          jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return res.status(501).json({
                status: 501,
                error: `Error generating token ${err}`,
              });
            }
            // Set token
            // setAuthToken(req, token);
            return res.status(201).json({
              status: 201,
              data: {
                token,
                id: payload.id,
                firstName: payload.firstname,
                lastName: payload.lastname,
                email: payload.email,
              },
            });
          });
        });
    });
  },
};

export default SignupController;
