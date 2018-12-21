const notAuthorized = (res) => {
  const body = { status: 401, error: 'You are not authorized to make this request' };
  res.status(401);
  res.send(JSON.stringify(body));
};

const badRequest = (res, err = '') => {
  const body = { status: 400, error: err };
  res.status(400);
  res.send(JSON.stringify(body));
};

const internalError = (res, err = '') => {
  const body = { status: 500, error: err };
  res.status(500);
  res.send(JSON.stringify(body));
};

module.exports = {
  badRequest,
  internalError,
  notAuthorized,
};
