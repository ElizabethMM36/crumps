module.exports = function authorizeRole(role) {
  return (req, res, next) => {
    const user = req.user; // set by auth middleware
    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
