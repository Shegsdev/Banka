const Admin = {
  isAdmin(req, res, next) {
    if (req.user.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    }
    return next();
  },

  isStaff(req, res, next) {
    if (req.user.isStaff === false) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    }
    return next();
  },

  nonStaff(req, res, next) {
    if (req.user.isStaff === false && req.user.isAdmin === false) {
      return res.status(403).json({
        status: 403,
        error: 'Forbidden',
      });
    }
    return next();
  },
};

export default Admin;
