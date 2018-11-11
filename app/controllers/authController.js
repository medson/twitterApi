const User = require('../models/user');

module.exports = {
  async signup(req, res, next) {
    try {
      const { email, username } = req.body;
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return next(err);
    }
  },
};
