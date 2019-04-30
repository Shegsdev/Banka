/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/user';
import { hash, setAuthToken } from '../utils/helpers';
import validateSignUpInput from '../validation/authentication/signUp';

config();

const secret = process.env.SECRET || 'UseMeInstead';

const UsersController = {
  /**
   * @description - Finds a specific user
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status and data
   *
   * Route: GET: /users/:id
   *
   * */
  findOne(req, res) {
    User.findBy('id', parseInt(req.params.id, 10), res)
      .then((user) => {
        if (!user || user.rows.length < 1) {
          return res.status(404).json({
            status: 404,
            error: 'User does not exist',
          });
        }
        return res.status(200).json({ status: 200, data: user.rows });
      })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Something went wrong. Please try again - ${err}`,
      }));
  },

  /**
   * @description - Finds all users
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status and data
   *
   * Route: GET: /users
   *
   * */
  findAll(req, res) {
    User.findAllById(res).then((users) => {
      if (!users || users.rows.length < 1) {
        return res.status(404).json({
          status: 404,
          error: 'No user found',
        });
      }
      return res.status(200).json({
        status: 200, data: users.rows,
      });
    })
      .catch(err => res.status(500).json({
        status: 500,
        error: `Something went wrong. Please try again - ${err}`,
      }));
  },

  /**
   * @description - Creates new staff
   *
   * @param  {object} req - request
   *
   * @param  {object} res - response
   *
   * @return {json} - jsonObject containing status, token and user data
   *
   * Route: POST: /admin/new
   *
   * */
  addStaff(req, res) {
    let { email } = req.body;
    const {
      firstName, lastName, password, type,
    } = req.body;

    if (!type || type === '') {
      return res.status(400).json({
        status: 400,
        error: 'Please select user type',
      });
    }

    const {
      errors, isValid,
    } = validateSignUpInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: 400,
        errors,
      });
    }

    email = email.toLowerCase().trim();

    User.findBy('email', email, res)
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(409).json({
            status: 409,
            error: 'Account already exists',
          });
        }
      });

    hash(password).then((hashed) => {
      const newStaff = {
        email, firstName, lastName, password: hashed, type,
      };

      User.save(newStaff)
        .then((result) => {
          const user = result.rows[0];
          if (type === 'staff') {
            User.findOneAndUpdate('id', user.id, { is_staff: true }, res)
              .then(() => {});
          }
          if (type === 'admin') {
            User.findOneAndUpdate('id', user.id, { is_admin: true }, res)
              .then(() => {});
          }

          // eslint-disable-next-line consistent-return
          jwt.sign({ id: user.id, type: user.type }, secret, { expiresIn: '7h' }, (err, token) => {
            if (err) {
              return res.status(403).json({
                status: 403,
                error: `Some error occured - ${err}`,
              });
            }

            setAuthToken(req, token);
            return res.status(201).json({
              status: 201,
              data: {
                token,
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                type: user.type,
                isAdmin: user.isAdmin,
              },
            });
          });
        })
        .catch(err => res.status(500).json({
          status: 500,
          error: `Something went wrong. Please try again - ${err}`,
        }));
    });
  },
};

export default UsersController;
