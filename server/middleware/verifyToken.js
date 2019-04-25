import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

config();

const Auth = {
  // eslint-disable-next-line consistent-return
  async tokenVerify(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'Unable to verify token',
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET);
    try {
      const user = await User.findById(decoded.id);
      if (user.rows[0].length < 1) {
        res.status(401).json({
          status: 401,
          error: 'Invalid email or password',
        });
      }
      req.user = {
        id: user.rows[0].id,
        isStaff: user.rows[0].is_staff,
        isAdmin: user.rows[0].is_admin,
      };
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: `Something went wrong ${error}`,
      });
    }
    next();
  },
};

export default Auth;
