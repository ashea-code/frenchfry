const setJSON = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  return next();
};

module.exports = {
  setJSON,
};
