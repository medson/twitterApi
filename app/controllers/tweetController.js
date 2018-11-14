const Tweet = require('../models/tweet');

module.exports = {
  async create(req, res, next) {
    try {
      const tweet = await Tweet.create({ ...req.body, user: req.userId });

      return res.status(201).json(tweet);
    } catch (err) {
      return next(err);
    }
  },

  async destroy(req, res, next) {
    try {
      await Tweet.findByIdAndRemove(req.params.id);

      return res.status(200).json('Tweet Removido');
    } catch (err) {
      return next(err);
    }
  },
};
