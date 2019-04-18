/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user.model';
import { setAuthToken } from '../../utils/helpers';
import validateSignInInput from '../../../validation/authentication/signin';

config();

const secret = process.env.SECRET || 'UseMeInstead';

const SigninController = {
  /**
   * @description - Logs user in
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status, token and user data
   *
   * Route: POST: /auth/signin
   *
   * */
  signin(req, res) {
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
    const user = User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 401,
        error: 'Invalid login details',
      });
    }

    // Check if password match
    bcrypt.compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const payload = user;
          jwt.sign(payload, secret, { expiresIn: '2h' }, (err, token) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                error: `Some error occured - ${err}`,
              });
            }

            // Set token
            setAuthToken(req, token);
            res.status(200).send({
              status: 200,
              data: {
                token,
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              },
            });
          });
        } else {
          return res.status(400).json({
            status: 400,
            error: 'Invalid login details.',
          });
        }
      });
  },
};

export default SigninController;
