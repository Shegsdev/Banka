import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

config();

const Auth = {
  // eslint-disable-next-line consistent-return
  async tokenVerify(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token not found',
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET);
    try {
      const user = await User.findById(decoded.id);
      if (user.rows[0].length < 0) {
        res.status(401).json({
          status: 401,
          error: 'Invalid token',
        });
      }
      req.user = {
        id: user.rows[0].id,
        isStaff: user.rows[0].is_staff,
        isAdmin: user.rows[0].is_admin,
      };
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: `Something went wrong ${error}`,
      });
    }
    next();
  },
};

export default Auth;
