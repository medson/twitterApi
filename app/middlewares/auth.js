const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const settings = require('../../config/settings');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) { // check headers
    return res.status(401).json({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');

  if (!parts.lenth === 2) {
    return res.status(400).json({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(400).json({ error: 'Token malformatted' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, settings.authSecret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return next(err);
  }
};
