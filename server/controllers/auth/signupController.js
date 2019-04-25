/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user';
import validateSignUpInput from '../../validation/authentication/signUp';
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

    email = email.toLowerCase().trim();

    User.findOne('email', email)
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(409).json({
            status: 409,
            error: 'Account already exists',
          });
        }
      });

    hash(password).then((hashed) => {
      const newUser = {
        firstName, lastName, email, password: hashed,
      };

      User.save(newUser)
        .then((result) => {
          const payload = result.rows[0];
          // eslint-disable-next-line consistent-return
          jwt.sign(payload, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                error: `Error generating token ${err}`,
              });
            }
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
        })
        .catch(err => res.status(500).json({
          status: 500,
          error: `An occured while creating account. Please try again.\n${err}`,
        }));
    });
  },
};

export default SignupController;
