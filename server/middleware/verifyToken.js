import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

config();

const Auth = {
  // eslint-disable-next-line consistent-return
  tokenVerify(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).json({
        status: 400,
        error: 'Token not found',
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    try {
      const user = User.findOne(decoded.id);
      if (!user) {
        res.status(400).json({
          status: 400,
          error: 'Invalid token',
        });
      }
      req.user = {
        id: decoded.id,
        isStaff: decoded.isStaff,
        isAdmin: decoded.isAdmin,
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
