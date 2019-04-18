/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user.model';
import validateSignUpInput from '../../validation/authentication/signup';
import { setAuthToken } from '../../utils/helpers';

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
   * @return {json} - jsonObject containing status, token and user data
   *
   * Route: POST: /auth/signup
   *
   * */
  signup(req, res) {
    let { email } = req.body;
    const {
      firstName,
      lastName,
      password,
    } = req.body;

    const {
      error,
      isValid,
    } = validateSignUpInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    // Convert email to lowercase
    email = email.toLowerCase();

    // Check if account exists
    const exist = User.findByEmail(email);
    if (exist) {
      return res.status(400).json({
        status: 400,
        error: 'Account already exists',
      });
    }

    const newUser = {
      email,
      firstName,
      lastName,
      password,
    };

    // Create user account
    User.create(newUser)
      .then((user) => {
        // Check if user was successfully added to database
        if (!User.findByEmail(email)) {
          return res.status(500).json({
            status: 500,
            error: 'Error creating account, try again',
          });
        }
        const payload = user;
        // eslint-disable-next-line consistent-return
        jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              error: `Error generating token ${err}`,
            });
          }
          // Set token
          setAuthToken(req, token);
          return res.status(201).json({
            status: 201,
            data: {
              token,
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            },
          });
        });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Something went wrong ${err}. Please try again`,
      }));
  },
};

export default SignupController;
