/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import User from '../models/user.model';
import { setAuthToken } from '../utils/helpers';
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
    const user = User.findOne(parseInt(req.params.id, 10));
    if (user) {
      return res.status(200).json({
        status: 200,
        data: user,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User does not exist',
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
    const users = User.findAll();
    return res.status(200).json({
      status: 200,
      data: users,
    });
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
      firstName,
      lastName,
      password,
      type,
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

    const newStaff = {
      email,
      firstName,
      lastName,
      password,
      type,
    };

    // Create user account
    User.addStaff(newStaff)
      .then((staff) => {
        // Check if user was successfully added to database
        if (!User.findByEmail(email)) {
          return res.status(500).json({
            status: 500,
            error: 'Error creating account, try again',
          });
        }
        const payload = staff;
        payload.isStaff = true;
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
              id: staff.id,
              firstName: staff.firstName,
              lastName: staff.lastName,
              email: staff.email,
              type: staff.type,
              isAdmin: staff.isAdmin,
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

export default UsersController;
