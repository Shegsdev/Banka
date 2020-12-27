/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user';
import validateSignUpInput from '../../validation/authentication/signUp';
import { hash } from '../../utils/helpers';

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
    const {
      firstName, lastName, email, password,
    } = req.body;
    const { errors, isValid } = validateSignUpInput(req.body);

    if (!isValid) {
      return res.status(400).json({ status: 400, error: errors });
    }

    const sanitizedEmail = email.toLowerCase().trim();

    User.findBy('email', sanitizedEmail, res)
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(422).json({
            status: 422,
            error: 'User already exists',
          });
        }
      })
      .catch(() => res.status(500).json({
        status: 500,
        error: 'Please try again',
      }));

    hash(password).then((hashed) => {
      const newUser = {
        firstName, lastName, email: sanitizedEmail, password: hashed,
      };

      User.save(newUser)
        .then((result) => {
          if (!result || result === 'undefined') {
            return res.status(500).json({
              status: 500,
              error: 'Unable to create your account. Please try again',
            });
          }
          const user = result.rows[0];
          // eslint-disable-next-line consistent-return
          jwt.sign({ username: user.email, type: user.type }, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return res.status(401).json({
                status: 401,
                error: `Some error occured - ${err}`,
              });
            }
            return res.status(201).json({
              status: 201,
              data: {
                token,
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
              },
            });
          });
        })
        .catch(err => res.status(500).json({
          status: 500,
          error: `An occured while creating account. Please try again - ${err}`,
        }));
    });
  },
};

export default SignupController;
