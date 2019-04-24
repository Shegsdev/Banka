/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/user.model';
import { hash, setAuthToken } from '../utils/helpers';
import validateSignUpInput from '../validation/authentication/signup';

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
    User.findBy('id', parseInt(req.params.id, 10))
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            status: 404,
            error: 'User does not exist',
          });
        }
        return res.status(200).json({ status: 200, data: user.rows });
      });
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
    User.findAll().then(users => res.status(200).json({
      status: 200, data: users.rows,
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

    const {
      error, isValid,
    } = validateSignUpInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: 400,
        error,
      });
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
      const newStaff = {
        email, firstName, lastName, password: hashed, type,
      };

      // Create user account
      User.save(newStaff)
        .then((result) => {
          // Check if user was successfully added to database
          if (result.rows.length < 1) {
            return res.status(500).json({
              status: 500,
              error: 'Error creating account, try again',
            });
          }

          const payload = result.rows[0];
          // Update user role
          if (type === 'staff') {
            User.findOneAndUpdate('id', payload.id, { is_staff: true })
              .then(() => {});
          }
          if (type === 'admin') {
            User.findOneAndUpdate('id', payload.id, { is_admin: true })
            .then(() => {});
          }

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
                id: payload.id,
                firstName: payload.firstname,
                lastName: payload.lastname,
                email: payload.email,
                type: payload.type,
                isAdmin: payload.isAdmin,
              },
            });
          });
        })
        .catch(err => res.status(500).json({
          status: 500,
          error: `Something went wrong ${err}. Please try again`,
        }));
    });
  },
};

export default UsersController;
