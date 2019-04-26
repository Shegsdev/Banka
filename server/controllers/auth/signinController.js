/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../../models/user';
import validateSignInInput from '../../validation/authentication/signIn';

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
    let { email } = req.body;
    const {
      password,
    } = req.body;

    const {
      error,
      isValid,
    } = validateSignInInput(req.body);

    if (!isValid) {
      return res.status(400).send({ status: 400, error });
    }

    email = email.toLowerCase().trim();

    User.findBy('email', email)
      .then((result) => {
        bcrypt.compare(password, result.rows[0].password)
          .then((isMatch) => {
            if (isMatch) {
              const payload = result.rows[0];
              jwt.sign(payload, secret, { expiresIn: '6h' }, (err, token) => {
                if (err) {
                  return res.status(403).json({
                    status: 403,
                    error: `Some error occured - ${err}`,
                  });
                }
                res.status(200).send({
                  status: 200,
                  data: {
                    token,
                    id: payload.id,
                    firstName: payload.firstname,
                    lastName: payload.lastname,
                    email: payload.email,
                  },
                });
              });
            } else {
              return res.status(401).json({
                status: 401,
                error: 'Invalid login details.',
              });
            }
          });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `An error occured. Please try again - ${err}`,
      }));
  },
};

export default SigninController;
