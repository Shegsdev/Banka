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
    const { email, password } = req.body;
    const { errors, isValid } = validateSignInInput(req.body);
    if (!isValid) {
      return res.status(400).send({ status: 400, error: errors });
    }

    const sanitizedEmail = email.toLowerCase().trim();
    User.findBy('email', sanitizedEmail, res)
      .then((result) => {
        if (!result.rows.length) {
          return res.status(403).json({
            status: 403,
            error: 'Sorry, that doesn\'t match any of our records',
          });
        }
        bcrypt.compare(password, result.rows[0].password)
          .then((match) => {
            if (match) {
              const user = result.rows[0];
              jwt.sign({ username: user.email, type: user.type }, secret, { expiresIn: '1h' }, (err, token) => {
                if (err) {
                  return res.status(401).json({
                    status: 401,
                    error: 'Hmm, something\'s not right, try again',
                  });
                }
                res.status(200).send({
                  status: 200,
                  data: {
                    token,
                    id: user.id,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    email: user.email,
                  },
                });
              });
            } else {
              return res.status(403).json({
                status: 403,
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
