const User = require('../models/user');
const sendMail = require('../services/mailer');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) { // check if user exists
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) { // check if password is valid
        return res.status(400).json({ error: 'Invalid passowrd' });
      }

      return res.json({ user, token: user.generateToken() });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    try {
      const { email, username } = req.body;
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      await sendMail({
        from: 'Medson Mendes  <elrolky@gmail.com>',
        to: user.email,
        subject: `Bem vindo ao twitter bootcamp, ${user.name}`,
        html: 'Seja bem vindo ao Twitter bootcamp, faça login com sua conta.',
      });

      return res.status(201).json({ user, token: user.generateToken() });
    } catch (err) {
      return next(err);
    }
  },
};
